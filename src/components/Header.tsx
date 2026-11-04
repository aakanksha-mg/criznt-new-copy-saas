import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, type NavItem, type NavChild } from '@/lib/site';
import { Icon } from './Icon';
import { Brand } from './Brand';

const panelLink = (c: NavChild, close: () => void) => (
  <Link key={c.to} to={c.to} className="navpanel__link" role="menuitem" onClick={close}>
    <span className="navpanel__label">{c.label}</span>
    {c.blurb && <span className="navpanel__blurb">{c.blurb}</span>}
  </Link>
);

function DesktopItem({ item, last }: { item: NavItem; last: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  if (!item.children && !item.columns) {
    return (
      <div className="navitem">
        <NavLink
          to={item.to}
          className={({ isActive }) => `navitem__link${isActive ? ' is-active' : ''}`}
        >
          {item.label}
        </NavLink>
      </div>
    );
  }

  const hold = (next: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(next), next ? 60 : 160);
  };

  return (
    <div
      /* A wide panel is anchored to the header bar rather than to the item, so
         it cannot run past the viewport on a narrow laptop. `position: static`
         is what hands the containing block to .header__bar. */
      className={`navitem${item.columns ? ' navitem--wide' : ''}`}
      ref={ref}
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
    >
      <button
        type="button"
        className="navitem__link"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <Icon name="chevron" className="navitem__chev" />
      </button>
      {open && (
        <div
          className={`navpanel${item.columns ? ' navpanel--wide' : ''}${
            item.columns && item.columns.length > 2 ? ' navpanel--wide3' : ''
          }${
            item.columns && last ? ' navpanel--right' : ''
          }`}
          role="menu"
          aria-label={item.label}
        >
          {item.columns
            ? item.columns.map((col) => (
                <div className="navpanel__col" key={col.heading}>
                  <span className="navpanel__heading">{col.heading}</span>
                  {col.links.map((c) => panelLink(c, () => setOpen(false)))}
                </div>
              ))
            : item.children!.map((c) => panelLink(c, () => setOpen(false)))}
        </div>
      )}
    </div>
  );
}

function MobileGroup({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const flat = item.columns ? item.columns.flatMap((c) => c.links) : item.children;
  if (!flat) {
    return (
      <div className="mobilenav__group">
        <Link to={item.to} className="mobilenav__toplink" onClick={onNavigate}>
          {item.label}
        </Link>
      </div>
    );
  }
  return (
    <div className="mobilenav__group">
      <button type="button" className="mobilenav__head" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {item.label}
        <Icon name="chevron" className="navitem__chev" size={14} />
      </button>
      {open && (
        <div className="mobilenav__children">
          <Link to={item.to} className="mobilenav__child" onClick={onNavigate}>
            Overview
          </Link>
          {/* Ten flat links is a wall. Where the desktop panel has columns,
              their headings carry over as group labels. */}
          {item.columns
            ? item.columns.map((col) => (
                <div key={col.heading}>
                  <span className="mobilenav__heading">{col.heading}</span>
                  {col.links.map((c) => (
                    <Link key={c.to} to={c.to} className="mobilenav__child" onClick={onNavigate}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              ))
            : flat.map((c) => (
                <Link key={c.to} to={c.to} className="mobilenav__child" onClick={onNavigate}>
                  {c.label}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  return (
    <header className="header">
      <div className="container header__bar">
        <Brand />

        <nav className="header__nav" aria-label="Primary">
          {nav.map((item, i) => (
            <DesktopItem key={item.to} item={item} last={i === nav.length - 1} />
          ))}
        </nav>

        {/* One call to action. The calculator and everything else that used to
            sit here is reference material and lives inside Resources. */}
        <div className="header__actions">
          <button
            type="button"
            className="header__search-btn"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            aria-label="Open command palette"
            title="Search pages, sandboxes, and architecture (⌘K)"
          >
            <Icon name="spark" size={13} />
            <span className="header__search-label">Search</span>
            <kbd className="header__search-kbd">⌘K</kbd>
          </button>
          <Link to="/contact" className="btn btn--accent btn--sm">
            Book a demo
            <Icon name="arrow" size={14} className="btn__arrow" />
          </Link>
        </div>

        <button
          type="button"
          className="burger"
          aria-expanded={menu}
          aria-controls="mobile-nav"
          aria-label={menu ? 'Close menu' : 'Open menu'}
          onClick={() => setMenu((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menu && (
        <div className="mobilenav" id="mobile-nav">
          <div className="container">
            {nav.map((item) => (
              <MobileGroup key={item.to} item={item} onNavigate={() => setMenu(false)} />
            ))}
            <div className="mobilenav__cta">
              <Link to="/contact" className="btn btn--primary btn--block">
                Book a demo
              </Link>
              <Link to="/leakage-calculator" className="btn btn--ghost btn--block">
                Leakage calculator
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
