/**
 * Implementation.
 *
 * The 10-day figure is Crizant's own and is labelled as such everywhere it
 * appears. This page exists because "10-day go-live" is a claim that invites
 * exactly one question — what is actually happening in those ten days, and
 * what are you assuming I will do — and a page that does not answer it
 * reads as a number someone made up.
 */

export type Phase = {
  n: string;
  days: string;
  title: string;
  body: string;
  ours: string[];
  yours: string[];
};

export const phases: Phase[] = [
  {
    n: '01',
    days: 'Days 1–2',
    title: 'Scheme capture',
    body: 'We sit with whoever owns the scheme and configure your live schemes in the builder — not a simplified version of them. The exceptions, the overrides, the slabs that behave differently in the last month of a quarter, the one scheme that exists only in an email from last March.',
    ours: [
      'Configuration of every live scheme in the no-code builder',
      'Hierarchy and territory structure loaded and effective-dated',
      'The edge cases written down as test cases rather than as notes',
    ],
    yours: [
      'The person who actually owns scheme design, for two half-days',
      'Your current scheme documents, in whatever state they are in',
    ],
  },
  {
    n: '02',
    days: 'Days 2–5',
    title: 'Data connection',
    body: 'Feeds from your core transaction system, your HR or master-data source and your ledger. Where an API exists we use it; where it does not, we take scheduled files, because a platform that only accepts an API has made integration your problem and called it a feature.',
    ours: [
      'Field mapping and transformation configured per feed',
      'Arrival validation and period-continuity checks switched on',
      'A reconciliation of the loaded data against your own totals',
    ],
    yours: [
      'Access to the feeds, and the person who knows what the columns mean',
      'One closed historical period to load — ideally your last one',
    ],
  },
  {
    n: '03',
    days: 'Days 5–8',
    title: 'The parallel run',
    body: 'We compute your last closed cycle on Crizant One and reconcile it line by line against what you actually paid. This is the acceptance test, and it is deliberately the hardest one available: we would rather be measured against your own numbers than against a case study.',
    ours: [
      'Full computation of the historical cycle',
      'Line-by-line reconciliation against your payout file',
      'Every difference explained, with the rule and the derivation behind it',
    ],
    yours: [
      'The payout file you actually paid, for the same period',
      'A reviewer who can adjudicate a difference when one is genuine',
    ],
  },
  {
    n: '04',
    days: 'Days 8–9',
    title: 'Controls and the seller view',
    body: 'Approval chain, maker-checker on scheme and rate changes, the exception gate before disbursement, user roles, and the seller app configured in the languages your channel speaks.',
    ours: [
      'Approval workflow and maker-checker controls configured',
      'Roles, access and the read-only audit view',
      'Seller app branded, translated and tested on a real low-end handset offline',
    ],
    yours: [
      'Your approval matrix, and who sits in it',
      'A handful of real sellers to try the app before everyone gets it',
    ],
  },
  {
    n: '05',
    days: 'Day 10',
    title: 'Go-live on a live cycle',
    body: 'The first live cycle closes on Crizant One with our team alongside yours. Nothing is paid out of a cycle that still has unreviewed exceptions, so the gate is doing real work on day one rather than being switched on later.',
    ours: [
      'The first live cycle run, reviewed and released with you',
      'Exceptions worked through together rather than handed over as a list',
      'Handover to your team, or to managed operations if that is the model',
    ],
    yours: ['The cycle. That is the whole ask on day ten.'],
  },
];

export const whenItTakesLonger: { label: string; body: string }[] = [
  {
    label: 'The schemes are not written down anywhere',
    body: 'Where scheme logic lives in a spreadsheet nobody has owned for two years, day one to two becomes a week of archaeology. This is the single most common reason an implementation runs long, and it is worth knowing before you start rather than during.',
  },
  {
    label: 'A core system cannot produce the data',
    body: 'If the transaction feed cannot carry the dates that decide which scheme version applies, the fix is upstream and it is not ours to make. We will tell you this in the technical session rather than in week three.',
  },
  {
    label: 'More than two markets at once',
    body: 'Each additional market adds a compliance surface and a currency to the close. Multi-market go-lives are sequenced rather than parallel, and we will say so when scoping.',
  },
  {
    label: 'The parallel run finds something large',
    body: 'Occasionally the reconciliation surfaces a difference big enough that it has to go to finance before go-live can proceed. That is the process working, and it is worth the delay — but it is a delay, and it belongs on this list honestly.',
  },
];
