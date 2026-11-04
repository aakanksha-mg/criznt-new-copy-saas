import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta } from '@/components/ui';
import { Stagger } from '@/components/motion';
import { ComparisonDiffMatrix } from '@/components/compare/ComparisonDiffMatrix';
import { comparisons } from '@/data/compare';

export default function Compare() {
  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Compare', path: '/compare' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Architectural Comparison</span>
              <h1 className="pagehero__title">
                Three comparisons,{' '}
                <span className="accent gradtext">each one conceding something.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                A comparison page that loses nothing is a comparison page nobody believes. Each of
                these names what the other option genuinely does better, because in a real
                evaluation you will find that out anyway — and it is better that you read it here.
              </p>
              <div className="card card--pad-md" style={{ marginTop: 'var(--space-4)', background: 'var(--surface-glass)' }}>
                <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-2)' }}>
                  <Icon name="scale" />
                </span>
                <h2 style={{ fontSize: '0.95rem', margin: 'var(--space-1) 0' }}>The comparison that decides it</h2>
                <p className="card__body" style={{ fontSize: '0.82rem', margin: 0 }}>
                  Compute one of your already-closed cycles on both and reconcile line by line — it is the only version that uses your own numbers.
                </p>
              </div>
            </div>
            <div>
              <ComparisonDiffMatrix />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Direct Competitor Analyses"
            title="Three specific alternative paths"
            lead="Select an architectural comparison to examine code, data model, and operational trade-offs."
          />
          <Stagger className="grid grid--3">
            {comparisons.map((c) => (
              <Link key={c.slug} to={`/compare/${c.slug}`} className="card card--hover card--pad-lg spot">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  Crizant One {c.nav}
                </span>
                <h2 className="card__title">
                  {c.h1} {c.accentH1}
                </h2>
                <p className="card__body">{c.deck}</p>
                <p className="card__body card__body--quiet">
                  <strong>Concedes:</strong> {c.concede.title.replace(/^What /, '')}
                </p>
                <span className="card__foot">
                  Read the comparison
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Why these three"
            title="Because these are what you are actually choosing between"
          />
          <p className="lead">
            Almost nobody evaluating a commission platform is choosing between two commission
            platforms. They are choosing between a spreadsheet library that works and a system that
            is auditable; between a module they already own and one built for a channel; or between
            a category leader built for quota-carrying employees and something built for a channel
            that reverses. Those are the three real decisions, so those are the three pages.
          </p>
        </div>
      </section>

      <Cta
        eyebrow="Parallel run"
        title="Use your own last closed cycle as the benchmark."
        body="We would rather be measured against a period you have already paid than against a case study. Thirty minutes to scope it."
        secondary={{ label: 'How Crizant One is built', to: '/engineering' }}
      />
    </>
  );
}
