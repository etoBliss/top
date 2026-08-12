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
function Facebook({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.8 8.43-4.94 8.43-9.94Z" />
    </svg>
  );
}

const PAGES = [
  { to: '/', label: 'Home' },
  { to: '/exposure', label: 'Stages' },
  { to: '/awards', label: 'Honors' },
  { to: '/experience', label: 'Roots' },
  { to: '/leadership', label: 'Bio' },
];

export default function AppFooter() {
  return (
    <footer className="surface-ink mt-24 pb-28 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="bento p-7 md:p-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <Logo size={48} />
              <span className="font-mono-set text-[15px] font-extrabold tracking-[0.06em] text-ivory">
                TOP
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ivory-muted">
              Built quietly. Run with direction. Every member of LAUMSA, to where
              they belong — right at the TOP.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow text-ivory-faint">Pages</span>
            <ul className="mt-5 space-y-3">
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="text-[14px] text-ivory-muted motion-safe hover:text-gold"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="font-mono-set text-[11px] uppercase tracking-[0.22em] text-ivory-faint motion-safe hover:text-gold"
                >
                  Admin →
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow text-ivory-faint">Reach me</span>
            <ul className="mt-5 space-y-3 text-[14px] text-ivory-muted">
              <li>
                <a href="#" className="motion-safe hover:text-ivory inline-flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="motion-safe hover:text-ivory inline-flex items-center gap-2">
                  <XLogo className="h-4 w-4" /> X
                </a>
              </li>
              <li>
                <a href="#" className="motion-safe hover:text-ivory inline-flex items-center gap-2">
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-[11px] text-ivory-faint md:flex-row md:items-center md:justify-between">
          <span className="font-mono-set uppercase tracking-[0.22em]">
            © 2026 Oluwadolapo Popoola · TOP Campaign
          </span>
          <span className="font-mono-set uppercase tracking-[0.22em] text-gold">
            To the TOP.
          </span>
        </div>
      </div>
    </footer>
  );
}
