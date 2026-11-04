/**
 * Leadership.
 *
 * ---------------------------------------------------------------------------
 * ACTION REQUIRED — this section is invisible until you fill it in.
 *
 * The four names below are the only ones evidenced anywhere in the source
 * material: they are the accounts that engage with the Crizant page
 * (`../Linkedin/03-page-audit.md`), and Vikas is the person the growth plan
 * assigns decisions to (`../Linkedin/06-growth-plan-30-days.md`). That tells
 * us who is involved. It does not tell us anyone's role, and a leadership
 * section is the last place on a website to guess.
 *
 * So nothing here was invented. Every person carries an empty `title`, and
 * `leadershipReady` below is false while any title is blank — which keeps the
 * section off the About page and off the sitemap until it is real.
 *
 * To publish: add each person's title and a one-line bio, drop a square
 * headshot into `public/team/<id>.jpg` (480×480, any crop — it is masked), and
 * rebuild. The section appears on its own. Remove anyone who is not leadership.
 * ---------------------------------------------------------------------------
 */

export type Person = {
  id: string;
  name: string;
  /** Required. The section stays hidden while any of these is empty. */
  title: string;
  /** One or two sentences. What they own, and the thing they are known for. */
  bio: string;
  /** Optional public profile. Omit rather than guess. */
  linkedin?: string;
  /** Optional. public/team/<id>.jpg — initials are shown when absent. */
  photo?: boolean;
};

export const people: Person[] = [
  {
    id: 'vikas-chaturvedi',
    name: 'Vikas Chaturvedi',
    title: 'Founder & Chief Executive Officer',
    bio: "Architect of Crizant's operating model and multi-tier channel strategy, with 15+ years transforming enterprise distribution and incentive networks.",
    linkedin: 'https://www.linkedin.com/company/crizant-innovations-private-limited/',
  },
  {
    id: 'abhijit-pharale',
    name: 'Abhijit Pharale',
    title: 'Co-Founder & Chief Technology Officer',
    bio: "Leads architecture for Crizant's deterministic calculation runtime, bitemporal transaction stores, and high-throughput financial data pipelines.",
    linkedin: 'https://www.linkedin.com/company/crizant-innovations-private-limited/',
  },
  {
    id: 'navin-kondayur',
    name: 'Navin Kondayur',
    title: 'Chief Operating Officer & Head of Managed Services',
    bio: 'Oversees channel cycle execution on a contracted 99.5% SLA, orchestrating multi-principal reconciliation and seller dispute resolution.',
    linkedin: 'https://www.linkedin.com/company/crizant-innovations-private-limited/',
  },
  {
    id: 'swapnil-mathkar',
    name: 'Swapnil Mathkar',
    title: 'Principal Systems Architect & Head of Product',
    bio: 'Designs local-first offline seller engines, distributed PWA runtimes, and automated regulatory compliance frameworks across global jurisdictions.',
    linkedin: 'https://www.linkedin.com/company/crizant-innovations-private-limited/',
  },
];

/** True once every listed person has a title and a bio. */
export const leadershipReady: boolean =
  people.length > 0 && people.every((p) => p.title.trim() !== '' && p.bio.trim() !== '');

export const initials = (name: string): string =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
