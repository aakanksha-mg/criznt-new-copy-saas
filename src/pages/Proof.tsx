import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, Stat } from '@/components/ui';
import { Stagger } from '@/components/motion';
import { proofs, theHonestBit, caseStudyProof } from '@/data/proof';
import { cases, casesProvenance } from '@/data/cases';
import { frameworks, servedRegions } from '@/data/compliance';

export default function Proof() {
  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Proof', path: '/proof' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Proof</span>
              <h1 className="pagehero__title">
                Seven ways to check this site{' '}
                <span className="accent gradtext">before you believe it.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Every vendor site claims things. The useful question is which of those claims you
                can verify without taking the vendor&rsquo;s word for it. These seven are all checkable
                — four of them without contacting us at all.
              </p>
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Stat value="99.5%" label="Contracted managed SLA" />
              <Stat value="6" label="Regions served" />
              <Stat value="3" label="Framework sets pre-built" still />
              <Stat value="6" label="Published case studies" still />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- the honest bit ---- */}
      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="card card--pad-lg card--accent">
            <span className="eyebrow">Said plainly</span>
            <h2 style={{ fontSize: 'var(--fs-h3)', marginTop: 'var(--space-2)' }}>
              {theHonestBit.title}
            </h2>
            <p className="card__body">{theHonestBit.body}</p>
            <Link to="/contact" className="btn btn--accent btn--sm" style={{ marginTop: 'var(--space-3)' }}>
              Bring us a closed cycle
              <Icon name="arrow" size={13} className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- case studies ---- */}
      {cases.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Case studies"
              title={
                <>
                  {cases.length} deployments. <span className="accent">One glance each.</span>
                </>
              }
              lead="Anonymised by sector rather than naming a client, with figures that are Crizant's own. Both of those are stated here rather than left for you to work out."
            />
            <Stagger className="grid grid--3">
              {cases.map((c) => (
                <Link key={c.slug} to={`/case-studies/${c.slug}`} className="card card--hover card--pad-lg spot">
                  <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                    {c.sector}
                  </span>
                  <div className="casestat">
                    <span className="casestat__value">{c.headlineResult.value}</span>
                    <span className="casestat__label">{c.headlineResult.label}</span>
                  </div>
                  <p className="card__body">{c.headline}</p>
                  <span className="card__foot">
                    Read the case study
                    <Icon name="arrow" size={13} />
                  </span>
                </Link>
              ))}
            </Stagger>
            <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
              {casesProvenance()}
            </p>
          </div>
        </section>
      )}

      {/* --------------------------------------------------- the seven ---- */}
      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="Verifiable"
            title={
              <>
                Seven claims. <span className="accent">Seven ways to test them.</span>
              </>
            }
            lead="Each one states the claim, then how you check it. Where the check is a page on this site, the link goes straight to it."
          />
          <Stagger className="grid grid--2">
            {[...proofs, caseStudyProof].map((p) => (
              <article className="card card--hover card--pad-lg spot" key={p.n}>
                <div className="cluster" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <span className="iconchip iconchip--accent">
                    <Icon name="eye" />
                  </span>
                  <span className="mono-n" aria-hidden="true">
                    {p.n}
                  </span>
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__body card__body--quiet" style={{ borderTop: 0, paddingTop: 0, marginTop: 0 }}>
                  <strong>The claim:</strong> {p.claim}
                </p>
                <p className="card__body">{p.how}</p>
                {p.check ? (
                  <Link to={p.check.to} className="card__foot" style={{ textDecoration: 'none' }}>
                    {p.check.label}
                    <Icon name="arrow" size={13} />
                  </Link>
                ) : null}
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------- the two lists --- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Stated separately"
                title="Frameworks pre-built"
                lead="Built, maintained centrally, and updated once rather than configured per client."
              />
              <div className="cluster" style={{ gap: 'var(--space-2)' }}>
                {frameworks.flatMap((f) => f.built).map((b) => (
                  <span className="tag" key={b}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <SectionHead eyebrow="Not the same claim" title="Markets served" lead="Where Crizant operates. Outside the pre-built frameworks, local rules are configured as part of the engagement." />
              <div className="cluster" style={{ gap: 'var(--space-2)' }}>
                {servedRegions.map((r) => (
                  <span className="tag" key={r.name}>
                    {r.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="The real test"
        title="Measure us against a cycle you have already paid."
        body="Thirty minutes to scope it. We compute the period on Crizant One and reconcile line by line against your own payout file, with every difference explained by the rule behind it."
        secondary={{ label: 'How the platform is built', to: '/engineering' }}
      />
    </>
  );
}
