import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Record', href: '#record' },
];

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openMobile]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 md:px-10 md:py-8">
        <a href="#top" aria-label="TOP — home" className="flex items-center gap-3">
          <Logo size={40} />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-mono-set text-[12px] font-medium uppercase tracking-[0.22em] text-ivory-muted motion-safe hover:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#join"
                className="font-mono-set text-[12px] font-medium uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory"
              >
                Join Us
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpenMobile((o) => !o)}
          aria-expanded={openMobile}
          aria-controls="mobile-nav"
          aria-label={openMobile ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 items-center justify-center text-ivory md:hidden"
        >
          {openMobile ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile drawer — flat list */}
      <div
        id="mobile-nav"
        className={`surface-ink ${openMobile ? 'block' : 'hidden'} md:hidden`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-6 py-8">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpenMobile(false)}
                  className="block py-4 font-mono-set text-[14px] uppercase tracking-[0.22em] text-ivory-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#join"
                onClick={() => setOpenMobile(false)}
                className="block py-2 font-mono-set text-[14px] uppercase tracking-[0.22em] text-gold"
              >
                Join Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
