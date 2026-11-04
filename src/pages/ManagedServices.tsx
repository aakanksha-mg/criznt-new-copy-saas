import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta, Stat, CheckList } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { SlaRunbookSimulator } from '@/components/managed/SlaRunbookSimulator';
import { managedSteps, inHouseVsManaged } from '@/data/managed';
import { answers } from '@/data/answers';
import { platformMetrics } from '@/data/metrics';

export default function ManagedServices() {
  const faqs = [
    'does-crizant-offer-managed-services',
    'how-long-does-implementation-take',
    'can-crizant-integrate-with-our-systems',
    'what-does-crizant-one-cost',
  ]
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Managed Services', path: '/managed-services' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Managed Services · Commission Operations</span>
              <h1 className="pagehero__title">
                We run it. <span className="accent">You own it.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                We sell software, and then we offer to run it for you. Those two sentences sit
                awkwardly together in a SaaS pitch, so it is worth explaining why they belong
                together.
              </p>
              <div className="cluster" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <div>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>99.5%</strong>
                  <span className="fine" style={{ display: 'block' }}>Contracted SLA</span>
                </div>
                <div>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--white)', fontFamily: 'var(--font-mono)' }}>10 days</strong>
                  <span className="fine" style={{ display: 'block' }}>Typical go-live</span>
                </div>
              </div>
            </div>
            <div>
              <SlaRunbookSimulator />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Why it exists"
            title="The platform removes the calculation work. What remains is a team."
          />
          <p className="lead">
            Commission operations is not a function that gets easier once a platform goes live. What
            remains after the arithmetic is handled:
          </p>
          <CheckList
            items={[
              'Scheme design that has to track the market — a scheme that was right in April is being gamed by August',
              'Data operations against core systems that change schema without announcing it',
              'A cycle that has to close on time, every time, with no version where it slips and nobody notices',
              'A seller helpdesk that is relentless and unglamorous — thousands of people, each with one question about their own money',
              'Compliance upkeep against regulators who are actively rewriting the rules',
            ]}
          />
          <div className="keybox" style={{ marginTop: 'var(--space-5)' }}>
            <p style={{ color: 'var(--white)', fontSize: '1.08rem', margin: 0 }}>
              Most companies staff that thinly, because it is a cost centre and because the work is
              invisible when it goes right. The honest reason we offer to be that team: a commission
              platform configured badly fails in exactly the same way as no platform at all, and we
              would rather not be the vendor whose software was technically fine while the payouts
              went out wrong.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead eyebrow="What we take on" title="Five things, on an SLA" />
          <ol className="steps" style={{ maxWidth: '80ch' }}>
            {managedSteps.map((s) => (
              <li key={s.title}>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The value mechanism" title="Where the cost actually moves" />
          <div className="grid grid--3">
            {inHouseVsManaged.map((col) => (
              <div
                className={`card card--pad-lg${col.tone === 'crizant' ? ' card--featured' : ''}`}
                key={col.heading}
              >
                <h3 className="card__title">{col.heading}</h3>
                <ul className="checklist" style={{ marginTop: 'var(--space-3)' }}>
                  {col.points.map((p) => (
                    <li key={p}>
                      <Icon name={col.tone === 'problem' ? 'alert' : 'check'} />
                      <span style={col.tone === 'crizant' ? { color: 'rgba(255,255,255,0.92)' } : undefined}>
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="The boundary"
                title="What stays yours"
                lead="This is not a marketing line, it is the operating model."
              />
              <CheckList
                items={[
                  'The platform. Licensed to you, configured for you, yours.',
                  'The data. Every transaction, scheme version and audit record.',
                  'The decisions. We do not own your scheme strategy or set your rates.',
                  'The exit. Take the operation in-house in year three and the configuration and full audit history are already there.',
                ]}
              />
            </div>
            <div>
              <SectionHead
                eyebrow="Before anything is paid"
                title="The parallel run"
                lead="We compute the same period on both the existing process and the new one and explain the difference line by line."
              />
              <p style={{ color: 'var(--text-muted)' }}>
                Clients find this the most useful step, and not for the reason you would expect.
                Where the difference turns out to be leakage in the old process — a duplicate
                qualification, an override on a closed hierarchy, a clawback never recovered — that
                is the first measurable result of the engagement, and it usually arrives before
                go-live.
              </p>
              <p style={{ color: 'var(--white)' }}>
                It is also the honest test of a vendor claim. We would rather be measured against
                your own last cycle than against a case study.
              </p>
              <Link to="/resources/we-run-it-you-own-it" className="btn btn--ghost btn--sm">
                The operator&rsquo;s note
                <Icon name="arrow" size={14} className="btn__arrow" />
              </Link>
            </div>
          </div>
          <div className="statgrid statgrid--4" style={{ marginTop: 'var(--space-6)' }}>
            {platformMetrics.map((m) => (
              <Stat key={m.label} value={m.value} label={m.label} note={m.note} />
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Managed services — questions" />

      <Cta
        eyebrow="Talk to us"
        title="Start with your last cycle."
        body="Thirty minutes, no commitment. Bring a real scheme and your last closed cycle, and we will show you what the parallel run would look like."
        secondary={{ label: 'See the platform', to: '/platform' }}
      />
    </>
  );
}
