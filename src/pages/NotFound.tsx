import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { modules } from '@/data/platform';
import { industries } from '@/data/industries';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="notfound">
          <div className="notfound__code" aria-hidden="true">
            404
          </div>
          <h1 style={{ marginTop: 'var(--space-4)' }}>That page is not here</h1>
          <p className="lead" style={{ marginInline: 'auto' }}>
            The link may be old, or the address may have a typo in it. Everything else is below.
          </p>
          <div className="cluster" style={{ justifyContent: 'center', marginTop: 'var(--space-5)' }}>
            <Link to="/" className="btn btn--accent">
              Back to the homepage
              <Icon name="arrow" size={15} className="btn__arrow" />
            </Link>
            <Link to="/answers" className="btn btn--ghost">
              Browse the answers
            </Link>
          </div>
        </div>

        <div className="grid grid--2" style={{ marginTop: 'var(--space-6)', textAlign: 'left' }}>
          <div className="card card--pad-lg">
            <span className="eyebrow">Platform</span>
            <ul className="checklist">
              {modules.map((m) => (
                <li key={m.slug}>
                  <Icon name="arrow" />
                  <Link to={`/platform/${m.slug}`}>{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card card--pad-lg">
            <span className="eyebrow">Industries</span>
            <ul className="checklist">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Icon name="arrow" />
                  <Link to={`/industries/${i.slug}`}>{i.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="checklist" style={{ marginTop: 'var(--space-3)' }}>
              <li>
                <Icon name="arrow" />
                <Link to="/managed-services">Managed services</Link>
              </li>
              <li>
                <Icon name="arrow" />
                <Link to="/leakage-calculator">Leakage calculator</Link>
              </li>
              <li>
                <Icon name="arrow" />
                <Link to="/contact">Book a demo</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
