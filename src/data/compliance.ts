export type Framework = {
  region: string;
  markets: string;
  built: string[];
  body: string;
  details: string[];
};

/**
 * Markets served and frameworks pre-built are two different claims and are kept
 * separate on purpose: claiming regulatory coverage you have not built is the
 * fastest way to lose a compliance audience.
 */
export const frameworks: Framework[] = [
  {
    region: 'India',
    markets: 'India',
    built: ['IRDAI', 'RBI', 'SEBI'],
    body:
      'Full alignment with insurance regulatory requirements, GST-aware commission structures, and lakh/crore currency formatting throughout the product and the seller app.',
    details: [
      'Commission structures expressed as a matrix — premium payment term band × channel × location loading — rather than a flat rate.',
      'Expense-of-management utilisation tracked as the cycle runs, including rewards, contests and channel support that sit inside the same ceiling.',
      'Clawback administration on lapse, free-look, cancellation and established mis-selling, with recovery tracked to closure.',
      'Every transaction tagged to the selling individual, which is the direction of regulatory travel and the only fair basis for clawback.',
      'Cost-audit readiness: point-in-time reconstruction of any historical cycle.',
    ],
  },
  {
    region: 'Middle East',
    markets: 'UAE and the wider Gulf',
    built: ['CBUAE', 'Takaful'],
    body:
      'Aligned to UAE Central Bank requirements, with Takaful commission structures and an Arabic-first interface built as a genuine right-to-left layout rather than a mirrored translation.',
    details: [
      'Takaful-specific commission and surplus-sharing structures held as first-class scheme types.',
      'Arabic-first RTL interface across the administrator console and the seller app.',
      'Multi-currency close with AED at the market and a group currency at consolidation.',
    ],
  },
  {
    region: 'South East Asia',
    markets: 'Indonesia, with wider SEA coverage',
    built: ['OJK'],
    body:
      'OJK regulatory compliance for Indonesian insurance, with a Bahasa Indonesia interface and local currency formatting.',
    details: [
      'OJK-aligned commission structures and reporting.',
      'Bahasa Indonesia across the seller app, including voice navigation.',
      'IDR formatting and local number conventions.',
    ],
  },
];

export const servedRegions: { name: string; note: string }[] = [
  { name: 'India', note: 'Largest base. IRDAI, RBI and SEBI frameworks pre-built.' },
  { name: 'Middle East', note: 'CBUAE and Takaful frameworks pre-built. Arabic-first RTL.' },
  { name: 'South East Asia', note: 'OJK framework pre-built. Bahasa Indonesia interface.' },
  { name: 'Australia', note: 'Developed market. The audit and defensibility case leads here.' },
  { name: 'Africa', note: 'Multi-currency and the last mile carry the same weight as in India.' },
  { name: 'South America', note: 'Multi-currency and multi-language are the entry points.' },
];
