import { useState } from 'react';
import { SectionHead } from './ui';

/**
 * Rendered as real text in the DOM whether or not a panel is open, so a crawler
 * or an answer engine reads every answer. Only visibility is toggled.
 */
export function Faq({
  items,
  title = 'Questions people actually ask',
  eyebrow = 'FAQ',
  lead,
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
  lead?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
        <div className="accordion">
          {items.map((it, i) => (
            <div className="accordion__item" key={it.q}>
              <h3 style={{ margin: 0 }}>
                <button
                  type="button"
                  className="accordion__btn"
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{it.q}</span>
                  <span className="accordion__sign" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="accordion__panel"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                hidden={open !== i}
              >
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
