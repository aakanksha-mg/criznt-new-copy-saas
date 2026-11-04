import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Breadcrumbs, Cta, SectionHead } from '@/components/ui';
import { answerBySlug, answers } from '@/data/answers';
import NotFound from './NotFound';

export default function AnswerPage() {
  const { slug } = useParams();
  const a = answerBySlug(slug ?? '');
  if (!a) return <NotFound />;

  const related = (a.related ?? [])
    .map((s) => answers.find((x) => x.slug === s))
    .filter(Boolean)
    .slice(0, 3) as typeof answers;

  const sameTopic = answers.filter((x) => x.topic === a.topic && x.slug !== a.slug).slice(0, 4);

  return (
    <>
      <section className="pagehero">
        <div className="container container--narrow">
          <Breadcrumbs
            crumbs={[
              { name: 'Answers', path: '/answers' },
              { name: a.q, path: `/answers/${a.slug}` },
            ]}
          />
          <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
            {a.topic}
          </span>
          <h1 className="pagehero__title">{a.q}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          {/* The lifted answer. First block on the page, complete on its own. */}
          <div className="keybox">
            <p style={{ color: 'var(--white)', fontSize: 'var(--fs-lead)', lineHeight: 1.55, margin: 0 }}>
              {a.short}
            </p>
          </div>

          <div className="prose">
            {a.long.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          {related.length > 0 && (
            <>
              <hr className="hairrule" style={{ margin: 'var(--space-6) 0 var(--space-5)' }} />
              <SectionHead eyebrow="Related" title="Next questions" as="h2" />
              <div className="stack">
                {related.map((r) => (
                  <Link key={r.slug} to={`/answers/${r.slug}`} className="card card--hover">
                    <h3 className="card__title" style={{ fontSize: '1.05rem' }}>
                      {r.q}
                    </h3>
                    <p className="card__body">{r.short.split('. ')[0]}.</p>
                  </Link>
                ))}
              </div>
            </>
          )}

          {sameTopic.length > 0 && (
            <>
              <hr className="hairrule" style={{ margin: 'var(--space-6) 0 var(--space-5)' }} />
              <span className="eyebrow">More on {a.topic.toLowerCase()}</span>
              <ul className="checklist">
                {sameTopic.map((r) => (
                  <li key={r.slug}>
                    <Icon name="arrow" />
                    <Link to={`/answers/${r.slug}`}>{r.q}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="fine" style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/answers" className="backlink">
              All {answers.length} answers
            </Link>
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
