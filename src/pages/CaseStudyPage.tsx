import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, Stat, Quote, CheckList } from '@/components/ui';
import { cases, caseBySlug, casesProvenance } from '@/data/cases';
import { industryBySlug } from '@/data/industries';
import NotFound from './NotFound';

/** Spelt out, and read off the data, so no heading outlives the file. */
const COUNT = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export default function CaseStudyPage() {
  const { slug } = useParams();
  const c = slug ? caseBySlug(slug) : undefined;
  if (!c) return <NotFound />;

  const others = cases.filter((x) => x.slug !== c.slug).slice(0, 3);
  /** The industry page this study is evidence for, where the site has one. */
  const ind = c.industry ? industryBySlug(c.industry) : undefined;

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Case Studies', path: '/case-studies' },
              { name: c.sector, path: `/case-studies/${c.slug}` },
            ]}
          />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Case study · {c.sector}</span>
              <h1 className="pagehero__title" style={{ fontSize: 'var(--fs-h1)' }}>
                {c.headline}
              </h1>
              {ind ? (
                <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                  The same mechanic, described in full on{' '}
                  <Link to={`/industries/${ind.slug}`}>{ind.name}</Link>.
                </p>
              ) : null}
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr' }}>
              {c.results.map((r) => (
                <Stat key={r.label} value={r.value} label={r.label} note={r.measured} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="The challenge" title={c.challenge.title} />
              <ul className="crosslist">
                {c.challenge.points.map((p) => (
                  <li key={p}>
                    <Icon name="alert" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHead eyebrow="The Crizant approach" title="What went in" />
              <CheckList items={c.approach} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The outcome"
            title={
              <>
                What changed, <span className="accent">and for whom.</span>
              </>
            }
          />
          <div className="statgrid statgrid--4">
            {c.results.map((r) => (
              <Stat key={r.label} value={r.value} label={r.label} note={r.measured} />
            ))}
          </div>
          <div className="card card--pad-lg" style={{ marginTop: 'var(--space-5)' }}>
            <CheckList items={c.outcomes} />
          </div>
          {c.quote ? (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <Quote text={c.quote.text} who={c.quote.who} />
            </div>
          ) : null}
          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            {casesProvenance()}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="More" title={`${COUNT[others.length]} other deployments`} />
          <div className="grid grid--3">
            {others.map((o) => (
              <Link key={o.slug} to={`/case-studies/${o.slug}`} className="card card--hover spot">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {o.sector}
                </span>
                <div className="casestat">
                  <span className="casestat__value">{o.headlineResult.value}</span>
                  <span className="casestat__label">{o.headlineResult.label}</span>
                </div>
                <span className="card__foot">
                  Read the case study
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Your own cycle"
        title="Measure us against a period you have already paid."
        body="Thirty minutes to scope it. Every difference between our number and yours comes back with the rule that produced it."
        secondary={{ label: `All ${COUNT[cases.length].toLowerCase()} case studies`, to: '/case-studies' }}
      />
    </>
  );
}
