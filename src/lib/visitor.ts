import { useState, useEffect } from 'react';

export interface CompanyProfile {
  companyDomain: string | null;
  companyName: string | null;
  city?: string | null;
  country?: string | null;
  isp?: string | null;
  isCorporate: boolean;
  method?: string;
}

const VISITOR_ID_KEY = 'crizant_vid';
const COMPANY_CACHE_KEY = 'crizant_comp';

const FORBIDDEN_NAMES = /hdfc|icici|state bank of india|sbi|axis bank|kotak|bajaj|tata aig/i;

function sanitizeProfile(profile: CompanyProfile | null): CompanyProfile | null {
  if (!profile) return null;
  if (
    (profile.companyName && FORBIDDEN_NAMES.test(profile.companyName)) ||
    (profile.companyDomain && /hdfc|icici|sbi|axisbank|kotak/i.test(profile.companyDomain))
  ) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(COMPANY_CACHE_KEY);
    }
    return null;
  }
  return profile;
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return 'ssr_visitor';
  let vid = localStorage.getItem(VISITOR_ID_KEY);
  if (!vid) {
    vid = `vis_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(VISITOR_ID_KEY, vid);
  }
  return vid;
}

/**
 * Identifies the visitor's company from their network / IP domain
 */
export async function identifyVisitor(path = '/'): Promise<CompanyProfile | null> {
  if (typeof window === 'undefined') return null;

  try {
    const vid = getVisitorId();
    const referrer = document.referrer || '';

    // Check for simulation in query param (e.g. ?simulate_domain=tatamotors.com)
    const urlParams = new URLSearchParams(window.location.search);
    const simDomain = urlParams.get('simulate_domain');
    const simCompany = urlParams.get('simulate_company');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (simDomain) headers['X-Company-Domain'] = simDomain;
    if (simCompany) headers['X-Company-Name'] = simCompany;

    const res = await fetch('/api/identify', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        visitorId: vid,
        path,
        referrer,
        overrideDomain: simDomain,
        overrideName: simCompany,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.identified) {
        const sanitized = sanitizeProfile(data.identified);
        if (sanitized) {
          localStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify(sanitized));
          return sanitized;
        } else {
          localStorage.removeItem(COMPANY_CACHE_KEY);
          return null;
        }
      }
    }
  } catch (err) {
    console.debug('[Identify] Network identification skipped:', err);
  }

  // Fallback to cached company if network request fails
  try {
    const cached = localStorage.getItem(COMPANY_CACHE_KEY);
    if (cached) {
      return sanitizeProfile(JSON.parse(cached));
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Hook to get current identified company
 */
export function useCompanyIdentification() {
  const [company, setCompany] = useState<CompanyProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(COMPANY_CACHE_KEY);
      return cached ? sanitizeProfile(JSON.parse(cached)) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    identifyVisitor(window.location.pathname).then((profile) => {
      if (mounted && profile) {
        setCompany(profile);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { company, loading, setCompany };
}

/**
 * Sends a detailed channel composition and leakage calculation to the backend
 */
export async function trackCalculationLead(data: {
  currency: string;
  annualSpend: number;
  annualSpendFormatted: string;
  distributorsCount: number;
  employeesCount: number;
  brokersCount: number;
  banksCount: number;
  tiers: number;
  schemes: number;
  manual: boolean;
  leakagePct: number;
  annualLeakage: number;
  annualLeakageFormatted: string;
  companyDomain?: string | null;
  companyName?: string | null;
  contactEmail?: string | null;
  channelBreakdown?: Record<string, number>;
  rootCauseBreakdown?: Record<string, number>;
}) {
  if (typeof window === 'undefined') return { ok: false };

  try {
    const vid = getVisitorId();
    const res = await fetch('/api/calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        visitorId: vid,
      }),
    });
    return await res.json();
  } catch (err) {
    console.error('[Tracker] Failed to record calculation:', err);
    return { ok: false };
  }
}
