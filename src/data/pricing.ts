/**
 * Pricing.
 *
 * No price list. Publishing one for a platform that is scoped per engagement
 * would be a number we could not stand behind, and a buyer who reads an
 * invented figure and then hears a different one has learned something about
 * us. What this page publishes instead is the shape of the commercial model,
 * what moves it, what is included, and what is explicitly not charged for —
 * which is the part most vendors leave out and most buyers get caught by.
 */

export type Model = {
  name: string;
  who: string;
  basis: string;
  includes: string[];
  note: string;
  accent?: boolean;
};

export const models: Model[] = [
  {
    name: 'Platform',
    who: 'You have a commission team and want the arithmetic, the audit trail and the seller app.',
    basis: 'Annual subscription, scaled on the number of sellers in the hierarchy and the modules in use.',
    includes: [
      'All six Crizant One modules you license',
      'Unlimited schemes and scheme versions',
      'Unlimited scheme simulation against historical cycles',
      'The offline-first seller app for every seller in scope',
      'Pre-built regulatory frameworks for your market',
      'Platform updates, including regulatory updates, at no extra charge',
      'Standard support and the implementation described below',
    ],
    note: 'Seller count is the hierarchy, not the licence count — an inactive seller who earned nothing in the period is not billable.',
  },
  {
    name: 'Platform + Managed',
    who: 'You want the cycle to close without owning the team that closes it.',
    basis: 'Annual subscription plus a managed-operations fee, against a contracted service level.',
    includes: [
      'Everything in Platform',
      'Scheme configuration and change management by our team',
      'Data operations against your core systems, including feed breaks',
      'Cycle close, pre-close exception review and payout file preparation',
      'Seller helpdesk in the languages your channel speaks',
      'Compliance upkeep as frameworks change',
      'A contracted 99.5% service level',
    ],
    note: 'You keep the platform, the data and every decision. We run the operation, and you can take it in-house at any renewal without migrating anything.',
    accent: true,
  },
];

export const drivers: { label: string; body: string }[] = [
  {
    label: 'Sellers in the hierarchy',
    body: 'The primary driver. A channel of 1,200 and a channel of 120,000 are different products operationally, and the pricing follows that rather than transaction volume.',
  },
  {
    label: 'Modules in scope',
    body: 'Most engagements start with scheme configuration, computation and the seller app. Distribution management, AI pre-close intelligence and the full audit module are commonly added at the first renewal rather than at the start.',
  },
  {
    label: 'Markets and currencies',
    body: 'One market in one currency is a different compliance and reconciliation surface from six markets closing together. Where a pre-built framework exists for your market, it costs nothing extra; where it does not, the configuration is part of the implementation scope.',
  },
  {
    label: 'Core systems to integrate',
    body: 'Two feeds against documented APIs and nine feeds against scheduled files from systems nobody still supports are different implementations. This is the line item most likely to move after the technical session, which is why we scope it before quoting it rather than after.',
  },
  {
    label: 'Managed scope, if any',
    body: 'Cycle frequency, seller-helpdesk volume and the number of schemes under active change are what the managed fee is actually priced on, because they are what the work is.',
  },
];

export const notCharged: string[] = [
  'Per-transaction or per-calculation fees — the engine computes a cycle as many times as you need it to',
  'Charges for additional schemes, scheme versions or simulations',
  'Charges for regulatory framework updates in a market you already license',
  'Charges for the seller app, per seller or per device',
  'Charges for additional read-only or audit users',
  'Charges to export your own data, at any time, including on exit',
];

export const faqNote =
  'A number takes one call and one follow-up: a thirty-minute session to scope sellers, markets and feeds, and a written proposal with the implementation scope priced separately from the subscription so you can see which is which.';
