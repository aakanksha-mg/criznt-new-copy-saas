import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, FeatureCard, Panel, Cta, CheckList, Stat } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { ArchitectureTopology } from '@/components/platform/ArchitectureTopology';
import { modules } from '@/data/platform';
import { platformMetrics } from '@/data/metrics';
import { pageFor } from '@/lib/pages';
import { site } from '@/lib/site';

export default function Platform() {
  const [tab, setTab] = useState(0);
  const active = modules[tab];
  const page = pageFor('/platform');

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={page.breadcrumbs!} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">The platform</span>
              <h1 className="pagehero__title">
                One operating system for everything you pay a channel to do
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {site.product} holds the scheme, the hierarchy, the computation, the reconciliation
                and the seller&rsquo;s own view of it in one model. That is the point: the number in
                the payout file, the number in the ledger and the number in the seller&rsquo;s hand
                come from the same computation.
              </p>
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {platformMetrics.slice(0, 4).map((m) => (
                <Stat key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ArchitectureTopology />

          <SectionHead
            eyebrow="Six modules"
            title="What each part of it does"
            lead="Configure, compute and catch, reconcile, operate, deliver, defend. Follow any of them for the mechanism rather than the feature list."
          />
          <div className="grid grid--3">
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
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead eyebrow="In practice" title="The reality, then the fix" />
          <div className="tabs">
            <div className="tabs__list" role="tablist" aria-label="Platform modules">
              {modules.map((m, i) => (
                <button
                  key={m.slug}
                  type="button"
                  role="tab"
                  id={`tab-${m.slug}`}
                  aria-selected={tab === i}
                  aria-controls={`tabpanel-${m.slug}`}
                  className="tabs__tab"
                  onClick={() => setTab(i)}
                >
                  {m.nav}
                </button>
              ))}
            </div>
            <div
              className="tabs__panel"
              role="tabpanel"
              id={`tabpanel-${active.slug}`}
              aria-labelledby={`tab-${active.slug}`}
            >
              <div>
                <span className="eyebrow">{active.eyebrow}</span>
                <h3 style={{ fontSize: 'var(--fs-h2)', fontWeight: 700 }}>{active.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{active.reality}</p>
                <p style={{ color: 'var(--white)' }}>{active.fix}</p>
                <CheckList items={active.outcomes} />
                <Link
                  to={`/platform/${active.slug}`}
                  className="btn btn--ghost btn--sm"
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  Full detail
                  <Icon name="arrow" size={14} className="btn__arrow" />
                </Link>
              </div>
              <Panel {...active.panel} />
            </div>
          </div>
        </div>
      </section>

      <Faq
        items={modules.flatMap((m) => m.faqs).slice(0, 10)}
        title="Platform questions, answered"
      />

      <Cta secondary={{ label: 'See it by industry', to: '/industries' }} />
    </>
  );
}
