import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta } from '@/components/ui';
import { sortedArticles } from '@/data/insights';
import { answers } from '@/data/answers';

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function Resources() {
  const [lead, ...rest] = sortedArticles();

  return (
    <>
      <PageHero>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Insights', path: '/resources' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Insights</span>
              <h1 className="pagehero__title">
                Mechanism analysis, <span className="accent">not vendor content</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                How a specific rule changes a specific payout. Every regulatory figure here was
                checked against the primary document before publication — twice, that process caught
                a figure of ours that was wrong, and we corrected it rather than publishing it.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <Link to={`/resources/${lead.slug}`} className="card card--hover card--pad-lg">
            <div className="split split--wide-left" style={{ alignItems: 'start' }}>
              <div>
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {lead.pillar}
                </span>
                <h2 style={{ fontSize: 'var(--fs-h2)' }}>{lead.title}</h2>
                <p className="lead">{lead.deck}</p>
                <span className="card__foot" style={{ borderTop: 0, paddingTop: 0 }}>
                  {fmt(lead.published)} · {lead.readingMinutes} min read
                  <Icon name="arrow" size={13} />
                </span>
              </div>
              <div className="keybox" style={{ margin: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-label)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan-400)', fontWeight: 500 }}>
                  In short
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.1em' }}>
                  {lead.takeaways.slice(0, 3).map((t) => (
                    <li key={t} style={{ color: 'var(--white)', fontSize: '0.92rem' }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="All insights" title="The rest" />
          <div className="grid grid--2">
            {rest.map((a) => (
              <Link key={a.slug} to={`/resources/${a.slug}`} className="card card--hover card--pad-lg">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {a.pillar}
                </span>
                <h3 className="card__title">{a.title}</h3>
                <p className="card__body">{a.deck}</p>
                <span className="card__foot">
                  {fmt(a.published)} · {a.readingMinutes} min
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Shorter"
            title="Direct answers"
            lead={`${answers.length} questions answered in a sentence or two each, for when you want the answer rather than the argument.`}
          />
          <div className="grid grid--2">
            {answers.slice(0, 6).map((a) => (
              <Link key={a.slug} to={`/answers/${a.slug}`} className="card card--hover">
                <h3 className="card__title" style={{ fontSize: '1.02rem' }}>
                  {a.q}
                </h3>
                <p className="card__body">{a.short.split('. ')[0]}.</p>
              </Link>
            ))}
          </div>
          <Link to="/answers" className="btn btn--ghost btn--sm" style={{ marginTop: 'var(--space-4)' }}>
            All {answers.length} answers
            <Icon name="arrow" size={14} className="btn__arrow" />
          </Link>
        </div>
      </section>

      <Cta />
    </>
  );
}
