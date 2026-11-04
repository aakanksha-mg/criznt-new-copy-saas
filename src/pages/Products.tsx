import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, Cta } from '@/components/ui';
import { Stagger } from '@/components/motion';
import { ValueChainTopology } from '@/components/products/ValueChainTopology';
import { products, productEvidence } from '@/data/products';

export default function Products() {
  return (
    <>
      <section className="pagehero">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Products', path: '/products' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Products</span>
              <h1 className="pagehero__title">
                Three systems,{' '}
                <span className="accent gradtext">one distribution chain.</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Crizant builds for three different people in the same chain: the principal who
                pays a distribution network, the intermediary who runs one, and the risk function
                that has to prove neither is being defrauded. They are sold separately, run
                independently, and share nothing except an opinion about what an audit trail is
                for.
              </p>
            </div>
            <div className="card card--pad-lg">
              <span className="eyebrow eyebrow--muted">Why three and not one</span>
              <p className="card__body">
                A commission engine, a broking workspace and a fraud unit have genuinely different
                buyers, different regulators and different definitions of a good day. Bundling
                them into one product would mean every customer paying for two-thirds they do not
                use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ValueChainTopology />
          <div style={{ marginTop: 'var(--space-6)' }}>
            <SectionHead
              eyebrow="The family"
              title="Who each one is for"
              lead="The quickest way to tell them apart is to ask who signs the invoice."
            />
          </div>
          <Stagger className="grid grid--3">
            {products.map((p) => (
              <Link key={p.slug} to={p.to} className="card card--hover card--pad-lg spot">
                <span className="iconchip iconchip--accent" style={{ marginBottom: 'var(--space-3)' }}>
                  <Icon name={p.icon} />
                </span>
                <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                  {p.chainRole}
                </span>
                <h2 className="card__title" style={{ fontSize: '1.15rem' }}>
                  {p.name}
                </h2>
                <p className="card__body" style={{ color: 'var(--white)' }}>
                  {p.category}
                </p>
                <p className="card__body">{p.promise}</p>
                <dl className="minidl">
                  <dt>Bought by</dt>
                  <dd>{p.audience}</dd>
                </dl>
                <span className="card__foot">
                  Open {p.name}
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </Stagger>
          <p className="fine" style={{ marginTop: 'var(--space-5)' }}>
            {productEvidence}
          </p>
        </div>
      </section>

      <Cta
        eyebrow="Not sure which"
        title="Tell us who is paying whom."
        body="That one answer usually settles it. If you pay a distribution network it is Crizant One; if you are the network it is Crizant Sure; if you are carrying the fraud risk it is Crizant Shield."
        secondary={{ label: 'How to check our claims', to: '/proof' }}
      />
    </>
  );
}
