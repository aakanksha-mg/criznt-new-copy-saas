import type { IconName } from '@/components/Icon';

export type Capability = { title: string; body: string };

export type PlatformModule = {
  slug: string;
  nav: string;
  name: string;
  eyebrow: string;
  icon: IconName;
  /** The one-line promise. Used on cards and as the page's meta description seed. */
  promise: string;
  /** The reality, stated before the fix — brand voice rule, guidelines s.02. */
  reality: string;
  /** What Crizant One does about it. */
  fix: string;
  capabilities: Capability[];
  /** Short, checkable outcomes. */
  outcomes: string[];
  /** Panel mock content for this module. */
  panel: { title: string; rows: [string, string, boolean?][]; foot: [string, string] };
  faqs: { q: string; a: string }[];
};

export const modules: PlatformModule[] = [
  {
    slug: 'scheme-builder',
    nav: 'Scheme Builder',
    name: 'Scheme Builder',
    eyebrow: 'Configure',
    icon: 'layers',
    promise:
      'Build and version a multi-tier incentive scheme in under four hours, without writing code or waiting for an IT release.',
    reality:
      'The bottleneck in commission systems is almost never the complexity of the logic. It is the translation. An operations lead who understands the scheme writes a specification. A developer who does not understand the scheme implements it. The gap between those two understandings is found in UAT, in production, or by a seller who was underpaid.',
    fix:
      'Crizant One hands the builder to the person who already knows the answer. Drag-and-drop tiers, multi-product hierarchies, simulation against real historical data before anything is committed, and a version on every change.',
    capabilities: [
      {
        title: 'No-code scheme construction',
        body: 'Slabs, tiers, growth-over-base, product mix, qualification gates, minimum guarantees, contests and overrides — composed visually, not specified in a document.',
      },
      {
        title: 'Simulate before you commit',
        body: 'Run a draft scheme against the last four cycles of real production data and read the payout distribution before it is live. Gaming behaviour at slab boundaries shows up here, not three months later.',
      },
      {
        title: 'Version control and effective dating',
        body: 'Every change is versioned, timestamped and effective-dated, so the scheme that was live on the day of a sale stays recoverable eighteen months on.',
      },
      {
        title: 'Multi-tier hierarchy logic',
        body: 'Dynamic splits onward to everyone above the seller — zonal, regional, branch, team lead — with the hierarchy as it stood on the transaction date, not as it stands today.',
      },
      {
        title: 'Clone, fork and re-cut',
        body: 'When a regulator or a market moves, clone the live scheme library, re-cut rates across every affected product and channel, simulate, and promote. Hours, not an IT release calendar.',
      },
    ],
    outcomes: [
      'The operations lead who designed the scheme is the one who configures it — there is no translation step, so nothing is lost in it.',
      'A regulatory compliance date and your configuration date become the same date.',
      'An auditor can see what ran, when, and under which version.',
    ],
    panel: {
      title: 'Scheme builder — draft v4',
      rows: [
        ['Scheme', 'Q3 Distributor Growth', false],
        ['Tiers', '4 slabs · growth over base', false],
        ['Simulated against', '4 cycles · 18,240 txns', false],
        ['Projected payout', '₹48.5 L', true],
        ['Variance vs budget', '+2.1%', false],
      ],
      foot: ['Version 4 · effective 01 Dec', 'Not yet promoted'],
    },
    faqs: [
      {
        q: 'How long does it take to configure a new incentive scheme in Crizant One?',
        a: 'A complex multi-tier scheme is typically configured, simulated against historical data and versioned in under four hours. The work is done by the operations lead who owns the scheme, in a visual builder, rather than specified to a development team and released on an IT calendar.',
      },
      {
        q: 'Can a scheme be tested before it goes live?',
        a: 'Yes. Any draft scheme can be simulated against real historical transaction data from previous cycles. The simulation returns the full payout distribution, cost against budget, and the sellers whose payouts change most — which is where gaming behaviour at slab boundaries becomes visible before the scheme is committed.',
      },
      {
        q: 'What happens to historical schemes when rates change?',
        a: 'Nothing is overwritten. Every scheme change is versioned, timestamped and effective-dated. A payout made eighteen months ago can be traced back to the exact scheme version and hierarchy that were live on the transaction date.',
      },
    ],
  },
  {
    slug: 'ai-intelligence',
    nav: 'AI Intelligence',
    name: 'AI Intelligence Layer',
    eyebrow: 'Compute & catch',
    icon: 'spark',
    promise:
      'Model every payout before the cycle closes, and flag what will not reconcile — the duplicate, the wrong tier, the override that should have stopped.',
    reality:
      'Leakage never arrives as a single visible event. It arrives as four thousand small ones, each individually too small to investigate, spread across a cycle nobody has time to audit line by line. And it is asymmetric: an underpayment generates a query within the week, while an overpayment generates silence. The errors that survive are the ones in your favour to never find.',
    fix:
      'Crizant One models the payout distribution for each cycle before it closes and flags what does not fit — the seller whose commission tripled without a matching change in production, the override still paying on a terminated hierarchy, the transaction counted under two schemes, the tier applied one level too high.',
    capabilities: [
      {
        title: 'Pre-close payout modelling',
        body: 'The cycle is computed and inspected before the payment file is generated. Finding leakage afterwards is forensics; preventing it is arithmetic you run on the Tuesday.',
      },
      {
        title: 'Anomaly detection with a reason',
        body: 'Each flag arrives with the comparison that produced it — this seller, this cycle, against this baseline — so it can be cleared or corrected by an operations analyst rather than escalated to a data team.',
      },
      {
        title: 'Duplicate and double-counting detection',
        body: 'The same production qualifying under a base scheme, a contest and a branch campaign is the single most common source of silent overpayment. It is caught structurally, not by sampling.',
      },
      {
        title: 'Predictive payout and accrual forecasting',
        body: 'Forecast the cycle cost mid-period, so a scheme that is running hot is known while there is still time to act on it, not after the file has gone out.',
      },
      {
        title: 'Performance and attrition signals',
        body: 'Sellers whose earnings pattern breaks are a retention signal before they are a payroll query. The same model that finds overpayment finds the seller about to leave.',
      },
    ],
    outcomes: [
      'Overpayments are caught before the payment file, where the cost of correction is zero.',
      'A cycle closes with a list of cleared exceptions, not an unexplained variance.',
      'The anomaly log is itself an audit artefact.',
    ],
    panel: {
      title: 'Cycle 11 · pre-close review',
      rows: [
        ['Transactions computed', '184,207', false],
        ['Exceptions raised', '36', false],
        ['Duplicate qualification', '11 · ₹4.1 L', true],
        ['Override on closed hierarchy', '7 · ₹88 K', true],
        ['Tier applied one level high', '4 · ₹32 K', true],
      ],
      foot: ['Pre-close · nothing paid yet', 'Blocked until cleared'],
    },
    faqs: [
      {
        q: 'How does Crizant One prevent commission leakage rather than report on it?',
        a: 'The payout for every cycle is computed and modelled before the payment file is generated. Anomalies — duplicate qualification, a tier applied one level too high, an override still paying on a terminated hierarchy, a clawback never recovered — are raised as exceptions that block the cycle until they are cleared. Correcting an error before payment costs nothing; finding it at year end costs the amount plus the audit conversation.',
      },
      {
        q: 'Why are overpayments harder to find than underpayments?',
        a: 'Leakage is asymmetric. An underpaid seller raises a query within the week, so underpayments are self-reporting. An overpayment generates no query from anyone, which is precisely why overpayments are the errors that survive a cycle. Detection has to be structural rather than complaint-driven.',
      },
      {
        q: 'What does the AI layer actually model?',
        a: 'The payout distribution for the cycle, each seller against their own baseline and their peer group, scheme cost against budget, and the structural checks — duplicate qualification across schemes, hierarchy validity on the transaction date, tier correctness, and clawback recovery status.',
      },
    ],
  },
  {
    slug: 'reconciliation',
    nav: 'Reconciliation & Payouts',
    name: 'Reconciliation & Payouts',
    eyebrow: 'Reconcile',
    icon: 'scale',
    promise:
      'Close one cycle across multiple principals, currencies and regulatory frameworks, with every payout traceable to the seller who earned it.',
    reality:
      'A business operating in three countries is not running one commission function. It is running three, and reconciling them by hand at the end. Different frameworks, different currencies, often different product taxonomies, frequently different systems because each market bought its own. Then the group wants a single view of distribution cost, and someone spends the first week of every month building it in a spreadsheet.',
    fix:
      'Crizant One holds them in one model: multiple currencies, multiple regulatory frameworks, multiple hierarchy structures, closing on the same cycle — with each payout still decomposable back to the market, the scheme version and the individual who earned it.',
    capabilities: [
      {
        title: 'Multi-principal reconciliation',
        body: 'For brokers and corporate agents carrying many insurers, or distributors carrying many brands: reconcile statements from every principal against your own computed entitlement, and work the difference rather than rebuilding the number.',
      },
      {
        title: 'Multi-currency, one close',
        body: 'Local currency at the seller, group currency at the consolidation, with the rate and date held against each line so the consolidated figure decomposes back to the markets that produced it.',
      },
      {
        title: 'Clawback and recovery tracking',
        body: 'A reversal is an event with a lifecycle, not a negative line. Cancellations, lapses, free-looks, returns, expiry and breakage are matched to the original payout and recovered or written off explicitly.',
      },
      {
        title: 'Accrual, provisioning and credit notes',
        body: 'Accrue as the cycle runs, provision for expected reversal, and tie a scheme-linked credit note back to the originating invoice where the tax treatment requires it.',
      },
      {
        title: 'Payout file and ledger integration',
        body: 'Approved cycles generate payment instructions and the matching ledger entries, with the approval chain recorded against the cycle.',
      },
    ],
    outcomes: [
      'The first week of the month stops being a spreadsheet exercise.',
      'A consolidated distribution-cost number that can be decomposed, not just reported.',
      'Reconciliation stops depending on which market wrote the business.',
    ],
    panel: {
      title: 'Close — November · group view',
      rows: [
        ['India · INR', '₹3.21 Cr · reconciled', false],
        ['UAE · AED', 'AED 1.84 M · reconciled', false],
        ['Indonesia · IDR', 'IDR 9.1 B · 2 open items', false],
        ['Group total', 'USD 1.26 M', true],
        ['Reversals provisioned', 'USD 41 K', false],
      ],
      foot: ['Single close · 3 frameworks', 'Awaiting 2 clearances'],
    },
    faqs: [
      {
        q: 'Can Crizant One reconcile commission across multiple insurers or principals?',
        a: 'Yes. Multi-principal reconciliation is a core function: statements from each insurer, brand or principal are reconciled against Crizant One’s own computed entitlement, and the difference is what the team works. This is the daily tax on brokers, corporate agents and multi-brand distributors, and it is the case the product was built around.',
      },
      {
        q: 'How does Crizant One handle multiple currencies?',
        a: 'Payouts are computed and paid in the seller’s local currency, and consolidated into the group currency with the rate and date held against each line. The consolidated distribution-cost figure therefore decomposes back to the market, the scheme and the seller that produced it, rather than being assembled in a spreadsheet at the end.',
      },
      {
        q: 'How are clawbacks and reversals handled?',
        a: 'A reversal is treated as an event with its own lifecycle, matched to the original payout. Cancellations, lapses, free-looks, product returns, expiry and breakage each have a recovery path, and the recovery is tracked to closure or to an explicit write-off — which is the step that is usually missing, and where leakage settles.',
      },
    ],
  },
  {
    slug: 'distribution-management',
    nav: 'Distribution Management',
    name: 'Distribution Management',
    eyebrow: 'Operate',
    icon: 'network',
    promise:
      'Run the channel itself: hierarchies, onboarding, territory, role-based access and the splits that follow a transaction up the tree.',
    reality:
      'The commission engine is only half the problem. The other half is that the hierarchy it computes against is a living thing — partners onboard and churn, territories get redrawn, a regional head moves, a distributor is suspended mid-cycle. When the hierarchy is maintained in a spreadsheet beside the system, the payout is computed against a structure that no longer exists.',
    fix:
      'Crizant One holds the channel as a first-class object, dated. Onboarding, hierarchy, territory and access are maintained in the same system that computes the payout, so the structure used for a transaction is the structure that was live on the transaction date.',
    capabilities: [
      {
        title: 'Multi-tier channel hierarchy',
        body: 'Organisation, regional, zonal, branch, team lead, seller — any depth, effective-dated, with history preserved through reorganisations.',
      },
      {
        title: 'Partner and seller onboarding',
        body: 'A workflow with document capture, verification status, registration identifiers where a regulator requires one, and an activation gate the commission engine respects.',
      },
      {
        title: 'Territory and role-based access',
        body: 'Mapping that determines both what a person is credited for and what they can see. A regional head sees their region; a seller sees themselves.',
      },
      {
        title: 'Dynamic split configuration',
        body: 'Who gets what when a transaction lands — override percentages, shared credit, cross-territory rules — configured once and applied against the dated hierarchy.',
      },
      {
        title: 'Live performance leaderboards',
        body: 'Ranked performance by tier, territory and scheme, from the same computed numbers that produce the payout. One number, not a separate reporting pipeline.',
      },
    ],
    outcomes: [
      'A payout computed against the hierarchy as it was, not as it is.',
      'An unregistered or suspended partner cannot be paid by accident.',
      'Leaderboards and payouts reconcile because they come from the same computation.',
    ],
    panel: {
      title: 'Channel · hierarchy as at 30 Nov',
      rows: [
        ['Active sellers', '12,847', false],
        ['Partners / distributors', '1,206', false],
        ['Hierarchy depth', '6 tiers', false],
        ['Onboarding in verification', '38', false],
        ['Suspended — payout blocked', '11', true],
      ],
      foot: ['Effective-dated structure', 'Synced 2 min ago'],
    },
    faqs: [
      {
        q: 'Does Crizant One manage the channel hierarchy or only the commission calculation?',
        a: 'Both. The hierarchy, partner onboarding, territory mapping and role-based access are held in the same system that computes the payout, and they are effective-dated. That matters because a payout has to be computed against the structure that was live on the transaction date, not the structure that exists at the time of the close.',
      },
      {
        q: 'What stops an unregistered or suspended partner from being paid?',
        a: 'Activation is a gate the commission engine respects. A partner whose verification is incomplete, whose registration has lapsed, or who has been suspended mid-cycle is blocked from payout, and the block appears as an exception on the cycle rather than as a silent payment.',
      },
    ],
  },
  {
    slug: 'last-mile',
    nav: 'Last Mile',
    name: 'The Last Mile',
    eyebrow: 'Deliver',
    icon: 'mobile',
    promise:
      'Every seller sees what they earned and how it was derived — in their language, on the phone they actually have, with no connection required.',
    reality:
      'A dashboard that needs a live connection fails exactly when it is opened: on a phone, between appointments, in a district where the signal drops. Twice is all it takes before the seller goes back to calling the branch. And a commission statement is a number, not a derivation — so when it looks wrong, the query goes to a back office that cannot show the working either.',
    fix:
      'Crizant One ships the last mile as a progressive web app: offline-first, voice-navigable, in 8+ languages including Indian regional languages and an Arabic-first RTL layout. Not a statement — the arithmetic, down to the rule that produced each line.',
    capabilities: [
      {
        title: 'Offline-first architecture',
        body: 'The app opens, renders and stays useful with no connection, then reconciles when one returns. Offline is not a degraded mode; it is the default assumption.',
      },
      {
        title: '8+ languages, including Indian regional',
        body: 'English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bahasa Indonesia and Arabic — with a right-to-left layout rather than a translated left-to-right one.',
      },
      {
        title: 'Voice-enabled navigation',
        body: 'For sellers who are faster speaking than typing, and for the ones for whom a dense dashboard is the barrier rather than the data.',
      },
      {
        title: 'Progressive web app — no install',
        body: 'No app store, no device policy, no update cycle. A link, added to the home screen, that works on the handset the seller already owns.',
      },
      {
        title: 'Derivation, not just a number',
        body: 'Each line opens into the scheme, the tier and the transaction that produced it — so a disputed figure is answerable by the seller, not escalated to a helpdesk.',
      },
    ],
    outcomes: [
      'A seller who can see what they earned does not call the branch — and does not start taking calls from a competitor.',
      'Payout queries fall because the answer is already in the seller’s hand.',
      'Payout transparency becomes retention infrastructure rather than a reporting feature.',
    ],
    panel: {
      title: 'Seller view · offline',
      rows: [
        ['This cycle', '₹2.84 L', true],
        ['Versus last month', '+12.4%', false],
        ['Pending confirmation', '₹18,400', false],
        ['Language', 'मराठी', false],
        ['Connection', 'Offline — cached 14:02', false],
      ],
      foot: ['Progressive web app', 'Syncs when online'],
    },
    faqs: [
      {
        q: 'Does the Crizant One seller app work without an internet connection?',
        a: 'Yes. The seller app is offline-first: it opens, renders and remains useful with no connection, and reconciles when one returns. This is deliberate rather than a fallback — a dashboard that requires connectivity fails at exactly the moment a field seller opens it, and two failures are enough to send them back to calling the branch.',
      },
      {
        q: 'Which languages does Crizant One support for field sellers?',
        a: 'Eight or more, including English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bahasa Indonesia and Arabic. Arabic is delivered as a right-to-left layout rather than a translated left-to-right one.',
      },
      {
        q: 'Do sellers need to install an app?',
        a: 'No. The last mile ships as a progressive web app, added to the home screen from a link. There is no app store listing, no device-management policy and no update cycle to push to the field.',
      },
    ],
  },
  {
    slug: 'compliance-audit',
    nav: 'Compliance & Audit',
    name: 'Compliance & Audit',
    eyebrow: 'Defend',
    icon: 'shield',
    promise:
      'Answer "this amount, to this person, on this date — show the working" eighteen months later, without a project.',
    reality:
      'At some point someone asks you to show how a specific payout was derived. An auditor. A regulator. A seller disputing a number. Occasionally a court. Answering requires more than the payout record: you need the scheme version live on the day of the sale, the hierarchy as it stood then, the splits paid onward, and the rule that produced each figure. Most systems can tell you what was paid. Far fewer can tell you why.',
    fix:
      'Crizant One keeps the record as the cycle runs rather than reconstructing it afterwards. Every scheme change versioned and timestamped, every payout traceable to the individual who earned it and the exact rule that produced it, with the regulatory frameworks for each market pre-built.',
    capabilities: [
      {
        title: 'Immutable audit trail',
        body: 'Who changed what, when, under which approval, and what the system computed before and after. Written as it happens, not assembled on request.',
      },
      {
        title: 'Point-in-time reconstruction',
        body: 'Re-run any historical cycle against the scheme version, hierarchy and rates that were live on the date, and get the same number you paid.',
      },
      {
        title: 'Pre-built regulatory frameworks',
        body: 'IRDAI, RBI and SEBI for India; CBUAE and Takaful structures for the Gulf; OJK for Indonesia — maintained as the rules change rather than configured per client.',
      },
      {
        title: 'Expense and spend ceilings',
        body: 'Track utilisation against a regulatory expense ceiling as the cycle runs, including the rewards, contests and channel support that sit inside the same limit as commission.',
      },
      {
        title: 'Seller-level attribution',
        body: 'Every transaction tagged to the selling individual, which is both a regulatory direction of travel and the only basis on which mis-selling and clawback can be administered fairly.',
      },
    ],
    outcomes: [
      'A payout you cannot explain is a payout you should not have made — and this is the system that lets you explain it.',
      'Annual cost audits stop being a project with a start date.',
      'Regulatory change becomes a configuration event rather than a release.',
    ],
    panel: {
      title: 'Audit · payout #D-1104-8822',
      rows: [
        ['Seller', 'Tagged · ID verified', false],
        ['Scheme version', 'v3 · live 01 Jul–30 Sep', true],
        ['Hierarchy as at', '14 Aug 2026', false],
        ['Rule applied', 'Slab 3 · +20% location loading', false],
        ['Recomputed today', 'Matches paid amount', true],
      ],
      foot: ['Point-in-time reconstruction', 'Immutable trail'],
    },
    faqs: [
      {
        q: 'Can Crizant One reconstruct how a payout from eighteen months ago was calculated?',
        a: 'Yes. Any historical cycle can be re-run against the scheme version, hierarchy and rates that were live on the transaction date, and it returns the amount that was actually paid. The record is written as the cycle runs rather than reconstructed on request — and a reconstructed number is one you cannot fully stand behind.',
      },
      {
        q: 'Which regulatory frameworks does Crizant One ship with?',
        a: 'IRDAI, RBI and SEBI frameworks for India; CBUAE requirements and Takaful commission structures with an Arabic-first RTL interface for the Gulf; and OJK compliance with a Bahasa Indonesia interface for Indonesia. These are maintained centrally as rules change, rather than configured client by client.',
      },
    ],
  },
];

export const moduleBySlug = (slug: string): PlatformModule | undefined =>
  modules.find((m) => m.slug === slug);
