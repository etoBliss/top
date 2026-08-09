import TAPMark from './TAPMark.jsx';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Record', href: '#record' },
];

export default function Footer() {
  return (
    <footer className="surface-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <TAPMark size={44} />
              <span className="font-mono-set text-[15px] font-extrabold tracking-[0.06em] text-ivory">
                TOP
              </span>
            </div>

            <p className="mt-8 max-w-sm text-[14px] leading-relaxed text-ivory-muted">
              Built quietly. Run with direction. Every member of LAUMSA to
              where they belong — right at the TOP.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow text-ivory-faint">Pages</span>
            <ul className="mt-6 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-ivory-muted motion-safe hover:text-ivory"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow text-ivory-faint">Contact</span>
            <ul className="mt-6 space-y-3 text-[14px] text-ivory-muted">
              <li>
                <a href="#" className="motion-safe hover:text-ivory">Instagram</a>
              </li>
              <li>
                <a href="#" className="motion-safe hover:text-ivory">X</a>
              </li>
              <li>
                <a href="#" className="motion-safe hover:text-ivory">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 text-[11px] text-ivory-faint md:flex-row md:items-center md:justify-between">
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
