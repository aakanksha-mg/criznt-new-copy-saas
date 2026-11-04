/**
 * Long-form analysis. The editorial rule from the brand voice (guidelines s.02)
 * applies here more than anywhere: name the reality before the fix, and let the
 * authority come from specificity. Every regulatory figure in these pieces was
 * checked against the primary paper before publication.
 *
 * `body` is a small markdown subset rendered by <Markdown> — ##, ###, lists,
 * > quotes, **bold**, links, tables, and ::: keybox blocks.
 */
export type Article = {
  slug: string;
  title: string;
  /** Shorter title for the <title> tag where the headline would be truncated
   *  in a result page. The on-page H1 and the schema always use `title`. */
  seoTitle?: string;
  /** Used as the meta description and the card deck. One or two sentences. */
  deck: string;
  pillar: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  /** The standalone summary an answer engine can lift. */
  takeaways: string[];
  tags: string[];
  body: string;
};

export const articles: Article[] = [
  {
    slug: 'commission-is-a-matrix-not-a-cap',
    title: 'Commission is no longer a cap. It is a matrix.',
    deck:
      'The IRDAI distribution consultation is being read as commission coming down. The operationally significant change is different: a single product’s first-year rate now depends on payment term, channel and location at once, under an expense ceiling that tightens every year.',
    pillar: 'The Compliance Clock',
    published: '2026-10-22',
    updated: '2026-11-03',
    readingMinutes: 9,
    takeaways: [
      'A life product’s first-year commission limit is now a grid of five premium-payment-term bands × channel × three location tiers, not a single cap.',
      'Renewal commission steps up 0.5% every three years from the sixth policy year, capped at 7%.',
      'General insurers must reach a 25% expense ratio in two years and 20% in five, from 32.1% in FY26, with FY2027-28 as Year 1.',
      'The expense limit covers rewards, contests and channel support — not only commission — and most of that spend runs in a spreadsheet.',
      'This is a configuration problem rather than a pricing problem, and it is measured in how fast a scheme library can be re-cut.',
    ],
    tags: ['IRDAI', 'Insurance', 'Compliance', 'Commission structures'],
    body: `
Every outlet covering the IRDAI consultation paper *Recalibrating Economics of Insurance Distribution* led with the same reading: caps are coming back. That reading is available, it is not wrong, and it is the least useful thing in the document.

The operationally significant content is that **commission stops being a rate and becomes a matrix**.

## What the grid actually says

For individual non-linked and linked life products, the first-year limit depends on the premium payment term, and separately on whether the distributor is an insurance distribution entity or an individual agent.

| Premium payment term | IDE first year | IDE renewal | Agent first year | Agent renewal |
|---|---|---|---|---|
| Below 5 years | 5% | 2% | 6.25% | 5% |
| 5 years | 10% | 2% | 12.5% | 5% |
| 6–8 years | 14% | 3% | 17.5% | 5% |
| 9 years | 18% | 3% | 22.5% | 5% |
| 10 years and above | 20% | 3% | 25% | 5% |

Three things in the footnotes matter as much as the table.

**The renewal escalator.** From the sixth policy year, renewal commission rises by 0.5% every three years, capped at 7%. So an agent renewal is 5% to year five, 5.5% for years six to eight, 6% for nine to eleven, and onward to the ceiling. A renewal rate is therefore a function of policy age, not a constant.

**The location loading.** Add 10% of the applicable first-year limit for towns under one million population, and **20% for towns under 50,000 and all rural areas**. This line appears under both the life and the general tables, and almost nobody is quoting it. Read on its own it moves commission *up*, in exactly the geographies where distribution is hardest to build.

**Policy term constraints.** Policy term cannot be less than ten years or the premium payment term, whichever is higher, and a payment term below five years is permitted only for non-par non-linked products.

> A single life product's first-year rate is now a function of five payment-term bands × two channel types × three location tiers, with a renewal rate that steps every three years. That is sixty cells before you have considered a second product.

## The expense ceiling is the harder number

The commission grid gets the headlines. The expense-of-management requirement is what will actually consume 2027.

General insurers recorded an expense ratio of **32.1% in FY26** — above even its pre-2016 level — and are required to reach **25% in two years and 20% in five**. Life insurers move from a 20.2% FY26 ratio to 15% in two years and 12.5% in five, and insurers already below the benchmark must reach 10% in five. **FY2027-28 is Year 1, with a reduction required every year**, not a single step at the end.

*(Verified against Box 1, Box 2.A and Box 2.B of Part 1. The paper is hosted at iib.gov.in/dr, not on the IRDAI site — which is why early searches for it failed.)*

For a general insurer that is seven points of expense ratio to find in twenty-four months, and the base is changing at the same time: the measurement shifts from gross written premium to gross direct premium income, with only one-third of PMFBY gross premium counting, and reinsurance commission explicitly not nettable against the limit.

## Why squeezing the grid will not get you there

The single most common planning error in this cycle will be treating the expense problem as a commission problem.

The 2023 reform collapsed the segment-wise caps into one overall EoM ceiling, and the consultation pulls the 2023 carve-outs — technology, awareness, rural and government schemes — **inside** that limit. So commission is one input into a number made of many.

Squeeze the grid and the spend does not disappear. It moves. It reappears as:

- a contest, with a qualification trip
- a slab top-up, paid retroactively on the whole book when a seller crosses by one policy
- a minimum guarantee for a new recruit
- marketing support to a bank partner
- a branch campaign announced in a mailer and checked by hand

All of it is inside the same ceiling. And nearly all of it runs outside the commission system, in a spreadsheet, where eligibility is validated manually and the same production can qualify for a base scheme, a contest and a branch campaign at the same time.

::: key
If your commission grid runs in a system and your rewards run in a spreadsheet, you do not have a view of the number the regulator is measuring. You have a view of part of it.
:::

## The clawback problem nobody has written a rule for

The paper confirms clawback on established mis-selling **and on cancelled policies**. Commission clawback is mechanically straightforward: a negative line, recovered from the next payout.

Rewards are not. A qualification trip taken in March against a policy that cancelled in May cannot be recovered, because it was non-cash and it has already been consumed. A ranked contest has a worse property: one lapse restates the leaderboard, and everyone below the winner was paid on a ranking that is now wrong.

Nobody writes a clawback rule for a holiday. That is not an oversight in any single company — it is a structural gap in how non-cash incentive is administered, and the consultation puts a cost on it.

## What this is, operationally

It is a configuration problem.

A grid with sixty cells per product, a renewal rate that steps with policy age, a location loading that depends on census population bands, an expense ceiling that tightens annually across commission *and* rewards *and* channel support, every rupee tagged to a named seller, and all of it clawable.

Which means the question to put to your own distribution team is not "what will the new rates be." It is: **when the date is set, how long does it take us to re-cut every affected scheme, correctly, across every product, channel and hierarchy tier, and have the next cycle run on the new logic?**

The honest answers in this industry run from three weeks to four months. The long end is not incompetence — it is a scheme library built over years by people who have since left, documented in a spreadsheet nobody fully trusts, and changeable only through an IT queue with its own release calendar.

The gap between the compliance date and your configuration date is paid in either non-compliance or suspended selling.

We built Crizant One on the assumption that commission is a matrix under a moving ceiling, before this paper existed. Not because we predicted it. Because a payout you cannot explain is a payout you should not have made.
`,
  },
  {
    slug: 'the-reversal-problem',
    title: 'The reversal problem: you pay for the sale, then find out if it was real',
    seoTitle: 'The reversal problem, across four industries',
    deck:
      'FMCG, pharma, real estate and insurance look like four different incentive problems. They are one: a payout that precedes certainty, through a multi-tier channel, on a scheme that keeps changing.',
    pillar: 'The Reversal',
    published: '2026-11-02',
    readingMinutes: 7,
    takeaways: [
      'The reversal problem is a payout made before the sale is known to be real, through a multi-tier channel, on a scheme that keeps changing.',
      'In FMCG it is inflated secondary sales and duplicate claims; in pharma, expiry and breakage after payment on primary dispatch; in real estate, a booking that cancels after brokerage is paid; in insurance, a lapsed or free-looked policy.',
      'The reversal always arrives after the cycle has closed, which is why recovery is a commercial conversation rather than a system action.',
      'The fix is structural: stage the payout against certainty, provision for reversal, and run recovery as a tracked process with an owner and a write-off decision.',
    ],
    tags: ['FMCG', 'Pharma', 'Real estate', 'Insurance', 'Channel spend'],
    body: `
Four industries describe their incentive problem in four different vocabularies, and then describe the same mechanic.

| Industry | What you pay on | How it reverses |
|---|---|---|
| FMCG | Distributor claims against a trade scheme | Secondary sales inflated, goods returned, claim raised twice, scheme already expired |
| Pharma | MR incentive on stockist offtake | Paid on primary dispatch; returns as expiry or breakage; stock shifted between territories |
| Real estate | Channel-partner brokerage at booking | Booking cancels before registration; two brokers claim the same buyer |
| Insurance | First-year commission | Policy lapses, is free-looked, or is cancelled |

One mechanic: **a payout that precedes certainty, through a multi-tier channel, on a scheme that keeps changing.**

## Why the structure guarantees the problem

Each of the three conditions is individually reasonable. Together they are the failure.

**The payout precedes certainty** because the channel will not wait. A distributor expects the claim settled this quarter. A channel partner expects brokerage at booking, not at registration eleven months later. A medical representative is paid monthly against a number that only primary dispatch can supply on time. Delaying payment until certainty arrives is commercially unavailable in all four industries.

**The channel is multi-tier**, so a single transaction generates payouts to several people — the seller, a team lead, a branch, a regional head — each under a different rule, computed against a hierarchy that is itself changing. A reversal therefore has to unwind at every level it touched.

**The scheme keeps changing**, so the rule that produced a payout eight months ago is not the rule in force today. Recovering that payout correctly requires knowing what was live on the transaction date.

::: key
The reversal always arrives after the cycle has closed. That is not bad luck — it is definitional. Certainty is what arrives late.
:::

## Where the money actually goes

The loss is rarely the reversal itself. It is that the reversal is never completed.

A cancellation raises a recovery. The recovery has no owner, no ageing clock, and no explicit write-off decision. It sits in a reconciliation as a difference, gets netted against something unrelated the following quarter, and leaves the business without ever being recorded as a loss.

In Crizant's deployment data, this accounts for a substantial share of the 3–8% per-cycle leakage range — alongside duplicate qualification across overlapping schemes, tiers applied one level too high, and overrides that kept paying after a seller had left.

The second loss is a governance one. If you cannot say what proportion of last year's channel spend reversed and was never recovered, you cannot price next year's scheme. You are designing a scheme against a cost you have not measured.

## What a structural answer looks like

Not "pay later." Four things, all of which are configuration rather than negotiation:

**1. Stage the payout against certainty.** Where a milestone exists — agreement execution, registration, sell-through, the end of a free-look period — release against it in configured proportions. Exposure before certainty becomes a decision someone made, with a number attached, rather than an accident of the rate card.

**2. Provision explicitly.** If 11% of bookings historically cancel before registration, that is a provision, not a surprise. The provision belongs in the accrual as the cycle runs.

**3. Run recovery as a process.** A reversal is an event with a lifecycle: raised, owned, aged, and resolved as cash recovered, netted against a future payout, or explicitly written off. The write-off is the step usually missing, and it is where the leakage settles.

**4. Keep the derivation.** To unwind a payout correctly you need the scheme version, the hierarchy and the rates that were live on the transaction date. If those were never kept, the recovery is an argument rather than an arithmetic.

## The second universal

There is a companion problem, and it shows up in all four industries just as reliably: **the person who earned it cannot see the arithmetic.**

A distributor cannot see how their claim was computed. A medical representative cannot see which secondary sales were credited. A channel partner cannot see why the brokerage differs from the rate card. An insurance agent cannot see the slab they missed by one policy.

So every reversal is also a dispute, handled by a back office that often cannot show the working either. Make the derivation visible to the person who earned it, and the reversal becomes a conversation about a fact rather than about trust.

That is the whole of Crizant One's last mile: not a statement, the arithmetic — offline, in the seller's own language, on the phone they already have.
`,
  },
  {
    slug: 'arithmetic-of-channel-spend-leakage',
    title: 'The arithmetic of channel spend leakage',
    deck:
      'Leakage of 3–8% per cycle is easy to skim past. Attach a volume to it and it becomes the cheapest money in the business — but only if you look for it before the payment file goes out.',
    pillar: 'Channel Spend Leakage',
    published: '2026-10-26',
    readingMinutes: 6,
    takeaways: [
      'Crizant observes 3–8% leakage of commission value per cycle; on 500 crore of annual commission that is 15–40 crore a year.',
      'The causes are mundane: calculation errors, duplicate qualification across schemes, wrong-tier application, unrecovered clawbacks, and overrides paying after a seller leaves.',
      'Leakage is asymmetric — underpayments self-report within a week, overpayments generate silence — so complaint-driven detection finds only the cheaper half.',
      'Prevention is arithmetic run before the cycle closes. Detection afterwards is forensics, and the money is usually unrecoverable.',
    ],
    tags: ['Leakage', 'Channel spend', 'Finance operations'],
    body: `
Commission leakage runs at **3–8% of commission value per cycle**. That is Crizant's own range, observed across deployments, and it is easy to skim past — so attach a volume to it.

For every **₹500 crore** paid in commission annually, somewhere between **₹15 crore and ₹40 crore** leaves the business. Pick any currency: for every 100 million paid, 3 to 8 million. The ratio does not change.

Not to fraud. To:

- calculation errors
- duplicate payouts, where the same production qualifies under a base scheme, a contest and a branch campaign
- schemes applied at the wrong hierarchy tier
- clawbacks raised and never recovered
- overrides that kept paying after the seller had left

## Why it survives

Leakage never arrives as a single visible event. It arrives as **four thousand small ones**, each individually too small to investigate, spread across a cycle nobody has time to audit line by line.

By the time the annual figure is visible in aggregate, it is a year old and unrecoverable.

And it is asymmetric, which is the part that matters most for how you look for it.

::: key
An underpaid seller raises a query within the week. An overpayment generates no query from anyone. The errors that survive a cycle are the ones nobody has an incentive to report.
:::

This is why complaint-driven control finds only half the problem, and the cheaper half. If your assurance over channel spend is "sellers tell us when it's wrong," you have assurance over underpayment only.

## The three places it concentrates

**Overlapping schemes.** The single largest source in most engagements. A base scheme, a quarterly contest and a regional campaign all evaluating the same transaction, with eligibility checked in three different places — two of them spreadsheets. The same production is paid three times and no individual payment looks wrong.

**Hierarchy drift.** The payout is computed against the hierarchy as it is today rather than as it was on the transaction date. A seller who moved territory mid-quarter, a terminated team lead whose override is still live, a distributor suspended in week three but paid for the month — each one is a small, defensible-looking line.

**Incomplete reversal.** A clawback raised but never recovered, and never written off either. It sits as a reconciliation difference, gets netted against something unrelated next quarter, and never appears as a loss.

## Forensics versus arithmetic

Finding leakage after the fact is forensics. It requires reconstructing what the rule was, what the hierarchy was, and what the data said — usually from records that were not kept for that purpose — and it ends in a number you cannot recover.

Preventing it is arithmetic you run **before the payment file goes out**.

The mechanism is not exotic. Compute the cycle, model the payout distribution, and flag what does not fit: the seller whose commission tripled without a matching change in production, the override still paying on a terminated hierarchy, the transaction counted under two schemes, the tier applied one level too high. Then block the cycle until each exception is cleared or corrected.

Crizant One does this as a standing pre-close step rather than an audit. On a 184,000-transaction cycle, a typical review raises a few dozen exceptions, most of which clear in minutes.

**Caught on the Tuesday, a correction costs nothing. Found at year end, it costs the amount — plus the conversation with your auditor.**

## What to ask inside your own business

Three questions that will locate the exposure without a project:

1. What proportion of last cycle's payouts were validated against anything other than "the system computed it"?
2. Of the clawbacks raised in the last four cycles, how many are closed — recovered or explicitly written off?
3. Can one person tell you, today, what total channel spend was committed this quarter, by scheme, including rewards and contests?

If the third question takes three weeks to answer, the first two will not have good answers either. Those are the same problem.
`,
  },
  {
    slug: 'payout-transparency-is-retention-infrastructure',
    title: 'Payout transparency is retention infrastructure',
    deck:
      'Around 40% of seller attrition traces back to a late or disputed payout. Showing people the arithmetic is the cheapest retention spend in distribution — and the same visibility is what makes a payout defensible.',
    pillar: 'The Last Mile',
    published: '2026-11-05',
    readingMinutes: 6,
    takeaways: [
      'In Crizant’s observation, around 40% of seller attrition traces back to a late or disputed payout.',
      'A commission statement is a number, not a derivation — so a seller who thinks it is wrong has no way to check, and the back office often cannot show the working either.',
      'A connected dashboard fails exactly when a field seller opens it; offline-first is the requirement, not an enhancement.',
      'In developed markets the same visibility is bought for defensibility rather than retention: "this amount, to this person, on this date — show the working."',
    ],
    tags: ['Last mile', 'Retention', 'Field sellers', 'Audit'],
    body: `
Ask a distribution leader what drives seller attrition and you get territory, targets, management and competitor poaching. Ask a seller who left and a different answer comes back more often than it should: they could not see what they had earned, the payout was late, and when they queried it nobody could explain the number.

In Crizant's observation across deployments, **around 40% of seller attrition traces back to a late or disputed payout**. That figure is ours, not an industry survey, and it is the reason we treat the last mile as product rather than reporting.

## A statement is not a derivation

The structural problem is simple. A commission statement is a *number*. What the seller needs, at the moment they think it is wrong, is the *derivation*: which transactions were credited, which scheme applied, which tier, which slab they missed and by how much.

Without that, a query is a matter of trust rather than fact. It goes to a branch or a back office, which frequently cannot show the working either, because reconstructing it would mean assembling the scheme version, the dated hierarchy and the transaction set by hand.

So the query becomes a negotiation, the seller concludes the arithmetic is arbitrary, and a competitor's recruiter has an opening.

::: key
A seller who can see what they earned does not call the branch. A seller who cannot, eventually calls someone else.
:::

## It only has to fail twice

The second structural problem is the device.

A dashboard that needs a live connection fails exactly when it is opened — on a phone, between appointments, in a district where the signal drops. Twice is all it takes before the seller stops opening it and goes back to calling the branch. And once that habit returns, no amount of feature work recovers it.

This is why Crizant One's seller app is **offline-first rather than offline-capable**. It opens, renders and stays useful with no connection, then reconciles when one returns. Offline is the default assumption, not a degraded mode.

Alongside it:

- **8+ languages**, including Hindi, Marathi, Tamil, Telugu, Kannada, Malayalam, Bahasa Indonesia and Arabic — the last as a genuine right-to-left layout, not a mirrored translation
- **Voice navigation**, for sellers who are faster speaking than typing and for those for whom a dense dashboard is the barrier rather than the data
- **A progressive web app**, so there is no app store, no device policy and no update to push to the field — a link, added to the home screen

## The developed-market version of the same argument

In Sydney, Dubai or Singapore the connectivity argument lands badly, because connectivity is not the constraint. The adviser has a laptop, a portal and a connection.

The constraint there is the same one underneath it, with the geography stripped out: **a commission statement is still a number rather than a derivation.** What changes is the payoff.

In developed markets, transparency is bought for *defensibility*. At some point someone asks you to show how a specific payout was derived — an auditor, a regulator, a seller disputing a figure, occasionally a court. The question is always the same shape: this amount, to this person, on this date, show the working.

Answering it needs the scheme version live on the day of the sale, the hierarchy as it stood then, the splits paid onward, and the rule that produced each figure. As they were, not as they are.

Most systems can tell you what was paid. Far fewer can tell you *why*, eighteen months later, without a project. The difference is whether the record was kept as the cycle ran or has to be reconstructed afterwards — and a reconstructed number is one you cannot fully stand behind.

## Why these are one feature

The same data structure answers both.

If every payout is traceable to the individual who earned it and the exact rule that produced it, then the seller can see their own arithmetic and the auditor can see the derivation. Build it for the auditor only and the seller still calls the branch. Build it for the seller only and the audit is a project.

**A payout you cannot explain is a payout you should not have made.** That holds whether the person asking is a regulator or the person who earned it.
`,
  },
  {
    slug: 'we-run-it-you-own-it',
    title: 'We run it, you own it: why we sell software and then offer to operate it',
    seoTitle: 'We run it, you own it — the managed model',
    deck:
      'Those two sentences sit awkwardly together in a SaaS pitch. The reason they belong together is that commission operations does not get easier once the platform is live.',
    pillar: 'Operator Notes',
    published: '2026-11-12',
    readingMinutes: 5,
    takeaways: [
      'Crizant sells Crizant One as software and also operates it: scheme configuration, data operations, cycle processing, seller helpdesk and compliance upkeep on a 99.5% SLA.',
      'The client owns the platform, the data and the decisions; Crizant runs the operation.',
      'A commission platform configured badly fails in exactly the same way as no platform at all — which is the honest reason the managed-services arm exists.',
      'Typical go-live is ten days, with a parallel run against the previous cycle before anything is paid on the new system.',
    ],
    tags: ['Managed services', 'Operations', 'Delivery'],
    body: `
We sell software, and then we offer to run it for you. Those two sentences sit awkwardly together in a SaaS pitch, so it is worth explaining why they belong together.

## What is left after the platform is live

Commission operations is not a function that gets easier once a platform goes live. The platform removes the calculation work. What remains is:

- **Scheme design that has to track the market.** A scheme that was right in April is being gamed by August.
- **Data operations against core systems that change without notice.** A schema changes, a feed arrives short, a master-data update renames a territory. None of it is announced.
- **A cycle that has to close on time, every time.** There is no version of this function where the close slips and nobody notices.
- **A seller helpdesk that is relentless and unglamorous.** Thousands of people, each with one question about their own money.
- **Compliance upkeep against regulators who are actively rewriting the rules.**

That is a team. Most companies staff it thinly, because it is a cost centre and because the work is invisible when it goes right.

::: key
A commission platform that is configured badly fails in exactly the same way as no platform at all. We would rather not be the vendor whose software was technically fine while the payouts went out wrong.
:::

## What we actually take on

Five things, on a **99.5% SLA**, with go-live typically in **ten days**:

**Scheme configuration.** We design and configure the schemes, validated against your own historical data before anything is promoted.

**Data operations.** Automated ingestion and validation from your core systems. No manual uploads — and a feed that arrives late, short or malformed raises an exception against the cycle rather than quietly producing a smaller payout run.

**Cycle processing.** Every cycle computed, reviewed for anomalies before close, and reconciled before payment.

**Helpdesk.** A dedicated team resolving seller, RM and distributor queries, which takes the single largest volume of unplanned work off your own team.

**Compliance.** Scheme logic and audit trails kept aligned with regulatory change as it happens.

## What stays yours

The platform, the data and the decisions.

That boundary is not a marketing line, it is the operating model. We do not own your scheme strategy, we do not decide your rates, and we do not hold your data hostage to the engagement. If you take the operation in-house in year three, the platform, the configuration and the full audit history are already yours.

## The parallel run

Before any cycle is paid on Crizant One, we compute the same period on both the existing process and the new one and explain the difference line by line.

This is the step clients find most useful, and not for the reason you would expect. Where the difference turns out to be leakage in the old process — a duplicate qualification, an override on a closed hierarchy, a clawback never recovered — that is the first measurable result of the engagement, and it usually arrives before go-live.

It is also the honest test of a vendor claim. We would rather be measured against your own last cycle than against a case study.

**We run it. You own it.**
`,
  },
];

export const articleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const sortedArticles = (): Article[] =>
  [...articles].sort((a, b) => (a.published < b.published ? 1 : -1));
