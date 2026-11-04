import { Link, useParams } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Panel, Cta, CheckList, FeatureList } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { MobilePwaSimulator } from '@/components/platform/MobilePwaSimulator';
import {
  SchemeDslSandbox,
  PreCloseAnomalySandbox,
  ReconciliationLedgerSandbox,
  ChannelHierarchySandbox,
} from '@/components/platform/PlatformModuleSandboxes';
import { BitemporalAuditScrubber } from '@/components/engineering/BitemporalAuditScrubber';
import { moduleBySlug, modules } from '@/data/platform';
import NotFound from './NotFound';

export default function PlatformModule() {
  const { slug } = useParams();
  const m = moduleBySlug(slug ?? '');
  if (!m) return <NotFound />;

  const others = modules.filter((o) => o.slug !== m.slug);

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Platform', path: '/platform' },
              { name: m.name, path: `/platform/${m.slug}` },
            ]}
          />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">{m.eyebrow}</span>
              <h1 className="pagehero__title">{m.name}</h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {m.promise}
              </p>
            </div>
            <div className="card">
              <div className="cluster" style={{ gap: 'var(--space-3)' }}>
                <span
                  className="iconchip iconchip--accent"
                  style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)' }}
                >
                  <Icon name={m.icon} size={26} />
                </span>
                <div>
                  <span className="eyebrow eyebrow--muted" style={{ marginBottom: 0 }}>
                    Part of Crizant One
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    {m.eyebrow}
                  </div>
                </div>
              </div>
              <ul className="checklist" style={{ marginTop: 'var(--space-4)' }}>
                {m.outcomes.slice(0, 2).map((o) => (
                  <li key={o}>
                    <Icon name="check" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left">
            <div>
              <SectionHead eyebrow="The reality" title="What is actually happening today" />
              <p className="lead">{m.reality}</p>
              <hr className="hairrule" style={{ margin: 'var(--space-5) 0' }} />
              <span className="eyebrow">What Crizant One does</span>
              <p style={{ color: 'var(--white)', fontSize: 'var(--fs-lead)' }}>{m.fix}</p>
            </div>
            {m.slug === 'last-mile' && <MobilePwaSimulator />}
            {m.slug === 'scheme-builder' && <SchemeDslSandbox />}
            {m.slug === 'ai-intelligence' && <PreCloseAnomalySandbox />}
            {m.slug === 'reconciliation' && <ReconciliationLedgerSandbox />}
            {m.slug === 'distribution-management' && <ChannelHierarchySandbox />}
            {m.slug === 'compliance-audit' && <BitemporalAuditScrubber />}
            {!['last-mile', 'scheme-builder', 'ai-intelligence', 'reconciliation', 'distribution-management', 'compliance-audit'].includes(m.slug) && (
              <Panel {...m.panel} />
            )}
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead eyebrow="Capabilities" title={`Inside ${m.name}`} />
          <FeatureList
            items={m.capabilities.map((c, i) => ({
              title: c.title,
              body: c.body,
              icon: i === 0 ? 'check' : i % 3 === 1 ? 'layers' : i % 3 === 2 ? 'clock' : 'eye',
            }))}
            accentFirst
          />
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="What changes" title="The outcome, stated plainly" />
          <CheckList items={m.outcomes} />
        </div>
      </section>

      <Faq items={m.faqs} title={`${m.name} — questions`} />

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="Also in Crizant One" title="The rest of the platform" />
          <div className="grid grid--3">
            {others.map((o) => (
              <Link key={o.slug} to={`/platform/${o.slug}`} className="card card--hover">
                <span className="iconchip iconchip--quiet" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={o.icon} />
                </span>
                <h3 className="card__title">{o.name}</h3>
                <p className="card__body">{o.promise}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
