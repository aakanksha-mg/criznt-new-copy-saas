export const managedSteps: { title: string; body: string }[] = [
  {
    title: 'Scheme configuration',
    body:
      'We design and configure your incentive schemes, validated against your own historical data before anything is promoted to production.',
  },
  {
    title: 'Data operations',
    body:
      'Automated ingestion and validation from your core systems — no manual uploads. A feed that arrives late, short or malformed raises an exception against the cycle rather than quietly producing a smaller payout run.',
  },
  {
    title: 'Cycle processing',
    body:
      'Every cycle computed, reviewed for anomalies before close, and reconciled before payment. The pre-close exception list is cleared with your team, not around it.',
  },
  {
    title: 'Seller helpdesk',
    body:
      'A dedicated team resolving seller, RM and distributor queries. This is the single largest volume of unplanned work in a commission function, and it comes off your team entirely.',
  },
  {
    title: 'Compliance upkeep',
    body:
      'Scheme logic and audit trails kept aligned with regulatory change as it happens, with the reconstruction capability an annual cost audit requires.',
  },
];

export const inHouseVsManaged: {
  heading: string;
  tone: 'problem' | 'crizant' | 'value';
  points: string[];
}[] = [
  {
    heading: 'Today, in-house',
    tone: 'problem',
    points: [
      'A third or more of finance-ops time goes to manual reconciliation',
      'Leakage from calculation errors, duplicate qualification and unrecovered clawbacks',
      'Scheme changes wait on an IT release calendar — weeks, sometimes months',
      'The helpdesk load is absorbed by people with other jobs',
      'Compliance upkeep happens when something forces it',
    ],
  },
  {
    heading: 'Crizant managed services',
    tone: 'crizant',
    points: [
      'Full lifecycle: configuration, processing, reconciliation and helpdesk',
      '99.5% SLA, with anomaly review before every close',
      'Go-live typically in ten days, with a parallel run against your last cycle',
      'Seller and distributor queries resolved by a dedicated team',
      'Audit-ready at all times, not at year end',
    ],
  },
  {
    heading: 'What it frees',
    tone: 'value',
    points: [
      'Finance and operations capacity redeployed to decisions',
      'Predictable subscription cost instead of hidden headcount',
      'Leakage and attrition addressed at source rather than reported on',
      'Scheme strategy owned by you, with the operation off your plate',
      'The platform, the data and the decisions stay yours',
    ],
  },
];

export const comparison: {
  feature: string;
  crizant: string;
  manual: string;
  erp: string;
}[] = [
  { feature: 'Time to configure a new scheme', crizant: 'Under 4 hours', manual: '2–4 weeks', erp: '3–6 months' },
  { feature: 'Pre-close anomaly detection', crizant: 'Standing step on every cycle', manual: 'None', erp: 'Basic reporting' },
  { feature: 'Scheme simulation on real data', crizant: 'Before every promotion', manual: 'Manual, partial', erp: 'Rarely available' },
  { feature: 'Seller-facing derivation', crizant: '8+ languages, offline, voice', manual: 'A statement by email', erp: 'Portal, online only' },
  { feature: 'Point-in-time reconstruction', crizant: 'Native — re-run any cycle', manual: 'Reconstruct by hand', erp: 'Partial' },
  { feature: 'Multi-currency, multi-framework close', crizant: 'One close', manual: 'Separate, merged in a spreadsheet', erp: 'Per-instance' },
  { feature: 'Regulatory framework updates', crizant: 'Maintained centrally', manual: 'Manual rework', erp: 'Project per change' },
  { feature: 'Operating model', crizant: 'SaaS, or fully managed on SLA', manual: 'Hidden headcount cost', erp: 'High licence + SI cost' },
];
