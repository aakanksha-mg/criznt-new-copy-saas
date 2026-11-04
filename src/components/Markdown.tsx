import { Fragment, type ReactNode } from 'react';

/**
 * A deliberately small markdown subset, rendered to real React nodes rather
 * than injected HTML — nothing on this site needs dangerouslySetInnerHTML.
 *
 * Supports: ## / ### headings, paragraphs, - lists, 1. lists, > quotes,
 * GFM tables, ::: key … ::: callouts, **bold**, *italic*, `code`, [links](/x).
 */

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const k = `${keyBase}-${i++}`;
    if (t.startsWith('**')) out.push(<strong key={k}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith('`')) out.push(<code key={k}>{t.slice(1, -1)}</code>);
    else if (t.startsWith('[')) {
      const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(t)!;
      const external = /^https?:/.test(href);
      out.push(
        <a key={k} href={href} {...(external ? { rel: 'noopener', target: '_blank' } : {})}>
          {label}
        </a>,
      );
    } else out.push(<em key={k}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Heading = { level: 2 | 3; text: string; id: string };

export function parseHeadings(md: string): Heading[] {
  return md
    .split('\n')
    .filter((l) => /^#{2,3}\s/.test(l))
    .map((l) => {
      const level = (l.startsWith('### ') ? 3 : 2) as 2 | 3;
      const text = l.replace(/^#{2,3}\s/, '').trim();
      return { level, text, id: slugify(text) };
    });
}

export function Markdown({ source }: { source: string }) {
  const lines = source.trim().split('\n');
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const flushList = (ordered: boolean) => {
    const items: string[] = [];
    while (i < lines.length && (ordered ? /^\d+\.\s/ : /^[-*]\s/).test(lines[i])) {
      items.push(lines[i].replace(ordered ? /^\d+\.\s/ : /^[-*]\s/, ''));
      i++;
    }
    const L = ordered ? 'ol' : 'ul';
    nodes.push(
      <L key={`l${key++}`}>
        {items.map((it, n) => (
          <li key={n}>{inline(it, `li${key}-${n}`)}</li>
        ))}
      </L>,
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith('::: key')) {
      i++;
      const buf: string[] = [];
      while (i < lines.length && !lines[i].startsWith(':::')) buf.push(lines[i++]);
      i++;
      nodes.push(
        <aside className="keybox" key={`k${key++}`}>
          <p style={{ color: 'var(--white)', fontSize: '1.08rem', lineHeight: 1.5, margin: 0 }}>
            {inline(buf.join(' ').trim(), `kb${key}`)}
          </p>
        </aside>,
      );
      continue;
    }

    if (line.startsWith('### ')) {
      const t = line.slice(4).trim();
      nodes.push(
        <h3 id={slugify(t)} key={`h${key++}`}>
          {inline(t, `h${key}`)}
        </h3>,
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      const t = line.slice(3).trim();
      nodes.push(
        <h2 id={slugify(t)} key={`h${key++}`}>
          {inline(t, `h${key}`)}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith('> ')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) buf.push(lines[i++].slice(2));
      nodes.push(
        <blockquote key={`q${key++}`}>
          <p>{inline(buf.join(' '), `bq${key}`)}</p>
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      flushList(false);
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      flushList(true);
      continue;
    }

    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i]
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      nodes.push(
        <div className="tablewrap" key={`t${key++}`} style={{ margin: 'var(--space-4) 0' }}>
          <table className="data">
            <thead>
              <tr>
                {head.map((h, n) => (
                  <th key={n} scope="col">
                    {inline(h, `th${key}-${n}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, n) => (
                <tr key={n}>
                  {r.map((c, m) =>
                    m === 0 ? (
                      <th key={m} scope="row">
                        {inline(c, `td${key}-${n}-${m}`)}
                      </th>
                    ) : (
                      <td key={m}>{inline(c, `td${key}-${n}-${m}`)}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3}\s|[-*]\s|\d+\.\s|>\s|\||:::)/.test(lines[i])
    ) {
      buf.push(lines[i++]);
    }
    nodes.push(<p key={`p${key++}`}>{inline(buf.join(' '), `pp${key}`)}</p>);
  }

  return <Fragment>{nodes}</Fragment>;
}
