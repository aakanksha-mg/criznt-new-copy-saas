import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta } from '@/components/ui';
import { ComparisonDiffMatrix } from '@/components/compare/ComparisonDiffMatrix';
import { comparisons, comparisonBySlug } from '@/data/compare';
import NotFound from './NotFound';

export default function ComparePage() {
  const { slug } = useParams();
  const c = slug ? comparisonBySlug(slug) : undefined;
  if (!c) return <NotFound />;

  const others = comparisons.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Compare', path: '/compare' },
              { name: c.nav, path: `/compare/${c.slug}` },
            ]}
          />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Comparison · Crizant One vs. {c.otherLabel}</span>
              <h1 className="pagehero__title">
                {c.h1} <span className="accent gradtext">{c.accentH1}</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {c.deck}
              </p>
              <div className="card card--pad-md" style={{ marginTop: 'var(--space-4)', background: 'var(--surface-glass)' }}>
                <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-2)' }}>
                  <Icon name="scale" />
                </span>
                <h2 style={{ fontSize: '0.95rem', margin: 'var(--space-1) 0' }}>How to settle this properly</h2>
                <p className="card__body" style={{ fontSize: '0.82rem', margin: '0 0 var(--space-3)' }}>
                  Compute one of your already-closed cycles on both and reconcile line by line.
                </p>
                <Link to="/contact" className="btn btn--accent btn--sm">
                  Arrange a parallel run
                  <Icon name="arrow" size={13} className="btn__arrow" />
                </Link>
              </div>
            </div>
            <div>
              <ComparisonDiffMatrix currentSlug={c.slug} />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container container--narrow">
          <p className="lead">{c.intro}</p>
        </div>
      </section>

      <section className="section section--tight section--sunken">
        <div className="container">
          <SectionHead eyebrow="Side by side" title={`Crizant One against ${c.otherLabel.toLowerCase()}`} />
          <div className="tablewrap">
            <table className="data">
              <caption>
                Crizant One compared with {c.otherLabel.toLowerCase()}, dimension by dimension.
              </caption>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col" className="col-crizant">
                    Crizant One
                  </th>
                  <th scope="col">{c.otherLabel}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.dim}>
                    <th scope="row">{r.dim}</th>
                    <td className="col-crizant">{r.crizant}</td>
                    <td>{r.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="card card--pad-lg card--accent">
            <span className="eyebrow">The other side of it</span>
            <h2 style={{ fontSize: 'var(--fs-h3)', marginTop: 'var(--space-2)' }}>{c.concede.title}</h2>
            <p className="card__body">{c.concede.body}</p>
          </div>
          <SectionHead eyebrow="Verdict" title="Where each one is the right answer" />
          <p className="lead">{c.verdict}</p>
          <div className="cluster" style={{ marginTop: 'var(--space-5)' }}>
            <Link to="/engineering" className="btn btn--ghost btn--sm">
              How Crizant One is built
              <Icon name="arrow" size={13} className="btn__arrow" />
            </Link>
            <Link to="/pricing" className="btn btn--quiet btn--sm">
              How pricing works
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight section--sunken">
        <div className="container">
          <SectionHead eyebrow="Other comparisons" title="The other two honest ones" />
          <div className="grid grid--2">
            {others.map((o) => (
              <Link key={o.slug} to={`/compare/${o.slug}`} className="card card--hover spot">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  Comparison
                </span>
                <h3 className="card__title">
                  {o.h1} {o.accentH1}
                </h3>
                <p className="card__body">{o.deck}</p>
                <span className="card__foot">
                  Read the comparison
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Parallel run"
        title="Settle it against your own last closed cycle."
        body="Thirty minutes to scope it, then we compute a period you have already paid and reconcile line by line. Every difference comes back with the rule behind it."
        secondary={{ label: 'All three comparisons', to: '/compare' }}
      />
    </>
  );
}
