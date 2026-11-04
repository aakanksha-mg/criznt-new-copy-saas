/**
 * Comparisons.
 *
 * Three honest ones. No named competitor is disparaged with invented facts:
 * the ICM comparison is about a category of product rather than a vendor, and
 * it concedes what that category does better. A comparison page that loses
 * nothing is a comparison page nobody believes.
 */

export type CompareRow = { dim: string; crizant: string; other: string };

export type Comparison = {
  slug: string;
  nav: string;
  title: string;
  h1: string;
  accentH1: string;
  deck: string;
  /** Column header for the other side. */
  otherLabel: string;
  intro: string;
  rows: CompareRow[];
  /** What the other option genuinely does better. Not optional. */
  concede: { title: string; body: string };
  verdict: string;
  keywords: string[];
};

export const comparisons: Comparison[] = [
  {
    slug: 'spreadsheets',
    nav: 'vs spreadsheets',
    title: 'Crizant One vs Spreadsheets for Commission Management',
    h1: 'Spreadsheets do not fail at the arithmetic.',
    accentH1: 'They fail at the date.',
    deck:
      'The honest comparison is not against another vendor. For most companies in these industries it is against a spreadsheet library that works — maintained by people who have since left.',
    otherLabel: 'Spreadsheets',
    intro:
      'A spreadsheet computes commission correctly. That is not the problem and pretending otherwise insults the person who built it. The problem is that a spreadsheet stores one version of the truth: change the rate and every historical cycle computed from that sheet silently becomes unreproducible, and nothing records that it happened.',
    rows: [
      {
        dim: 'Computing this month’s cycle',
        crizant: 'Deterministic, partitioned, re-runnable',
        other: 'Works, and is usually correct',
      },
      {
        dim: 'Recomputing a cycle from two years ago',
        crizant: 'A query against dated inputs — returns the same number it returned then',
        other: 'The sheet has been edited since. The old answer is gone',
      },
      {
        dim: 'A scheme that changed mid-period',
        crizant: 'Both versions held with their dates; each transaction uses its own',
        other: 'A copy of the sheet, named with a date, in a folder',
      },
      {
        dim: 'A seller who moved territory retroactively',
        crizant: 'Effective-dated hierarchy resolves to the structure live on the transaction date',
        other: 'Manual correction, and the reason for it lives in an email',
      },
      {
        dim: 'Duplicate qualification across overlapping schemes',
        crizant: 'Detected structurally before the cycle is released',
        other: 'Found when a seller notices, or never',
      },
      {
        dim: 'Clawback tracked to recovery',
        crizant: 'Open until recovered or explicitly written off, with the trail',
        other: 'A column that ages until someone clears it',
      },
      {
        dim: 'What the seller can see',
        crizant: 'Their own payout, offline, with the rule behind each line',
        other: 'A PDF, or a call to the branch',
      },
      {
        dim: 'Audit question: what did you know on the day you paid?',
        crizant: 'Point-in-time reconstruction, with derivation',
        other: 'A forensic project with an uncertain outcome',
      },
      {
        dim: 'Who can answer a question about last March',
        crizant: 'Anyone with access',
        other: 'The person who built it, who has left',
      },
    ],
    concede: {
      title: 'What a spreadsheet does better',
      body: 'A spreadsheet changes in thirty seconds with no approval, no release and no configuration. For a brand-new scheme being tried for one quarter on forty sellers, that is genuinely the right tool, and an ICM platform would be slower and more annoying. The spreadsheet stops being right at the point where someone has to answer a question about a period that has closed — and that point arrives without announcing itself.',
    },
    verdict:
      'Spreadsheets are not wrong for commission. They are wrong for commission that has to be auditable, reproducible and visible to the person who earned it — which is every channel business past a few hundred sellers, and every regulated one at any size.',
    keywords: [
      'commission management spreadsheet alternative',
      'replace excel commission calculation',
      'commission calculation errors excel',
      'spreadsheet vs commission software',
    ],
  },
  {
    slug: 'erp-module',
    nav: 'vs an ERP module',
    title: 'Crizant One vs a Generic ERP Commission Module',
    h1: 'An ERP module is owned by the ERP.',
    accentH1: 'Including its release calendar.',
    deck:
      'The commission module in a general ERP is usually adequate for direct sales and structurally unsuited to a multi-tier channel — because a channel scheme is not a harder version of a sales commission, it is a different shape.',
    otherLabel: 'Generic ERP module',
    intro:
      'This is not an argument that ERPs are bad. It is an argument about where commission logic should live. In an ERP, a scheme change is a configuration change inside a system whose change control exists to protect the general ledger, which is correct for the ledger and wrong for a scheme that has to be re-cut in a week because it is being gamed.',
    rows: [
      {
        dim: 'Changing a live scheme',
        crizant: 'No-code, same day, versioned, simulated before it is applied',
        other: 'A change request inside the ERP’s release calendar',
      },
      {
        dim: 'Multi-tier channel splits',
        crizant: 'Native, effective-dated, to six tiers',
        other: 'Usually modelled as flat or two-tier; deeper structures become custom code',
      },
      {
        dim: 'Partners who are not employees',
        crizant: 'Distributors, brokers, stockists and sub-agents as first-class parties',
        other: 'Modelled against an employee or a vendor record, neither of which fits',
      },
      {
        dim: 'Scheme simulation before approval',
        crizant: 'Same engine as production, against real historical cycles',
        other: 'Rarely available; the budget conversation happens on a spreadsheet instead',
      },
      {
        dim: 'The seller’s own view',
        crizant: 'Offline-first app, 8+ languages, the derivation behind each line',
        other: 'An ERP self-service portal, online, in the ERP’s languages',
      },
      {
        dim: 'Pre-close exception review',
        crizant: 'A gate: a cycle with unreviewed exceptions cannot be paid',
        other: 'A report, run after the posting',
      },
      {
        dim: 'Regulatory frameworks for distribution',
        crizant: 'Pre-built and centrally maintained per market',
        other: 'Generic financial compliance; distribution rules are the client’s to configure',
      },
      {
        dim: 'Where the ledger posting happens',
        crizant: 'In your ERP — we post to it',
        other: 'In the ERP, which is the one thing it should own',
      },
    ],
    concede: {
      title: 'What the ERP module does better',
      body: 'It is already there, already paid for, and already inside your financial controls — and it needs no integration, because commission and the ledger are the same database. For a direct salesforce of employees on a stable plan, that is a decisive advantage and we would not argue with it. The case for a separate system starts where the channel goes past two tiers, the parties stop being employees, or the schemes start changing faster than the ERP’s release cycle.',
    },
    verdict:
      'Keep the ledger in the ERP. Move the scheme, the hierarchy, the computation and the seller’s view out of it — and post the result back. That division is what Crizant One is built for, which is why integrating with SAP, Oracle, Dynamics and NetSuite is a first-class feature rather than a concession.',
    keywords: [
      'ERP commission module alternative',
      'SAP commission management alternative',
      'best of breed incentive compensation vs ERP',
      'channel commission ERP limitations',
    ],
  },
  {
    slug: 'icm-platforms',
    nav: 'vs ICM platforms',
    title: 'Crizant One vs Generic ICM Platforms',
    h1: 'Most ICM platforms were built for a quota.',
    accentH1: 'A channel is not a quota.',
    deck:
      'The incentive compensation category grew up around the enterprise salesforce — employees, a quota, a CRM, a monthly attainment number. Channel businesses have none of those four things, and the mismatch shows up in the same three places every time.',
    otherLabel: 'Generic ICM platform',
    intro:
      'This comparison is about a category, not a vendor, and the good platforms in it are genuinely good at what they were built for. The question is whether what they were built for is what you have. If your sellers are employees with quotas against CRM opportunities, several of them will serve you better than we will. If your payout travels through distributors, stockists or brokers and reverses after the fact, the shape is different.',
    rows: [
      {
        dim: 'The unit being paid',
        crizant: 'A transaction that may reverse — a claim, a booking, a dispatch, a policy',
        other: 'A closed opportunity, treated as final',
      },
      {
        dim: 'Who gets paid',
        crizant: 'Employees and non-employee partners through six tiers',
        other: 'Employees on a plan, with partners bolted on',
      },
      {
        dim: 'Reversal handling',
        crizant: 'Clawback raised, tracked to recovery or explicit write-off',
        other: 'An adjustment in a later period',
      },
      {
        dim: 'Where the data comes from',
        crizant: 'Core transaction systems, DMS, stockist feeds, booking systems — API or file',
        other: 'CRM-first; non-CRM feeds are an integration project',
      },
      {
        dim: 'Field delivery',
        crizant: 'Offline-first PWA, 8+ languages with RTL, voice navigation',
        other: 'Web and mobile, online, in enterprise languages',
      },
      {
        dim: 'Regulatory frameworks',
        crizant: 'IRDAI, RBI, SEBI, CBUAE, Takaful, OJK — pre-built, centrally maintained',
        other: 'Compliance features; regional distribution regulation is configuration',
      },
      {
        dim: 'Operating model',
        crizant: 'Software, or software with the operation run on a 99.5% SLA',
        other: 'Software, with implementation partners',
      },
      {
        dim: 'Markets',
        crizant: 'India, Middle East, SEA, Australia, Africa, South America',
        other: 'Strongest in North America and Europe',
      },
    ],
    concede: {
      title: 'What a generic ICM platform does better',
      body: 'Quota and territory planning for a direct enterprise salesforce, deep native CRM integration, and the reporting a VP of Sales wants on attainment against plan. Those are mature, well-built capabilities and we are not pretending to match them. We also have less brand recognition and a shorter published customer list than the category leaders, and if that is the deciding factor then it decides.',
    },
    verdict:
      'If you are paying employees against quota, buy an ICM platform. If you are paying a channel on transactions that reverse, under schemes that change, in markets with their own distribution regulation, the shape of the problem is the one Crizant One was built around — and the parallel run against your last closed cycle is how to find out which of those you are.',
    keywords: [
      'ICM platform comparison',
      'channel incentive compensation software',
      'incentive compensation management alternatives',
      'commission software for distributors',
    ],
  },
];

export const comparisonBySlug = (slug: string): Comparison | undefined =>
  comparisons.find((c) => c.slug === slug);
