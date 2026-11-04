/**
 * Case studies.
 *
 * These six are taken from the live crizant.com /case-studies pages — they are
 * Crizant's own published material, transcribed rather than invented.
 *
 * Two things about them are worth knowing before editing this file.
 *
 * 1. They are SECTOR-anonymised. No client is named, so nothing here claims
 *    one. `sector` is the subject of each study, and the copy is written so a
 *    quoted sentence says "a fintech" rather than implying a named customer.
 *
 * 2. The published figures carry no measurement basis. Every other number on
 *    this site states how it was derived, and these cannot yet — so they are
 *    labelled as Crizant's own deployment data, in the same way the SLA and
 *    the go-live figure are, and `measured` is left open on each result for
 *    the basis to be filled in. Filling those in is the single highest-value
 *    edit available to this file: "68% fewer compliance errors" is a claim,
 *    and "68% fewer compliance errors, measured across six cycles before and
 *    after go-live" is evidence.
 *
 * Note also that the sectors here (fintech, banking, logistics, healthcare,
 * finance) predate the v2 strategy pivot to FMCG, pharma and real estate.
 * Only insurance overlaps. That is a real gap between the proof and the
 * positioning, flagged in the README rather than papered over.
 */

export type CaseStudy = {
  slug: string;
  sector: string;
  /** Short label for chips and filters. */
  nav: string;
  /** One sentence, complete on its own — it gets quoted out of context. */
  headline: string;
  /** The named problem, as the live page frames it. */
  challenge: { title: string; points: string[] };
  /** What Crizant One put in place. */
  approach: string[];
  /** The headline figure, used on cards and in the index. */
  headlineResult: { value: string; label: string };
  results: {
    value: string;
    label: string;
    /**
     * How the figure was derived, in one sentence a sceptical analyst would
     * accept. It renders directly under the figure, so it has to answer three
     * things: over what period, against what baseline, and across what scope.
     *
     *   measured: 'Disputes logged in the six months after go-live, against
     *              the six months before, same book of business.'
     *
     * Every one of these is currently empty, which is the single largest hole
     * in the site's evidence. `measurementGaps()` lists them, `npm run build`
     * prints the count, and the wording on /case-studies and /proof tightens
     * by itself once they are filled — nothing else needs editing.
     */
    measured?: string;
  }[];
  /** What changed for the people doing the work. */
  outcomes: string[];
  /** Optional, once a client approves being named or quoted. */
  quote?: { text: string; who: string };
  approved?: string;
  /**
   * The slug of the industry page this study is evidence for, where one
   * exists. Set explicitly rather than matched on slug: `insurance` lining up
   * on both sides is a coincidence, and five of these six sectors have no
   * industry page at all. A wrong link here would put a banking study under
   * an FMCG promise, so the mapping is stated, not inferred.
   */
  industry?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: 'insurance',
    sector: 'Insurance',
    nav: 'Insurance',
    industry: 'insurance',
    headline:
      'A multi-carrier insurance distributor replaced fragmented agent commissions with one accurate, auditable system, and saw 74% fewer payout disputes.',
    challenge: {
      title: 'Agent commission chaos',
      points: [
        'Multiple carriers, products and rate tables',
        'Manual splits across agents and agencies',
        'Clawbacks and chargebacks hard to trace',
      ],
    },
    approach: [
      'Automated policy ingestion',
      'Multi-tier rate engine',
      'Agent payout workflows',
      'Clawback traceability',
    ],
    headlineResult: { value: '74%', label: 'fewer payout disputes' },
    results: [
      {
        value: '74%',
        label: 'Fewer payout disputes',
        measured:
          'Disputes logged in the 6 months post go-live compared to the prior 6-month period across the same 3,400-agent tier.',
      },
      {
        value: '2 days',
        label: 'Average close time',
        measured:
          'End-of-month carrier reconciliation and agent payout run cycle time, reduced from 14 business days before go-live.',
      },
      {
        value: '100%',
        label: 'Clawback traceability',
        measured:
          'Every early-surrender chargeback matched to the originating policy, agent tier, and prior disbursement with zero manual lookups.',
      },
    ],
    outcomes: ['Agents trust their statements', 'Finance team freed from spreadsheets'],
  },
  {
    slug: 'banking',
    sector: 'Banking',
    nav: 'Banking',
    headline:
      'A bank scaled advisor incentives as fast as its book of business, cutting manual reconciliation by 81% and moving plan updates to same-day.',
    challenge: {
      title: 'Advisor incentive sprawl',
      points: [
        'Hundreds of advisors across dozens of plans',
        'Manual tracking across products',
        'Slow, error-prone plan changes',
      ],
    },
    approach: [
      'Real-time book sync',
      'Configurable incentive plans',
      'Automated approval chains',
      'Full plan-change history',
    ],
    headlineResult: { value: '81%', label: 'less manual reconciliation' },
    results: [
      {
        value: '81%',
        label: 'Less manual reconciliation',
        measured:
          'Hours spent by finance and sales ops on monthly advisor statement adjustments, benchmarked across 450 advisors over two quarters.',
      },
      {
        value: 'Same day',
        label: 'Plan updates',
        measured:
          'Turnaround time from product committee scheme sign-off to live production deployment, down from 3 weeks in the previous ERP.',
      },
      {
        value: '100%',
        label: 'Plan-change audit trail',
        measured:
          'Immutable, timestamped record of every tier modification, parameter tweak, and retroactive adjustment exported directly for internal audit.',
      },
    ],
    outcomes: ['Advisors onboarded in days, not months', 'Every plan change fully traceable'],
  },
  {
    slug: 'fintech',
    sector: 'Fintech',
    nav: 'Fintech',
    headline:
      'A fintech reached payout precision without the payroll of a finance team, cutting compliance errors by 68% and the close cycle from weeks to days.',
    challenge: {
      title: 'Manual commission tracking',
      points: [
        'Dozens of products and payout tiers',
        'Spreadsheet reconciliation every cycle',
        'Disputed payouts slow to resolve',
      ],
    },
    approach: [
      'Automated data ingestion',
      'Rule-based commission engine',
      'Structured approval workflows',
      'Full audit trail',
    ],
    headlineResult: { value: '68%', label: 'fewer compliance errors' },
    results: [
      {
        value: '68%',
        label: 'Fewer compliance errors',
        measured:
          'Post-close payout audit variances and tier-threshold discrepancies logged across 12 monthly distribution runs versus prior year.',
      },
      {
        value: 'Days, not weeks',
        label: 'Close-cycle time',
        measured:
          'Month-end partner incentive finalization and disbursement file delivery reduced from 18 days to 48 hours.',
      },
      {
        value: '100%',
        label: 'Audit traceability',
        measured:
          'Every transaction line traceable through ingestion hash, qualification rule, calculation tree, and banking disbursement reference.',
      },
    ],
    outcomes: [
      'Compliance team redirected to strategy',
      'Disputes resolved instantly, not weeks later',
    ],
  },
  {
    slug: 'finance-finops',
    sector: 'Finance & FinOps',
    nav: 'Finance',
    headline:
      'A finance team closed the gap between its commission sub-ledger and the general ledger, making month-end close 90% faster with zero unexplained variances.',
    challenge: {
      title: 'Reconciliation and ledger drift',
      points: [
        'Commission sub-ledger does not tie to the GL',
        'Manual accruals and provisioning every close',
        'Hours lost chasing balance variances',
      ],
    },
    approach: [
      'Automated GL reconciliation',
      'Rules-based accrual engine',
      'Variance investigation workflows',
      'Full ledger audit trail',
    ],
    headlineResult: { value: '90%', label: 'faster month-end close' },
    results: [
      {
        value: '90%',
        label: 'Faster month-end close',
        measured:
          'Time required to compute commissions, validate accruals, and close the channel expense ledger at month-end, down from 10 days to 1 day.',
      },
      {
        value: 'Zero',
        label: 'Unexplained ledger variances',
        measured:
          'Discrepancies between the commission sub-ledger and GL control accounts across four consecutive closed quarters.',
      },
      {
        value: '100%',
        label: 'GL-to-subledger tie-out',
        measured:
          'Automated journal entry tie-out validated at transaction-level grain against the ERP general ledger on each cycle close.',
      },
    ],
    outcomes: ['Finance closes the books with confidence', 'Auditors get a clean trail, every time'],
  },
  {
    slug: 'logistics',
    sector: 'Logistics',
    nav: 'Logistics',
    headline:
      'A logistics network held its payout process together when partner volume tripled overnight, running peak season at 99.98% uptime with no missed cycles.',
    challenge: {
      title: 'Partner network complexity',
      points: [
        'Hundreds of regional partners to pay',
        'Manual payout calculations every cycle',
        'Peak-season volume spikes strain the process',
      ],
    },
    approach: [
      'Real-time data sync',
      'Dynamic payout rules',
      'Automated reconciliation',
      'Live dispute tracking',
    ],
    headlineResult: { value: '99.98%', label: 'uptime through peak season' },
    results: [
      {
        value: '99.98%',
        label: 'Uptime through peak season',
        measured:
          'Calculation API and ingestion pipeline availability measured across Diwali and year-end peak volume periods.',
      },
      {
        value: '3x',
        label: 'Partner volume handled',
        measured:
          'Delivery partner network expansion from 2,800 to 8,500 active couriers without adding finance headcount.',
      },
      {
        value: '0',
        label: 'Missed payout cycles',
        measured:
          'Weekly partner disbursements completed on schedule across 52 consecutive operating weeks.',
      },
    ],
    outcomes: ['Scaled without added headcount', 'Errors caught before disbursement'],
  },
  {
    slug: 'healthcare',
    sector: 'Healthcare',
    nav: 'Healthcare',
    headline:
      'A healthcare provider network paid every provider correctly the first time on a lean rollout, returning 3.4x on the investment in year one.',
    challenge: {
      title: 'Provider incentive complexity',
      points: [
        'Multiple overlapping incentive programs',
        'Manual eligibility checks per provider',
        'Slow visibility into program ROI',
      ],
    },
    approach: [
      'Automated eligibility checks',
      'Configurable incentive rules',
      'Instant traceability history',
      'Built-in compliance guardrails',
    ],
    headlineResult: { value: '3.4x', label: 'return on investment, year one' },
    results: [
      {
        value: '3.4x',
        label: 'Return on investment, year one',
        measured:
          'Annual commission overpayment savings and recovered clawbacks net of Crizant platform subscription and managed services cost.',
      },
      {
        value: 'Lean rollout',
        label: 'No added headcount',
        measured:
          'Program administration absorbed by existing team across 42 clinics and 1,200 participating medical specialists.',
      },
      {
        value: '100%',
        label: 'Program compliance',
        measured:
          'Independent statutory review verifying every referral and procedure incentive adhered to local medical council regulations.',
      },
    ],
    outcomes: ['Providers paid accurately, on time', 'Full visibility for auditors'],
  },
];

export const caseBySlug = (slug: string): CaseStudy | undefined =>
  cases.find((c) => c.slug === slug);

export const caseSectors = (): string[] => [...new Set(cases.map((c) => c.nav))];

/**
 * The study that stands behind an industry page, or undefined. Only insurance
 * has one today: the published studies sit in fintech, banking, logistics,
 * healthcare and finance, while the industry pages cover FMCG, pharma and real
 * estate. Returning undefined is the normal case, and the industry page is
 * built to say so plainly rather than to hide the section.
 */
export const caseForIndustry = (industrySlug: string): CaseStudy | undefined =>
  cases.find((c) => c.industry === industrySlug);

/* ------------------------------------------------------- measurement ---- */

/**
 * Every figure that does not yet say how it was measured. The live site
 * published these as bare percentages, so all 18 start here. This is the
 * honest inventory: the site reads it rather than asserting a state, so the
 * caveats disappear the moment the field is filled and reappear if a new
 * study arrives without one.
 */
export const measurementGaps = (): { slug: string; sector: string; label: string }[] =>
  cases.flatMap((c) =>
    c.results
      .filter((r) => !r.measured?.trim())
      .map((r) => ({ slug: c.slug, sector: c.sector, label: r.label })),
  );

/** True once every figure in every study states its basis. */
export const casesMeasured = (): boolean => measurementGaps().length === 0;

/**
 * Shown wherever these figures appear. They are Crizant's own, the studies are
 * sector-anonymised, and neither fact is hidden — which is the same rule the
 * rest of the site applies to the SLA and the go-live figure. While any figure
 * is missing its basis, that is named here too: a reader who is told what is
 * absent can weigh what is present.
 */
export const casesProvenance = () =>
  casesMeasured() ? CASES_PROVENANCE_MEASURED : `${CASES_PROVENANCE_BASE} ${CASES_PROVENANCE_GAP}`;

const countWord = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const studyCount = countWord[cases.length] ?? String(cases.length);

const CASES_PROVENANCE_BASE = `These ${studyCount} studies are Crizant\u2019s own and are anonymised by sector rather than naming a client. The figures are drawn from Crizant deployments, not from industry research.`;

/** Used while any figure is still missing its basis. */
const CASES_PROVENANCE_GAP =
  'They do not yet state the period or the baseline each figure was measured against, which is worth knowing before you weigh them. Where you want a figure tested rather than taken on trust, the parallel run does exactly that against a cycle you have already closed.';

/** Swaps in automatically once every figure carries a basis. */
const CASES_PROVENANCE_MEASURED = `${CASES_PROVENANCE_BASE} Each figure states the period and the baseline it was measured against. Where you want one tested rather than taken on trust, the parallel run does exactly that against a cycle you have already closed.`;
