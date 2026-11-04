import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Breadcrumbs, Cta, SectionHead } from '@/components/ui';
import { Markdown, parseHeadings } from '@/components/Markdown';
import { articleBySlug, sortedArticles } from '@/data/insights';
import { site } from '@/lib/site';
import NotFound from './NotFound';

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function ArticlePage() {
  const { slug } = useParams();
  const a = articleBySlug(slug ?? '');
  if (!a) return <NotFound />;

  const headings = parseHeadings(a.body).filter((h) => h.level === 2);
  const more = sortedArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Insights', path: '/resources' },
              { name: a.title, path: `/resources/${a.slug}` },
            ]}
          />
          <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
            {a.pillar}
          </span>
          <h1 className="pagehero__title" style={{ maxWidth: '20ch' }}>
            {a.title}
          </h1>
          <p className="lead lead--wide" style={{ marginTop: 'var(--space-4)' }}>
            {a.deck}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article__layout">
            {headings.length > 2 && (
              <nav className="article__toc" aria-label="On this page">
                <span className="eyebrow eyebrow--muted">On this page</span>
                <ol>
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="article__body">
              <div className="article__meta">
                <span>{site.name}</span>
                <span>Published {fmt(a.published)}</span>
                {a.updated && a.updated !== a.published ? <span>Updated {fmt(a.updated)}</span> : null}
                <span>{a.readingMinutes} min read</span>
              </div>

              {/* The standalone summary. First block, so it is what gets lifted. */}
              <aside className="keybox">
                <h2>Key points</h2>
                <ul>
                  {a.takeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </aside>

              <Markdown source={a.body} />

              <div className="cluster" style={{ marginTop: 'var(--space-6)' }}>
                {a.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--sunken section--tight">
        <div className="container">
          <SectionHead eyebrow="Keep reading" title="More analysis" as="h2" />
          <div className="grid grid--3">
            {more.map((m) => (
              <Link key={m.slug} to={`/resources/${m.slug}`} className="card card--hover">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {m.pillar}
                </span>
                <h3 className="card__title" style={{ fontSize: '1.05rem' }}>
                  {m.title}
                </h3>
                <span className="card__foot">
                  {m.readingMinutes} min
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
