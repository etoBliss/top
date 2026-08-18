import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';

/* Inline brand SVGs (lucide's brand icons are deprecated) */
function Instagram({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2H21l-6.522 7.452L22 22h-6.749l-4.78-6.243L4.8 22H2l6.987-7.984L2 2h6.91l4.31 5.71L18.244 2Zm-1.18 18h1.85L7.04 4H5.07l12 16Z" />
    </svg>
  );
}

function GlobeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function LinkedInLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6.94 8.4A1.6 1.6 0 1 1 6.94 5.2a1.6 1.6 0 0 1 0 3.2ZM5.2 9.8h3.48v9.7H5.2V9.8Zm5.4 0h3.34v1.34h.05c.46-.88 1.6-1.8 3.3-1.8 3.52 0 4.17 2.31 4.17 5.32v5.84h-3.48v-5.47c0-1.3-.03-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88v5.57H10.6V9.8Z" />
    </svg>
  );
}

function YouTubeLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21.6 7.2a2.77 2.77 0 0 0-1.96-1.96C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.64.44A2.77 2.77 0 0 0 2.4 7.2 29.1 29.1 0 0 0 2 12a29.1 29.1 0 0 0 .4 4.8 2.77 2.77 0 0 0 1.96 1.96c1.74.44 7.64.44 7.64.44s5.9 0 7.64-.44a2.77 2.77 0 0 0 1.96-1.96A29.1 29.1 0 0 0 22 12a29.1 29.1 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function TikTokLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14.2 3.1c.42 1.4 1.42 2.34 2.96 2.72v2.72c-1.12 0-2.12-.23-3.08-.7v6.44c0 3.28-2.63 5.92-5.88 5.92S2.32 17.71 2.32 14.42c0-3.1 2.3-5.66 5.24-5.87v2.6c-1.4.14-2.49 1.33-2.49 2.8 0 1.56 1.26 2.84 2.82 2.84 1.56 0 2.82-1.28 2.82-2.84V3.1h3.5Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: 'Website', href: 'https://www.theoluwadolapopopoola.com', icon: GlobeIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/thatspace_boy?igsh=MW80ZjJodnZidnlxNw==', icon: Instagram },
  { label: 'X', href: 'https://x.com/thatspace_boy?s=21', icon: XLogo },
  { label: 'TikTok', href: 'https://www.tiktok.com/@thatspace_boy?', icon: TikTokLogo },
  { label: 'LinkedIn', href: 'https://ng.linkedin.com/in/the-oluwadolapo-popoola-top-b22b1a21a', icon: LinkedInLogo },
  { label: 'YouTube', href: 'https://m.youtube.com/channel/UCZ8ah78fMVoOAJIOB9XLDBA', icon: YouTubeLogo },
];

export default function AppFooter() {
  return (
    <footer className="surface-ink mt-24 pb-28 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="bento p-7 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <div className="flex items-center gap-3">
                <Logo size={48} />
                <span className="font-mono-set text-[15px] font-extrabold tracking-[0.06em] text-ivory">
                  TOP
                </span>
              </div>
              <p className="mt-6 text-[14px] leading-relaxed text-ivory-muted">
                Built quietly. Run with direction. Every member of LAUMSA, to where they belong - right at the TOP.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/3 text-ivory-muted transition-colors motion-safe hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 text-[11px] text-ivory-faint md:flex-row md:items-center md:justify-between">
            <span className="font-mono-set uppercase tracking-[0.22em]">
              © 2026 Oluwadolapo Popoola · TOP Campaign
            </span>
            <div className="flex items-center gap-4">
              <Link to="/manifesto" className="font-mono-set uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory">
                Manifesto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
