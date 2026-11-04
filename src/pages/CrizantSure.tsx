import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta, CheckList } from '@/components/ui';
import { Stagger } from '@/components/motion';
import { Faq } from '@/components/Faq';
import { SureHeroSimulator } from '@/components/home/SureHeroSimulator';
import {
  productBySlug,
  sureAreas,
  sureIntelligence,
  sureTargetModel,
  productEvidence,
} from '@/data/products';

const sure = productBySlug('crizant-sure')!;

export default function CrizantSure() {
  return (
    <>
      <PageHero hasConsole>
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Products', path: '/products' },
              { name: 'Crizant Sure', path: '/products/crizant-sure' },
            ]}
          />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Crizant Sure · Broking OS</span>
              <h1 className="pagehero__title">
                The whole broking business,{' '}
                <span className="accent gradtext">in one workspace.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                {sure.promise}
              </p>
              <div className="hero__actions" style={{ marginTop: 'var(--space-5)' }}>
                <Link to="/contact" className="btn btn--accent">
                  Book a Sure demo
                  <Icon name="arrow" size={15} className="btn__arrow" />
                </Link>
                <Link to="/products" className="btn btn--ghost">
                  All three products
                </Link>
              </div>
            </div>
            <div>
              <SureHeroSimulator />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split split--wide-left" style={{ alignItems: 'start' }}>
            <div>
              <SectionHead eyebrow="The reality" title="What a composite house actually runs on" />
              <p className="lead">
                Usually four things at once: a CRM that knows the lead but not the policy, a
                spreadsheet that knows the renewal, the insurer portals that know the quote, and
                somebody&rsquo;s own file that knows what each principal still owes. Nothing
                reconciles, so the broking house discovers its own position late.
              </p>
              <hr className="hairrule" style={{ margin: 'var(--space-5) 0' }} />
              <span className="eyebrow">What Crizant Sure does</span>
              <p style={{ color: 'var(--white)', fontSize: 'var(--fs-lead)' }}>
                Carries the business end to end in one place — lead, placement, policy, servicing,
                renewal, commission and books — so the position is a query, not a reconstruction.
              </p>
              <div className="card card--pad-lg" style={{ marginTop: 'var(--space-4)' }}>
                <span className="eyebrow eyebrow--muted" style={{ marginBottom: 4 }}>The composite problem</span>
                <p className="card__body" style={{ margin: 0 }}>
                  Most broking software was built for one line. A composite intermediary sells
                  insurance, mutual funds and loans to the same person, and the moment the book
                  spans three regulators and three payout bases, single-line software becomes three
                  systems and a spreadsheet to join them.
                </p>
              </div>
            </div>
            <div className="card card--pad-lg">
              <span className="eyebrow eyebrow--muted">Who it is for</span>
              <p className="card__body">{sure.audience}</p>
              <CheckList
                items={[
                  'Insurance, mutual funds and lending on one customer record',
                  'Placement, not just CRM — enquiry to multi-insurer quote',
                  'Run-rate against every principal, separately',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The workspace"
            title="Six areas, one record"
            lead="These are the product's own sections, not a feature list written for a brochure."
          />
          <Stagger className="grid grid--3">
            {sureAreas.map((a) => (
              <div key={a.heading} className="card card--pad-lg spot">
                <span className="iconchip iconchip--quiet" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={a.icon} />
                </span>
                <h3 className="card__title">{a.heading}</h3>
                <p className="card__body">{a.body}</p>
                <CheckList items={a.items} />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Targets" title={sureTargetModel.title} lead={sureTargetModel.body} />
          <div className="grid grid--3">
            {sureTargetModel.groups.map((g) => (
              <div key={g.name} className="card card--pad-lg">
                <h3 className="card__title" style={{ fontSize: '1rem' }}>
                  {g.name}
                </h3>
                <p className="card__body">{g.body}</p>
              </div>
            ))}
          </div>
          <div className="notice" style={{ marginTop: 'var(--space-5)' }}>
            <Icon name="alert" />
            <p style={{ margin: 0 }}>{sureTargetModel.note}</p>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <SectionHead
            eyebrow="The intelligence"
            title={
              <>
                What the AI does, <span className="accent">stated as behaviour.</span>
              </>
            }
            lead="Every one of these is something a user can see happening and disagree with. None of it decides anything on its own."
          />
          <div className="grid grid--2">
            {sureIntelligence.map((i) => (
              <div key={i.title} className="card card--pad-lg">
                <h3 className="card__title" style={{ fontSize: '1rem' }}>
                  {i.title}
                </h3>
                <p className="card__body">{i.body}</p>
              </div>
            ))}
          </div>
          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            {productEvidence}
          </p>
        </div>
      </section>

      <Faq
        title="Crizant Sure — questions"
        items={[
          {
            q: 'Is Crizant Sure the same product as Crizant One?',
            a: 'No. Crizant Sure is a broking business management system for intermediaries running their own book — leads, placement, policies, renewals and commission receivable. Crizant One is a commission and incentive operating system for the principal paying a distribution network. A broker uses Sure; the insurer or bank paying that broker uses One. They are sold separately and neither requires the other.',
          },
          {
            q: 'What does Crizant Sure cover beyond insurance?',
            a: 'Crizant Sure carries a composite book: general and life insurance, mutual funds, and loans and banking products, on one customer record. Each principal group is targeted and measured separately, because an insurer measures sourced premium, a bank measures disbursal and a fund house measures net sales and trail.',
          },
          {
            q: 'Does Crizant Sure handle quote comparison across insurers?',
            a: 'Yes. An enquiry is raised to several insurers, the quotations come back against that one enquiry, and Crizant Sure makes them comparable on sum insured and cover before the client chooses. The selected quote carries through into the policy record rather than being re-keyed.',
          },
          {
            q: 'Can a relationship manager see what to do next?',
            a: 'Crizant Sure ranks the day’s work by urgency multiplied by premium at stake, so a renewal nine days from expiry on a large account sits above a twelve-day renewal on a small one. The ranking shows its inputs — days to expiry, likelihood to renew and premium — so the user can see why an item is where it is.',
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="Also from Crizant" title="The other two systems" />
          <div className="grid grid--2">
            <Link to="/platform" className="card card--hover card--pad-lg">
              <h3 className="card__title">Crizant One</h3>
              <p className="card__body">
                For the principal on the other side of the table — the insurer, bank or AMC paying
                the distribution network.
              </p>
              <span className="card__foot">
                Open Crizant One
                <Icon name="arrow" size={13} />
              </span>
            </Link>
            <Link to="/products/crizant-shield" className="card card--hover card--pad-lg">
              <h3 className="card__title">Crizant Shield</h3>
              <p className="card__body">
                For the insurer&rsquo;s fraud risk unit — detection across policyholder,
                distributor, employee and vendor, and the governance to evidence it.
              </p>
              <span className="card__foot">
                Open Crizant Shield
                <Icon name="arrow" size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="See it on your own book"
        title="Bring one month of your own renewals."
        body="Thirty minutes. We load a real renewal list and a real set of principal targets, and you see the queue and the run-rate the way your team would."
        secondary={{ label: 'All three products', to: '/products' }}
      />
    </>
  );
}
