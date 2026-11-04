/**
 * Single source of truth for everything that appears in more than one place:
 * naming, the canonical origin used by every absolute URL, and the contact
 * details.
 *
 * NAMING. `product` is Crizant One, the flagship, and it is what page titles
 * mean by "the product" unless they say otherwise. There are two more —
 * Crizant Sure (broking business management) and Crizant Shield (insurance
 * fraud risk) — defined in `data/products.ts` with their own pages. The
 * naming standard (09-naming-standard.md) predates them and still governs the
 * forms that must never appear: "Crizant Technologies" and "Crizant Pulse".
 * BimaFlow is the in-app workspace name on some Sure tenants and does not
 * appear on this site.
 */
export const site = {
  name: 'Crizant',
  legalName: 'Crizant Innovations Private Limited',
  product: 'Crizant One',
  origin: 'https://www.crizant.com',
  tagline: 'Building Intelligent Solutions. Delivering Real Impact.',
  positioning:
    'The commission and incentive operating system for channel-driven businesses.',
  /** For the header lockup, hidden below 1200px. Any longer and it wraps. */
  positioningShort: 'Intelligent Technology',
  shortPitch:
    'Crizant One configures, computes, reconciles and delivers commission and incentive payouts across multi-tier channels — in real time, in multiple currencies, traceable to the individual seller who earned it.',
  founded: '2024',
  email: 'sales.team@crizant.com',
  backedBy: 'EZYTEK Consulting',
  locale: 'en',
  twitter: '',
  linkedin: 'https://www.linkedin.com/company/crizant-innovations-private-limited/',
  regions: [
    'India',
    'Middle East',
    'South East Asia',
    'Australia',
    'Africa',
    'South America',
  ],
} as const;

export const url = (path: string): string =>
  `${site.origin}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

export type NavChild = { label: string; to: string; blurb?: string };
export type NavColumn = { heading: string; links: NavChild[] };
export type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
  /** Two-column panel. Used where one column would run past eight rows. */
  columns?: NavColumn[];
};

/**
 * Five items and one call to action.
 *
 * The bar previously carried seven nav items, two buttons and a white logo
 * card — ten decisions before a visitor has read a sentence. Everything that
 * is reference rather than consideration (the calculator, compliance, company)
 * moved inside a panel, and the one job of the bar is now: what is it, who is
 * it for, what does it cost, and one way to start.
 */
export const nav: NavItem[] = [
  {
    label: 'Products',
    to: '/products',
    columns: [
      {
        heading: 'The three systems',
        links: [
          {
            label: 'Crizant One',
            to: '/platform',
            blurb: 'Commission & incentive OS, for the principal paying a network.',
          },
          {
            label: 'Crizant Sure',
            to: '/products/crizant-sure',
            blurb: 'Broking business management, for the intermediary running one.',
          },
          {
            label: 'Crizant Shield',
            to: '/products/crizant-shield',
            blurb: 'Insurance fraud risk management and FRMU governance.',
          },
          {
            label: 'Compare all three',
            to: '/products',
            blurb: 'Who each one is for, and which you actually need.',
          },
        ],
      },
      {
        heading: 'Crizant One modules',
        links: [
          {
            label: 'Scheme Builder',
            to: '/platform/scheme-builder',
            blurb: 'No-code configuration. Complex schemes live in under four hours.',
          },
          {
            label: 'AI Intelligence',
            to: '/platform/ai-intelligence',
            blurb: 'Model the payout before the cycle closes.',
          },
          {
            label: 'Reconciliation & Payouts',
            to: '/platform/reconciliation',
            blurb: 'Multi-insurer, multi-currency reconciliation on one close.',
          },
          {
            label: 'Distribution Management',
            to: '/platform/distribution-management',
            blurb: 'Channel hierarchies, partner onboarding, dynamic splits.',
          },
          {
            label: 'Last Mile',
            to: '/platform/last-mile',
            blurb: 'Offline-first, voice-enabled, on the phone they already have.',
          },
          {
            label: 'Compliance & Audit',
            to: '/platform/compliance-audit',
            blurb: 'Every scheme versioned. Every payout traceable to a rule.',
          },
        ],
      },
      {
        heading: 'How it is built',
        links: [
          {
            label: 'Engineering',
            to: '/engineering',
            blurb: 'Six decisions in the data model that make a payout reproducible.',
          },
          {
            label: 'Integrations',
            to: '/integrations',
            blurb: 'A documented API, scheduled files, validation on every feed.',
          },
          {
            label: 'Implementation',
            to: '/implementation',
            blurb: 'What the ten days contain \u2014 and when they run longer.',
          },
          {
            label: 'Security & trust',
            to: '/security',
            blurb: 'Access, residency and how client data is handled.',
          },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    to: '/industries',
    children: [
      { label: 'FMCG', to: '/industries/fmcg', blurb: 'Trade schemes, distributor claims, credit notes.' },
      { label: 'Pharma', to: '/industries/pharma', blurb: 'MR incentives on primary against secondary offtake.' },
      { label: 'Real Estate', to: '/industries/real-estate', blurb: 'Channel-partner brokerage from booking to registration.' },
      { label: 'Insurance & BFSI', to: '/industries/insurance', blurb: 'Commission, EoM utilisation and clawback under IRDAI.' },
    ],
  },
  { label: 'Managed Services', to: '/managed-services' },
  { label: 'Pricing', to: '/pricing' },
  {
    label: 'Resources',
    to: '/resources',
    columns: [
      {
        heading: 'Learn',
        links: [
          { label: 'Insights', to: '/resources', blurb: 'Mechanism analysis, not vendor content.' },
          { label: 'Answers', to: '/answers', blurb: 'Direct answers to the questions buyers actually ask.' },
          { label: 'Glossary', to: '/glossary', blurb: 'The vocabulary of channel commission, defined properly.' },
          { label: 'Leakage calculator', to: '/leakage-calculator', blurb: 'Put a number on your own channel spend leakage.' },
          { label: 'Compare', to: '/compare', blurb: 'Against spreadsheets, an ERP module, or an ICM platform.' },
          { label: 'Global compliance', to: '/compliance', blurb: 'Pre-built frameworks, market by market.' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Case studies', to: '/case-studies', blurb: 'Six deployments, one glance each.' },
          { label: 'About Crizant', to: '/about', blurb: 'Why the company exists and who is behind it.' },
          { label: 'Proof', to: '/proof', blurb: 'How to check every claim on this site before you believe it.' },
          { label: 'Contact', to: '/contact', blurb: 'Book a thirty-minute session with an engineer.' },
        ],
      },
    ],
  },
];

export const footerNav: { heading: string; links: NavChild[] }[] = [
  {
    heading: 'Products',
    links: [
      { label: 'All three products', to: '/products' },
      { label: 'Crizant One overview', to: '/platform' },
      { label: 'Crizant Sure — broking', to: '/products/crizant-sure' },
      { label: 'Crizant Shield — fraud', to: '/products/crizant-shield' },
      { label: 'Scheme Builder', to: '/platform/scheme-builder' },
      { label: 'Multi-GL Reconciliation', to: '/platform/reconciliation' },
      { label: 'AI Intelligence', to: '/platform/ai-intelligence' },
      { label: 'Offline Seller App', to: '/platform/last-mile' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'FMCG & Consumer', to: '/industries/fmcg' },
      { label: 'Pharmaceuticals', to: '/industries/pharma' },
      { label: 'Real Estate', to: '/industries/real-estate' },
      { label: 'Insurance & BFSI', to: '/industries/insurance' },
      { label: 'All industries', to: '/industries' },
    ],
  },
  {
    heading: 'Engineering',
    links: [
      { label: 'Architecture & Principles', to: '/engineering' },
      { label: 'Bitemporal Time-Travel', to: '/engineering#bitemporal' },
      { label: 'Clawback State Machine', to: '/engineering#clawback-fsm' },
      { label: 'Fixed-Point AST Engine', to: '/engineering#ast-evaluator' },
      { label: 'Security & Trust', to: '/security' },
      { label: 'Enterprise Integrations', to: '/integrations' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Leakage Calculator', to: '/leakage-calculator' },
      { label: 'Customer Case Studies', to: '/case-studies' },
      { label: 'Seven Ways to Verify', to: '/proof' },
      { label: 'Mechanism Insights', to: '/resources' },
      { label: 'Direct Answers (AEO)', to: '/answers' },
      { label: 'Global Compliance', to: '/compliance' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Crizant', to: '/about' },
      { label: 'Leadership', to: '/about#leadership' },
      { label: 'Managed Services', to: '/managed-services' },
      { label: 'Pricing Commitments', to: '/pricing' },
      { label: 'Implementation', to: '/implementation' },
      { label: 'Book a Demo', to: '/contact' },
    ],
  },
];
