import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta, Stat, CheckList } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { Stagger } from '@/components/motion';
import { TenDaySprintSimulator } from '@/components/implementation/TenDaySprintSimulator';
import { phases, whenItTakesLonger } from '@/data/implementation';
import { answers } from '@/data/answers';

export default function Implementation() {
  const faqs = [
    'how-long-does-implementation-take',
    'can-crizant-integrate-with-our-systems',
    'does-crizant-offer-managed-services',
  ]
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Implementation', path: '/implementation' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Implementation · 10-Day Go-Live Flight Controller</span>
              <h1 className="pagehero__title">
                Ten days.{' '}
                <span className="accent gradtext">Here is what is in them.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                &ldquo;10-day go-live&rdquo; invites exactly one question — what is actually
                happening in those ten days, and what are you assuming I will do. A page that does
                not answer it reads as a number somebody made up. The figure is Crizant&rsquo;s own,
                drawn from deployments, and the schedule below is what it is made of, including the
                four situations where it runs longer.
              </p>
              <div className="hero__actions" style={{ marginTop: 'var(--space-5)' }}>
                <Link to="/contact" className="btn btn--accent">
                  Start with a parallel run
                  <Icon name="arrow" size={15} className="btn__arrow" />
                </Link>
                <Link to="/integrations" className="btn btn--ghost">
                  Integration detail
                </Link>
              </div>
            </div>
            <div>
              <TenDaySprintSimulator />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="statgrid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 'var(--space-6)' }}>
            <Stat value="10 days" label="Typical go-live" />
            <Stat value="5" label="Phases" />
            <Stat value="1" label="Closed cycle reconciled first" />
            <Stat value="99.5%" label="Managed SLA, if you take it" />
          </div>
          <SectionHead
            eyebrow="The schedule"
            title={
              <>
                Five phases. <span className="accent">Each one with your half of it stated.</span>
              </>
            }
            lead="Every implementation that runs long runs long on the client side, and almost always because nobody said at the start what would be needed. So each phase below names what we do and what we need from you, separately."
          />
          <Stagger className="grid grid--2">
            {phases.map((p) => (
              <article className="card card--hover card--pad-lg spot" key={p.n} id={`phase-${p.n}`}>
                <div className="cluster" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <span className="tag">{p.days}</span>
                  <span className="mono-n" aria-hidden="true">
                    {p.n}
                  </span>
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__body">{p.body}</p>
                <div className="duo">
                  <div>
                    <span className="eyebrow">We do</span>
                    <CheckList items={p.ours} />
                  </div>
                  <div>
                    <span className="eyebrow">You provide</span>
                    <CheckList items={p.yours} />
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="When it runs longer"
            title="Four honest exceptions"
            lead="Ten days is typical, not guaranteed, and the four situations below are the ones that move it. We would rather you read them here than discover them in week three."
          />
          <Stagger className="grid grid--2">
            {whenItTakesLonger.map((w) => (
              <div className="card card--hover card--pad-lg spot" key={w.label}>
                <span className="iconchip iconchip--quiet" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name="alert" />
                </span>
                <h3 className="card__title">{w.label}</h3>
                <p className="card__body">{w.body}</p>
              </div>
            ))}
          </Stagger>
          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            The ten-day figure is Crizant&rsquo;s own, drawn from deployments rather than from
            industry research. It assumes one market, the feeds available, and a person on your side
            who owns scheme design. Where any of those is not true, the scoping call will say so
            before anything is signed.
          </p>
        </div>
      </section>

      <Faq items={faqs} title="Implementation questions, answered directly" />

      <Cta
        eyebrow="Parallel run"
        title="Start with a cycle you have already closed."
        body="Before any commitment: we compute your last closed period on Crizant One and reconcile it against your own payout file, line by line, with every difference explained."
        secondary={{ label: 'How pricing works', to: '/pricing' }}
      />
    </>
  );
}
