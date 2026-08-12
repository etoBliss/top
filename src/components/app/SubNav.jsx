import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Sticky subnav that sits below the global TopNav on every page route.
 * Gives the user a back-link + section context + the "Next page" affordance.
 * Hides on /admin and on the home route (which has its own hero chrome).
 */
export default function SubNav({ title, eyebrow, back, next }) {
  const loc = useLocation();
  if (loc.pathname.startsWith('/admin')) return null;
  if (loc.pathname === '/') return null;

  return (
    <div className="sticky top-16 z-30 glass border-b border-white/5">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
        <div className="flex items-center gap-3 min-w-0">
          {back ? (
            <Link
              to={back.to}
              className="flex items-center gap-1 font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-muted hover:text-gold motion-safe"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">{back.label}</span>
            </Link>
          ) : (
            <span className="text-ivory-faint">·</span>
          )}
          <div className="flex min-w-0 items-baseline gap-2 overflow-hidden">
            {eyebrow && (
              <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold shrink-0">
                {eyebrow}
              </span>
            )}
            <h2 className="truncate font-display italic text-[15px] text-ivory/85">
              {title}
            </h2>
          </div>
        </div>
        {next && (
          <Link
            to={next.to}
            className="flex items-center gap-1 font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-muted hover:text-gold motion-safe"
          >
            <span className="hidden sm:inline">{next.label}</span>
            <ChevronRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
