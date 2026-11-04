import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, Stat, CheckList, Quote } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { Stagger } from '@/components/motion';
import { principles, scale, practices, stack } from '@/data/engineering';
import { answers } from '@/data/answers';
import { RuleEngineAstSandbox } from '@/components/engineering/RuleEngineAstSandbox';
import { BitemporalAuditScrubber } from '@/components/engineering/BitemporalAuditScrubber';
import { ClawbackStateMachine } from '@/components/engineering/ClawbackStateMachine';

export default function Engineering() {
  const faqs = [
    'can-crizant-reconstruct-a-payout',
    'can-crizant-integrate-with-our-systems',
    'does-the-seller-app-work-offline',
    'how-fast-can-schemes-be-reconfigured',
    'how-is-crizant-different-from-icm-vendors',
  ]
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Engineering', path: '/engineering' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Engineering</span>
              <h1 className="pagehero__title">
                Commission is an{' '}
                <span className="accent gradtext">accounting problem disguised as arithmetic.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Anyone can multiply a premium by a rate. The hard part is that the rate changed in
                August, the seller moved territory in July, the transaction arrived in September and
                reversed in November — and an auditor will ask, two years from now, what you knew on
                the day you paid. Six decisions in the data model make that question answerable.
                This page is those decisions.
              </p>
              <div className="hero__actions" style={{ marginTop: 'var(--space-5)' }}>
                <Link to="/contact" className="btn btn--accent">
                  Bring us a cycle to reconcile
                  <Icon name="arrow" size={15} className="btn__arrow" />
                </Link>
                <Link to="/security" className="btn btn--ghost">
                  Security &amp; data handling
                </Link>
              </div>
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Stat value="184,207" label="Transactions in a cycle" />
              <Stat value="42" label="Concurrent live schemes" />
              <Stat value="6" label="Hierarchy tiers, effective-dated" />
              <Stat value="8" label="Languages, with RTL" />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- the principles --- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Six decisions"
            title={
              <>
                Made once, in the data model. <span className="accent">Where they have to be.</span>
              </>
            }
            lead="Each of these is cheap to decide at the start and effectively impossible to retrofit. They are the reason a two-year-old cycle reconstructs as a query rather than as a project, and the reason a correction arrives with its derivation attached instead of as an unexplained adjustment."
          />
          <Stagger className="grid grid--2">
            {principles.map((p) => (
              <article className="card card--hover card--pad-lg spot edge" key={p.n}>
                <div className="cluster" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <span className="iconchip iconchip--accent">
                    <Icon name={p.icon} />
                  </span>
                  <span className="mono-n" aria-hidden="true">
                    {p.n}
                  </span>
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__body">{p.body}</p>
                <p className="card__body card__body--quiet">{p.detail}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --------------------------------- interactive sandboxes --- */}
      <section className="section section--tight" id="interactive-sandboxes">
        <div className="container">
          <SectionHead
            eyebrow="Interactive Architecture Sandboxes"
            title={
              <>
                Test the guarantees <span className="accent">in your browser.</span>
              </>
            }
            lead="Architectural claims are easy to write. These three sandboxes let you execute the data model live: integer fixed-point AST compilation, bitemporal time-travel reconstruction, and deterministic clawback state transitions."
          />
          <div id="ast-evaluator">
            <RuleEngineAstSandbox />
          </div>
          <div id="bitemporal">
            <BitemporalAuditScrubber />
          </div>
          <div id="clawback-fsm">
            <ClawbackStateMachine />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- the scale --- */}
      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The shape of a cycle"
            title="What the engine is actually asked to do"
            lead="These describe a representative production cycle rather than a benchmark result — the point is the shape of the problem, not a number to put on a slide. Scale in commission is not transaction volume; it is the combinatorics of schemes, tiers and dates multiplied together."
          />
          <div className="tablewrap">
            <table className="data">
              <caption>
                A representative production commission cycle, and what each dimension costs the
                engine.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col" className="col-crizant">
                    Representative
                  </th>
                  <th scope="col">What it means for the computation</th>
                </tr>
              </thead>
              <tbody>
                {scale.map((c) => (
                  <tr key={c.label}>
                    <th scope="row">{c.label}</th>
                    <td className="col-crizant">{c.value}</td>
                    <td>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- the stack -- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="How it is built"
            title="Three layers, one guarantee"
            lead="The guarantee is that the number in the payout file, the number in the seller's hand and the number an auditor reconstructs are the same number, and that each one can show you the rule it came from."
          />
          <Stagger className="grid grid--3">
            {stack.map((g) => (
              <div className="card card--hover card--pad-lg spot" key={g.group}>
                <span className="eyebrow">{g.group}</span>
                <CheckList items={g.items} />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------------------------------- the practice -- */}
      <section className="section section--sunken">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="How we work"
                title="Four practices, and why each one costs us something"
                lead="A practice that costs the vendor nothing is marketing. These each cost us something specific, which is the only reason they are worth telling you about."
              />
              <ol className="steps">
                {practices.map((p) => (
                  <li key={p.title}>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-4)', alignContent: 'start' }}>
              <Quote
                text="We would rather be measured against your last closed cycle than against a case study."
                who="The parallel run, which is how every engagement starts"
              />
              <div className="card card--pad-lg">
                <h3 style={{ fontSize: '1rem' }}>What we will not claim</h3>
                <p className="card__body">
                  We have not published a third-party audit of these figures, and the scale numbers
                  above are ours. We name the regulatory papers we have read and the paragraph
                  numbers, because those are checkable. For everything that is only ours to assert,
                  the parallel run is the offer: compute your last closed cycle on both and compare.
                </p>
                <Link to="/leakage-calculator" className="btn btn--ghost btn--sm" style={{ marginTop: 'var(--space-3)' }}>
                  Model it yourself first
                  <Icon name="arrow" size={13} className="btn__arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq
        items={faqs}
        title="Engineering questions, answered directly"
        lead="The questions a technical evaluator asks in the first meeting."
      />

      <Cta
        eyebrow="Technical deep-dive"
        title="Bring us a cycle you have already closed."
        body="Thirty minutes with an engineer, not a sales engineer. Bring a real scheme and a closed period, and we will configure it and reconcile against your own numbers."
        secondary={{ label: 'See the platform modules', to: '/platform' }}
      />
    </>
  );
}
