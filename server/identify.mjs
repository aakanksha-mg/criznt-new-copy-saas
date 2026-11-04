import dns from 'node:dns/promises';

// In-memory cache for IP resolution to eliminate redundant lookups
const ipCache = new Map();

// Generic Enterprise Industry Signatures
const INDUSTRY_PATTERNS = [
  { match: /insurance|life|general|gic/i, industry: 'Insurance & Assurance' },
  { match: /bank|financial|finserv|capital|asset|mutual/i, industry: 'Banking & Financial Services' },
  { match: /pharma|health|laborator/i, industry: 'Pharmaceuticals & Healthcare' },
  { match: /fmcg|retail|consumer|foods/i, industry: 'FMCG & Consumer Goods' },
  { match: /telecom|airtel|jio|network/i, industry: 'Telecommunications' },
  { match: /tech|software|systems|cloud/i, industry: 'Technology & Enterprise Software' },
];

/**
 * Extracts a clean company root domain from a hostname or reverse DNS string.
 * Example: 'corp-gw1.gateway.enterprise.com' -> 'enterprise.com'
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
    const localResult = {
      ip,
      domain: null,
      name: null,
      industry: 'Enterprise Channel Architecture',
      city: 'Local Workspace',
      country: 'Development',
      isp: 'Local Corporate Gateway',
      isCorporate: false,
      detectionMethod: 'local_environment',
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

      // Deduce industry from reverse DNS hostname
      for (const pattern of INDUSTRY_PATTERNS) {
        if (pattern.match.test(primaryHost)) {
          result.industry = pattern.industry;
          break;
        }
      }

      // If rootDomain looks like a corporate domain
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
          for (const pattern of INDUSTRY_PATTERNS) {
            if (pattern.match.test(orgString)) {
              result.industry = pattern.industry;
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
