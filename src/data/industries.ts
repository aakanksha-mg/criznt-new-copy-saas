import type { IconName } from '@/components/Icon';

export type Industry = {
  slug: string;
  nav: string;
  name: string;
  icon: IconName;
  /** What you pay on. */
  payOn: string;
  /** How it reverses — the named mechanic (strategy v2, s.1). */
  reverses: string;
  promise: string;
  reality: string;
  fix: string;
  /** The buyers. */
  buyers: { role: string; owns: string }[];
  /** Their words, verbatim from the ICP work. */
  quote: string;
  quoteWho: string;
  capabilities: { title: string; body: string }[];
  compliance: { name: string; body: string }[];
  faqs: { q: string; a: string }[];
  geo: string;
};

export const industries: Industry[] = [
  {
    slug: 'fmcg',
    nav: 'FMCG',
    name: 'FMCG & Consumer Goods',
    icon: 'box',
    payOn: 'Distributor claims against a trade scheme',
    reverses:
      'Secondary sales were inflated, goods came back, the claim was raised twice, and the scheme had already expired',
    promise:
      'Trade spend that reconciles to secondary sales, claim to credit note, before the quarter closes.',
    reality:
      'Trade spend is usually the second-largest line after cost of goods, and it is the one nobody can price until the quarter has closed. The claim a distributor raises is not the sale: it is a document about a sale, submitted after the fact, against a scheme that may since have changed. Validate it against primary dispatch and you have validated the wrong number.',
    fix:
      'Crizant One computes the entitlement from secondary sales data, matches every distributor claim against it, catches the duplicate and the expired-scheme claim before settlement, and ties the credit note back to the originating invoice.',
    buyers: [
      { role: 'Head of Sales / National Sales Manager', owns: 'Owns the scheme and owns the number' },
      { role: 'Head of Trade Marketing', owns: 'Owns trade spend — the second-largest line after COGS' },
      { role: 'Commercial Finance / Controller', owns: 'Owns the claim-to-credit-note cycle' },
    ],
    quote: 'We don’t know our real trade spend until the quarter closes.',
    quoteWho: 'Head of Trade Marketing, national FMCG',
    capabilities: [
      {
        title: 'Entitlement computed from secondary, not primary',
        body: 'The scheme is evaluated against secondary sales and stock movement, so the claim is checked against what actually sold through rather than what was dispatched.',
      },
      {
        title: 'Claim matching and duplicate detection',
        body: 'Every distributor claim is matched to a computed entitlement, a scheme version and a period. The same claim submitted twice, or against a scheme that had expired, is caught before settlement.',
      },
      {
        title: 'Scheme library across brand, pack and geography',
        body: 'Display schemes, slab schemes, QPS, launch support, retailer-level promotions and channel-specific rates, versioned, with simulation before rollout.',
      },
      {
        title: 'Credit-note tie-back',
        body: 'A scheme-linked credit note is generated against the originating invoice, with the trail the tax treatment requires.',
      },
      {
        title: 'Live trade-spend visibility',
        body: 'Accrued and committed trade spend by brand, geography and scheme, as the quarter runs — so a scheme running hot is known while something can still be done about it.',
      },
    ],
    compliance: [
      {
        name: 'GST credit notes',
        body: 'A scheme-linked credit note needs to tie to the original invoice. Crizant One holds that link as the claim settles rather than assembling it at audit.',
      },
      {
        name: 'Distributor agreements',
        body: 'Scheme terms, eligibility and expiry dates are held as configuration, so what was promised and what was paid are the same record.',
      },
    ],
    faqs: [
      {
        q: 'How does Crizant One stop duplicate distributor claims in FMCG trade schemes?',
        a: 'Each claim is matched against a computed entitlement derived from secondary sales, for a specific scheme version and period. A claim already settled for that period, or raised against a scheme that had expired, is flagged as an exception before settlement rather than discovered during a quarterly reconciliation.',
      },
      {
        q: 'Can trade spend be tracked before the quarter closes?',
        a: 'Yes. Accrued and committed trade spend is visible by brand, geography, channel and scheme as the quarter runs, computed from the same engine that will settle the claims. The point is to know that a scheme is running hot while there is still time to act on it.',
      },
      {
        q: 'Does Crizant One work from secondary sales data?',
        a: 'Yes, and that is the design intent. Validating a trade claim against primary dispatch validates the wrong number, because the reversal — returns, inflated secondary, stock shifted between territories — happens after dispatch. Entitlement is computed from sell-through.',
      },
    ],
    geo: 'India, South East Asia, Middle East and Africa',
  },
  {
    slug: 'pharma',
    nav: 'Pharma',
    name: 'Pharmaceuticals',
    icon: 'flask',
    payOn: 'MR incentive on stockist offtake',
    reverses:
      'It was paid on primary dispatch and came back as expiry or breakage, or the stock was shifted between territories',
    promise:
      'Field incentives computed on secondary offtake, with territory integrity and a record that stands up to a marketing-practices audit.',
    reality:
      'Field incentive is paid on primary dispatch because primary is the number that exists on time. Secondary offtake — what the chemist actually sold — arrives later, incomplete, and sometimes attributed to the wrong territory because stock was shifted to close a month. So the incentive is paid against a number that is known to be provisional, and the correction, if it comes at all, comes as expiry and breakage two quarters later.',
    fix:
      'Crizant One computes on secondary where secondary exists, accrues against primary with an explicit provision where it does not, enforces territory attribution, and holds the whole derivation for the period an audit may reach back.',
    buyers: [
      { role: 'Head of Sales Force Effectiveness', owns: 'Owns incentive design — the most precise title in the set' },
      { role: 'National Sales Manager / Commercial Excellence', owns: 'Owns field performance and the scheme that drives it' },
      { role: 'Finance lead, field incentive', owns: 'Owns the accrual and the recovery' },
    ],
    quote: 'We pay on primary and hope secondary followed.',
    quoteWho: 'Head of Sales Force Effectiveness, Indian pharma',
    capabilities: [
      {
        title: 'Primary, secondary and tertiary in one model',
        body: 'Compute on the best available signal per product and geography, with the basis recorded against the payout so a later correction is traceable rather than mysterious.',
      },
      {
        title: 'Territory integrity',
        body: 'Stock shifted between territories to close a month shows up as an attribution anomaly, not as a legitimate incentive.',
      },
      {
        title: 'Expiry, breakage and return handling',
        body: 'Reversals are matched to the originating payout and recovered on a defined path, rather than absorbed as a difference nobody owns.',
      },
      {
        title: 'Complex field incentive structures',
        body: 'Multi-brand targets, weighted baskets, growth-over-base, new-product launch weighting, qualification gates and ranked contests — configured and simulated before the cycle.',
      },
      {
        title: 'Division and specialty hierarchies',
        body: 'MR, area, regional and zonal structures per division, effective-dated through the reorganisations that happen every year.',
      },
    ],
    compliance: [
      {
        name: 'Marketing-practices codes',
        body: 'Spend records, eligibility and approval trails held per scheme and per period. Scope varies by market and by code; Crizant One holds the record, and the interpretation stays with your compliance team.',
      },
      {
        name: 'Field incentive audit',
        body: 'Point-in-time reconstruction of any historical incentive payout against the scheme version and territory structure live on the date.',
      },
    ],
    faqs: [
      {
        q: 'Can Crizant One calculate MR incentives on secondary sales instead of primary dispatch?',
        a: 'Yes. Where secondary offtake data exists, the incentive is computed on it. Where it does not yet exist, Crizant One accrues against primary with an explicit provision, records the basis against the payout, and trues up when secondary arrives — so the correction is traceable rather than appearing as an unexplained adjustment two quarters later.',
      },
      {
        q: 'How does Crizant One handle stock shifted between territories?',
        a: 'Territory attribution is enforced against the dated hierarchy, and a pattern of dispatch that closes one territory’s month at another’s expense is raised as an attribution anomaly during the pre-close review rather than paid as a legitimate incentive.',
      },
      {
        q: 'Does Crizant One support pharma marketing-practices compliance?',
        a: 'Crizant One holds the spend record, eligibility and approval trail per scheme and per period, and can reconstruct any historical payout. Interpretation of a specific code remains with your compliance team — the platform’s job is to make sure the record exists and is checkable.',
      },
    ],
    geo: 'India, South East Asia, Middle East and Africa',
  },
  {
    slug: 'real-estate',
    nav: 'Real Estate',
    name: 'Real Estate & Developers',
    icon: 'building',
    payOn: 'Channel-partner brokerage at booking',
    reverses: 'The booking cancels before registration, or two brokers claim the same buyer',
    promise:
      'Brokerage released against milestones, recovered when a booking cancels, and never paid twice for the same buyer.',
    reality:
      'Brokerage is paid at booking because that is when the partner expects it. Registration is months away, and a booking that cancels in month four takes the brokerage with it — except the brokerage has already been paid, and recovering it from a channel partner is a commercial conversation, not a system action. Meanwhile two partners claim the same walk-in and the dispute is settled from memory.',
    fix:
      'Crizant One stages brokerage against booking, agreement and registration milestones, provisions for cancellation, runs the recovery as a tracked process, and resolves buyer attribution from first-touch records rather than from argument.',
    buyers: [
      { role: 'Head of Sales / Head of Channel Partners', owns: 'Owns the partner relationship and the brokerage rate card' },
      { role: 'CRM head', owns: 'Owns booking-to-registration, therefore owns cancellations' },
      { role: 'Finance controller', owns: 'Owns brokerage provisioning and recovery' },
    ],
    quote: 'We paid full brokerage on a booking that cancelled in month four.',
    quoteWho: 'Finance controller, residential developer',
    capabilities: [
      {
        title: 'Milestone-staged brokerage',
        body: 'Release against booking, agreement execution and registration in configured proportions, so exposure at any moment is a decision rather than an accident.',
      },
      {
        title: 'Cancellation recovery as a process',
        body: 'A cancelled booking raises a recovery with an owner, an ageing clock and a resolution — recovered, netted against future brokerage, or explicitly written off.',
      },
      {
        title: 'Buyer attribution and duplicate-claim resolution',
        body: 'First-touch and registration records decide which partner is credited, before the payout rather than during a dispute.',
      },
      {
        title: 'Partner registration gates',
        body: 'A partner whose registration has lapsed or who is not registered where registration is required is blocked from payout, visibly.',
      },
      {
        title: 'Launch incentives and slab bonuses',
        body: 'Launch-period bonuses, inventory-clearing incentives and ranked contests — including the non-cash rewards for which nobody ever wrote a clawback rule.',
      },
    ],
    compliance: [
      {
        name: 'Agent registration',
        body: 'Registration identifiers and validity held against the partner record, with payout gated on them. Specific obligations vary by state and authority; Crizant One enforces what you configure.',
      },
      {
        name: 'Brokerage provisioning',
        body: 'Provision for expected cancellation, with the recovery position visible rather than discovered at year end.',
      },
    ],
    faqs: [
      {
        q: 'How does Crizant One handle brokerage on a booking that later cancels?',
        a: 'Brokerage can be staged across booking, agreement and registration milestones, so exposure before registration is a configured decision. When a booking cancels, a recovery is raised against the originating payout with an owner and an ageing clock, and it resolves as cash recovered, netted against future brokerage, or an explicit write-off. The write-off is the step usually missing, and it is where the leakage settles.',
      },
      {
        q: 'Can Crizant One resolve two channel partners claiming the same buyer?',
        a: 'Yes. Attribution is decided from first-touch and registration records held against the buyer, applied before the payout is computed. The duplicate claim is raised as an exception during the pre-close review rather than argued after both partners have been paid.',
      },
    ],
    geo: 'India and the UAE',
  },
  {
    slug: 'insurance',
    nav: 'Insurance & BFSI',
    name: 'Insurance & BFSI',
    icon: 'umbrella',
    payOn: 'First-year commission, rewards and channel support',
    reverses: 'The policy lapses, is free-looked, or is cancelled',
    promise:
      'Commission as a matrix rather than a rate — payment-term band by channel by location, under an expense ceiling tracked in real time.',
    reality:
      'Commission in insurance has stopped being a cap and become a matrix. A single life product’s first-year rate depends on premium payment term, on channel, and on location, with a renewal rate that steps every three years to a ceiling, under an expense-of-management limit that tightens annually — and with every rupee tagged to a named seller and clawable. That is not a pricing change. It is a configuration problem.',
    fix:
      'Crizant One was built this way before the consultation paper existed: versioned schemes, expense-ceiling utilisation tracked as the cycle runs, every payout traceable to the individual who earned it, and the whole library re-cuttable in an afternoon when a limit moves.',
    buyers: [
      { role: 'Head of Distribution / CDO', owns: 'Owns the channel and the rate card' },
      { role: 'VP / Head of Finance Operations', owns: 'Owns the end-of-month number and the reconciliation' },
      { role: 'COO at brokers and corporate agents', owns: 'Multi-insurer reconciliation is their daily tax' },
      { role: 'Compliance and risk heads', owns: 'Regulatory change is their alarm clock' },
    ],
    quote: 'I can’t tell you today what our EoM utilisation is. I’ll know in three weeks.',
    quoteWho: 'VP Finance Operations, life insurer',
    capabilities: [
      {
        title: 'The commission matrix, configured',
        body: 'Premium payment term bands by channel by location loading, with the renewal escalator and the policy-term constraints held as rules rather than as a spreadsheet convention.',
      },
      {
        title: 'Expense ceiling utilisation, live',
        body: 'Track utilisation as the cycle runs, including the rewards, contests and channel support that sit inside the same limit as commission — the spend that usually runs outside the system.',
      },
      {
        title: 'Clawback on lapse, free-look and cancellation',
        body: 'Matched to the originating payout, with recovery tracked to closure. Including the non-cash reward that was already consumed when the policy cancelled.',
      },
      {
        title: 'Multi-insurer reconciliation for intermediaries',
        body: 'For brokers and corporate agents: every principal’s statement reconciled against your own computed entitlement, on one close.',
      },
      {
        title: 'Seller-level attribution',
        body: 'Every policy tagged to the selling individual — a regulatory direction of travel, and the only fair basis for administering clawback.',
      },
    ],
    compliance: [
      {
        name: 'India — IRDAI, RBI, SEBI',
        body: 'Commission structures, expense-of-management utilisation, clawback administration and cost-audit readiness, with GST-aware structures and lakh/crore formatting.',
      },
      {
        name: 'Middle East — CBUAE and Takaful',
        body: 'UAE Central Bank requirements and Takaful commission structures, with an Arabic-first right-to-left interface.',
      },
      {
        name: 'Indonesia — OJK',
        body: 'OJK compliance for Indonesian insurance, with a Bahasa Indonesia interface and local currency formatting.',
      },
    ],
    faqs: [
      {
        q: 'Can Crizant One track expense-of-management utilisation in real time?',
        a: 'Yes, and it includes the spend that normally sits outside a commission system. Rewards, contests, qualification trips and channel support fall inside the same regulatory expense limit as commission, and they are usually administered in a spreadsheet. Crizant One tracks utilisation across all of it as the cycle runs, rather than producing it three weeks after the close.',
      },
      {
        q: 'How fast can commission schemes be re-cut when a regulator changes the rules?',
        a: 'The scheme library can be cloned, re-cut across every affected product, channel and hierarchy tier, simulated against historical data and promoted in hours. The honest industry answer runs from three weeks on a spreadsheet to three to six months through a generic ERP release queue — which means the regulation’s compliance date and the configuration date are different dates, and the gap is paid in either non-compliance or suspended selling.',
      },
      {
        q: 'Does Crizant One handle clawback on lapsed and cancelled policies?',
        a: 'Yes, matched to the originating payout, with recovery tracked to closure or explicit write-off. It also covers the harder case: a non-cash reward — a qualification trip, a voucher — that was already consumed before the qualifying policy lapsed. Nobody ever wrote a clawback rule for a holiday, which is precisely why that spend leaks.',
      },
    ],
    geo: 'India, Middle East, South East Asia, Australia, Africa and South America',
  },
];

export const industryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);
