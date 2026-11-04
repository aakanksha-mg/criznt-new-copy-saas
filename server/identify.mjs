import dns from 'node:dns/promises';

// In-memory cache for IP resolution to eliminate redundant lookups
const ipCache = new Map();

// Known Indian & Global Enterprise Org / Domain Signatures
const KNOWN_ENTERPRISES = [
  // Banks
  { match: /hdfc/i, name: 'HDFC Bank', domain: 'hdfcbank.com', industry: 'Banking & Financial Services' },
  { match: /icici/i, name: 'ICICI Bank / ICICI Lombard', domain: 'icicibank.com', industry: 'Banking & Insurance' },
  { match: /state bank of india|sbi/i, name: 'State Bank of India', domain: 'sbi.co.in', industry: 'Banking' },
  { match: /axis bank/i, name: 'Axis Bank', domain: 'axisbank.com', industry: 'Banking' },
  { match: /kotak/i, name: 'Kotak Mahindra Bank', domain: 'kotak.com', industry: 'Banking & Insurance' },
  { match: /bajaj/i, name: 'Bajaj Finserv / Allianz', domain: 'bajajfinserv.in', industry: 'Financial Services & Insurance' },
  { match: /tata aig|tata/i, name: 'Tata Group / Tata AIG', domain: 'tata.com', industry: 'Conglomerate & Insurance' },
  { match: /max life/i, name: 'Max Life Insurance', domain: 'maxlifeinsurance.com', industry: 'Insurance' },
  { match: /star health/i, name: 'Star Health Insurance', domain: 'starhealth.in', industry: 'Insurance' },
  { match: /standard chartered/i, name: 'Standard Chartered Bank', domain: 'sc.com', industry: 'Banking' },
  { match: /citibank|citi/i, name: 'Citi', domain: 'citigroup.com', industry: 'Banking' },
  { match: /jpmorgan|chase/i, name: 'JPMorgan Chase', domain: 'jpmorgan.com', industry: 'Investment Banking' },
  { match: /hsbc/i, name: 'HSBC', domain: 'hsbc.com', industry: 'Banking' },

  // FMCG, Retail & Conglomerates
  { match: /hindustan unilever|unilever/i, name: 'Hindustan Unilever', domain: 'hul.co.in', industry: 'FMCG' },
  { match: /itc/i, name: 'ITC Limited', domain: 'itcportal.com', industry: 'FMCG & Conglomerate' },
  { match: /nestle/i, name: 'Nestlé', domain: 'nestle.in', industry: 'FMCG' },
  { match: /reliance|jio/i, name: 'Reliance Industries / Jio', domain: 'ril.com', industry: 'Conglomerate' },
  { match: /adani/i, name: 'Adani Group', domain: 'adani.com', industry: 'Conglomerate' },
  { match: /marico/i, name: 'Marico Limited', domain: 'marico.com', industry: 'FMCG' },
  { match: /dabur/i, name: 'Dabur India', domain: 'dabur.com', industry: 'FMCG & Healthcare' },

  // Pharma & Healthcare
  { match: /sun pharma/i, name: 'Sun Pharmaceutical', domain: 'sunpharma.com', industry: 'Pharmaceuticals' },
  { match: /dr\.? reddy/i, name: "Dr. Reddy's Laboratories", domain: 'drreddys.com', industry: 'Pharmaceuticals' },
  { match: /cipla/i, name: 'Cipla Limited', domain: 'cipla.com', industry: 'Pharmaceuticals' },
  { match: /apollo hospitals/i, name: 'Apollo Hospitals', domain: 'apollohospitals.com', industry: 'Healthcare' },

  // Technology & Telecom
  { match: /bharti airtel|airtel/i, name: 'Bharti Airtel', domain: 'airtel.in', industry: 'Telecommunications' },
  { match: /infosys/i, name: 'Infosys Limited', domain: 'infosys.com', industry: 'Technology' },
  { match: /wipro/i, name: 'Wipro Limited', domain: 'wipro.com', industry: 'Technology' },
  { match: /google/i, name: 'Google', domain: 'google.com', industry: 'Technology' },
  { match: /microsoft/i, name: 'Microsoft', domain: 'microsoft.com', industry: 'Technology' },
  { match: /amazon/i, name: 'Amazon', domain: 'amazon.com', industry: 'Technology' },
];

/**
 * Extracts a clean company root domain from a hostname or reverse DNS string.
 * Example: 'corp-gw1.mumbai.hdfcbank.com' -> 'hdfcbank.com'
 */
function extractRootDomain(host) {
  if (!host || typeof host !== 'string') return null;
  const parts = host.toLowerCase().split('.').filter(Boolean);
  if (parts.length < 2) return host;

  // Handle common compound TLDs (.co.in, .com.au, .gov.in, etc.)
  const secondLast = parts[parts.length - 2];
  const last = parts[parts.length - 1];
  const compoundTlds = ['co.in', 'com.au', 'co.uk', 'gov.in', 'org.in', 'net.in', 'co.za', 'com.sg'];

  if (compoundTlds.includes(`${secondLast}.${last}`) && parts.length >= 3) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

/**
 * Identifies the company and domain from IP address and request context.
 */
export async function identifyCompany(req) {
  // 1. Check for manual simulator override header or query
  const simDomain = req.headers['x-company-domain'] || req.query?.simulate_domain;
  const simCompany = req.headers['x-company-name'] || req.query?.simulate_company;
  if (simDomain) {
    return {
      domain: simDomain.toLowerCase(),
      name: simCompany || simDomain.split('.')[0].toUpperCase(),
      industry: 'Enterprise Channel Partner',
      city: 'Mumbai',
      country: 'India',
      isp: 'Direct Dedicated Link',
      isCorporate: true,
      detectionMethod: 'simulated_override',
    };
  }

  // 2. Extract Client IP
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || '127.0.0.1';
  if (ip.startsWith('::ffff:')) ip = ip.slice(7);

  // Check in-memory cache
  if (ipCache.has(ip)) {
    return ipCache.get(ip);
  }

  // 3. Handle Localhost / Local Private Network
  const isLocal =
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.20.');

  if (isLocal) {
    // In local development, provide a realistic default enterprise profile
    const localResult = {
      ip,
      domain: 'hdfcbank.com',
      name: 'HDFC Bank (Development Environment)',
      industry: 'Banking & Financial Services',
      city: 'Mumbai',
      country: 'India',
      isp: 'Local Corporate Gateway',
      isCorporate: true,
      detectionMethod: 'localhost_dev_profile',
    };
    ipCache.set(ip, localResult);
    return localResult;
  }

  let result = {
    ip,
    domain: null,
    name: null,
    industry: null,
    city: null,
    country: null,
    isp: null,
    isCorporate: false,
    detectionMethod: 'standard_ip',
  };

  try {
    // 4. Reverse DNS Lookup
    const hostnames = await dns.reverse(ip).catch(() => []);
    if (hostnames.length > 0) {
      const primaryHost = hostnames[0];
      const rootDomain = extractRootDomain(primaryHost);
      result.isp = primaryHost;

      // Check if hostname matches any known enterprise
      for (const ent of KNOWN_ENTERPRISES) {
        if (ent.match.test(primaryHost)) {
          result.domain = ent.domain;
          result.name = ent.name;
          result.industry = ent.industry;
          result.isCorporate = true;
          result.detectionMethod = 'reverse_dns_match';
          break;
        }
      }

      // If not in dictionary but rootDomain looks like a corporate domain
      if (!result.domain && rootDomain && !rootDomain.includes('broadband') && !rootDomain.includes('dynamic') && !rootDomain.includes('telecom')) {
        result.domain = rootDomain;
        result.name = rootDomain.split('.')[0].toUpperCase();
        result.isCorporate = true;
        result.detectionMethod = 'reverse_dns_domain';
      }
    }
  } catch {
    // Reverse DNS timed out or failed, proceed to external fallback
  }

  // 5. External Geolocation / ASN Lookup (with fast 1.5s timeout)
  if (!result.domain) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      const resp = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org,as,query`,
        { signal: controller.signal },
      );
      clearTimeout(timeoutId);

      if (resp.ok) {
        const geo = await resp.json();
        if (geo.status === 'success') {
          result.city = geo.city;
          result.country = geo.country;
          result.isp = geo.isp || geo.org;

          const orgString = `${geo.org || ''} ${geo.isp || ''} ${geo.as || ''}`;
          for (const ent of KNOWN_ENTERPRISES) {
            if (ent.match.test(orgString)) {
              result.domain = ent.domain;
              result.name = ent.name;
              result.industry = ent.industry;
              result.isCorporate = true;
              result.detectionMethod = 'asn_org_match';
              break;
            }
          }

          if (!result.domain && geo.org && !geo.org.includes('Consumer') && !geo.org.includes('Broadband')) {
            result.name = geo.org;
            result.isCorporate = true;
            result.detectionMethod = 'asn_org_generic';
          }
        }
      }
    } catch {
      // External service unavailable, degrade gracefully
    }
  }

  ipCache.set(ip, result);
  return result;
}
