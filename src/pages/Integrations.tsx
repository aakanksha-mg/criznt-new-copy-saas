import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, CheckList } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { Stagger } from '@/components/motion';
import { IntegrationApiPlayground } from '@/components/integrations/IntegrationApiPlayground';
import { integrationGroups, ingestion } from '@/data/integrations';
import { answers } from '@/data/answers';

export default function Integrations() {
  const faqs = ['can-crizant-integrate-with-our-systems', 'how-long-does-implementation-take']
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Integrations', path: '/integrations' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Integrations</span>
              <h1 className="pagehero__title">
                Two ways in.{' '}
                <span className="accent gradtext">Both of them validated on arrival.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Crizant One does not ship a certified connector for every system in every market,
                and a vendor who claims otherwise is found out in the first technical call. What it
                ships is a documented API, scheduled file exchange for the systems that cannot push,
                and arrival validation on both — plus the field mapping for the systems these
                industries actually run.
              </p>
            </div>
            <div className="card card--pad-lg">
              <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-3)' }}>
                <Icon name="plug" />
              </span>
              <h2 style={{ fontSize: '1rem', marginTop: 0 }}>The integration that matters most</h2>
              <p className="card__body">
                It is not the one with a logo. It is the transaction feed that decides the payout —
                because a file that arrives 4% short does not look like an error, it looks like a
                slow month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <IntegrationApiPlayground />
          <div style={{ marginTop: 'var(--space-6)' }}>
            <SectionHead
              eyebrow="How data gets in"
              title="Four things that are true of every feed"
              lead="These apply whether the source is a documented REST API or a fixed-width file dropped on an SFTP server at 02:00 by a system nobody still supports."
            />
          </div>
          <Stagger className="grid grid--2">
            {ingestion.map((i) => (
              <div className="card card--hover card--pad-lg spot" key={i.title}>
                <h3 className="card__title">{i.title}</h3>
                <p className="card__body">{i.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="What we connect to"
            title="Six categories, and what each one has to carry"
            lead="Named systems below are ones these integrations are built and mapped against. Anything not listed connects through the same two paths — the question is only what the feed can carry, which we establish in the technical session rather than after signature."
          />
          <Stagger className="grid grid--3">
            {integrationGroups.map((g) => (
              <article className="card card--hover card--pad-lg spot" key={g.slug} id={g.slug}>
                <span className="iconchip" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={g.icon} />
                </span>
                <h3 className="card__title">{g.name}</h3>
                <p className="card__body">{g.intro}</p>
                <div className="cluster" style={{ gap: 'var(--space-2)', margin: 'var(--space-3) 0' }}>
                  {g.systems.map((sys) => (
                    <span className="tag" key={sys}>
                      {sys}
                    </span>
                  ))}
                </div>
                <p className="card__body card__body--quiet">
                  <strong>Carries:</strong> {g.what}
                </p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead
                eyebrow="What we will not claim"
                title="A connector is not an integration"
                lead="A logo on a vendor page usually means a mapping has been written once. What decides whether your cycle closes on time is narrower and less marketable."
              />
              <CheckList
                items={[
                  'Whether the feed carries the dates that decide which scheme version applies',
                  'Whether a reversal arrives as an event or has to be inferred from a changed status',
                  'Whether a retried send can double-count a transaction into a payout',
                  'Whether a schema change upstream raises an exception or silently shortens a payout run',
                  'Whether the mapping can be changed the same day or waits on someone else’s release',
                ]}
              />
              <p className="fine" style={{ marginTop: 'var(--space-4)' }}>
                These are the five questions we ask in the technical session, and they are the ones
                worth asking any vendor you are evaluating, including us.
              </p>
            </div>
            <div className="card card--pad-lg">
              <h3 style={{ fontSize: '1rem', marginTop: 0 }}>Platform access and identity</h3>
              <CheckList
                items={[
                  'SAML 2.0 single sign-on',
                  'SCIM user provisioning and de-provisioning',
                  'Role-based access, including a read-only audit role',
                  'Active Directory and major identity providers',
                ]}
              />
              <Link to="/security" className="btn btn--ghost btn--sm" style={{ marginTop: 'var(--space-3)' }}>
                Security &amp; data handling
                <Icon name="arrow" size={13} className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Integration questions, answered directly" />

      <Cta
        eyebrow="Technical session"
        title="Bring your feed list, not your logo list."
        body="Thirty minutes with an engineer. We will tell you which feeds are straightforward, which need work upstream, and which ones we think will cause the trouble — before anything is scoped."
        secondary={{ label: 'How implementation runs', to: '/implementation' }}
      />
    </>
  );
}
