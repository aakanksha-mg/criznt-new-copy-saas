/**
 * Every figure the site states, with its provenance attached.
 *
 * Evidence discipline (strategy v2, s.5): no number appears without a source,
 * and Crizant's own figures are labelled as Crizant's own. The regulatory
 * figures below are the ones verified line-by-line against the primary paper
 * (Recalibrating Economics of Insurance Distribution, Part 1, iib.gov.in/dr).
 */
export type Metric = {
  value: string;
  label: string;
  note: string;
  source: 'crizant' | 'primary' | 'range';
};

export const platformMetrics: Metric[] = [
  {
    value: '99.5%',
    label: 'Managed-services SLA',
    note: 'The uptime and cycle-close commitment Crizant contracts to on managed engagements.',
    source: 'crizant',
  },
  {
    value: '10 days',
    label: 'Typical go-live',
    note: 'From signed scope to a first production commission cycle on Crizant One.',
    source: 'crizant',
  },
  {
    value: '< 4 hrs',
    label: 'To configure a scheme',
    note: 'A multi-tier scheme built, simulated against historical data and versioned — without an IT release.',
    source: 'crizant',
  },
  {
    value: '8+',
    label: 'Languages at the last mile',
    note: 'Including Indian regional languages, with voice navigation and an Arabic-first RTL layout.',
    source: 'crizant',
  },
];

export const problemMetrics: Metric[] = [
  {
    value: '3–8%',
    label: 'Commission leakage per cycle',
    note: "Crizant's own range, observed across deployments. Calculation errors, duplicate payouts, schemes applied at the wrong tier, clawbacks never recovered, overrides that kept paying after the seller left.",
    source: 'crizant',
  },
  {
    value: '35%',
    label: 'Of finance-ops time',
    note: 'Spent on manual reconciliation rather than on decisions. A Crizant observation across engagements, not an industry survey.',
    source: 'crizant',
  },
  {
    value: '40%',
    label: 'Of seller attrition',
    note: 'Traces back to a late or disputed payout. A Crizant observation, and the reason payout transparency is retention infrastructure.',
    source: 'crizant',
  },
];

/** Verified against the primary IRDAI consultation paper, Part 1. */
export const regulatoryFacts: (Metric & { cite: string })[] = [
  {
    value: '32.1%',
    label: 'General insurer expense ratio, FY26',
    note: 'Above even its pre-2016 level, against a 25% requirement two years out.',
    source: 'primary',
    cite: 'Box 1, Graph 11',
  },
  {
    value: '25%',
    label: 'General EoM ceiling in two years',
    note: 'With a further step to 20% in five. FY2027-28 is Year 1, and a reduction is required every year.',
    source: 'primary',
    cite: 'Box 2.B(i)',
  },
  {
    value: '20% / 25%',
    label: 'Life first-year limit, IDE / agent',
    note: 'For a premium payment term of 10 years and above. It is a five-band grid by payment term, not a flat cap.',
    source: 'primary',
    cite: 'Commission grid, Part 1',
  },
  {
    value: '+20%',
    label: 'Rural location loading',
    note: 'Of the applicable first-year limit, for towns under 50,000 and all rural areas. +10% under 10 lakh population.',
    source: 'primary',
    cite: 'pp. 51 and 53',
  },
];

export const sourceLabel: Record<Metric['source'], string> = {
  crizant: 'Crizant deployment data',
  primary: 'IRDAI consultation paper, Part 1 (iib.gov.in/dr)',
  range: 'Observed range',
};
