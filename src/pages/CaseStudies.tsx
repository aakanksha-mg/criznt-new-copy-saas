import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Breadcrumbs, Cta } from '@/components/ui';
import { Stagger } from '@/components/motion';
import { cases, caseSectors, casesProvenance } from '@/data/cases';

/** Spelt out, and read off the data, so the headline cannot outlive the file. */
const COUNT = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const headcount = COUNT[cases.length] ?? String(cases.length);

export default function CaseStudies() {
  const [sector, setSector] = useState<string | null>(null);
  const shown = sector ? cases.filter((c) => c.nav === sector) : cases;

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Case Studies', path: '/case-studies' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Case studies</span>
              <h1 className="pagehero__title">
                {headcount} deployments.{' '}
                <span className="accent gradtext">One glance each.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Each one states the problem as the client described it, what Crizant One put in
                place, and what changed. They are anonymised by sector rather than naming a client,
                and the figures are Crizant&rsquo;s own — both of which this page says plainly
                rather than leaving you to work out.
              </p>
            </div>
            <div className="card card--pad-lg">
              <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-3)' }}>
                <Icon name="eye" />
              </span>
              <h2 style={{ fontSize: '1rem', marginTop: 0 }}>Prefer your own numbers?</h2>
              <p className="card__body">
                Every engagement opens with a parallel run against a cycle you have already closed.
                That is a harder test than any study on this page.
              </p>
              <Link to="/proof" className="btn btn--ghost btn--sm" style={{ marginTop: 'var(--space-3)' }}>
                How to check our claims
                <Icon name="arrow" size={13} className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pillbar" style={{ marginBottom: 'var(--space-5)' }}>
            <button type="button" aria-pressed={sector === null} onClick={() => setSector(null)}>
              All results
            </button>
            {caseSectors().map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sector === s}
                onClick={() => setSector(sector === s ? null : s)}
              >
                {s}
              </button>
            ))}
          </div>

          <Stagger className="grid grid--3">
            {shown.map((c) => (
              <Link key={c.slug} to={`/case-studies/${c.slug}`} className="card card--hover card--pad-lg spot">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {c.sector}
                </span>
                <div className="casestat">
                  <span className="casestat__value">{c.headlineResult.value}</span>
                  <span className="casestat__label">{c.headlineResult.label}</span>
                </div>
                <p className="card__body">{c.headline}</p>
                <span className="card__foot">
                  Read the case study
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </Stagger>

          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            {casesProvenance()}
          </p>
        </div>
      </section>

      <Cta
        eyebrow="Your own cycle"
        title="The study that matters most is yours."
        body="Thirty minutes to scope it, then we compute a period you have already paid and reconcile line by line against your own payout file."
        secondary={{ label: 'Seven ways to check our claims', to: '/proof' }}
      />
    </>
  );
}
