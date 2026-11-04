import type { IconName } from '@/components/Icon';

/**
 * The engineering page.
 *
 * Everything here is an architecture claim — a description of how the system
 * is built — rather than a benchmark. Where a figure appears it is the same
 * representative production cycle used elsewhere on the site, and it is
 * labelled as representative. The brand's evidence rule applies here exactly
 * as it does to the regulatory material: no number without its source.
 */

export type Principle = {
  n: string;
  title: string;
  body: string;
  detail: string;
  icon: IconName;
};

export const principles: Principle[] = [
  {
    n: '01',
    title: 'The computation is deterministic and re-runnable',
    body: 'A commission cycle is a pure function of dated inputs: the scheme version, the hierarchy, the rates and the transactions, each as they stood on the transaction date.',
    detail:
      'Nothing is computed in place and nothing is overwritten. Re-running a cycle from two years ago against the same dated inputs returns the same number it returned then, byte for byte. That property is what makes point-in-time audit reconstruction a query rather than a project — and it is a decision made in the data model, which is the only place it can be made.',
    icon: 'layers',
  },
  {
    n: '02',
    title: 'Everything is effective-dated, nothing is mutated',
    body: 'Schemes, hierarchies, territories, rates and partner status are all bitemporal: we store what was true, and when we learned it.',
    detail:
      'The distinction matters more than it sounds. A seller who moved territory on 1 August, recorded on 14 August, produces two different correct answers depending on whether you are asking "what did we pay" or "what should we have paid". Systems that store a single timeline cannot express that, which is why their corrections arrive as unexplained adjustments.',
    icon: 'clock',
  },
  {
    n: '03',
    title: 'The cycle is reviewed before it is paid, not after',
    body: 'Computation and disbursement are separate stages with an explicit gate between them. Exceptions block the gate.',
    detail:
      'Every anomaly check — duplicate qualification across schemes, a tier applied one level high, an override on a terminated hierarchy, an unrecovered clawback — runs against the computed cycle while it is still provisional. The architecture makes it impossible to pay a cycle that has unreviewed exceptions, which is a stronger guarantee than a report that someone is supposed to read.',
    icon: 'shield',
  },
  {
    n: '04',
    title: 'Offline is the default, not the fallback',
    body: 'The seller app is built as a local-first application that synchronises, rather than a remote application that caches.',
    detail:
      'It holds its own durable store, renders entirely from it, and reconciles against the server when a connection returns. There is no loading state that can fail, because there is no fetch on the critical path. This is the harder way to build it and it is the only way that survives a district where the signal drops — a connected dashboard fails exactly at the moment a field seller opens it.',
    icon: 'offline',
  },
  {
    n: '05',
    title: 'Ingestion validates before it accepts',
    body: 'Every inbound feed is checked on arrival for completeness, shape and continuity against the previous period.',
    detail:
      'A feed that arrives late, short, duplicated or with a silently changed schema raises an exception against the cycle instead of quietly producing a smaller payout run. In practice this catches about as many real problems as the commission logic does, because upstream core systems change without announcing it and a 4% shortfall in a transaction file does not look like an error — it looks like a slow month.',
    icon: 'scale',
  },
  {
    n: '06',
    title: 'Simulation runs on production data, in isolation',
    body: 'A draft scheme can be evaluated against real historical cycles without any possibility of touching a payout record.',
    detail:
      'Scheme simulation uses the same engine as production — not a simplified model of it — against an isolated copy. If the simulation and the eventual cycle disagreed, the feature would be worse than useless, so they run the same code path. That is why the projected payout in the builder is a number you can take to a budget conversation.',
    icon: 'spark',
  },
];

export type Capability = { label: string; value: string; note: string };

/** Labelled as representative throughout — these describe the shape of a
 *  production cycle, not a benchmark result. */
export const scale: Capability[] = [
  {
    label: 'Transactions in a cycle',
    value: '184,207',
    note: 'A representative production cycle. The computation is partitioned by hierarchy branch, so cycle time scales with the widest branch rather than the total.',
  },
  {
    label: 'Hierarchy depth',
    value: '6 tiers',
    note: 'Organisation through to individual seller, effective-dated, with splits resolved against the structure live on the transaction date.',
  },
  {
    label: 'Concurrent live schemes',
    value: '42',
    note: 'Each versioned independently. Overlap between schemes is detected structurally rather than by sampling, which is what catches duplicate qualification.',
  },
  {
    label: 'Currencies in one close',
    value: '3+',
    note: 'Local currency at the seller, group currency at consolidation, with the rate and date held against each line so the consolidated figure decomposes.',
  },
];

export type Practice = { title: string; body: string };

export const practices: Practice[] = [
  {
    title: 'The parallel run is the acceptance test',
    body: 'Before a client pays a single cycle on Crizant One, we compute the same period on both the old process and the new one and reconcile the difference line by line. We would rather be measured against your last closed cycle than against a case study. Where the difference turns out to be leakage in the old process, that is the first measurable result of the engagement — and it usually lands before go-live.',
  },
  {
    title: 'Regulatory frameworks are maintained centrally',
    body: 'IRDAI, RBI, SEBI, CBUAE, Takaful and OJK logic lives in one place and is updated once, not configured per client. A client who has customised their own copy of a regulatory rule cannot receive a correction to it, which is why we do not let them.',
  },
  {
    title: 'The seller app ships as a progressive web app',
    body: 'No app store review, no device-management policy, no update to push to thousands of handsets in the field. A link, added to a home screen. The deployment constraint shaped the architecture rather than the other way round.',
  },
  {
    title: 'Operators and engineers share a building',
    body: 'The managed-services team runs cycles on the same product the engineering team ships, with no internal tooling that clients do not get. A bug that makes a cycle painful to close is felt by the people who can fix it, in the week it happens. This is the main reason the product is shaped the way it is.',
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: 'Computation',
    items: [
      'Deterministic, partitioned cycle engine',
      'Bitemporal scheme and hierarchy store',
      'Rule evaluation with full derivation capture',
      'Isolated simulation against historical cycles',
    ],
  },
  {
    group: 'Data',
    items: [
      'API and scheduled-file ingestion with arrival validation',
      'Continuity checks against the prior period',
      'Immutable, append-only audit log',
      'Residency arranged per engagement where a market requires it',
    ],
  },
  {
    group: 'Delivery',
    items: [
      'Local-first progressive web app',
      'Background reconciliation on reconnect',
      '8+ languages including a true RTL layout',
      'Voice navigation for the field',
    ],
  },
];
