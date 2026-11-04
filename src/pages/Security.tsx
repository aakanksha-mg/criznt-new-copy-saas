import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, CheckList, FeatureList } from '@/components/ui';
import { SecurityControlConsole } from '@/components/security/SecurityControlConsole';
import { site } from '@/lib/site';

export default function Security() {
  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Security & Trust', path: '/security' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Security &amp; trust</span>
              <h1 className="pagehero__title">
                Commission data is <span className="accent">payroll-adjacent</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                It names individuals and states what they earn. We treat it with the controls that
                implies, and we are specific about where the boundary of our responsibility sits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SecurityControlConsole />
          <div style={{ marginTop: 'var(--space-6)' }}>
            <SectionHead eyebrow="Controls" title="How the platform is built" />
          </div>
          <FeatureList
            accentFirst
            items={[
              {
                title: 'Role-based access, scoped to the hierarchy',
                body: 'What a person can see is derived from where they sit in the channel. A regional head sees their region; a seller sees themselves. Access is a property of the dated hierarchy, not a separate permissions spreadsheet.',
                icon: 'lock',
              },
              {
                title: 'Encryption in transit and at rest',
                body: 'TLS on every connection, encryption at rest for stored data and backups, with key management separated from application access.',
                icon: 'shield',
              },
              {
                title: 'Immutable audit logging',
                body: 'Every scheme change, approval, override and payout decision is written with the actor, the timestamp and the before-and-after state. The log is append-only and is itself part of what an audit reads.',
                icon: 'eye',
              },
              {
                title: 'Environment and data separation',
                body: 'Production, staging and simulation data are separated, and scheme simulation runs against a controlled copy rather than against live payout records.',
                icon: 'layers',
              },
              {
                title: 'Residency options',
                body: 'Where a market or a client requires data to remain in-country, deployment is arranged to meet it. This is scoped per engagement rather than claimed generically.',
                icon: 'globe',
              },
            ]}
          />
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="The boundary" title="What is ours and what is yours" />
              <CheckList
                items={[
                  'The platform is licensed to you. The configuration and the audit history are yours.',
                  'Your data stays yours, including on exit — there is no version of this where leaving costs you your records.',
                  'On managed engagements, our team operates under your scheme strategy and your approval chain. We do not set rates.',
                  'Regulatory interpretation stays with your compliance team. Our job is to make the record exist, dated and checkable.',
                ]}
              />
            </div>
            <div>
              <SectionHead eyebrow="This website" title="What this site collects" />
              <CheckList
                items={[
                  'The leakage calculator runs entirely in your browser. No input is transmitted anywhere.',
                  'The demo form sends only what you type in it, to reply to you.',
                  'No third-party advertising or cross-site tracking scripts are loaded.',
                ]}
              />
              <p className="fine" style={{ marginTop: 'var(--space-4)' }}>
                Questions from a security or procurement review go to{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> and get a specific written answer,
                not a brochure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="notice">
            <Icon name="alert" />
            <span>
              Certification status, penetration-test cadence and sub-processor lists are provided on
              request under NDA, and are stated per engagement rather than asserted here. We would
              rather answer a procurement questionnaire accurately than publish a badge wall.
            </span>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Security review"
        title="Send us the questionnaire."
        body="We answer procurement and security reviews directly, in writing, with the detail your team actually needs."
      />
    </>
  );
}
