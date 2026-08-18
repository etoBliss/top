import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../Logo.jsx';
import { Home, Compass, ScrollText, Layers, UserRound } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/exposure', label: 'Stages', icon: Compass },
  { to: '/awards', label: 'Honors', icon: ScrollText },
  { to: '/experience', label: 'Roots', icon: Layers },
  { to: '/leadership', label: 'Bio', icon: UserRound },
  { to: '/manifesto', label: 'Manifesto', icon: ScrollText },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide on /admin so login screen stays clean.
  if (loc.pathname.startsWith('/admin')) return null;

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 glass',
        scrolled ? 'border-b border-white/5' : 'border-b border-transparent',
        'motion-safe',
      ].join(' ')}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3">
          <Logo size={36} />
          <span className="font-mono-set text-[13px] font-extrabold tracking-[0.18em] text-ivory">
            TOP
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                [
                  'relative px-4 py-2 font-mono-set text-[11px] font-semibold uppercase tracking-[0.22em]',
                  'motion-safe',
                  isActive
                    ? 'text-ivory'
                    : 'text-ivory-faint hover:text-ivory',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile-only small profile link */}
        <Link
          to="/leadership"
          aria-label="Bio"
          className="grid h-9 w-9 place-items-center rounded-full bg-ink-card text-gold md:hidden"
        >
          <UserRound size={16} />
        </Link>
      </div>
    </header>
  );
}
