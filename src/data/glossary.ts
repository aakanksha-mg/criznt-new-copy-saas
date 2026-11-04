/**
 * The glossary.
 *
 * Every definition's first sentence names its own subject and is complete on
 * its own — "A clawback is…", never "This is…" — because the thing most likely
 * to happen to a definition is that something quotes one sentence of it with
 * no surrounding page. The same strings feed the DefinedTerm schema, so the
 * two cannot drift.
 */

export type Term = {
  slug: string;
  term: string;
  aka?: string;
  /** Complete on its own. One sentence. */
  definition: string;
  detail: string;
  letter: string;
  tags: string[];
  related?: string[];
};

const t = (x: Omit<Term, 'letter'>): Term => ({ ...x, letter: x.term[0].toUpperCase() });

export const terms: Term[] = [
  t({
    slug: 'incentive-compensation-management',
    term: 'Incentive Compensation Management',
    aka: 'ICM',
    definition:
      'Incentive Compensation Management (ICM) is the practice of designing, calculating, reconciling and paying variable compensation — commission, incentive, bonus and channel schemes — for the people and partners who sell.',
    detail:
      'ICM is distinct from payroll, which pays a known fixed amount, and from sales performance management, which measures attainment. ICM owns the arithmetic between the two, and in a channel business it owns it across several tiers of people who do not work for you.',
    tags: ['Core'],
    related: ['commission-leakage', 'scheme', 'clawback'],
  }),
  t({
    slug: 'commission-leakage',
    term: 'Commission leakage',
    definition:
      'Commission leakage is the money paid out in commission or incentive that should not have been paid, and that is not recovered.',
    detail:
      'It is not one event. It arrives as thousands of small ones — a scheme applied one hierarchy tier too high, a transaction qualifying under two overlapping schemes, an override still paying on a terminated seller, a clawback raised and never collected. Each is individually too small to investigate, which is exactly why the total survives.',
    tags: ['Core'],
    related: ['clawback', 'duplicate-qualification', 'override'],
  }),
  t({
    slug: 'clawback',
    term: 'Clawback',
    aka: 'Recovery, chargeback',
    definition:
      'A clawback is the recovery of commission already paid, triggered when the underlying sale reverses — a policy lapses, a booking cancels, goods are returned, or stock expires.',
    detail:
      'Raising a clawback is the easy half. The half that leaks is recovery: a clawback raised against a seller who has since left, or against a future payout that never comes, sits on a report as an open item until somebody writes it off quietly. Tracking a clawback to recovery or to an explicit write-off is a different system behaviour from calculating one.',
    tags: ['Core', 'Insurance'],
    related: ['commission-leakage', 'free-look', 'reversal'],
  }),
  t({
    slug: 'reversal',
    term: 'The reversal problem',
    definition:
      'The reversal problem is the structural condition in channel-driven industries where a payout is made before anyone knows whether the sale will hold.',
    detail:
      'It is one mechanic across four industries: first-year insurance commission on a policy that may lapse, FMCG trade claims on secondary sales that may be returned, pharma incentive on primary dispatch that may expire in the stockist’s warehouse, and real-estate brokerage at booking on a unit that may never register. In each case the money has left and the certainty has not arrived.',
    tags: ['Core'],
    related: ['clawback', 'secondary-sales', 'booking-to-registration'],
  }),
  t({
    slug: 'scheme',
    term: 'Scheme',
    aka: 'Incentive plan, trade scheme, commission plan',
    definition:
      'A scheme is the set of rules that converts sales activity into an earned amount — the eligibility, the measure, the rate or slab, the period, and the conditions under which it reverses.',
    detail:
      'Schemes are the part of commission that changes constantly. A scheme that was correct in April is being gamed by August, and the question that decides whether a system is usable is not whether it can hold a complex scheme but how fast you can re-cut one when the market moves.',
    tags: ['Core'],
    related: ['scheme-versioning', 'slab', 'duplicate-qualification'],
  }),
  t({
    slug: 'scheme-versioning',
    term: 'Scheme versioning',
    definition:
      'Scheme versioning is holding every version of a scheme with the dates it was in force, so a transaction is always evaluated against the rules that applied on its own date.',
    detail:
      'Without it, a scheme change is destructive: amend the rate today and every historical payout computed from that scheme silently becomes unreproducible. Versioning is what makes a retroactive change a controlled recalculation with a visible delta rather than an unexplained adjustment in next month’s file.',
    tags: ['Core', 'Compliance'],
    related: ['effective-dating', 'point-in-time-reconstruction', 'scheme'],
  }),
  t({
    slug: 'effective-dating',
    term: 'Effective dating',
    aka: 'Bitemporal data',
    definition:
      'Effective dating is storing both what was true and when it was recorded, so a change made in August that took effect in July produces the correct answer either way you ask.',
    detail:
      'A seller who moved territory on 1 August, recorded on 14 August, gives two different correct answers depending on whether the question is "what did we pay" or "what should we have paid". A system that stores a single timeline cannot express the difference, which is why its corrections cannot be explained.',
    tags: ['Core', 'Compliance'],
    related: ['scheme-versioning', 'point-in-time-reconstruction'],
  }),
  t({
    slug: 'point-in-time-reconstruction',
    term: 'Point-in-time reconstruction',
    definition:
      'Point-in-time reconstruction is the ability to rebuild exactly how a payout was calculated on a given past date, using the scheme version, hierarchy and rates as they stood then.',
    detail:
      'This is the question an auditor or a regulator actually asks, and it is the one a spreadsheet library cannot answer two years later. Where the inputs are effective-dated and the computation is deterministic, the answer is a query; where they are not, it is a forensic project.',
    tags: ['Compliance'],
    related: ['effective-dating', 'audit-trail', 'scheme-versioning'],
  }),
  t({
    slug: 'audit-trail',
    term: 'Audit trail',
    definition:
      'An audit trail in commission is the immutable record of every scheme change, hierarchy change, computation, exception, approval and payment, with who made it and when.',
    detail:
      'The useful test of an audit trail is not whether it exists but whether it carries derivation: a line that says a payout was ₹4,312 is a log entry, and a line that says which rule, which slab, which hierarchy version and which transaction produced ₹4,312 is an audit trail.',
    tags: ['Compliance'],
    related: ['point-in-time-reconstruction', 'maker-checker'],
  }),
  t({
    slug: 'hierarchy',
    term: 'Channel hierarchy',
    definition:
      'A channel hierarchy is the multi-tier structure through which a sale travels and a payout is split — organisation, zone, region, distributor or branch, sub-agent, and the individual seller.',
    detail:
      'The hierarchy is the second input that decides a payout, and the one that changes most. Joins, exits, territory moves and promotions all reshape who earns from a transaction, so the structure has to be effective-dated for a payout to be reproducible.',
    tags: ['Core'],
    related: ['override', 'split', 'effective-dating'],
  }),
  t({
    slug: 'override',
    term: 'Override',
    aka: 'Overriding commission',
    definition:
      'An override is commission earned by a manager, distributor or upline partner on business written by someone below them in the hierarchy.',
    detail:
      'Overrides are a common leakage site because they depend on a relationship rather than on an action: when a seller leaves or moves, the override above them should stop or reassign, and in a system where the hierarchy is not effective-dated it frequently keeps paying.',
    tags: ['Core'],
    related: ['hierarchy', 'commission-leakage', 'split'],
  }),
  t({
    slug: 'split',
    term: 'Commission split',
    definition:
      'A commission split is the division of a single transaction’s commission between two or more parties — co-selling sellers, a referrer and a closer, or tiers of a channel.',
    detail:
      'Splits have to resolve against the hierarchy as it stood on the transaction date, and they have to sum to the intended total. A split that resolves against today’s structure for a transaction six months old is one of the ways a cycle quietly stops reconciling.',
    tags: ['Core'],
    related: ['hierarchy', 'override'],
  }),
  t({
    slug: 'slab',
    term: 'Slab',
    aka: 'Tier, band',
    definition:
      'A slab is a threshold band in a scheme where the rate changes once a volume, value or attainment level is crossed.',
    detail:
      'Slabs introduce two recurring errors: applying the higher rate to all volume rather than only to the incremental band when the scheme says otherwise, and crossing a slab retroactively when a late transaction lands in a closed period. Both are arithmetic that looks right until it is reconciled.',
    tags: ['Core'],
    related: ['scheme', 'duplicate-qualification'],
  }),
  t({
    slug: 'duplicate-qualification',
    term: 'Duplicate qualification',
    definition:
      'Duplicate qualification is a single transaction earning under two or more schemes that were not intended to pay on it together.',
    detail:
      'It is the most expensive kind of leakage because it scales with the number of live schemes rather than with transaction volume. Catching it needs the overlap between schemes to be detected structurally — by comparing scheme eligibility — rather than by sampling payouts and hoping.',
    tags: ['Core'],
    related: ['scheme', 'commission-leakage', 'pre-close-review'],
  }),
  t({
    slug: 'pre-close-review',
    term: 'Pre-close review',
    definition:
      'A pre-close review is the stage where a computed commission cycle is examined for exceptions while it is still provisional, before any money is released.',
    detail:
      'The distinction from a post-payout report is the whole point: an exception found before disbursement is a correction, and the same exception found afterwards is a clawback against someone who has already spent the money. Separating computation from disbursement with a gate between them is what makes the earlier version possible.',
    tags: ['Core'],
    related: ['anomaly-detection', 'clawback', 'maker-checker'],
  }),
  t({
    slug: 'anomaly-detection',
    term: 'Payout anomaly detection',
    definition:
      'Payout anomaly detection is the automated identification of commission lines that are unlikely to be correct — before the cycle is paid.',
    detail:
      'Useful checks are structural rather than statistical: a tier applied one level above the seller’s own, an override on a terminated hierarchy, a transaction qualifying twice, a payout outside the historical range for that seller and scheme, a clawback with no recovery path. An outlier is only interesting when it names the rule it probably violated.',
    tags: ['Core'],
    related: ['pre-close-review', 'duplicate-qualification'],
  }),
  t({
    slug: 'maker-checker',
    term: 'Maker-checker',
    aka: 'Four-eyes principle',
    definition:
      'Maker-checker is a control requiring that the person who creates or changes something is not the person who approves it.',
    detail:
      'In commission it applies to scheme changes, rate changes, hierarchy changes, manual adjustments and the release of a cycle. It is the control most often present in policy and absent in implementation, because the system allows one person to do both and nothing records that they did.',
    tags: ['Compliance'],
    related: ['audit-trail', 'pre-close-review'],
  }),
  t({
    slug: 'eom',
    term: 'Expense of Management',
    aka: 'EoM',
    definition:
      'Expense of Management (EoM) is the regulatory cap on an Indian insurer’s total expenses, including commission and distribution costs, expressed as a percentage of premium.',
    detail:
      'Under the IRDAI (Expenses of Management) Regulations, 2024, commission moved inside a single consolidated expense limit rather than sitting under its own separate cap. The consequence is that commission can no longer be managed independently of the rest of the expense base — the limit is shared, so a decision in distribution spends the same allowance as a decision in marketing.',
    tags: ['Insurance', 'Compliance'],
    related: ['irdai', 'commission-leakage'],
  }),
  t({
    slug: 'irdai',
    term: 'IRDAI',
    definition:
      'The IRDAI (Insurance Regulatory and Development Authority of India) is the statutory regulator of insurance in India, and the body that sets the Expense of Management limits governing insurance commission.',
    detail:
      'Crizant’s published analysis of the IRDAI expense framework is based on the regulator’s own consultation material, cited by paper and paragraph. Two figures were corrected during that work by reading the primary document, which is the reason the citations are on the page.',
    tags: ['Insurance', 'Compliance'],
    related: ['eom', 'free-look'],
  }),
  t({
    slug: 'free-look',
    term: 'Free-look period',
    definition:
      'A free-look period is the window after an insurance policy is issued during which the policyholder may cancel it and receive a refund, usually 15 to 30 days.',
    detail:
      'It is a guaranteed reversal window: commission is typically earned at issue and the policy can be undone inside the month. Any system that pays first-year commission without holding the free-look outcome against it is creating clawbacks by design.',
    tags: ['Insurance'],
    related: ['clawback', 'reversal', 'persistency'],
  }),
  t({
    slug: 'persistency',
    term: 'Persistency',
    definition:
      'Persistency is the proportion of insurance policies that remain in force after a given period, most often measured at 13, 25, 37, 49 and 61 months.',
    detail:
      'Persistency is where commission design meets commission recovery: a scheme that pays heavily at issue and measures the seller on persistency later is explicitly betting on a clawback process that works. Where it does not work, the persistency number and the payout file tell two different stories.',
    tags: ['Insurance'],
    related: ['clawback', 'free-look'],
  }),
  t({
    slug: 'secondary-sales',
    term: 'Secondary sales',
    definition:
      'Secondary sales are sales from a distributor or stockist onward to retailers or end customers, as distinct from primary sales, which are sales from the manufacturer into the channel.',
    detail:
      'Almost every FMCG and pharma incentive problem is this gap. Incentive is paid on primary dispatch because that is the data the manufacturer owns, while the scheme intends to reward secondary offtake, and the difference sits in the channel as stock that may be returned, expired or shifted between territories.',
    tags: ['FMCG', 'Pharma'],
    related: ['trade-spend', 'claim-settlement', 'reversal'],
  }),
  t({
    slug: 'trade-spend',
    term: 'Trade spend',
    definition:
      'Trade spend is the total a consumer-goods company pays its channel in discounts, trade schemes, display allowances and promotional claims, and is typically the largest cost line after cost of goods.',
    detail:
      'Trade spend is usually not known until the quarter closes, because it is the sum of claims that arrive late, against schemes that have since expired, from distributors whose own figures are the only source. That delay is the problem, not the amount.',
    tags: ['FMCG'],
    related: ['claim-settlement', 'secondary-sales', 'credit-note'],
  }),
  t({
    slug: 'claim-settlement',
    term: 'Claim settlement',
    definition:
      'Claim settlement in a trade channel is the process of validating a distributor’s claim against a scheme and issuing the credit or payment it earns.',
    detail:
      'Three things leak here: the same claim raised twice through different routes, a claim raised against a scheme that had already expired, and a claim whose supporting secondary-sales figure is the distributor’s own unverified number. Validating a claim against the scheme version live on the claim date removes the second of those entirely.',
    tags: ['FMCG'],
    related: ['trade-spend', 'credit-note', 'duplicate-qualification'],
  }),
  t({
    slug: 'credit-note',
    term: 'Credit note',
    definition:
      'A credit note is the accounting document that reduces an amount a customer owes, and is the usual instrument for settling a trade scheme claim in markets with GST or VAT.',
    detail:
      'A scheme-linked credit note has to tie back to the original invoice to be treated correctly for tax, which makes the commission system and the tax position the same problem. A claim settled as a cash payment where the market expects a credit note creates an exposure that surfaces at assessment, not at payout.',
    tags: ['FMCG', 'Compliance'],
    related: ['claim-settlement', 'trade-spend'],
  }),
  t({
    slug: 'booking-to-registration',
    term: 'Booking-to-registration',
    definition:
      'Booking-to-registration is the period in real estate between a buyer reserving a unit and the sale being legally registered, during which the booking may still cancel.',
    detail:
      'Channel-partner brokerage is usually paid at or near booking, and a cancellation in month four recovers against a partner who has already been paid and may have no further pipeline. The second failure in the same window is two partners claiming the same buyer, which only the booking record can settle.',
    tags: ['Real estate'],
    related: ['reversal', 'clawback'],
  }),
  t({
    slug: 'offline-first',
    term: 'Offline-first',
    definition:
      'Offline-first describes an application that holds its own data locally and works with no network connection, synchronising when one returns — as opposed to offline-capable, which caches a connected application.',
    detail:
      'The distinction decides whether a field seller can open their payout at all. A connected dashboard fails precisely when it is used — on a phone, between appointments, where the signal drops — and it only has to fail twice before the seller goes back to calling the branch.',
    tags: ['Core'],
    related: ['hierarchy'],
  }),
  t({
    slug: 'managed-services',
    term: 'Managed services (commission operations)',
    definition:
      'Managed commission services are the outsourcing of the commission operation itself — scheme configuration, data operations, cycle close, exception handling and the seller helpdesk — to the platform provider, usually under a service-level agreement.',
    detail:
      'The reason it exists is that a platform removes the arithmetic and leaves a team: scheme design that tracks the market, feeds from core systems that change without notice, a cycle that has to close on time every time, and thousands of sellers each with one question about their own money.',
    tags: ['Core'],
    related: ['pre-close-review'],
  }),
  t({
    slug: 'fraud-risk-management-unit',
    term: 'Fraud Risk Management Unit',
    aka: 'FRMU',
    definition:
      'A Fraud Risk Management Unit (FRMU) is the function inside an insurer that owns fraud: a board-approved anti-fraud policy, a committee that meets and issues binding decisions, a control framework across underwriting, claims and distribution, and a periodic return to the regulator.',
    detail:
      'The distinction worth holding is between detection and the unit. Detection finds a suspicious case; the unit is what makes the finding consequential — an owner, a dual-signed decision, a corrective action with a date, and an audit trail showing the decision was taken by someone entitled to take it. An insurer that has analytics but no unit has a dashboard, not a defence.',
    tags: ['Insurance', 'Compliance'],
    related: ['section-45', 'three-lines-of-defence', 'early-claim'],
  }),
  t({
    slug: 'section-45',
    term: 'Section 45 contestability',
    aka: 'the three-year bar',
    definition:
      'Section 45 contestability is the three-year window during which an Indian life insurer may still call a policy into question; under Section 45(1) of the Insurance Act 1938, after three years from the later of issuance, commencement of risk, revival or addition of a rider, a policy cannot be questioned on any ground whatsoever.',
    detail:
      'Within the window, sub-section (2) allows repudiation for fraud, but only on grounds communicated to the insured in writing. After it, there is no exception — not for fraud discovered later, not for deliberate misstatement. The practical consequence is that fraud work on an in-force book is a dated queue rather than a backlog: a policy in its 28th month is still contestable and the same policy in its 37th is not, so investigation has to be scheduled against the bar rather than against convenience.',
    tags: ['Insurance', 'Compliance'],
    related: ['fraud-risk-management-unit', 'early-claim'],
  }),
  t({
    slug: 'early-claim',
    term: 'Early claim',
    definition:
      'An early claim is a claim made shortly after a policy is issued — in life insurance, typically within the first two or three years — and it is treated as a fraud indicator because the time between buying cover and claiming on it is the clearest signal that the risk was already known.',
    detail:
      'Early claims are where several problems meet: non-disclosure of a condition that already existed, a policy bought on behalf of someone already dying, and distribution that did not verify what it sold. Because the Section 45 bar closes at three years, an early claim is also the last reliable opportunity to contest the contract at all.',
    tags: ['Insurance'],
    related: ['section-45', 'fraud-risk-management-unit'],
  }),
  t({
    slug: 'twisting-and-churning',
    term: 'Twisting and churning',
    definition:
      'Twisting and churning are distribution malpractices in which an existing policy is replaced or surrendered to fund a new one, so that the intermediary earns fresh first-year commission on money that was already insured.',
    detail:
      'Twisting is persuading a customer to replace a policy with another insurer; churning does the same inside one insurer\u2019s book. Neither step looks wrong on its own — a surrender is legitimate, a new proposal is legitimate — which is why they are detected as a pattern across records rather than as a rule on a transaction. The customer usually loses: a fresh policy restarts the Section 45 clock, restarts the surrender penalty and resets acquisition costs.',
    tags: ['Insurance'],
    related: ['clawback', 'fraud-risk-management-unit', 'section-45'],
  }),
  t({
    slug: 'three-lines-of-defence',
    term: 'Three lines of defence',
    aka: '3LoD',
    definition:
      'Three lines of defence is the control model in which the business that owns a risk manages it, a separate risk and compliance function oversees it, and internal audit independently assures both.',
    detail:
      'It matters to fraud work because a control with no named owner in each line is not auditable. The question an auditor asks is not whether a control exists but who runs it, who checks that it ran, and who verifies the checker — which is why the RACI matrix behind the model is usually the first artefact requested and the last one anybody has ready.',
    tags: ['Compliance'],
    related: ['fraud-risk-management-unit', 'continuous-control-monitoring'],
  }),
  t({
    slug: 'continuous-control-monitoring',
    term: 'Continuous control monitoring',
    aka: 'CCM',
    definition:
      'Continuous control monitoring (CCM) is the practice of testing whether a control is working all the time, from the system\u2019s own data, rather than sampling it during a periodic audit.',
    detail:
      'The difference is what happens between tests. An annual sample tells you a control worked on forty cases in March; continuous monitoring tells you it stopped working on the eleventh of June. For fraud controls that matters disproportionately, because the gap between a control failing and somebody noticing is exactly the window a fraud operates in.',
    tags: ['Compliance'],
    related: ['three-lines-of-defence', 'capa'],
  }),
  t({
    slug: 'capa',
    term: 'Corrective and preventive action',
    aka: 'CAPA',
    definition:
      'Corrective and preventive action (CAPA) is the discipline of tracking each systemic failure from root-cause diagnosis through a verified fix to formal closure, so that the same failure does not recur.',
    detail:
      'CAPA is what makes governance a loop rather than a list. A findings register records that something went wrong; CAPA records what was changed because of it, who verified the change worked, and who signed that the matter is closed. Without the verification step a CAPA tracker becomes a second findings register with optimistic dates.',
    tags: ['Compliance'],
    related: ['continuous-control-monitoring', 'fraud-risk-management-unit'],
  }),
  t({
    slug: 'composite-broker',
    term: 'Composite broker',
    definition:
      'A composite broker is an intermediary licensed to place more than one class of business — commonly general and life insurance together, and in a wider distribution house also mutual funds and lending products.',
    detail:
      'The operational consequence is that one customer relationship spans several principals with incompatible measures: an insurer counts sourced premium, a bank counts disbursal, a fund house counts net sales and accruing trail. Aggregating them produces a number that cannot be acted on, which is why a composite house has to hold the run-rate per principal and not only in total.',
    tags: ['Insurance', 'Core'],
    related: ['scheme', 'managed-commission-services'],
  }),
];

export const termBySlug = (slug: string): Term | undefined =>
  terms.find((x) => x.slug === slug);

export const glossaryTags = ['Core', 'Compliance', 'Insurance', 'FMCG', 'Pharma', 'Real estate'];
