import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { Counter } from './motion';
import { KineticHeroCanvas } from '@/components/home/KineticHeroCanvas';
import type { Crumb } from '@/lib/seo';

/* ------------------------------------------------------------ headings ---- */

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  as: H = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`sectionhead${center ? ' sectionhead--center' : ''}`}>
      {eyebrow ? (
        <>
          <span className="eyebrow">{eyebrow}</span>
          {!center && <div className="sectionhead__rule" />}
        </>
      ) : null}
      <H>{title}</H>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path}>
            {i === crumbs.length - 1 ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <Link to={c.path}>{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  children,
  className = '',
  hasConsole = false,
}: {
  children: ReactNode;
  className?: string;
  hasConsole?: boolean;
}) {
  return (
    <section className={`pagehero ${hasConsole ? 'pagehero--console' : ''} ${className}`.trim()}>
      <KineticHeroCanvas />
      {children}
    </section>
  );
}

/* --------------------------------------------------------------- cards ---- */

export function FeatureCard({
  icon,
  title,
  body,
  to,
  foot,
  accent,
}: {
  icon?: IconName;
  title: string;
  body: string;
  to?: string;
  foot?: string;
  accent?: boolean;
}) {
  const inner = (
    <>
      {icon ? (
        <span className={`iconchip${accent ? ' iconchip--accent' : ''}`} style={{ marginBottom: 'var(--space-3)' }}>
          <Icon name={icon} />
        </span>
      ) : null}
      <h3 className="card__title">{title}</h3>
      <p className="card__body">{body}</p>
      {foot ? (
        <span className="card__foot">
          {foot}
          <Icon name="arrow" size={13} />
        </span>
      ) : null}
    </>
  );
  return to ? (
    <Link to={to} className="card card--hover">
      {inner}
    </Link>
  ) : (
    <div className="card">{inner}</div>
  );
}

/**
 * Splits a display figure into the parts a counter needs — "99.5%" becomes
 * ['', 99.5, '%'], "₹3.1 Cr" becomes ['₹', 3.1, ' Cr'], and "184,207" keeps
 * its grouping rather than being read as a decimal. A value with no single
 * leading number ("3–8%", "10 days / 6 weeks") returns null and is rendered as
 * written, because animating a range is nonsense.
 */
function splitFigure(value: string): {
  prefix: string;
  n: number;
  suffix: string;
  decimals: number;
  group: boolean;
} | null {
  const m = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)([^0-9]*)$/.exec(value.trim());
  if (!m) return null;
  const digits = m[2];
  // A comma here is a thousands separator, never a decimal mark: the site is
  // written in English and "184,207" has to come back out as 184,207.
  const plain = digits.replace(/,/g, '');
  const dot = plain.indexOf('.');
  return {
    prefix: m[1],
    n: Number(plain),
    suffix: m[3],
    decimals: dot === -1 ? 0 : plain.length - dot - 1,
    group: digits.includes(','),
  };
}

export function Stat({
  value,
  label,
  note,
  still,
}: {
  value: string;
  label: string;
  note?: string;
  /** Opt out of the count-up, for a figure that reads better arriving whole. */
  still?: boolean;
}) {
  const f = still ? null : splitFigure(value);
  return (
    <div className="stat">
      <div className="stat__value">
        {f ? (
          <Counter
            value={f.n}
            prefix={f.prefix}
            suffix={f.suffix}
            decimals={f.decimals}
            group={f.group}
          />
        ) : (
          value
        )}
      </div>
      <div className="stat__label">{label}</div>
      {note ? <p className="stat__note">{note}</p> : null}
    </div>
  );
}

export function FeatureList({
  items,
  accentFirst,
}: {
  items: { title: string; body: string; icon?: IconName }[];
  accentFirst?: boolean;
}) {
  return (
    <ul className="featurelist">
      {items.map((it, i) => (
        <li key={it.title}>
          <span className={`iconchip${accentFirst && i === 0 ? ' iconchip--accent' : ''}`}>
            <Icon name={it.icon ?? 'check'} />
          </span>
          <span className="featurelist__text">
            <strong>{it.title}</strong>
            <span>{it.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((t) => (
        <li key={t}>
          <Icon name="check" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Panel({
  title,
  rows,
  foot,
}: {
  title: string;
  rows: [string, string, boolean?][];
  foot: [string, string];
}) {
  return (
    <div className="panel" role="img" aria-label={`${title}. ${rows.map(([k, v]) => `${k}: ${v}`).join('. ')}.`}>
      <div className="panel__bar">
        <span className="panel__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="panel__title">{title}</span>
      </div>
      <div className="panel__body" aria-hidden="true">
        {rows.map(([k, v, accent]) => (
          <div className="panel__row" key={k}>
            <span className="panel__k">{k}</span>
            <span className={`panel__v${accent ? ' panel__v--accent' : ''}`}>{v}</span>
          </div>
        ))}
      </div>
      <div className="panel__foot" aria-hidden="true">
        <span>{foot[0]}</span>
        <span>{foot[1]}</span>
      </div>
    </div>
  );
}

export function Quote({ text, who }: { text: string; who: string }) {
  return (
    <figure className="quote" style={{ margin: 0 }}>
      <div className="quote__mark" aria-hidden="true">
        &ldquo;
      </div>
      <blockquote style={{ all: 'unset' }}>
        <p className="quote__text">{text}</p>
      </blockquote>
      <figcaption className="quote__who">{who}</figcaption>
    </figure>
  );
}

/* ----------------------------------------------------------------- cta ---- */

export function Cta({
  eyebrow = 'Book a demo',
  title = 'Bring one of your own schemes.',
  body = 'A thirty-minute session, no commitment. We configure one of your real incentive schemes live and you watch it compute.',
  primary = { label: 'Book a demo', to: '/contact' },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <span className="eyebrow">{eyebrow}</span>
          <h2 style={{ maxWidth: '20ch', marginInline: 'auto' }}>{title}</h2>
          <p className="lead" style={{ marginInline: 'auto', marginBottom: 'var(--space-5)' }}>
            {body}
          </p>
          <div className="cluster" style={{ justifyContent: 'center' }}>
            <Link to={primary.to} className="btn btn--accent btn--lg">
              {primary.label}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
            {secondary ? (
              <Link to={secondary.to} className="btn btn--ghost btn--lg">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
