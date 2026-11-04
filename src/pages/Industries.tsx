import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta, Quote } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { industries } from '@/data/industries';

export default function Industries() {
  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Industries', path: '/industries' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Industries</span>
              <h1 className="pagehero__title">
                Four industries. <span className="accent">One mechanic.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                A payout that precedes certainty, through a multi-tier channel, on a scheme that
                keeps changing. The vocabulary differs — claim, incentive, brokerage, commission —
                and the structure does not.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tablewrap">
            <table className="data">
              <caption>What you pay on, and how it reverses.</caption>
              <thead>
                <tr>
                  <th scope="col">Industry</th>
                  <th scope="col">What you pay on</th>
                  <th scope="col">How it reverses</th>
                  <th scope="col">Where it sells</th>
                </tr>
              </thead>
              <tbody>
                {industries.map((i) => (
                  <tr key={i.slug}>
                    <th scope="row">
                      <Link to={`/industries/${i.slug}`}>{i.nav}</Link>
                    </th>
                    <td>{i.payOn}</td>
                    <td>{i.reverses}</td>
                    <td>{i.geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead eyebrow="By industry" title="Where the money actually goes" />
          <div className="grid grid--2">
            {industries.map((i) => (
              <Link key={i.slug} to={`/industries/${i.slug}`} className="card card--hover card--pad-lg">
                <span className="iconchip" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={i.icon} />
                </span>
                <h3 className="card__title">{i.name}</h3>
                <p className="card__body">{i.promise}</p>
                <span className="card__foot">
                  {i.geo}
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="In their words" title="What the buyer actually says" />
          <div className="grid grid--2">
            {industries.map((i) => (
              <Quote key={i.slug} text={i.quote} who={i.quoteWho} />
            ))}
          </div>
        </div>
      </section>

      <Faq items={industries.flatMap((i) => i.faqs).slice(0, 8)} title="Industry questions" />

      <Cta secondary={{ label: 'Read the reversal analysis', to: '/resources/the-reversal-problem' }} />
    </>
  );
}
