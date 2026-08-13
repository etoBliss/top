import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function Manifesto() {
  return (
    <div className="page-gutter pb-20">
      <section className="mx-auto max-w-4xl pt-10 md:pt-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono-set text-[11px] uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>

        <div className="bento grain mt-8 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
              <Sparkles size={18} />
            </span>
            <span className="eyebrow text-ivory-faint">Manifesto</span>
          </div>

          <h1 className="mt-8 font-display text-[38px] italic leading-tight text-ivory sm:text-[52px] md:text-[64px]">
            Coming soon.
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ivory-muted">
            The full statement is being shaped into a clearer, sharper expression of the work, the values, and the direction.
          </p>

          <div className="mt-10 border-l-2 border-gold/40 pl-4">
            <p className="font-mono-set text-[11px] uppercase tracking-[0.22em] text-gold">
              For now
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ivory-muted">
              This page is being prepared for the campaign’s core promise: representation, direction, and a LAUMSA that works for everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
