import { Link } from 'react-router-dom';
import { footerNav, site } from '@/lib/site';
import { frameworks } from '@/data/compliance';
import { Brand } from './Brand';
import { Icon } from './Icon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__about">
            <Brand variant="dark" />
            <p style={{ marginTop: 'var(--space-3)' }}>
              <strong>{site.product}</strong> — the commission and incentive operating system for
              channel-driven enterprises. Configure, compute, reconcile and deliver, with bit-exact
              audit traceability.
            </p>
            <div className="footer__contact">
              <a href={`mailto:${site.email}`} className="footer__email">
                <Icon name="mail" size={14} />
                <span>{site.email}</span>
              </a>
              <div className="footer__status-badge">
                <span className="ping" aria-hidden="true" />
                <span>99.5% Contracted SLA · Zero Float Drift</span>
              </div>
            </div>
          </div>

          <div className="footer__nav-grid">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="footer__heading">{group.heading}</h2>
                <ul className="footer__links">
                  {group.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {site.legalName}. All rights reserved.
          </span>
          <span>{frameworks.flatMap((f) => f.built).join(' · ')}</span>
          <span>
            Backed by {site.backedBy} ·{' '}
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
