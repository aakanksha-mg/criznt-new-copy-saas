/**
 * The proof page.
 *
 * A challenger with no published logos has two options: stay quiet about
 * evidence, or make the limits of it the position. This takes the second.
 * Everything here is checkable by the reader without asking Crizant for
 * anything, which is a stronger claim than a logo wall.
 *
 * The six case studies in `cases.ts` sit alongside this material rather than
 * replacing it: they say what changed, and this page says how far to trust
 * that. Every count below is read off `cases`, so adding or removing a study
 * cannot leave a stale "six" in the prose or in llms.txt.
 */
import { cases, caseSectors, casesMeasured, measurementGaps } from './cases';

const n = cases.length;
const word = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][n] ?? String(n);
const studies = `${word} case ${n === 1 ? 'study' : 'studies'}`;
const sectorList = (() => {
  const xs = caseSectors().map((x) => x.toLowerCase().replace(' & ', ' and '));
  return xs.length < 2 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
})();

export type ProofItem = {
  n: string;
  title: string;
  claim: string;
  how: string;
  /** Where the reader goes to check it themselves. */
  check?: { label: string; to: string };
};

export const proofs: ProofItem[] = [
  {
    n: '01',
    title: 'Compute one of your own closed cycles before you buy anything',
    claim:
      'Crizant One finds commission leakage that your current process does not.',
    how: 'Every engagement opens with a parallel run: we compute a period you have already paid and reconcile it line by line against your own payout file, with each difference explained by the rule that produced it. You are measuring us against your own numbers, not against a reference call, and the result arrives before go-live rather than after signature. Where it finds nothing, you have learned something useful and the conversation is a short one.',
    check: { label: 'Arrange a parallel run', to: '/contact' },
  },
  {
    n: '02',
    title: 'Check our regulatory reading against the primary document',
    claim:
      'Crizant reads regulation properly rather than repeating what other vendors say about it.',
    how: 'Every regulatory figure on this site names the paper and the paragraph it came from, including the detail that the IRDAI consultation is hosted at iib.gov.in/dr rather than on the regulator’s own site. Twice during that work the primary document contradicted a figure we had already drafted, and the figure was corrected rather than published. You can verify any of it in an afternoon, which is the point of citing it that way.',
    check: { label: 'The compliance pages', to: '/compliance' },
  },
  {
    n: '03',
    title: 'Every figure on this site is labelled with where it came from',
    claim: 'Crizant does not dress its own deployment data as industry research.',
    how: 'The site uses two kinds of number and never blurs them. Crizant’s own figures — the 99.5% service level, the ten-day go-live, the 3–8% leakage range, the representative cycle on the engineering page — say so in the page copy, in the structured data and in llms.txt. Regulatory figures carry a citation. There is no third category of unattributed statistic, because that is the category vendors use to say things they cannot support.',
    check: { label: 'How the platform is built', to: '/engineering' },
  },
  {
    n: '04',
    title: 'Read what we concede, not just what we claim',
    claim: 'Crizant tells you where something else is the better answer.',
    how: 'Each comparison on this site names what the alternative genuinely does better — a spreadsheet changes in thirty seconds with no approval; an ERP module is already inside your financial controls; a generic ICM platform does quota and territory planning properly and has a longer customer list than ours. A vendor who loses nothing in their own comparison is telling you something about the comparison.',
    check: { label: 'The three comparisons', to: '/compare' },
  },
  {
    n: '05',
    title: 'Markets served and frameworks built are stated separately',
    claim: 'Crizant does not claim regulatory coverage it has not built.',
    how: 'Six regions are served. Three regulatory framework sets are pre-built — IRDAI, RBI and SEBI for India; CBUAE and Takaful for the Middle East; OJK for Indonesia. Those are different claims and this site never merges them into one sentence, because merging them is the fastest way to lose a compliance audience in the first meeting.',
    check: { label: 'Market by market', to: '/compliance' },
  },
  {
    n: '06',
    title: 'Ask the five integration questions — of us and of everyone else',
    claim: 'Crizant will tell you which of your feeds will cause trouble, before scoping.',
    how: 'Whether a feed carries the dates that decide the scheme version; whether a reversal arrives as an event or has to be inferred; whether a retried send can double-count into a payout; whether a schema change raises an exception or silently shortens a run; whether a mapping change waits on someone else’s release. These are on the integrations page precisely so you can put them to every vendor on your list.',
    check: { label: 'The integration detail', to: '/integrations' },
  },
];

export const caseStudyProof: ProofItem = {
  n: '07',
  title: `Read the ${studies}, including what they leave out`,
  claim: 'Crizant One has been deployed and has produced measurable change.',
  how: `${word.charAt(0).toUpperCase() + word.slice(1)} studies across ${sectorList}, each stating the problem as the client framed it, what was put in place, and what changed. ${
    casesMeasured()
      ? 'Every figure states the period and the baseline it was measured against, so you can check the arithmetic rather than take the number on trust.'
      : `${measurementGaps().length} figures across them do not yet carry a measurement basis \u2014 no period, no baseline \u2014 and this site says so on every page they appear on rather than leaving you to notice.`
  }`,
  check: { label: `All ${word} case studies`, to: '/case-studies' },
};

/**
 * Said plainly, near the top, because the buyer already knows. Rewritten once
 * the six case studies were published: the honest position is no longer "we
 * have nothing to show" but "here is exactly what the six studies are worth".
 * Naming their three limits here is what makes the figures in them credible.
 */
export const theHonestBit = {
  title: 'What the case studies do and do not show',
  body: `Crizant publishes ${studies} and no customer logos. The studies are sector-anonymised — no client is named and no region is given — and the figures in them are our own rather than third-party audited.${
    casesMeasured() ? '' : ' They do not yet state the period or the baseline each figure was measured against.'
  } We would rather say that than put up a grey logo wall or imply an audit we have not had, because a buyer’s procurement team checks it first anyway. What we offer alongside them is the parallel run: bring a commission cycle you have already closed and measure us against it. That is a harder test than a reference call or a case study, and it is available before you commit to anything.`,
};
