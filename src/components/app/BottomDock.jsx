import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, ScrollText, Layers, UserRound } from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/exposure', label: 'Stages', icon: Compass },
  { to: '/awards', label: 'Honors', icon: ScrollText },
  { to: '/experience', label: 'Roots', icon: Layers },
  { to: '/leadership', label: 'Bio', icon: UserRound },
];

export default function BottomDock() {
  const loc = useLocation();

  // Hide the dock on /admin so it doesn't conflict with the admin form
  if (loc.pathname.startsWith('/admin')) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),0px)] md:hidden"
      role="navigation"
      aria-label="Primary mobile"
    >
      <div className="mx-auto w-full max-w-md px-4 pb-3">
        <nav
          className="glass flex h-16 items-center justify-around rounded-3xl border border-white/8 shadow-[var(--shadow-dock)]"
          aria-label="Primary mobile"
        >
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.exact}
                className={({ isActive }) =>
                  [
                    'dock-item motion-safe',
                    isActive ? 'dock-item-active' : '',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={isActive ? 2 : 1.8} />
                    <span className="font-mono-set text-[9px] font-semibold uppercase tracking-[0.2em]">
                      {it.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
