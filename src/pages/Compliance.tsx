import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta, Stat, CheckList } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { RegulatoryRuleAuditor } from '@/components/compliance/RegulatoryRuleAuditor';
import { frameworks, servedRegions } from '@/data/compliance';
import { regulatoryFacts } from '@/data/metrics';
import { answers } from '@/data/answers';

export default function Compliance() {
  const faqs = ['which-regulatory-frameworks', 'what-does-eom-mean', 'can-crizant-reconstruct-a-payout']
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Global Compliance', path: '/compliance' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Global Compliance · Statutory Engine</span>
              <h1 className="pagehero__title">
                Markets served and frameworks built are{' '}
                <span className="accent">two different claims</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                We state them separately on purpose. Claiming regulatory coverage you have not built
                is the fastest way to lose a compliance audience — and compliance heads are the
                people who check.
              </p>
            </div>
            <div>
              <RegulatoryRuleAuditor />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pre-built" title="Frameworks shipped in the product" />
          <div className="stack stack--lg">
            {frameworks.map((f) => (
              <div className="card card--pad-lg" key={f.region}>
                <div className="cluster" style={{ justifyContent: 'space-between' }}>
                  <div className="cluster">
                    <span className="iconchip iconchip--accent">
                      <Icon name="shield" />
                    </span>
                    <div>
                      <h3 style={{ margin: 0 }}>{f.region}</h3>
                      <span className="fine">{f.markets}</span>
                    </div>
                  </div>
                  <div className="cluster" style={{ gap: 'var(--space-2)' }}>
                    {f.built.map((b) => (
                      <span className="tag" key={b}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="card__body" style={{ marginTop: 'var(--space-4)' }}>
                  {f.body}
                </p>
                <CheckList items={f.details} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Markets served"
            title="Six regions"
            lead="Outside the pre-built frameworks, Crizant One is configured against local rules as part of the engagement. The versioning, audit and reconstruction behaviour is framework-independent."
          />
          <div className="grid grid--3">
            {servedRegions.map((r) => (
              <div className="card" key={r.name}>
                <h3 className="card__title" style={{ fontSize: '1.05rem' }}>
                  {r.name}
                </h3>
                <p className="card__body">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Evidence discipline"
            title="Where our regulatory figures come from"
            lead="Every figure below was checked line by line against the primary document — Recalibrating Economics of Insurance Distribution, Part 1, hosted at iib.gov.in/dr. That process caught two figures of ours that were wrong, which is the point of doing it."
          />
          <div className="statgrid statgrid--4">
            {regulatoryFacts.map((f) => (
              <Stat key={f.label} value={f.value} label={f.label} note={`${f.note} (${f.cite})`} />
            ))}
          </div>
          <div className="keybox" style={{ marginTop: 'var(--space-5)' }}>
            <p style={{ color: 'var(--white)', margin: 0 }}>
              Commission in insurance has stopped being a cap and become a matrix: payment-term band
              × channel × location loading, with a renewal rate that steps every three years, under
              an expense ceiling that tightens annually and covers rewards and channel support as
              well as commission. That is a configuration problem, not a pricing one.
            </p>
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Compliance questions" />

      <Cta
        eyebrow="Compliance review"
        title="Bring the rule you are worried about."
        body="We will show you what re-cutting your scheme library against it actually looks like, on your own data, in the session."
        secondary={{ label: 'Read the IRDAI analysis', to: '/resources/commission-is-a-matrix-not-a-cap' }}
      />
    </>
  );
}
