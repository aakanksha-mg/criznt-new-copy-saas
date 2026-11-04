import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta, CheckList, Stat } from '@/components/ui';
import { Stagger } from '@/components/motion';
import { Faq } from '@/components/Faq';
import { ShieldHeroSimulator } from '@/components/home/ShieldHeroSimulator';
import {
  productBySlug,
  fraudVectors,
  detectorAnatomy,
  shieldGovernance,
  shieldMechanics,
  shieldScope,
  productEvidence,
} from '@/data/products';

const shield = productBySlug('crizant-shield')!;

export default function CrizantShield() {
  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Products', path: '/products' },
              { name: 'Crizant Shield', path: '/products/crizant-shield' },
            ]}
          />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Crizant Shield · Fraud Risk Management</span>
              <h1 className="pagehero__title">
                Fraud has four doors.{' '}
                <span className="accent gradtext">Most systems watch one.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {shield.promise}
              </p>
              <div className="hero__actions" style={{ marginTop: 'var(--space-5)' }}>
                <Link to="/contact" className="btn btn--accent">
                  Book a Shield demo
                  <Icon name="arrow" size={15} className="btn__arrow" />
                </Link>
                <Link to="/products" className="btn btn--ghost">
                  All three products
                </Link>
              </div>
            </div>
            <div>
              <ShieldHeroSimulator />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div>
              <SectionHead eyebrow="The reality" title="Three of the four doors are internal" />
              <p className="lead">
                Fraud tooling almost always starts at the policyholder, because that is the
                counterparty an insurer feels least responsible for. But money also leaves through
                the agency network, through the people who approve things, and through the vendors
                who investigate and treat. Those three need pattern detection across records, not a
                rule on a single transaction — and they need an owner who is not the person being
                watched.
              </p>
              <hr className="hairrule" style={{ margin: 'var(--space-5) 0' }} />
              <span className="eyebrow">What Crizant Shield does</span>
              <p style={{ color: 'var(--white)', fontSize: 'var(--fs-lead)' }}>
                Watches all four counterparties against mapped typologies, holds what it finds
                before issuance where it can, and runs the committee, the control library and the
                statutory return that turn detection into governance an auditor will accept.
              </p>
              <div className="card card--pad-lg" style={{ marginTop: 'var(--space-4)' }}>
                <span className="eyebrow eyebrow--muted" style={{ marginBottom: 4 }}>FRMU Architecture</span>
                <p className="card__body" style={{ margin: 0 }}>
                  A Fraud Monitoring / Fraud Risk Management Unit is the function an insurer is
                  expected to run: a board-approved anti-fraud policy, a committee that meets, a
                  control framework, and a periodic return to the regulator (Section 45 &amp; FMR-1).
                </p>
              </div>
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr' }}>
              {shieldScope.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} note={s.note} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The four counterparties"
            title="Where the money actually leaves"
            lead="Each one is watched against its own typologies, because the pattern that catches a syndicate ring is nothing like the one that catches a padded hospital bill."
          />
          <Stagger className="grid grid--2">
            {fraudVectors.map((v) => (
              <div key={v.counterparty} className="card card--pad-lg spot">
                <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={v.icon} />
                </span>
                <h3 className="card__title">{v.counterparty}</h3>
                <p className="card__body">{v.body}</p>
                <CheckList items={v.examples} />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="How a detector is written"
            title={
              <>
                A control you cannot read{' '}
                <span className="accent">is not a control.</span>
              </>
            }
            lead="Every detector in Shield is specified in the same six parts, on the detector itself, in the words of the person who owns the risk rather than the person who built it."
          />
          <dl className="speclist">
            {detectorAnatomy.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Two mechanics"
            title="The parts worth understanding before you buy anything"
            lead="Both are checkable without taking Crizant's word for it — one against the statute, one against the product."
          />
          <div className="stack">
            {shieldMechanics.map((m) => (
              <div key={m.title} className="card card--pad-lg">
                <h3 className="card__title">{m.title}</h3>
                <p className="card__body">{m.body}</p>
                <p className="fine" style={{ marginTop: 'var(--space-3)' }}>
                  Source: {m.cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Governance"
            title="What the committee gets, and what the regulator gets"
            lead="Detection without governance is a dashboard. These are the artefacts that make it a unit."
          />
          <Stagger className="grid grid--3">
            {shieldGovernance.map((g) => (
              <div key={g.title} className="card card--pad-lg spot">
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {g.anchor}
                </span>
                <h3 className="card__title" style={{ fontSize: '1rem' }}>
                  {g.title}
                </h3>
                <p className="card__body">{g.body}</p>
              </div>
            ))}
          </Stagger>
          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            {productEvidence}
          </p>
        </div>
      </section>

      <Faq
        title="Crizant Shield — questions"
        items={[
          {
            q: 'What is Crizant Shield?',
            a: 'Crizant Shield is a fraud risk management platform for life and health insurers. It detects fraud across four counterparties — policyholder, distributor, employee and vendor — against mapped typologies at each stage of the policy lifecycle, and it runs the Fraud Risk Management Unit governance an insurer has to evidence: the committee and its binding orders, the three-lines-of-defence control matrix, the risk register, continuous control monitoring, corrective action tracking and the periodic statutory fraud return.',
          },
          {
            q: 'Why does Section 45 of the Insurance Act matter to fraud detection?',
            a: 'Section 45(1) of the Insurance Act 1938 says a life policy cannot be called in question on any ground whatsoever after three years from the later of issuance, commencement of risk, revival or addition of a rider. There is no exception for fraud found afterwards. That makes fraud detection on an in-force life book a dated queue rather than a backlog: a policy in its 28th month can still be contested, the same policy in its 37th cannot. Crizant Shield ranks in-force policies by the months remaining before that bar closes.',
          },
          {
            q: 'Does Crizant Shield use AI, and what decides what?',
            a: 'Crizant Shield combines rule-based, heuristic and algorithmic detectors. Every detector states the fields it reads, the conditions that make it fire with a weight on each, the threshold at which it fires, and the action that follows. Nothing is repudiated or rejected by a model: detections hold a proposal or open a matter, and a human — with dual sign-off above defined thresholds — makes the binding decision.',
          },
          {
            q: 'How do you know a new fraud detector works before switching it on?',
            a: 'Crizant Shield runs each detector backwards over historical data before it goes live, so the owner can see what it would have caught and how often it would have raised a false alarm. The findings shown against a new detector come from that backfill — real records, not projections. A detector that depends on a field the policy feed does not send runs at partial strength, and Shield says so on the detector, names the missing field, and leaves the request with IT rather than quietly absorbing the gap.',
          },
          {
            q: 'Is Crizant Shield related to Crizant One or Crizant Sure?',
            a: 'They are separate products sold separately. Crizant Shield is bought by an insurer’s fraud risk, compliance or audit function. Crizant One is a commission and incentive operating system bought by a principal paying a distribution network. Crizant Sure is a broking business management system bought by the intermediary. Shield does not require either of the others.',
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="Also from Crizant" title="The other two systems" />
          <div className="grid grid--2">
            <Link to="/platform" className="card card--hover card--pad-lg">
              <h3 className="card__title">Crizant One</h3>
              <p className="card__body">
                Commission and incentive operations for the principal paying a distribution
                network — scheme to payout, with the audit trail.
              </p>
              <span className="card__foot">
                Open Crizant One
                <Icon name="arrow" size={13} />
              </span>
            </Link>
            <Link to="/products/crizant-sure" className="card card--hover card--pad-lg">
              <h3 className="card__title">Crizant Sure</h3>
              <p className="card__body">
                The broking business itself — lead to renewal to commission, across insurance,
                mutual funds and lending.
              </p>
              <span className="card__foot">
                Open Crizant Sure
                <Icon name="arrow" size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="See it against your own book"
        title="Pick one typology and we will show you the detector."
        body="Thirty minutes. Choose a fraud pattern you already worry about and we will walk through what the detector reads, when it fires, what happens next, and what it found on backfill."
        secondary={{ label: 'All three products', to: '/products' }}
      />
    </>
  );
}
