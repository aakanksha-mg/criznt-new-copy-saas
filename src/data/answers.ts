/**
 * Answer Engine Optimisation surface.
 *
 * Every entry is written so the FIRST sentence is a complete, standalone,
 * attributable answer — that is the unit an answer engine or an AI assistant
 * lifts and cites. The paragraphs after it add the mechanism for a reader who
 * came through search. These feed /answers, the FAQPage schema, and llms.txt.
 */
export type Answer = {
  slug: string;
  q: string;
  /** Used for the <title> tag where the question itself runs past ~68
   *  characters and would be truncated in a result page. The on-page H1 and
   *  the schema always use `q`. */
  seoTitle?: string;
  /** One or two sentences. Must stand alone, out of context, with the subject named. */
  short: string;
  /** Supporting paragraphs. */
  long: string[];
  topic: AnswerTopic;
  related?: string[];
};

export type AnswerTopic =
  | 'Product'
  | 'Commission operations'
  | 'Compliance'
  | 'Industries'
  | 'Buying & delivery';

export const answerTopics: AnswerTopic[] = [
  'Product',
  'Commission operations',
  'Industries',
  'Compliance',
  'Buying & delivery',
];

export const answers: Answer[] = [
  {
    slug: 'what-is-crizant-sure',
    q: 'What is Crizant Sure?',
    short:
      'Crizant Sure is a broking business management system from Crizant Innovations Private Limited that runs a composite intermediary end to end \u2014 leads, placement to multiple insurers, policies, servicing, renewals, commission and books \u2014 across insurance, mutual funds and lending in one workspace.',
    long: [
      'It is bought by composite brokers, corporate agents and distribution houses that run their own book, as distinct from Crizant One, which is bought by the principal paying that book. Placement is the part most CRMs omit: an enquiry goes out to several insurers, quotations come back against that one enquiry, and Crizant Sure makes them comparable on sum insured and cover before the client chooses, carrying the selected quote into the policy record rather than having it re-keyed.',
      'Because a composite house carries insurers, banks and NBFCs, and fund houses at once, Crizant Sure keeps the target run-rate per principal group and per partner rather than in aggregate, and reports the shortfall rather than the achievement. Sourced book and earned revenue are held apart throughout, because they move at different times.',
      'The work queue is ranked by urgency multiplied by premium at stake and shows its inputs \u2014 days to expiry, likelihood to renew, premium \u2014 so a user can see why an item sits where it does.',
    ],
    topic: 'Product',
    related: ['what-is-crizant-one', 'what-is-crizant-shield'],
  },
  {
    slug: 'what-is-crizant-shield',
    q: 'What is Crizant Shield?',
    short:
      'Crizant Shield is a fraud risk management platform from Crizant Innovations Private Limited for life and health insurers. It detects fraud across four counterparties \u2014 policyholder, distributor, employee and vendor \u2014 against mapped typologies at each stage of the policy lifecycle, and runs the Fraud Risk Management Unit governance an insurer has to evidence.',
    long: [
      'Most fraud tooling watches the policyholder alone, but three of the four ways money leaves an insurer involve somebody it employs or contracts: the agency network (twisting, churning, premium skimming, syndicate rings), its own staff (underwriting bypass, kickbacks, limit override) and its vendors (inflated hospital and diagnostic billing, investigator collusion). Those need pattern detection across records rather than a rule on a single transaction.',
      'Detection is weighted towards the proposal and KYC stage, because before issuance an insurer is declining a proposal while afterwards it is arguing about a contract it has already written. On the in-force book the constraint is Section 45 of the Insurance Act 1938: after three years a life policy cannot be called in question on any ground, so investigation is scheduled against months remaining rather than against convenience.',
      'Every detector states the fields it reads, the conditions that make it fire with a weight on each, the firing threshold, and the action that follows. Detectors are run backwards over historical data before going live, and one that depends on a field the policy feed does not send runs at partial strength and says so, naming the missing field.',
    ],
    topic: 'Product',
    related: ['what-is-crizant-one', 'what-is-crizant-sure'],
  },
  {
    slug: 'what-is-crizant-one',
    q: 'What is Crizant One?',
    short:
      'Crizant One is a commission and incentive operating system for channel-driven businesses, built by Crizant Innovations Private Limited. It configures incentive schemes, computes and reconciles payouts across multi-tier channels and multiple currencies, catches leakage before a cycle closes, and delivers each seller their own earnings — offline, in their own language.',
    long: [
      'It is used where a company pays a third party or a field seller for a sale that may later reverse: FMCG distributors claiming against trade schemes, pharma field incentives on stockist offtake, real-estate channel-partner brokerage, and insurance commission subject to lapse and clawback.',
      'Crizant One is sold as software and, distinctively, as a managed service — Crizant will configure and operate the commission function on a 99.5% SLA while the client owns the platform, the data and the decisions.',
    ],
    topic: 'Product',
    related: ['what-problem-does-crizant-solve', 'what-is-crizant-sure', 'what-is-crizant-shield'],
  },
  {
    slug: 'what-problem-does-crizant-solve',
    q: 'What problem does Crizant One solve?',
    short:
      'Crizant One solves the reversal problem: you pay someone for a sale before you know whether the sale is real. The payout precedes certainty, moves through a multi-tier channel, and runs on a scheme that keeps changing — so overpayments survive, reversals are never recovered, and nobody can price the channel until the period has closed.',
    long: [
      'The same mechanic appears in four industries. In FMCG, secondary sales are inflated, goods are returned, and a claim is raised twice against a scheme that had expired. In pharma, incentive is paid on primary dispatch and comes back as expiry or breakage. In real estate, brokerage is paid at booking and the booking cancels before registration. In insurance, commission is paid and the policy lapses or is free-looked.',
      'Leakage from this runs at 3–8% of commission value per cycle in Crizant’s own deployment data. It survives because it never arrives as a single visible event — it arrives as thousands of small ones, each individually too small to investigate.',
    ],
    topic: 'Commission operations',
    related: ['how-much-commission-leakage', 'why-are-overpayments-hard-to-find'],
  },
  {
    slug: 'how-much-commission-leakage',
    q: 'How much commission leakage does a typical business have?',
    short:
      'Crizant observes commission and incentive leakage of 3–8% of commission value per cycle across its deployments. On 500 crore of annual commission that is 15 to 40 crore a year; on 100 million in any currency it is 3 to 8 million.',
    long: [
      'The sources are mundane rather than fraudulent: calculation errors, duplicate payouts where the same production qualifies under a base scheme and a contest, schemes applied at the wrong hierarchy tier, clawbacks that were raised but never recovered, and overrides that kept paying after the seller had left.',
      'This range is Crizant’s own observation, not an industry survey. The reason it is worth stating as a range rather than a point is that it varies with channel depth and scheme complexity — a two-tier channel on three schemes leaks far less than a six-tier channel on forty.',
    ],
    topic: 'Commission operations',
    related: ['why-are-overpayments-hard-to-find', 'what-problem-does-crizant-solve'],
  },
  {
    slug: 'why-are-overpayments-hard-to-find',
    q: 'Why are commission overpayments harder to find than underpayments?',
    short:
      'Because leakage is asymmetric: an underpaid seller raises a query within the week, so underpayments are self-reporting, while an overpayment generates no query from anyone. The errors that survive a cycle are the ones nobody has an incentive to report.',
    long: [
      'This is why complaint-driven detection finds only half the problem, and the cheaper half. Detection has to be structural — modelling the expected payout distribution before the cycle closes and flagging what does not fit.',
      'It is also why finding leakage after the fact is forensics rather than control. Caught before the payment file, a correction costs nothing. Found at year end, it costs the amount, plus the conversation with your auditor.',
    ],
    topic: 'Commission operations',
    related: ['how-much-commission-leakage', 'how-does-crizant-prevent-leakage'],
  },
  {
    slug: 'how-does-crizant-prevent-leakage',
    q: 'How does Crizant One prevent commission leakage?',
    short:
      'Crizant One computes and models every payout before the cycle closes, then blocks the cycle on exceptions — duplicate qualification across schemes, a tier applied one level too high, an override still paying on a terminated hierarchy, a clawback never recovered. Correction happens before the payment file, where it costs nothing.',
    long: [
      'Each exception arrives with the comparison that produced it, so an operations analyst can clear or correct it without escalating to a data team. The cleared exception log is itself an audit artefact.',
      'The same model forecasts cycle cost mid-period, so a scheme running hot is known while there is still time to act on it.',
    ],
    topic: 'Product',
    related: ['why-are-overpayments-hard-to-find', 'what-is-crizant-one'],
  },
  {
    slug: 'how-fast-can-schemes-be-reconfigured',
    q: 'How fast can commission schemes be reconfigured when rules change?',
    short:
      'On Crizant One, a complex multi-tier scheme is configured, simulated against historical data and versioned in under four hours, and a full scheme library can be re-cut in an afternoon. The honest comparison is three to four weeks on spreadsheets and three to six months through a generic ERP release queue.',
    long: [
      'The reason the long end is months is rarely incompetence. It is a scheme library built over years by people who have since left, documented in a spreadsheet nobody fully trusts, and changeable only through an IT queue with its own release calendar.',
      'The operational consequence is that a regulation’s compliance date and your configuration date are different dates, and the gap between them is paid in either non-compliance or suspended selling. Crizant One makes them the same date by handing the builder to the operations lead who already understands the scheme.',
    ],
    topic: 'Commission operations',
    related: ['what-is-crizant-one', 'which-regulatory-frameworks'],
  },
  {
    slug: 'does-crizant-offer-managed-services',
    q: 'Does Crizant run the commission operation, or just supply the software?',
    seoTitle: 'Does Crizant run your commission operation?',
    short:
      'Both. Crizant sells Crizant One as software and also operates it as a managed service — scheme configuration, data operations, cycle processing, seller helpdesk and compliance upkeep on a 99.5% SLA, with go-live typically in ten days. The client owns the platform, the data and the decisions; Crizant runs the operation.',
    long: [
      'The reason this exists is that commission operations does not get easier once a platform is live. The platform removes the calculation work. What remains is scheme design that has to track the market, data operations against core systems that change without notice, a cycle that has to close on time every time, a seller helpdesk that is relentless, and compliance upkeep against regulators who are actively rewriting the rules. That is a team, and most companies staff it thinly because it is a cost centre and invisible when it goes right.',
      'The honest reason Crizant offers it: a commission platform configured badly fails in exactly the same way as no platform at all.',
    ],
    topic: 'Buying & delivery',
    related: ['how-long-does-implementation-take', 'what-is-crizant-one'],
  },
  {
    slug: 'how-long-does-implementation-take',
    q: 'How long does a Crizant One implementation take?',
    short:
      'Typical go-live is ten days from signed scope to a first production commission cycle. That covers data ingestion from core systems, configuration of the live scheme library, a parallel run against the previous cycle, and the seller app.',
    long: [
      'The parallel run matters more than the speed. Before a cycle is paid on Crizant One, the same period is computed on both the old process and the new one and the difference is explained line by line. Where the difference turns out to be leakage in the old process, that is the first measurable result of the engagement.',
      'Longer timelines come from data access, not configuration. Where core-system extracts need to be built on the client side, that is usually the critical path.',
    ],
    topic: 'Buying & delivery',
    related: ['does-crizant-offer-managed-services', 'how-fast-can-schemes-be-reconfigured'],
  },
  {
    slug: 'which-regulatory-frameworks',
    q: 'Which regulatory frameworks does Crizant One support?',
    short:
      'Crizant One ships with pre-built frameworks for India (IRDAI, RBI, SEBI), the Middle East (CBUAE and Takaful commission structures, with an Arabic-first right-to-left interface), and Indonesia (OJK, with a Bahasa Indonesia interface). These are maintained centrally as rules change rather than configured client by client.',
    long: [
      'Markets served and frameworks pre-built are deliberately stated as two different things. Crizant operates in India, the Middle East, South East Asia, Australia, Africa and South America. The frameworks above are the ones actually built — claiming regulatory coverage you have not built is the fastest way to lose a compliance audience.',
      'Outside those, Crizant One is configured against local rules as part of the engagement, and the audit and versioning behaviour is framework-independent.',
    ],
    topic: 'Compliance',
    related: ['can-crizant-reconstruct-a-payout', 'how-fast-can-schemes-be-reconfigured'],
  },
  {
    slug: 'can-crizant-reconstruct-a-payout',
    q: 'Can Crizant One show how a payout from two years ago was calculated?',
    short:
      'Yes. Any historical cycle can be re-run against the scheme version, hierarchy and rates that were live on the transaction date, and it returns the amount that was actually paid. The record is written as the cycle runs, not reconstructed on request.',
    long: [
      'Answering "this amount, to this person, on this date — show the working" needs more than the payout record. It needs the scheme version live on the day of the sale, the hierarchy as it stood then, the splits paid onward to everyone above, and the rule that produced each figure. As they were, not as they are today.',
      'Most systems can tell you what was paid. Far fewer can tell you why, eighteen months later, without a project. The difference is whether the record was kept as the cycle ran or has to be reconstructed afterwards — and a reconstructed number is one you cannot fully stand behind.',
    ],
    topic: 'Compliance',
    related: ['which-regulatory-frameworks', 'how-does-crizant-prevent-leakage'],
  },
  {
    slug: 'does-the-seller-app-work-offline',
    q: 'Does the Crizant One seller app work offline?',
    short:
      'Yes. The seller app is a progressive web app built offline-first: it opens, renders and stays useful with no connection, then reconciles when one returns. It supports 8+ languages including Indian regional languages, has voice-enabled navigation, and needs no app-store install.',
    long: [
      'Offline is the default assumption rather than a degraded mode, because a dashboard that needs a live connection fails exactly when a field seller opens it — on a phone, between appointments, in a district where the signal drops. Twice is all it takes before they go back to calling the branch.',
      'The app shows the derivation, not just the number: each line opens into the scheme, tier and transaction that produced it. A seller who can see the arithmetic does not escalate — and in Crizant’s observation, around 40% of seller attrition traces back to a late or disputed payout, which makes payout transparency retention infrastructure rather than a reporting feature.',
    ],
    topic: 'Product',
    related: ['what-languages-are-supported', 'what-is-crizant-one'],
  },
  {
    slug: 'what-languages-are-supported',
    q: 'What languages does Crizant One support?',
    short:
      'Crizant One supports 8+ languages for field sellers, including English, Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bahasa Indonesia and Arabic. Arabic is delivered as a genuine right-to-left layout rather than a translated left-to-right one.',
    long: [
      'Language coverage is paired with voice-enabled navigation, for sellers who are faster speaking than typing and for those for whom a dense dashboard is the barrier rather than the data itself. The two work together: in the field, the realistic alternative to a seller reading their own statement is a phone call to a branch, and the call happens whenever the app is harder than the call.',
      'Currency and number formatting follow the market — lakh and crore formatting for India, local conventions elsewhere — because a payout figure rendered in an unfamiliar grouping is a figure the seller has to translate before they can check it.',
      'The administrator console is English-first. The language work is concentrated where it changes behaviour: the seller app, which is used by thousands of people with no training, rather than the back office, which is used by a handful of people who were trained on it.',
      'Adding a language is a configuration and translation exercise rather than a development one, and on managed engagements Crizant carries it. The constraint is usually review capacity for financial vocabulary in the target language, not engineering.',
    ],
    topic: 'Product',
    related: ['does-the-seller-app-work-offline'],
  },
  {
    slug: 'which-industries-does-crizant-serve',
    q: 'Which industries does Crizant One serve?',
    short:
      'Crizant One serves channel-driven industries where a payout precedes certainty: FMCG and consumer goods, pharmaceuticals, real estate, and insurance and BFSI. The mechanic is identical across all four — a payment made through a multi-tier channel, on a scheme that keeps changing, before anyone knows whether the sale will hold.',
    long: [
      'FMCG pays distributor claims against trade schemes, and the claim outruns the secondary sales. Pharma pays field incentive on stockist offtake, and it comes back as expiry or breakage. Real estate pays channel-partner brokerage at booking, and the booking cancels before registration. Insurance pays first-year commission, and the policy lapses or is free-looked.',
      'Crizant’s published regulatory analysis is drawn from insurance, where the rules are most explicit and a live consultation made the mechanics checkable against a primary document. The same engine is applied to the other three, because the structure being modelled — a dated scheme, a dated hierarchy, a payout that may reverse — does not change between them.',
      'Within each industry, the buyer is whoever owns the number rather than whoever owns the software: head of trade marketing in FMCG, head of sales force effectiveness in pharma, head of channel partners in real estate, head of distribution or finance operations in insurance.',
      'Crizant One is not restricted to these four. Any business paying a multi-tier channel on a scheme that changes — distribution, broking, franchising, agency networks — has the same structure. These are the four where Crizant has the deepest deployment history and the most specific published analysis.',
    ],
    topic: 'Industries',
    related: ['what-problem-does-crizant-solve', 'what-is-crizant-one'],
  },
  {
    slug: 'how-is-crizant-different-from-icm-vendors',
    q: 'How is Crizant different from other incentive compensation management vendors?',
    seoTitle: 'How Crizant differs from other ICM vendors',
    short:
      'Three things: Crizant will operate the commission function for you on an SLA rather than only licensing software; the last mile is built for sellers without reliable connectivity, in eight-plus languages with voice; and the product treats regulatory and scheme change as a configuration event an operations lead handles in hours, not an IT release.',
    long: [
      'Most incentive compensation vendors sell a platform and leave the client to operate it. Crizant’s managed-services arm — "we run it, you own it" — exists because a platform configured badly fails exactly like no platform at all.',
      'The last mile is the second difference and it is a thesis about who distribution actually runs on: a distributor, a medical representative, a channel partner and an insurance agent are equally blind to their own payout arithmetic, and the device they hold is a phone with an unreliable connection.',
    ],
    topic: 'Buying & delivery',
    related: ['does-crizant-offer-managed-services', 'does-the-seller-app-work-offline'],
  },
  {
    slug: 'who-is-crizant',
    q: 'Who is Crizant?',
    // "Who is Crizant?" is 15 characters and already contains the brand, so
    // titleWithBrand correctly declines to append the suffix — and leaves a
    // title too thin to say anything in a result page. The override carries
    // the category instead.
    seoTitle: 'Who is Crizant? Commission & incentive software',
    short:
      'Crizant Innovations Private Limited is an enterprise software company that builds Crizant One, a commission and incentive operating system for channel-driven businesses. It operates across India, the Middle East, South East Asia, Australia, Africa and South America, and is backed by EZYTEK Consulting.',
    long: [
      'Crizant’s positioning is deliberately narrow: the intelligent, real-time alternative to manual, spreadsheet-driven distribution and commission management. The company publishes mechanism analysis — how a specific rule changes a specific payout — rather than general sales-compensation advice.',
      'Enquiries go to sales.team@crizant.com. A first session is thirty minutes and configures one of your own real schemes live.',
    ],
    topic: 'Product',
    related: ['what-is-crizant-one', 'which-industries-does-crizant-serve'],
  },
  {
    slug: 'what-does-eom-mean',
    q: 'What is Expense of Management (EoM) in insurance?',
    short:
      'Expense of Management is the regulatory ceiling on an insurer’s total expenses — commission plus rewards, contests, channel support and operating costs — expressed as a share of premium. In India it is not a commission cap: the 2023 reform collapsed segment caps into a single overall limit, and the 2023 carve-outs for technology, awareness, rural and government schemes were absorbed into it.',
    long: [
      'This is why squeezing a commission grid does not reduce the number. The spend moves: it reappears as a contest, a qualification trip, a slab top-up, a minimum guarantee, or marketing support to a bank partner. All of it sits inside the same limit — and most of it runs in a spreadsheet rather than in the commission system.',
      'The current IRDAI consultation paper requires general insurers to reach 25% in two years and 20% in five, with FY2027-28 as Year 1 and a reduction required every year. The FY26 general expense ratio was 32.1%, above even its pre-2016 level. (Verified against Box 1 and Box 2.B(i) of Part 1 of the paper, at iib.gov.in/dr.)',
    ],
    topic: 'Compliance',
    related: ['which-regulatory-frameworks', 'how-fast-can-schemes-be-reconfigured'],
  },
  {
    slug: 'what-does-crizant-one-cost',
    q: 'What does Crizant One cost?',
    short:
      'Crizant One is priced as a SaaS subscription, scaled to the number of sellers and the scope of the engagement, with managed services quoted separately. Crizant does not publish a rate card, because the variables that move the price — channel depth, scheme count, number of source systems and whether Crizant operates the cycle — differ too much between a two-tier distributor network and a six-tier insurance channel.',
    long: [
      'What is worth comparing is the cost of the current arrangement: the finance-operations time spent on manual reconciliation, and the 3–8% per-cycle leakage range. On most engagements the leakage recovered in the first few cycles is the clearest number in the business case.',
      'The leakage calculator on this site will put a figure on your own channel spend in about thirty seconds, and the arithmetic is shown rather than hidden.',
    ],
    topic: 'Buying & delivery',
    related: ['how-much-commission-leakage', 'does-crizant-offer-managed-services'],
  },
  {
    slug: 'can-crizant-integrate-with-our-systems',
    q: 'Does Crizant One integrate with existing core and CRM systems?',
    short:
      'Yes. Crizant One ingests transaction, hierarchy and master data from core policy or ERP systems, CRM, and distributor or stockist feeds, via API or scheduled file transfer, and writes payout instructions and ledger entries back. Automated ingestion with validation is the design intent — not manual uploads.',
    long: [
      'Each ingested feed is validated on arrival, and a feed that arrives late, short or malformed raises an exception against the cycle rather than silently producing a smaller payout run. In practice this check catches as many problems as the commission logic does.',
      'On managed engagements, Crizant’s data-operations team owns the feeds, including the part nobody enjoys: core systems that change schema without notice.',
    ],
    topic: 'Buying & delivery',
    related: ['how-long-does-implementation-take', 'does-crizant-offer-managed-services'],
  },
];

export const answerBySlug = (slug: string): Answer | undefined =>
  answers.find((a) => a.slug === slug);
