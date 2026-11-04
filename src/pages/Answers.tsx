import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Breadcrumbs, PageHero, Cta } from '@/components/ui';
import { answers, answerTopics, type AnswerTopic } from '@/data/answers';

export default function Answers() {
  const [topic, setTopic] = useState<AnswerTopic | 'All'>('All');
  const [q, setQ] = useState('');

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return answers.filter(
      (a) =>
        (topic === 'All' || a.topic === topic) &&
        (!term || `${a.q} ${a.short}`.toLowerCase().includes(term)),
    );
  }, [topic, q]);

  return (
    <>
      <PageHero>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Answers', path: '/answers' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Answers</span>
              <h1 className="pagehero__title">
                {answers.length} questions, <span className="accent">answered directly</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Every answer here is written to stand on its own — complete in its first sentence,
                with the subject named, so it reads correctly out of context. Including when
                something else quotes it.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="stack stack--lg" style={{ marginBottom: 'var(--space-5)' }}>
            <div className="field">
              <label className="field__label" htmlFor="answers-search">
                Search
              </label>
              <input
                id="answers-search"
                className="input"
                type="search"
                placeholder="leakage, clawback, offline, EoM, pricing…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="pillbar">
              <button type="button" aria-pressed={topic === 'All'} onClick={() => setTopic('All')}>
                All
              </button>
              {answerTopics.map((t) => (
                <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <p className="fine" aria-live="polite" style={{ marginBottom: 'var(--space-4)' }}>
            Showing {shown.length} of {answers.length}
          </p>

          <div className="stack stack--lg">
            {shown.map((a) => (
              <article className="answer" key={a.slug} id={a.slug}>
                <div className="answer__q">
                  <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
                    {a.topic}
                  </span>
                  <h2 style={{ fontSize: 'var(--fs-h3)', margin: 0 }}>
                    <Link to={`/answers/${a.slug}`}>{a.q}</Link>
                  </h2>
                </div>
                <div className="answer__a">
                  <p>{a.short}</p>
                  <Link to={`/answers/${a.slug}`} className="btn btn--quiet btn--sm" style={{ paddingLeft: 0 }}>
                    Full answer
                    <Icon name="arrow" size={13} className="btn__arrow" />
                  </Link>
                </div>
              </article>
            ))}
            {!shown.length && (
              <div className="notice">
                <Icon name="alert" />
                <span>
                  Nothing matches that. Try a broader term, or{' '}
                  <Link to="/contact">ask us directly</Link> — we answer specific questions with
                  specific answers.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Still specific"
        title="Ask the one that is not here."
        body="If your question is specific enough that a generic answer would be useless, that is exactly the kind we prefer."
        secondary={{ label: 'Read the long-form analysis', to: '/resources' }}
      />
    </>
  );
}
