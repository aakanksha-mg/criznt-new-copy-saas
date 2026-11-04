import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, Stat, CheckList } from '@/components/ui';
import { site } from '@/lib/site';
import { servedRegions } from '@/data/compliance';
import { platformMetrics } from '@/data/metrics';
import { people, leadershipReady, initials } from '@/data/people';
import { Stagger } from '@/components/motion';

export default function About() {
  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'About', path: '/about' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">About</span>
              <h1 className="pagehero__title">
                The intelligent, real-time alternative to{' '}
                <span className="accent">spreadsheet-driven channel management</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {site.legalName} builds {site.product} — a commission and incentive operating system
                for businesses that pay a channel for sales that may later reverse.
              </p>
            </div>
            <div className="logocard logocard--lg" style={{ alignSelf: 'end' }}>
              <img src="/crizant-lockup.png" alt={site.name} width={210} height={60} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left">
            <div className="prose">
              <h2>What we actually do</h2>
              <p>
                Four verbs, in order: <strong>configure</strong> the scheme,{' '}
                <strong>compute</strong> the payout and catch what will not reconcile,{' '}
                <strong>reconcile</strong> across principals and currencies, and{' '}
                <strong>deliver</strong> each seller their own arithmetic.
              </p>
              <p>
                We sell that as software, and we also offer to operate it — scheme configuration,
                data operations, cycle processing, seller helpdesk and compliance upkeep on a 99.5%
                SLA, with the platform, the data and the decisions staying yours. Competitors sell
                software and leave you to operate it. That second part is the real product.
              </p>

              <h2>How we write</h2>
              <p>
                Three rules, and they are not aspirational — they are the editing standard for every
                page on this site.
              </p>
              <CheckList
                items={[
                  'Lead with the concrete capability, never the abstraction. "Real-time expense-ceiling utilisation", not "powerful insights".',
                  'Name the reality before the fix. State the operational or regulatory fact plainly, then what Crizant One does about it. The authority comes from the first half.',
                  'Confidence from specificity, never superlatives. Short sentences, no filler adjectives, no manufactured urgency.',
                ]}
              />

              <h2>Evidence discipline</h2>
              <p>
                No industry statistic appears on this site unless it traces to a named, checkable
                source. Where no sourced figure exists, we argue structurally instead — the mechanics
                of the reversal problem are defensible without numbers. Our own figures are labelled
                as our own, as the 3–8% leakage range is throughout.
              </p>
              <p>
                When we analysed the IRDAI distribution consultation, we checked every figure against
                the primary paper rather than against coverage of it. That process caught two figures
                in our own drafts that were wrong, and found several stronger ones we did not have.
                It is also how we learned the paper is hosted at iib.gov.in/dr rather than on the
                regulator&rsquo;s own site, which is why most searches for it fail.
              </p>

              <h2>Where we operate</h2>
              <p>
                Six regions. We state markets served and regulatory frameworks pre-built as two
                separate claims, because conflating them in front of a compliance audience is how a
                vendor loses it.
              </p>
            </div>

            <div className="stack stack--lg">
              <div className="card">
                <span className="eyebrow eyebrow--muted">The company</span>
                <dl style={{ margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
                  <div>
                    <dt className="fine">Legal name</dt>
                    <dd style={{ margin: 0, color: 'var(--white)' }}>{site.legalName}</dd>
                  </div>
                  <div>
                    <dt className="fine">Product</dt>
                    <dd style={{ margin: 0, color: 'var(--white)' }}>{site.product}</dd>
                  </div>
                  <div>
                    <dt className="fine">Backed by</dt>
                    <dd style={{ margin: 0, color: 'var(--white)' }}>{site.backedBy}</dd>
                  </div>
                  <div>
                    <dt className="fine">Contact</dt>
                    <dd style={{ margin: 0 }}>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="card">
                <span className="eyebrow eyebrow--muted">Markets</span>
                <ul className="checklist">
                  {servedRegions.map((r) => (
                    <li key={r.name}>
                      <Icon name="globe" />
                      <span>
                        <strong style={{ color: 'var(--white)' }}>{r.name}</strong> — {r.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card card--featured">
                <h3 className="card__title">A payout you cannot explain</h3>
                <p className="card__body">
                  …is a payout you should not have made. That sentence is the whole design brief, and
                  it is why versioning and traceability are in the core of the product rather than in
                  a reporting module bolted to the side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken section--tight">
        <div className="container">
          <div className="statgrid statgrid--4">
            {platformMetrics.map((m) => (
              <Stat key={m.label} value={m.value} label={m.label} note={m.note} />
            ))}
          </div>
        </div>
      </section>

      {/* Renders only once every person in src/data/people.ts has a title and
          a bio. Nothing about who holds which role was inferable from the
          source material, and a leadership section is the last place to
          guess. */}
      {leadershipReady && (
        <section className="section" id="leadership">
          <div className="container">
            <SectionHead
              eyebrow="Leadership"
              title={
                <>
                  The people who <span className="accent">decide what gets built.</span>
                </>
              }
              lead="Commission operations is an unglamorous speciality and the people below chose it deliberately. An enterprise buyer is entitled to know who they are before a first meeting."
            />
            <Stagger className="grid grid--4">
              {people.map((p) => (
                <article className="person" key={p.id}>
                  <span className="person__avatar">
                    {p.photo ? (
                      <img src={`/team/${p.id}.jpg`} alt="" width={96} height={96} loading="lazy" />
                    ) : (
                      <span aria-hidden="true">{initials(p.name)}</span>
                    )}
                  </span>
                  <h3 className="person__name">{p.name}</h3>
                  <p className="person__title">{p.title}</p>
                  <p className="person__bio">{p.bio}</p>
                  {p.linkedin ? (
                    <a
                      href={p.linkedin}
                      className="person__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                      <Icon name="arrow" size={12} />
                    </a>
                  ) : null}
                </article>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Where to go next" title="Three reasonable next steps" />
          <div className="grid grid--3">
            <Link to="/platform" className="card card--hover">
              <h3 className="card__title">See the platform</h3>
              <p className="card__body">Six modules, each with the reality before the fix.</p>
            </Link>
            <Link to="/leakage-calculator" className="card card--hover">
              <h3 className="card__title">Price your own leakage</h3>
              <p className="card__body">Thirty seconds, no form, nothing leaves your browser.</p>
            </Link>
            <Link to="/resources" className="card card--hover">
              <h3 className="card__title">Read the analysis</h3>
              <p className="card__body">Mechanism pieces with every figure traced to a source.</p>
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
