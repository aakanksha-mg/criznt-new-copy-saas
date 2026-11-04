import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Breadcrumbs, Cta } from '@/components/ui';
import { terms, glossaryTags, termBySlug } from '@/data/glossary';

export default function Glossary() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return terms.filter((t) => {
      if (tag && !t.tags.includes(tag)) return false;
      if (!needle) return true;
      return (
        t.term.toLowerCase().includes(needle) ||
        (t.aka ?? '').toLowerCase().includes(needle) ||
        t.definition.toLowerCase().includes(needle)
      );
    });
  }, [q, tag]);

  const letters = useMemo(
    () => [...new Set(shown.map((t) => t.letter))].sort(),
    [shown],
  );

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Glossary', path: '/glossary' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Glossary</span>
              <h1 className="pagehero__title">
                The vocabulary of{' '}
                <span className="accent gradtext">channel commission.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {terms.length} terms, defined properly. Each definition is written to stand on its
                own — including when something quotes one sentence of it with no surrounding page.
                Where a term means something specific in one industry, the definition says which.
              </p>
            </div>
            <div className="card card--pad-lg">
              <label className="field" style={{ marginBottom: 'var(--space-3)' }}>
                <span className="field__label">Search the glossary</span>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="clawback, EoM, secondary sales…"
                  className="input"
                />
              </label>
              <div className="pillbar">
                <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)}>
                  All
                </button>
                {glossaryTags.map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={tag === g}
                    onClick={() => setTag(tag === g ? null : g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <p className="fine" style={{ marginTop: 'var(--space-3)' }} aria-live="polite">
                Showing {shown.length} of {terms.length} terms
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {letters.length === 0 ? (
            <p className="lead">
              No term matches that. <button type="button" className="linkbtn" onClick={() => { setQ(''); setTag(null); }}>Clear the filters</button> to see all {terms.length}.
            </p>
          ) : null}

          {letters.map((L) => (
            <div key={L} className="glossary__group">
              <div className="glossary__letter" aria-hidden="true">
                {L}
              </div>
              <dl className="glossary">
                {shown
                  .filter((t) => t.letter === L)
                  .map((t) => (
                    <div className="glossary__item" key={t.slug} id={t.slug}>
                      <dt>
                        <a href={`#${t.slug}`} className="glossary__term">
                          {t.term}
                        </a>
                        {t.aka ? <span className="glossary__aka">also: {t.aka}</span> : null}
                      </dt>
                      <dd>
                        <p className="glossary__def">{t.definition}</p>
                        <p className="glossary__detail">{t.detail}</p>
                        {t.related?.length ? (
                          <p className="glossary__related">
                            <span>Related:</span>{' '}
                            {t.related
                              .map((r) => termBySlug(r))
                              .filter((r): r is NonNullable<typeof r> => Boolean(r))
                              .map((r, i, arr) => (
                                <span key={r.slug}>
                                  <a href={`#${r.slug}`}>{r.term}</a>
                                  {i < arr.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                          </p>
                        ) : null}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}

          <div className="cluster" style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/answers" className="btn btn--ghost btn--sm">
              Direct answers to buyer questions
              <Icon name="arrow" size={13} className="btn__arrow" />
            </Link>
            <Link to="/resources" className="btn btn--quiet btn--sm">
              Longer analysis
            </Link>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Still a question"
        title="If a term here describes your month, we should talk."
        body="Most of these definitions exist because the thing they describe cost somebody money. Bring one of your own schemes to a thirty-minute session and we will configure it live."
        secondary={{ label: 'Model your leakage first', to: '/leakage-calculator' }}
      />
    </>
  );
}
