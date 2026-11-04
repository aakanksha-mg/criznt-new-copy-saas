import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import {
  SectionHead,
  Breadcrumbs,
  PageHero,
  Cta,
  Quote,
  FeatureList,
  CheckList,
} from '@/components/ui';
import { Faq } from '@/components/Faq';
import { IndustryReversalSandbox } from '@/components/industry/IndustryReversalSandbox';
import { industryBySlug, industries } from '@/data/industries';
import { caseForIndustry, caseSectors, cases } from '@/data/cases';
import { modules } from '@/data/platform';
import NotFound from './NotFound';

export default function IndustryPage() {
  const { slug } = useParams();
  const ind = industryBySlug(slug ?? '');
  if (!ind) return <NotFound />;

  const others = industries.filter((i) => i.slug !== ind.slug);

  /**
   * Evidence for this industry, or an honest account of its absence. Three of
   * the four industry pages have no published study behind them, and a page
   * that promises an outcome without saying what backs it is the thing this
   * whole site is built not to do — so the section renders either way.
   */
  const study = caseForIndustry(ind.slug);
  const otherSectors = caseSectors()
    .filter((x) => x.toLowerCase() !== ind.nav.toLowerCase())
    .map((x) => x.toLowerCase());
  const studyCount = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'][cases.length] ?? String(cases.length);

  /**
   * The industry's name as it belongs in running prose. Lowercasing the whole
   * label turns "Insurance & BFSI" into "insurance & bfsi" and "FMCG" into
   * "fmcg", so only words that are not acronyms are lowered. An acronym is a
   * word of two or more characters with no lowercase letter in it.
   */
  const prose = ind.nav
    .split(' ')
    .map((w) => (w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w) ? w : w.toLowerCase()))
    .join(' ');

  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Industries', path: '/industries' },
              { name: ind.name, path: `/industries/${ind.slug}` },
            ]}
          />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">{ind.nav} · Channel Operating Model</span>
              <h1 className="pagehero__title">{ind.name}</h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {ind.promise}
              </p>
              <div className="card card--pad-md" style={{ marginTop: 'var(--space-4)', background: 'var(--surface-glass)' }}>
                <span className="eyebrow eyebrow--muted" style={{ fontSize: '0.72rem' }}>The reversal, here</span>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>
                  <strong>You pay on:</strong> {ind.payOn}
                </p>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                  <strong>It reverses when:</strong> {ind.reverses}
                </p>
              </div>
            </div>
            <div>
              <IndustryReversalSandbox industrySlug={ind.slug} />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div>
              <SectionHead eyebrow="The reality" title="What is happening today" />
              <p className="lead">{ind.reality}</p>
              <hr className="hairrule" style={{ margin: 'var(--space-5) 0' }} />
              <span className="eyebrow">What Crizant One does</span>
              <p style={{ color: 'var(--white)', fontSize: 'var(--fs-lead)' }}>{ind.fix}</p>
              <div style={{ marginTop: 'var(--space-5)' }}>
                <Quote text={ind.quote} who={ind.quoteWho} />
              </div>
            </div>
            <div className="card card--pad-lg">
              <span className="eyebrow">Operating Architecture</span>
              <p className="card__body">{ind.fix}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead eyebrow="Capabilities" title={`Built for ${prose}`} />
          <FeatureList
            items={ind.capabilities.map((c, i) => ({
              title: c.title,
              body: c.body,
              icon: i === 0 ? 'check' : i % 2 ? 'layers' : 'eye',
            }))}
            accentFirst
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          {study ? (
            <>
              <SectionHead
                eyebrow="Evidence"
                title={
                  <>
                    Not a promise. <span className="accent">A deployment.</span>
                  </>
                }
                lead={`A published ${prose} deployment, anonymised by sector rather than naming the client. The figures are Crizant\u2019s own.`}
              />
              <Link
                to={`/case-studies/${study.slug}`}
                className="card card--hover card--pad-lg spot"
                style={{ display: 'block' }}
              >
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {study.sector}
                </span>
                <div className="casestat">
                  <span className="casestat__value">{study.headlineResult.value}</span>
                  <span className="casestat__label">{study.headlineResult.label}</span>
                </div>
                <p className="card__body">{study.headline}</p>
                <span className="card__foot">
                  Read the case study
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            </>
          ) : (
            <>
              <SectionHead
                eyebrow="Evidence"
                title={
                  <>
                    What stands behind this,{' '}
                    <span className="accent">and what does not.</span>
                  </>
                }
              />
              <div className="card card--pad-lg">
                <p className="card__body">
                  Crizant has no published {prose} case study. The {studyCount} studies that
                  exist are in {otherSectors.slice(0, -1).join(', ')} and{' '}
                  {otherSectors[otherSectors.length - 1]} — the same mechanic, a different
                  sector, and we would rather say that than imply a reference we do not have.
                  What carries across is the mechanic itself: a payment that reverses on a
                  condition, which is the part this page describes.
                </p>
                <p className="card__body">
                  Where you want this tested in {prose} specifically, the parallel run does
                  it against your own closed cycle rather than someone else&rsquo;s.
                </p>
                <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
                  <Link to="/case-studies" className="btn btn--ghost btn--sm">
                    The {studyCount} studies that exist
                    <Icon name="arrow" size={13} className="btn__arrow" />
                  </Link>
                  <Link to="/proof" className="btn btn--ghost btn--sm">
                    How to check our claims
                    <Icon name="arrow" size={13} className="btn__arrow" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="Who buys it" title="The people who own this number" />
              <ul className="featurelist">
                {ind.buyers.map((b) => (
                  <li key={b.role}>
                    <span className="iconchip iconchip--quiet">
                      <Icon name="eye" />
                    </span>
                    <span className="featurelist__text">
                      <strong>{b.role}</strong>
                      <span>{b.owns}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHead eyebrow="Compliance" title="What has to stand up" />
              <div className="stack">
                {ind.compliance.map((c) => (
                  <div className="card" key={c.name}>
                    <h3 className="card__title" style={{ fontSize: '1rem' }}>
                      {c.name}
                    </h3>
                    <p className="card__body">{c.body}</p>
                  </div>
                ))}
              </div>
              <p className="fine" style={{ marginTop: 'var(--space-3)' }}>
                Regulatory interpretation stays with your compliance team. Crizant One&rsquo;s job is
                to make sure the record exists, is dated, and is checkable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The platform"
            title="The modules that carry it"
            lead="Available across the market. Operating where we have the frameworks built."
          />
          <div className="grid grid--3">
            {modules.slice(0, 3).map((m) => (
              <Link key={m.slug} to={`/platform/${m.slug}`} className="card card--hover">
                <span className="iconchip iconchip--quiet" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={m.icon} />
                </span>
                <h3 className="card__title">{m.name}</h3>
                <p className="card__body">{m.promise}</p>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <CheckList items={[`Available across ${ind.geo}.`]} />
          </div>
        </div>
      </section>

      <Faq items={ind.faqs} title={`${ind.nav} — questions`} />

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="Same mechanic" title="The other three industries" />
          <div className="grid grid--3">
            {others.map((o) => (
              <Link key={o.slug} to={`/industries/${o.slug}`} className="card card--hover">
                <span className="iconchip iconchip--quiet" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={o.icon} />
                </span>
                <h3 className="card__title">{o.nav}</h3>
                <p className="card__body">{o.reverses}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta
        title={`Bring one of your own ${prose} schemes.`}
        secondary={{ label: 'Calculate your leakage', to: '/leakage-calculator' }}
      />
    </>
  );
}
