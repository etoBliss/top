import { useMemo } from 'react';
import Reveal from '../components/Reveal.jsx';
import PageShell from '../components/app/PageShell.jsx';
import { StatTile } from '../components/app/Tiles.jsx';
import { STAGES } from '../data/pages.js';
import { Mic, Calendar, MapPin, Quote } from 'lucide-react';

/**
 * Stages — the rooms TOP has stood in.
 *
 * Bento layout:
 *   1. Pull quote + portrait card
 *   2. 4 stat tiles
 *   3. 4 numbered track bento cards
 */
export default function Stages() {
  const total = useMemo(() => STAGES.reduce((s, g) => s + g.items.length, 0), []);

  return (
    <PageShell
      subnav={{
        eyebrow: 'Where TOP has stood',
        title: 'Stages.',
        back: { to: '/leadership', label: 'Bio' },
        next: { to: '/awards', label: 'Honors' },
      }}
    >
      <div className="page-gutter pt-8 pb-24 md:pt-12 md:pb-32">
        {/* Lead card */}
        <section className="mx-auto max-w-7xl">
          <Reveal className="bento grain p-6 md:p-10">
            <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <span className="pill pill-gold">Where TOP has stood</span>
                <h1 className="section-title mt-6 text-[40px] text-ivory sm:text-6xl md:text-[72px]">
                  Stages.
                </h1>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory-muted">
                  Exposure shapes perspective. Perspective shapes decisions.
                  Here's a running list of the rooms I've stood in — from
                  conventions to summits to small invited tables.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="flex h-full items-center">
                  <Quote className="h-10 w-10 text-gold" />
                  <p className="ml-4 font-display text-[20px] italic leading-snug text-ivory md:text-[24px]">
                    “A leader is not defined by where he stands, but by what
                    he builds wherever he stands.”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="mx-auto mt-6 max-w-7xl sm:mt-8 md:mt-10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
            <StatTile value={String(total)} label="Rooms" icon={Mic}    delay={0}   hint="4 categories" />
            <StatTile value="7"   label="Categories" icon={Calendar} delay={120} hint="Conventions attended" />
            <StatTile value="2021—25" label="Span" icon={Calendar} delay={240} />
            <StatTile value="6"   label="Cities" icon={MapPin}     delay={360} hint="Lagos · · Ibadan · Osun · Ekiti · Ogbomoso · Abuja" />
          </div>
        </section>

        {/* Track groups */}
        <section className="mx-auto mt-6 max-w-7xl space-y-6 sm:mt-8 md:mt-10">
          {STAGES.map((group, gi) => (
            <Reveal key={group.label} delay={100 + gi * 80} className="bento grain p-6 md:p-8">
              <div className="flex items-center gap-4">
                <span className="font-display text-[44px] italic leading-none text-gold md:text-[56px]">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="pill pill-gold">Track · {group.label}</span>
                  <h2 className="mt-3 font-display text-[24px] italic leading-tight text-ivory md:text-[28px]">
                    {group.sub}
                  </h2>
                </div>
              </div>

              <ul className="mt-8 divide-y divide-[var(--color-line)]">
                {group.items.map((it, i) => (
                  <li
                    key={i}
                    className="group flex items-baseline gap-4 py-4 motion-safe"
                  >
                    <span className="w-28 shrink-0 font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
                      {it.dates}
                    </span>
                    <span className="flex-1 text-[15px] leading-relaxed text-ivory/90 md:text-[16px]">
                      {it.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block h-px w-0 bg-gold motion-safe group-hover:w-8 group-hover:bg-gold"
                      style={{ transition: 'width 380ms cubic-bezier(0.2,0.7,0.2,1)' }}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="mt-12 bento grain p-8 md:p-10 text-center">
            <p className="font-display text-[24px] italic leading-snug text-gold md:text-[32px]">
              TOP is the leader you need.
            </p>
          </Reveal>
        </section>
      </div>
    </PageShell>
  );
}
