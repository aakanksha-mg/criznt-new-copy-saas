import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta, CheckList } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { Stagger } from '@/components/motion';
import { PricingScopeModeler } from '@/components/pricing/PricingScopeModeler';
import { models, drivers, notCharged, faqNote } from '@/data/pricing';
import { answers } from '@/data/answers';

export default function Pricing() {
  const faqs = [
    'what-does-crizant-one-cost',
    'does-crizant-offer-managed-services',
    'how-long-does-implementation-take',
  ]
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Pricing', path: '/pricing' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Pricing &amp; Commercial Scope</span>
              <h1 className="pagehero__title">
                No price list.{' '}
                <span className="accent gradtext">Here is everything else.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Publishing a number for a platform scoped per engagement would be a number we could
                not stand behind, and a buyer who reads one figure and then hears another has
                learned something about us. So here is the commercial model, what moves it, what is
                included, and — the part usually left out — what we never charge for.
              </p>
              <div className="card card--pad-md" style={{ marginTop: 'var(--space-4)', background: 'var(--surface-glass)' }}>
                <span className="eyebrow eyebrow--muted" style={{ fontSize: '0.72rem' }}>How long a number takes</span>
                <p className="card__body" style={{ margin: 'var(--space-1) 0 var(--space-3)', fontSize: '0.84rem' }}>{faqNote}</p>
                <Link to="/contact" className="btn btn--accent btn--sm">
                  Start the scoping call
                  <Icon name="arrow" size={13} className="btn__arrow" />
                </Link>
              </div>
            </div>
            <div>
              <PricingScopeModeler />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Two models"
            title="Buy the platform, or buy the platform and the team"
            lead="The second is not an upsell of the first. It exists because a platform removes the arithmetic and what remains is an operation — and plenty of companies would rather not hire one."
          />
          <Stagger className="grid grid--2">
            {models.map((m) => (
              <article
                className={`card card--hover card--pad-lg spot${m.accent ? ' card--accent' : ''}`}
                key={m.name}
              >
                <span className={`iconchip${m.accent ? ' iconchip--accent' : ''}`} style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={m.accent ? 'shield' : 'layers'} />
                </span>
                <h3 className="card__title">{m.name}</h3>
                <p className="card__body">{m.who}</p>
                <p className="card__body card__body--quiet">
                  <strong>Basis:</strong> {m.basis}
                </p>
                <CheckList items={m.includes} />
                <p className="fine" style={{ marginTop: 'var(--space-3)' }}>{m.note}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="What moves the number"
                title="Five things, in the order they matter"
                lead="If you want to estimate before you talk to us, these are the variables to put a figure against. They are also, in this order, what the proposal will be built from."
              />
              <ol className="steps">
                {drivers.map((d) => (
                  <li key={d.label}>
                    <div>
                      <h3>{d.label}</h3>
                      <p>{d.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card card--pad-lg" style={{ alignSelf: 'start' }}>
              <span className="eyebrow">Never charged for</span>
              <CheckList items={notCharged} />
              <p className="fine" style={{ marginTop: 'var(--space-3)' }}>
                Per-transaction pricing in particular is worth refusing on principle: it charges you
                more for re-running a cycle, which is exactly the behaviour a commission system
                should encourage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Before you pay anything"
            title="The parallel run comes first"
            lead="Every engagement starts by computing one of your already-closed cycles on Crizant One and reconciling it line by line against what you actually paid."
          />
          <p className="lead">
            Where that reconciliation finds leakage in the old process, it is usually the first
            measurable result of the engagement and it lands before go-live. Where it finds nothing,
            you have learned something useful about your current process and the conversation is a
            shorter one. Either outcome is worth more than a reference call.
          </p>
          <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
            <Link to="/leakage-calculator" className="btn btn--primary">
              Model the number yourself
              <Icon name="arrow" size={15} className="btn__arrow" />
            </Link>
            <Link to="/implementation" className="btn btn--ghost">
              What the ten days contain
            </Link>
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Commercial questions, answered directly" />

      <Cta
        eyebrow="Scoping call"
        title="Thirty minutes gets you a written proposal."
        body="Sellers, markets and feeds. We price the implementation separately from the subscription so you can see which is which, and so you can compare it against anyone else honestly."
        secondary={{ label: 'Compare against what you run today', to: '/compare/spreadsheets' }}
      />
    </>
  );
}
