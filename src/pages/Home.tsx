import { Link, useSearchParams } from 'react-router-dom';
import { Icon, type IconName } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import {
  SectionHead,
  FeatureCard,
  Stat,
  Cta,
  CheckList,
} from '@/components/ui';
import { Faq } from '@/components/Faq';
import { Stagger, Marquee } from '@/components/motion';
import { EngineHeroSimulator } from '@/components/home/EngineHeroSimulator';
import { SureHeroSimulator } from '@/components/home/SureHeroSimulator';
import { ShieldHeroSimulator } from '@/components/home/ShieldHeroSimulator';
import { KineticHeroCanvas } from '@/components/home/KineticHeroCanvas';
import { MobilePwaSimulator } from '@/components/platform/MobilePwaSimulator';
import { modules } from '@/data/platform';
import { products } from '@/data/products';
import { industries } from '@/data/industries';
import { platformMetrics, problemMetrics } from '@/data/metrics';
import { frameworks, servedRegions } from '@/data/compliance';
import { comparison, managedSteps } from '@/data/managed';
import { sortedArticles } from '@/data/insights';
import { answers } from '@/data/answers';
import { site } from '@/lib/site';

type HeroProductKey = 'crizant-one' | 'crizant-sure' | 'crizant-shield';

interface HeroProductConfig {
  key: HeroProductKey;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  primaryCta: { label: string; to: string; icon?: IconName };
  secondaryCta: { label: string; to: string };
  meta: string[];
  proof: React.ReactNode;
  icon: IconName;
}

const HERO_PRODUCTS: Record<HeroProductKey, HeroProductConfig> = {
  'crizant-one': {
    key: 'crizant-one',
    name: 'Crizant One',
    tagline: 'Incentive OS',
    category: 'Commission & incentive operating system',
    badge: 'Commission & Incentive Operating System',
    title: (
      <>
        You pay for the sale.{' '}
        <span className="accent gradtext">You find out later if it was real.</span>
      </>
    ),
    lead: (
      <>
        Across FMCG, pharma, real estate and insurance, the payout precedes certainty — through
        a multi-tier channel, on a scheme that keeps changing. {site.product} configures,
        computes, reconciles and delivers every one of them, in real time, traceable to the
        seller who earned it.
      </>
    ),
    primaryCta: { label: 'Book a demo', to: '/contact', icon: 'arrow' },
    secondaryCta: { label: 'Calculate your leakage', to: '/leakage-calculator' },
    meta: ['99.5% managed SLA', '10-day go-live', '8+ languages, offline', 'Six regions'],
    proof: (
      <>
        <Icon name="eye" size={15} />
        <span>
          <Link to="/case-studies">Six case studies</Link> across insurance, banking, fintech,
          logistics and healthcare — anonymised by sector, with our own figures. For a harder
          test, bring a cycle you have already closed:{' '}
          <Link to="/proof">seven ways to check this site</Link>.
        </span>
      </>
    ),
    icon: 'layers',
  },
  'crizant-sure': {
    key: 'crizant-sure',
    name: 'Crizant Sure',
    tagline: 'Broking OS',
    category: 'Broking business management system',
    badge: 'Broking Business Management System',
    title: (
      <>
        One intermediary. Three licenses.{' '}
        <span className="accent gradtext">One customer ledger.</span>
      </>
    ),
    lead: (
      <>
        A composite broker carries insurance, mutual funds and lending in the same book. Crizant Sure runs the business end to end — enquiry, multi-quote placement, policy issuance, renewals and commission reconciliation — tracking target run-rates by principal with the shortfall named rather than the achievement.
      </>
    ),
    primaryCta: { label: 'Explore Crizant Sure', to: '/products/crizant-sure', icon: 'arrow' },
    secondaryCta: { label: 'Book a walkthrough', to: '/contact' },
    meta: ['Multi-Principal Targets', 'Side-by-Side Quote Placement', 'Likelihood-to-Renew AI', 'End-to-End Book'],
    proof: (
      <>
        <Icon name="rocket" size={15} />
        <span>
          Observable in running software: <Link to="/products/crizant-sure">six operational areas</Link>, four AI intelligence workflows, and clean separation between sourced volume and earned brokerage.
        </span>
      </>
    ),
    icon: 'rocket',
  },
  'crizant-shield': {
    key: 'crizant-shield',
    name: 'Crizant Shield',
    tagline: 'Fraud Risk',
    category: 'Fraud risk management and FRMU governance',
    badge: 'Insurance Fraud Risk & FRMU Governance',
    title: (
      <>
        Fraud does not wait for audit.{' '}
        <span className="accent gradtext">Neither should the FRMU.</span>
      </>
    ),
    lead: (
      <>
        Most fraud systems monitor only the policyholder before claim. Crizant Shield watches all four counterparties — policyholder, distributor, employee and vendor — catching twisting rings, proposal stacking and underwriting overrides before the Section 45 three-year clock expires.
      </>
    ),
    primaryCta: { label: 'Explore Crizant Shield', to: '/products/crizant-shield', icon: 'arrow' },
    secondaryCta: { label: 'Inspect FRMU Governance', to: '/products/crizant-shield#frmu' },
    meta: ['4 Counterparty Coverage', 'Section 45 Protection', '14 Active Detectors', 'FMR-1 Board Pack'],
    proof: (
      <>
        <Icon name="shield" size={15} />
        <span>
          Transparent control architecture: <Link to="/products/crizant-shield">14 specified detectors</Link> with published rule weights, continuous control monitoring, and regulatory FMR-1 reporting.
        </span>
      </>
    ),
    icon: 'shield',
  },
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramProduct = searchParams.get('product') as HeroProductKey | null;
  const activeKey: HeroProductKey =
    paramProduct && HERO_PRODUCTS[paramProduct] ? paramProduct : 'crizant-one';

  const handleSelectProduct = (key: HeroProductKey) => {
    const next = new URLSearchParams(searchParams);
    if (key === 'crizant-one') {
      next.delete('product');
    } else {
      next.set('product', key);
    }
    setSearchParams(next, { replace: true });
  };

  const current = HERO_PRODUCTS[activeKey];

  const homeFaqs = [
    answers.find((a) => a.slug === 'what-is-crizant-one')!,
    answers.find((a) => a.slug === 'what-problem-does-crizant-solve')!,
    answers.find((a) => a.slug === 'how-much-commission-leakage')!,
    answers.find((a) => a.slug === 'does-crizant-offer-managed-services')!,
    answers.find((a) => a.slug === 'how-fast-can-schemes-be-reconfigured')!,
    answers.find((a) => a.slug === 'which-regulatory-frameworks')!,
  ].map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      {/* ---------------------------------------------------------- hero ---- */}
      <section className="hero">
        <KineticHeroCanvas />
        <div className="container hero__grid">
          <div>
            {/* Multi-Product Segmented Switcher */}
            <div className="hero__product-switcher" role="tablist" aria-label="Select Crizant product system">
              {(Object.keys(HERO_PRODUCTS) as HeroProductKey[]).map((key) => {
                const prod = HERO_PRODUCTS[key];
                const isSelected = activeKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`hero__product-tab ${isSelected ? 'is-active' : ''}`}
                    onClick={() => handleSelectProduct(key)}
                  >
                    <Icon name={prod.icon} size={14} />
                    <span>{prod.name}</span>
                    <span className="hero__product-tab-role">· {prod.tagline}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <span className="badge badge--dot badge--live">
                {current.badge}
              </span>
              <h1 className="hero__title" style={{ marginTop: 'var(--space-3)' }}>
                {current.title}
              </h1>
              <p className="hero__lead">
                {current.lead}
              </p>
              <div className="hero__actions">
                <Link to={current.primaryCta.to} className="btn btn--accent btn--lg">
                  {current.primaryCta.label}
                  {current.primaryCta.icon && (
                    <Icon name={current.primaryCta.icon} size={16} className="btn__arrow" />
                  )}
                </Link>
                <Link to={current.secondaryCta.to} className="btn btn--ghost btn--lg">
                  {current.secondaryCta.label}
                </Link>
              </div>
              <div className="hero__meta">
                {current.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <p className="hero__proof">
                {current.proof}
              </p>
            </div>
          </div>

          <Reveal key={activeKey}>
            {activeKey === 'crizant-one' && <EngineHeroSimulator />}
            {activeKey === 'crizant-sure' && <SureHeroSimulator />}
            {activeKey === 'crizant-shield' && <ShieldHeroSimulator />}
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- metrics ---- */}
      <section className="section section--tight section--sunken">
        <div className="container">
          <div className="statgrid statgrid--4">
            {platformMetrics.map((m) => (
              <Stat key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            Figures above are Crizant&rsquo;s own, drawn from deployments and contracted SLAs rather
            than from industry research. Where this site quotes a regulator, the paragraph names the
            paper and the paragraph number.
          </p>
          <Marquee
            items={[
              'No-code scheme builder',
              'Effective-dated hierarchies',
              'Point-in-time audit reconstruction',
              'Multi-insurer reconciliation',
              'Clawback tracking to recovery',
              'Offline-first seller app',
              'Multi-currency close',
              'Payout anomaly detection',
              'Scheme simulation on live data',
              'IRDAI · RBI · SEBI · CBUAE · Takaful · OJK',
            ]}
          />
        </div>
      </section>

      {/* ------------------------------------------------- product family ---- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Three products"
            title={
              <>
                One distribution chain, <span className="accent">three places it breaks.</span>
              </>
            }
            lead="Crizant builds for three different people in the same chain. They are sold separately and run independently — most customers buy one."
          />
          <Stagger className="grid grid--3">
            {products.map((p, i) => (
              <Link
                key={p.slug}
                to={p.to}
                className={`card card--hover card--pad-lg spot${i === 0 ? ' card--accent' : ''}`}
              >
                <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={p.icon} />
                </span>
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {p.chainRole}
                </span>
                <h3 className="card__title">{p.name}</h3>
                <p className="card__body" style={{ color: 'var(--white)' }}>
                  {p.category}
                </p>
                <p className="card__body">{p.audience}</p>
                <span className="card__foot">
                  Open {p.name}
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------------- reversal ---- */}
      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The reversal problem"
            title={
              <>
                One mechanic. <span className="accent">Four industries.</span>
              </>
            }
            lead="These look like four different incentive problems. They are one: a payout made before anyone knows the sale will hold, through a channel several tiers deep, under a scheme that changed last quarter."
          />
          <div className="tablewrap">
            <table className="data">
              <caption>
                What you pay on, and how it reverses — the structure Crizant One was built around.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Industry</th>
                  <th scope="col">What you pay on</th>
                  <th scope="col">How it reverses</th>
                  <th scope="col" className="col-crizant">
                    Where it lands
                  </th>
                </tr>
              </thead>
              <tbody>
                {industries.map((i) => (
                  <tr key={i.slug}>
                    <th scope="row">
                      <Link to={`/industries/${i.slug}`}>{i.nav}</Link>
                    </th>
                    <td>{i.payOn}</td>
                    <td>{i.reverses}</td>
                    <td className="col-crizant">After the cycle closed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
            <Link to="/resources/the-reversal-problem" className="btn btn--ghost btn--sm">
              Read the full analysis
              <Icon name="arrow" size={14} className="btn__arrow" />
            </Link>
            <Link to="/industries" className="btn btn--quiet btn--sm">
              All four industries
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- the problem ---- */}
      <section className="section section--sunken">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="What it costs"
                title="The old way is expensive in three places at once"
                lead="None of this arrives as a single visible event. It arrives as thousands of small ones, each individually too small to investigate, spread across a cycle nobody has time to audit line by line."
              />
              <CheckList
                items={[
                  'Calculation errors and duplicate payouts across overlapping schemes',
                  'Schemes applied at the wrong hierarchy tier',
                  'Clawbacks raised and never recovered — and never written off either',
                  'Overrides that kept paying after the seller had left',
                ]}
              />
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr' }}>
              {problemMetrics.map((m) => (
                <Stat key={m.label} value={m.value} label={m.label} note={m.note} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- platform ---- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Crizant One \u00b7 the platform"
            title={
              <>
                Configure. Compute. Reconcile. <span className="accent">Deliver.</span>
              </>
            }
            lead={`Six modules in one operating system. ${site.product} holds the scheme, the hierarchy, the computation, the reconciliation and the seller's own view of it — so the number in the payout file and the number in the seller's hand are the same number.`}
          />
          <Stagger className="grid grid--3">
            {modules.map((m, i) => (
              <FeatureCard
                key={m.slug}
                icon={m.icon}
                title={m.name}
                body={m.promise}
                to={`/platform/${m.slug}`}
                foot={m.eyebrow}
                accent={i === 0}
              />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ----------------------------------------------------- comparison ---- */}
      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Comparison"
            title="Against what you are doing today"
            lead="The honest comparison is not against another vendor. It is against a spreadsheet library maintained by people who have since left, or a generic ERP module with its own release calendar."
          />
          <div className="tablewrap">
            <table className="data">
              <caption>Crizant One against manual processes and a generic ERP module.</caption>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col" className="col-crizant">
                    Crizant One
                  </th>
                  <th scope="col">Manual / spreadsheets</th>
                  <th scope="col">Generic ERP</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.feature}>
                    <th scope="row">{r.feature}</th>
                    <td className="col-crizant">{r.crizant}</td>
                    <td>{r.manual}</td>
                    <td>{r.erp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ last mile ---- */}
      <section className="section">
        <div className="container">
          <div className="split split--reverse">
            <Reveal>
              <MobilePwaSimulator />
            </Reveal>
            <div>
              <SectionHead
                eyebrow="The last mile"
                title="It only has to fail twice"
                lead="A dashboard that needs a live connection fails exactly when it is opened — on a phone, between appointments, in a district where the signal drops. Twice is all it takes before the seller goes back to calling the branch."
              />
              <CheckList
                items={[
                  'Offline-first, not offline-capable — it opens and works with no connection',
                  '8+ languages including Indian regional, plus an Arabic-first RTL layout',
                  'Voice-enabled navigation for sellers faster speaking than typing',
                  'A progressive web app — no app store, no device policy, no install',
                  'The derivation, not just the number: each line opens into the rule behind it',
                ]}
              />
              <Link
                to="/platform/last-mile"
                className="btn btn--ghost btn--sm"
                style={{ marginTop: 'var(--space-4)' }}
              >
                Inside the last mile
                <Icon name="arrow" size={14} className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ compliance --- */}
      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Global compliance"
            title="Regulation-ready where we have actually built it"
            lead="Markets served and frameworks pre-built are two different claims, and we state them separately. Claiming regulatory coverage you have not built is the fastest way to lose a compliance audience."
          />
          <Stagger className="grid grid--3">
            {frameworks.map((f) => (
              <div className="card" key={f.region}>
                <span className="iconchip iconchip--quiet" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name="globe" />
                </span>
                <h3 className="card__title">{f.region}</h3>
                <div className="cluster" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                  {f.built.map((b) => (
                    <span className="tag" key={b}>
                      {b}
                    </span>
                  ))}
                </div>
                <p className="card__body">{f.body}</p>
              </div>
            ))}
          </Stagger>
          <div className="card card--pad-lg" style={{ marginTop: 'var(--space-4)' }}>
            <h3 style={{ fontSize: '1rem' }}>Markets served</h3>
            <div className="cluster" style={{ gap: 'var(--space-2)' }}>
              {servedRegions.map((r) => (
                <span className="tag" key={r.name}>
                  {r.name}
                </span>
              ))}
            </div>
            <p className="fine" style={{ marginTop: 'var(--space-3)' }}>
              Outside the pre-built frameworks, Crizant One is configured against local rules as part
              of the engagement. The versioning and audit behaviour is framework-independent.{' '}
              <Link to="/compliance">See the detail by market</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- managed services --- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Managed services"
                title={
                  <>
                    We run it. <span className="accent">You own it.</span>
                  </>
                }
                lead="We sell software, and then we offer to run it for you. Those two sentences sit awkwardly together in a SaaS pitch, so it is worth explaining why. Commission operations does not get easier once the platform is live — the platform removes the calculation work, and what remains is a team."
              />
              <Link to="/managed-services" className="btn btn--primary">
                How the managed model works
                <Icon name="arrow" size={15} className="btn__arrow" />
              </Link>
            </div>
            <ol className="steps">
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
        </div>
      </section>

      {/* -------------------------------------------------------- insights --- */}
      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Insights"
            title="Mechanism analysis, not vendor content"
            lead="How a specific rule changes a specific payout. Every regulatory figure here was checked against the primary document before it was published — twice, that process caught a figure of ours that was wrong."
          />
          <Stagger className="grid grid--3">
            {sortedArticles()
              .slice(0, 3)
              .map((a) => (
                <Link key={a.slug} to={`/resources/${a.slug}`} className="card card--hover">
                  <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                    {a.pillar}
                  </span>
                  <h3 className="card__title">{a.title}</h3>
                  <p className="card__body">{a.deck}</p>
                  <span className="card__foot">
                    {a.readingMinutes} min read
                    <Icon name="arrow" size={13} />
                  </span>
                </Link>
              ))}
          </Stagger>
          <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
            <Link to="/resources" className="btn btn--ghost btn--sm">
              All insights
            </Link>
            <Link to="/answers" className="btn btn--quiet btn--sm">
              Direct answers to {answers.length} common questions
            </Link>
          </div>
        </div>
      </section>

      <Faq items={homeFaqs} title="Crizant One, answered directly" lead="Each answer is written to stand on its own — including when something else quotes it." />

      <Cta secondary={{ label: 'Calculate your leakage first', to: '/leakage-calculator' }} />
    </>
  );
}
