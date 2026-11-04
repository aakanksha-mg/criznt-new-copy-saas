import type { IconName } from '@/components/Icon';

/**
 * The Crizant product family.
 *
 * Three systems, three different buyers, one value chain: the principal who
 * pays a distribution network (Crizant One), the intermediary who runs one
 * (Crizant Sure), and the risk function that has to prove neither is being
 * defrauded (Crizant Shield). They are sold separately and run independently.
 *
 * EVIDENCE NOTE, and it governs this whole file. Sure and Shield are described
 * from their own running software: the module list, the detector anatomy, the
 * governance artefacts and the regulatory anchors are all observable in the
 * product. The rupee figures on their dashboards are NOT. Those are demo-tenant
 * data — a seeded workspace used to show the shape of the screen — and
 * publishing them as customer outcomes would be the single most damaging thing
 * this site could do. So no figure from either demo appears here as a result.
 * What appears instead is structure (how many detectors exist, what a detector
 * reads, when it fires) and regulation (Section 45, FMR-1), both of which a
 * reader can check. See `productEvidence` at the bottom.
 */

export type Product = {
  slug: string;
  name: string;
  nav: string;
  /** What kind of system this is, in the words a buyer would search for. */
  category: string;
  /** Who signs for it. Different for all three, which is the point. */
  audience: string;
  /** One sentence, complete on its own — it gets quoted out of context. */
  promise: string;
  icon: IconName;
  /** Where the detail lives. Crizant One keeps /platform, which predates this. */
  to: string;
  /** Position in the chain, used by the hub diagram. */
  chainRole: string;
};

export const products: Product[] = [
  {
    slug: 'crizant-one',
    name: 'Crizant One',
    nav: 'Crizant One',
    category: 'Commission and incentive operating system',
    audience: 'Insurers, banks, AMCs, FMCG and pharma principals who pay a distribution network',
    promise:
      'Crizant One is the commission and incentive operating system for channel-driven businesses: it configures a scheme, computes the payout, reconciles it and leaves an audit trail that ties every rupee back to the rule that produced it.',
    icon: 'layers',
    to: '/platform',
    chainRole: 'The principal who pays the network',
  },
  {
    slug: 'crizant-sure',
    name: 'Crizant Sure',
    nav: 'Crizant Sure',
    category: 'Broking business management system',
    audience: 'Composite brokers, corporate agents and distribution houses running their own book',
    promise:
      'Crizant Sure is a broking business management system that runs a composite intermediary end to end — lead, placement, policy, renewal, commission and books — across insurance, mutual funds and lending in one workspace.',
    icon: 'rocket',
    to: '/products/crizant-sure',
    chainRole: 'The intermediary who runs the network',
  },
  {
    slug: 'crizant-shield',
    name: 'Crizant Shield',
    nav: 'Crizant Shield',
    category: 'Fraud risk management and FRMU governance platform',
    audience: 'Life and health insurers — the FRMU, the CRO, compliance and internal audit',
    promise:
      'Crizant Shield is a fraud risk management platform for life and health insurers: it detects fraud across policyholder, distributor, employee and vendor, and runs the FRMU governance the regulator asks an insurer to evidence.',
    icon: 'shield',
    to: '/products/crizant-shield',
    chainRole: 'The risk function that polices both',
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/* ------------------------------------------------------- Crizant Sure ---- */

export type SureArea = { heading: string; icon: IconName; body: string; items: string[] };

/**
 * The workspace as it is actually organised. Taken from the running product,
 * not invented: these are its own section headings.
 */
export const sureAreas: SureArea[] = [
  {
    heading: 'Sales',
    icon: 'chart',
    body:
      'From first enquiry to a signed customer, with the pipeline, the diary and the expense claim attached to the same record rather than living in three tools.',
    items: [
      'Leads and pipeline, with stage and value',
      'Digital onboarding',
      'Communication hub',
      'Diary and scheduled meetings',
      'Expense capture against the opportunity',
    ],
  },
  {
    heading: 'Placement',
    icon: 'scale',
    body:
      'The part most CRMs leave out. An enquiry goes to several insurers, quotes come back in different shapes, and somebody has to make them comparable before a client can choose.',
    items: [
      'Enquiries raised to multiple insurers',
      'Quotations gathered against one enquiry',
      'Side-by-side quote comparison on sum insured and cover',
      'The chosen quote carried into the policy record',
    ],
  },
  {
    heading: 'Servicing',
    icon: 'umbrella',
    body:
      'Where a broking business is actually retained or lost. Renewals are dated, prioritised and worked from the same book they were sold into.',
    items: [
      'Policies, cover notes and stickers',
      'Renewals with days-to-expiry and likelihood to renew',
      'AI service copilot for policy questions',
      'Claims and endorsement servicing trail',
    ],
  },
  {
    heading: 'The composite book',
    icon: 'network',
    body:
      'A composite intermediary does not only sell insurance. The same relationship carries mutual funds and lending, each with its own principal, its own target and its own payout basis.',
    items: [
      'General and life insurance',
      'Mutual funds',
      'Loans and banking products',
      'One customer record across all three',
    ],
  },
  {
    heading: 'Money and targets',
    icon: 'wallet',
    body:
      'Commission earned, commission due, and the run-rate against every principal target — which for a composite house means insurers, banks and NBFCs, and fund houses separately.',
    items: [
      'Commission and brokerage tracking',
      'Target run-rate per principal, with the shortfall named',
      'Partner-by-partner contribution against plan',
      'Expenses and payouts',
    ],
  },
  {
    heading: 'Office and records',
    icon: 'box',
    body:
      'The document layer an inspection asks for, kept with the record it belongs to instead of in a shared drive.',
    items: ['Document management', 'Enterprise DMS', 'Notification centre and inbox'],
  },
];

/** What the AI in Sure actually does, stated as behaviour rather than adjective. */
export const sureIntelligence: { title: string; body: string }[] = [
  {
    title: 'Next best actions, ranked',
    body:
      'The work queue is ordered by urgency multiplied by premium at stake, so a renewal nine days from expiry on a large account sits above one that is twelve days out on a small one. The ranking is shown with its inputs — days to expiry, likelihood to renew, premium — rather than as a score on its own.',
  },
  {
    title: 'Likelihood to renew',
    body:
      'Each renewal carries a probability drawn from the book’s own history. It is there to order the queue, not to decide anything: a low score still appears, it simply appears lower.',
  },
  {
    title: 'Ask the workspace',
    body:
      'A command-bar copilot answers questions against the broker’s own data rather than a help article — which policies expire this month, what a client pays today, where a quote has got to.',
  },
  {
    title: 'Service copilot',
    body:
      'Policy wording and cover questions answered from the documents already on the record, so a servicing executive is not reading a PDF to a client on the phone.',
  },
];

/**
 * The sharpest thing Sure does, and the reason a composite house cannot use a
 * single-line CRM: three kinds of principal, each measuring a different thing.
 */
export const sureTargetModel = {
  title: 'Three kinds of principal, measured separately',
  body:
    'A composite intermediary carries insurers, banks and NBFCs, and fund houses at the same time. Each sets its own target, each pays on a different basis, and the aggregate tells you almost nothing — a house can be comfortably ahead overall and quietly losing its fund-house business. Crizant Sure keeps the run-rate per principal group and per individual partner, and states the shortfall rather than the achievement, because the shortfall is the number that still has something to be done about it.',
  groups: [
    { name: 'Insurers', body: 'Sourced premium against plan, by insurer, with brokerage earned shown separately from premium sourced.' },
    { name: 'Banks and NBFCs', body: 'Loan and banking volume against plan, where payout follows disbursal rather than sourcing.' },
    { name: 'Fund houses', body: 'Mutual fund AUM and net sales against plan, where trail accrues instead of settling once.' },
  ],
  note:
    'Sourced book and earned revenue are kept apart throughout. They move at different times and conflating them is how an intermediary discovers in Q4 that a good year on paper did not reach the bank.',
};

/* ----------------------------------------------------- Crizant Shield ---- */

export type FraudVector = {
  counterparty: string;
  icon: IconName;
  body: string;
  examples: string[];
};

/**
 * Four counterparties, which is the structural claim Shield makes: most fraud
 * tooling watches the policyholder and nothing else, and three of the four
 * ways money leaves an insurer involve somebody it employs or contracts.
 */
export const fraudVectors: FraudVector[] = [
  {
    counterparty: 'Policyholder',
    icon: 'eye',
    body:
      'Identity, non-disclosure and early claims. The decisive window is before issuance, because once a life policy passes three years Section 45 closes the insurer’s ability to call it in question on any ground at all.',
    examples: [
      'Synthetic identities built on a PAN or Aadhaar created weeks before a high-value proposal',
      'Stacking cover across several insurers so no single proposal looks large',
      'Material non-disclosure of medical or income history',
      'Early death claims against recently issued cover',
    ],
  },
  {
    counterparty: 'Distributor',
    icon: 'network',
    body:
      'The agency network. Commission-driven behaviour that is legal in each step and fraudulent in aggregate, which is why it needs pattern detection rather than a rule on one transaction.',
    examples: [
      'Twisting and churning — surrendering a policy to fund a new one for fresh commission',
      'Premium skimming and pass-through accounts',
      'Engineered lapsation',
      'Syndicate rings sharing nominees, addresses or payers across agents',
    ],
  },
  {
    counterparty: 'Employee',
    icon: 'lock',
    body:
      'Internal control. Mapped to the three lines of defence, because an insurer is asked to show not only that a control exists but who owns it, who checks it and who reports on it.',
    examples: [
      'Underwriting bypass and limit override',
      'Kickbacks on case allocation',
      'Employee and agent sharing an address or device',
      'Payroll and vendor-master integrity',
    ],
  },
  {
    counterparty: 'Vendor',
    icon: 'building',
    body:
      'The third-party ecosystem, which is where claims fraud is usually priced. An investigator who clears every case they touch is a control failure, not a productive vendor.',
    examples: [
      'Hospital and diagnostic billing inflation',
      'Investigator collusion and clean-chit patterns',
      'Blind dual-agency allocation to test an investigator against themselves',
      'Vendor concentration on high-value claims',
    ],
  },
];

/**
 * How a Shield detector is specified. This is the part worth publishing: a
 * detector that cannot be read by the person who owns the risk is not a
 * control, it is a black box with a dashboard.
 */
export const detectorAnatomy: { label: string; body: string }[] = [
  {
    label: 'What it reads',
    body:
      'The named fields and feeds, so the owner can tell whether the data exists before the detector is promised.',
  },
  {
    label: 'The rules, and what each counts',
    body:
      'Each condition carries a weight. The reader can see that a shared payer across three unrelated lives counts for more than an unrecorded reason for cover, and disagree with the weighting if they want to.',
  },
  {
    label: 'When it fires',
    body:
      'An explicit threshold — any single rule above a figure, or any two together above another. Not "when the model is confident".',
  },
  {
    label: 'What happens then',
    body:
      'The action, written as an instruction: hold the proposal, ask the proposer in writing, no explanation means no policy. A detection with no consequence attached is a metric, not a control.',
  },
  {
    label: 'What it found on backfill',
    body:
      'Every detector is run backwards over historical data before it is switched on, so the owner can see what it would have caught and how often it would have cried wolf. Real records, not projections.',
  },
  {
    label: 'Whether it is degraded, and why',
    body:
      'A detector that depends on a field the policy feed does not send runs at partial strength. Shield says so on the detector itself, names the missing field, and leaves the ask with IT rather than quietly absorbing it.',
  },
];

/** Governance artefacts Shield produces, each tied to what asks for it. */
export const shieldGovernance: { title: string; body: string; anchor: string }[] = [
  {
    title: 'Fraud Monitoring Committee',
    body:
      'Agenda, quorum, binding orders and dual sign-off on adjudicated matters, with the evidentiary findings attached to the order rather than mailed around it.',
    anchor: 'Board-level fraud governance',
  },
  {
    title: 'Three lines of defence, with RACI',
    body:
      'Every control carries an owner in the first line, a checker in the second and an assurer in the third. The matrix is the artefact an auditor asks for first.',
    anchor: '3LoD / RACI',
  },
  {
    title: 'Risk register and 5×5 heatmap',
    body:
      'Inherent and residual risk scored per register and plotted, so a committee discusses the extreme and high cells rather than a list.',
    anchor: 'COSO ERM',
  },
  {
    title: 'Continuous control monitoring',
    body:
      'Control health measured continuously rather than tested once a year, with defect items dated and owned.',
    anchor: 'CCM',
  },
  {
    title: 'Root cause and CAPA',
    body:
      'Each systemic failure tracked from diagnosis to verified fix and executive closure, which is what makes the loop closed rather than a findings list.',
    anchor: 'Closed-loop GRC',
  },
  {
    title: 'Statutory fraud return',
    body:
      'The periodic fraud monitoring return assembled from the matters already on the system, with its due date on the same screen as the matters it reports.',
    anchor: 'IRDAI FMR',
  },
];

/**
 * The two regulatory mechanics worth understanding, published because they are
 * checkable against the primary source rather than against Crizant.
 */
export const shieldMechanics: { title: string; body: string; cite: string }[] = [
  {
    title: 'Section 45 is a deadline, not a policy',
    body:
      'Section 45(1) of the Insurance Act 1938 says a life policy shall not be called in question on any ground whatsoever after three years from the later of issuance, commencement of risk, revival, or addition of a rider. Not misstatement, not fraud, not any ground — and there is no exception for fraud discovered afterwards. Within those three years, sub-section (2) does permit repudiation for fraud, but only on grounds communicated in writing to the insured. So detection on an in-force book is a dated queue rather than a backlog: a policy in its 28th month is still contestable, the same policy in its 37th is not. Shield ranks in-force policies by months remaining, so the survival audits that have to happen, happen while they still count for something.',
    cite: 'Insurance Act 1938, Section 45(1) and 45(2), as substituted by the Insurance Laws (Amendment) Act 2015, s.19',
  },
  {
    title: 'The cheapest fraud to stop is the one not yet issued',
    body:
      'Once a policy is issued, an insurer is arguing about a contract it has already written. Before issuance it is simply declining a proposal. Shield weights detection towards the proposal and KYC stage for that reason — identity age, insurable interest, who actually paid the first premium, cover stacked across insurers — and holds rather than rejects, so the proposer gets a written chance to explain.',
    cite: 'Product behaviour, observable in Crizant Shield',
  },
];

/* ------------------------------------------------------------ evidence ---- */

/**
 * Printed wherever Sure or Shield figures would otherwise sit. Written once so
 * the three pages cannot drift from each other.
 */
export const productEvidence =
  'Crizant Sure and Crizant Shield are described here from their own running software — the modules, the detector specifications, the governance artefacts and the regulatory anchors are all observable in the product, and a session will show you any of them. The rupee figures on the screenshots of either system are seeded demo data, not customer outcomes, and are deliberately not quoted on this site. Where you want a number you can rely on, ask for the parallel run.';

/** Structure, not outcomes. Each of these is a fact about the software. */
export const shieldScope: { value: string; label: string; note: string }[] = [
  { value: '4', label: 'Counterparties watched', note: 'Policyholder, distributor, employee, vendor' },
  { value: '22', label: 'Life fraud typologies mapped', note: 'Across five lifecycle stages' },
  { value: '20', label: 'Health fraud typologies mapped', note: 'Across seven lifecycle stages' },
  { value: '9', label: 'Enterprise roles', note: 'Each with its own permissions and sign-off rights' },
];
