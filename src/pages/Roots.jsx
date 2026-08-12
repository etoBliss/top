import Reveal from '../components/Reveal.jsx';
import PageShell from '../components/app/PageShell.jsx';
import { StatTile } from '../components/app/Tiles.jsx';
import { ROOTS_POSITIONS, ROOTS_COMMITTEES } from '../data/pages.js';
import { Users, Layers, Quote } from 'lucide-react';

/**
 * Roots — the work inside LAUMSA.
 *
 * Bento composition:
 *   1. Lead card (pull quote)
 *   2. Stat row
 *   3. Positions card — numbered vertical timeline
 *   4. Committees card — wrap-list
 */
export default function Roots() {
  return (
    <PageShell
      subnav={{
        eyebrow: 'Inside LAUMSA',
        title: 'Roots.',
        back: { to: '/awards', label: 'Honors' },
        next: { to: '/leadership', label: 'Bio' },
      }}
    >
      <div className="page-gutter pt-8 pb-24 md:pt-12 md:pb-32">
        {/* Lead */}
        <section className="mx-auto max-w-7xl">
          <Reveal className="bento grain p-6 md:p-10">
            <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <span className="pill pill-gold">Inside LAUMSA</span>
                <h1 className="section-title mt-6 text-[40px] text-ivory sm:text-6xl md:text-[72px]">
                  Roots.
                </h1>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory-muted">
                  The work that happened before the campaign — the
                  committees, the class offices, the things that built the
                  habit.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="flex h-full items-center">
                  <Quote className="h-10 w-10 text-gold" />
                  <p className="ml-4 font-display text-[20px] italic leading-snug text-ivory md:text-[24px]">
                    “The only thing better than a passionate leader is a
                    leader with experience.”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="mx-auto mt-6 max-w-7xl sm:mt-8 md:mt-10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
            <StatTile value={String(ROOTS_POSITIONS.length)} label="Posts" hint="Class + Association" delay={0} />
            <StatTile value={String(ROOTS_COMMITTEES.length)} label="Committees" hint="In the room" delay={120} />
            <StatTile value="4" label="Years" hint="Active in LAUMSA" delay={240} />
            <StatTile value="1" label="Goal" accent="crimson" hint="Lead with receipts." delay={360} />
          </div>
        </section>

        {/* Positions — vertical timeline */}
        <section className="mx-auto mt-10 max-w-7xl">
          <Reveal className="bento grain p-6 md:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
                <Users size={16} />
              </span>
              <span className="pill pill-gold">Positions</span>
            </div>
            <h2 className="section-title mt-4 text-[32px] text-ivory md:text-[44px]">
              Six positions, four years.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-muted">
              From Class Governor to Assistant General Secretary — the posts I
              held, the rooms I was in charge of, and the things that got built.
            </p>

            <ol className="relative mt-10 space-y-6 border-l border-[var(--color-line)] pl-6 md:pl-8">
              {ROOTS_POSITIONS.map((it, i) => (
                <Reveal as="li" key={i} delay={i * 80} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[34px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-line)] surface-ink-soft font-mono-set text-[10px] font-semibold text-gold md:-left-[42px] md:h-9 md:w-9"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-[20px] italic text-gold sm:text-[22px]">
                    {it.role}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ivory/85">
                    {it.body}
                  </p>
                  <p className="mt-2 font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
                    {it.dates}
                  </p>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Committees */}
        <section className="mx-auto mt-10 max-w-7xl">
          <Reveal className="bento grain p-6 md:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
                <Layers size={16} />
              </span>
              <span className="pill pill-gold">Committees</span>
            </div>
            <h2 className="section-title mt-4 text-[32px] text-ivory md:text-[44px]">
              Ten committees, in the room.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-muted">
              The proof that I was in the room and did the work.
            </p>

            <ul className="mt-8 grid gap-2 md:grid-cols-2">
              {ROOTS_COMMITTEES.map((it, i) => (
                <Reveal as="li" key={i} delay={i * 50} className="border-b border-[var(--color-line)] py-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
                      {it.role}
                    </span>
                    {it.dates && (
                      <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
                        · {it.dates}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[15px] leading-relaxed text-ivory/85">
                    {it.body}
                    {it.extra && <span className="text-ivory-muted"> · {it.extra}</span>}
                  </p>
                </Reveal>
              ))}
            </ul>

            <p className="mt-10 font-mono-set text-[12px] uppercase tracking-[0.28em] text-gold">
              TOP is not an inexperienced hand. TOP is a trusted leader.
            </p>
          </Reveal>
        </section>
      </div>
    </PageShell>
  );
}
