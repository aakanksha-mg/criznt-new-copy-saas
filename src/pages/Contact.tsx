import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, CheckList } from '@/components/ui';
import { site } from '@/lib/site';
import { industries } from '@/data/industries';

type Values = {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  region: string;
  sellers: string;
  message: string;
};

const EMPTY: Values = {
  name: '',
  email: '',
  company: '',
  role: '',
  industry: '',
  region: '',
  sellers: '',
  message: '',
};

/** Set VITE_CONTACT_ENDPOINT to post to a real handler; otherwise the form
 *  composes the same structured enquiry as an email. Both paths work. */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const e: Partial<Record<keyof Values, string>> = {};
  if (!v.name.trim()) e.name = 'Please tell us who you are.';
  if (!v.email.trim()) e.email = 'We need an address to reply to.';
  else if (!isEmail(v.email)) e.email = 'That does not look like an email address.';
  if (!v.company.trim()) e.company = 'Which company?';
  if (!v.message.trim()) e.message = 'A sentence is enough — what are you trying to fix?';
  else if (v.message.trim().length < 12) e.message = 'A little more detail would help.';
  return e;
}

function compose(v: Values): { subject: string; body: string } {
  const subject = `Demo request — ${v.company || 'enquiry'}${v.industry ? ` (${v.industry})` : ''}`;
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company}`,
    v.role && `Role: ${v.role}`,
    v.industry && `Industry: ${v.industry}`,
    v.region && `Region: ${v.region}`,
    v.sellers && `Channel size: ${v.sellers}`,
    '',
    v.message,
    '',
    '— Sent from crizant.com/contact',
  ]
    .filter(Boolean)
    .join('\n');
  return { subject, body };
}

export default function Contact() {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setV((prev) => ({ ...prev, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Values)[])[0];
    if (firstInvalid) {
      // setErrors has not flushed yet, so aim at the field by id rather than
      // by the aria-invalid attribute React is about to write.
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const { subject, body } = compose(v);

    if (ENDPOINT) {
      setState('sending');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...v, subject }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setState('sent');
        setV(EMPTY);
        return;
      } catch {
        setState('error');
        return;
      }
    }

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setState('mailto');
  };

  return (
    <>
      <PageHero>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Contact', path: '/contact' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Book a demo</span>
              <h1 className="pagehero__title">
                Bring one of your <span className="accent">own schemes</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Thirty minutes, no commitment. We configure one of your real incentive schemes live
                on {site.product} and you watch it compute. If you can bring your last closed cycle,
                we will show you what a parallel run looks like against it.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <form className="card card--pad-lg" onSubmit={onSubmit} noValidate>
              {state === 'sent' && (
                <div className="notice notice--ok" style={{ marginBottom: 'var(--space-5)' }}>
                  <Icon name="check" />
                  <span>
                    Thank you — that is with us. We reply to every enquiry within one working day,
                    usually with a specific question rather than a brochure.
                  </span>
                </div>
              )}
              {state === 'mailto' && (
                <div className="notice notice--ok" style={{ marginBottom: 'var(--space-5)' }}>
                  <Icon name="mail" />
                  <span>
                    Your email client should have opened with the enquiry filled in. If it did not,
                    send the same detail to <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </span>
                </div>
              )}
              {state === 'error' && (
                <div className="notice" style={{ marginBottom: 'var(--space-5)' }}>
                  <Icon name="alert" />
                  <span>
                    That did not go through. Please email{' '}
                    <a href={`mailto:${site.email}`}>{site.email}</a> directly — we would rather you
                    reached us than retried a form.
                  </span>
                </div>
              )}

              <div className="formgrid formgrid--2">
                <div className="field">
                  <label className="field__label" htmlFor="name">
                    Name <span className="field__req">*</span>
                  </label>
                  <input
                    id="name"
                    className="input"
                    value={v.name}
                    onChange={set('name')}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && (
                    <span className="field__error" id="err-name">
                      <Icon name="alert" size={14} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="email">
                    Work email <span className="field__req">*</span>
                  </label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    value={v.email}
                    onChange={set('email')}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && (
                    <span className="field__error" id="err-email">
                      <Icon name="alert" size={14} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="company">
                    Company <span className="field__req">*</span>
                  </label>
                  <input
                    id="company"
                    className="input"
                    value={v.company}
                    onChange={set('company')}
                    autoComplete="organization"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'err-company' : undefined}
                  />
                  {errors.company && (
                    <span className="field__error" id="err-company">
                      <Icon name="alert" size={14} /> {errors.company}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="role">
                    Role
                  </label>
                  <input
                    id="role"
                    className="input"
                    value={v.role}
                    onChange={set('role')}
                    autoComplete="organization-title"
                    placeholder="Head of Distribution, Trade Marketing, Finance Ops…"
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="industry">
                    Industry
                  </label>
                  <select id="industry" className="select" value={v.industry} onChange={set('industry')}>
                    <option value="">Select…</option>
                    {industries.map((i) => (
                      <option key={i.slug} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="region">
                    Primary market
                  </label>
                  <select id="region" className="select" value={v.region} onChange={set('region')}>
                    <option value="">Select…</option>
                    {site.regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="sellers">
                    Channel size
                  </label>
                  <select id="sellers" className="select" value={v.sellers} onChange={set('sellers')}>
                    <option value="">Select…</option>
                    <option>Under 500 sellers or partners</option>
                    <option>500 – 2,500</option>
                    <option>2,500 – 10,000</option>
                    <option>Over 10,000</option>
                  </select>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="sched">
                    Prefer email?
                  </label>
                  <a id="sched" className="btn btn--ghost" href={`mailto:${site.email}`}>
                    <Icon name="mail" size={15} />
                    {site.email}
                  </a>
                </div>

                <div className="field formgrid__full">
                  <label className="field__label" htmlFor="message">
                    What are you trying to fix? <span className="field__req">*</span>
                  </label>
                  <textarea
                    id="message"
                    className="textarea"
                    value={v.message}
                    onChange={set('message')}
                    placeholder="A sentence is enough. The more specific it is, the more specific our reply will be."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : 'hint-message'}
                  />
                  {errors.message ? (
                    <span className="field__error" id="err-message">
                      <Icon name="alert" size={14} /> {errors.message}
                    </span>
                  ) : (
                    <span className="field__hint" id="hint-message">
                      For example: &ldquo;Trade claims take six weeks to settle and we cannot price
                      the quarter until they do.&rdquo;
                    </span>
                  )}
                </div>

                <div className="formgrid__full">
                  <button type="submit" className="btn btn--accent btn--lg" disabled={state === 'sending'}>
                    {state === 'sending' ? 'Sending…' : 'Request a demo'}
                    <Icon name="arrow" size={16} className="btn__arrow" />
                  </button>
                  <p className="fine" style={{ marginTop: 'var(--space-3)' }}>
                    We use what you send here to reply to you and nothing else. See the{' '}
                    <Link to="/privacy">privacy policy</Link>.
                  </p>
                </div>
              </div>
            </form>

            <div className="stack stack--lg">
              <div className="card">
                <SectionHead eyebrow="What happens" title="In the session" as="h2" />
                <CheckList
                  items={[
                    'Thirty minutes. No deck unless you ask for one.',
                    'We configure one of your real schemes live, including the awkward parts.',
                    'If you bring a closed cycle, we compute it alongside your own result.',
                    'You leave with the configuration, whether or not you buy anything.',
                  ]}
                />
              </div>

              <div className="card">
                <span className="eyebrow eyebrow--muted">Direct</span>
                <p style={{ color: 'var(--text-muted)' }}>
                  Prefer to just write? <a href={`mailto:${site.email}`}>{site.email}</a> reaches the
                  same people.
                </p>
                <p className="fine">
                  {site.legalName} · operating across {site.regions.join(', ')}.
                </p>
              </div>

              <div className="card card--featured">
                <h3 className="card__title">Not ready to talk?</h3>
                <p className="card__body">
                  Put a number on your own channel spend leakage first. No form, no email, nothing
                  leaves your browser.
                </p>
                <Link to="/leakage-calculator" className="btn btn--accent btn--sm" style={{ marginTop: 'var(--space-3)' }}>
                  Leakage calculator
                  <Icon name="arrow" size={14} className="btn__arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
