import Reveal from '../components/Reveal.jsx';
import PageShell from '../components/app/PageShell.jsx';
import { StatTile } from '../components/app/Tiles.jsx';
import { Award, Sparkles, ScrollText, Star, Quote } from 'lucide-react';
import {
  HONORS_SCHOLARSHIPS,
  HONORS_AWARDS,
  HONORS_NOMINATIONS,
  HONORS_CERTIFICATES,
} from '../data/pages.js';

/**
 * Honors — proof on paper.
 *
 * Bento layout:
 *   1. Lead card with portrait call-out + pull quote
 *   2. 4 stat tiles (scholarships / awards / nominations / span)
 *   3. 3 scholarship covers (crimson / ink-elev / wine)
 *   4. Awards list card
 *   5. Nominations count tiles
 *   6. Certificates wrap-list card
 */
export default function Honors() {
  const nominationTotal = HONORS_NOMINATIONS.reduce((s, n) => s + n.count, 0);
  const ceremonyTotal = HONORS_NOMINATIONS.length;

  return (
    <PageShell
      subnav={{
        eyebrow: 'Proof on paper',
        title: 'Honors.',
        back: { to: '/exposure', label: 'Stages' },
        next: { to: '/experience', label: 'Roots' },
      }}
    >
      <div className="page-gutter pt-8 pb-24 md:pt-12 md:pb-32">
        {/* Lead card */}
        <section className="mx-auto max-w-7xl">
          <Reveal className="bento grain p-6 md:p-10">
            <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <span className="pill pill-gold">Proof on paper</span>
                <h1 className="section-title mt-6 text-[40px] text-ivory sm:text-6xl md:text-[72px]">
                  Honors.
                </h1>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory-muted">
                  A well-rounded record — academics, socials, and everything
                  in between. The full list, nothing trimmed.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="flex h-full items-center">
                  <Quote className="h-10 w-10 text-gold" />
                  <p className="ml-4 font-display text-[20px] italic leading-snug text-ivory md:text-[24px]">
                    “LAUMSA deserves a leader that is well-rounded —
                    academically, socially, and in all regards.”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Stat row */}
        <section className="mx-auto mt-6 max-w-7xl sm:mt-8 md:mt-10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
            <StatTile value={String(HONORS_SCHOLARSHIPS.length)} label="Scholarships" icon={Award} delay={0} />
            <StatTile value={String(HONORS_AWARDS.length)}          label="Awards"        icon={Sparkles} delay={120} />
            <StatTile value={String(nominationTotal)}                label="Nominations"   icon={Star} delay={240} />
            <StatTile value="2021—25" label="Span" delay={360} />
          </div>
        </section>

        {/* Scholarships */}
        <section className="mx-auto mt-10 max-w-7xl">
          <Reveal>
            <span className="pill pill-gold">Scholarships</span>
            <h2 className="section-title mt-4 text-[32px] text-ivory md:text-[44px]">
              Three scholarships earned.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-muted">
              Funding the degree, one award at a time.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-6">
            {HONORS_SCHOLARSHIPS.map((s, i) => (
              <Reveal key={s.title} delay={120 + i * 100}>
                <ScholarshipCover s={s} accent={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mx-auto mt-12 max-w-7xl">
          <Reveal className="bento grain p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="pill pill-gold">Awards</span>
              <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
                {HONORS_AWARDS.length} awards
              </span>
            </div>
            <ul className="mt-6 divide-y divide-[var(--color-line)]">
              {HONORS_AWARDS.map((it, i) => (
                <li
                  key={i}
                  className="group flex items-baseline gap-4 py-5 motion-safe"
                >
                  <span className="w-10 shrink-0 font-mono-set text-[11px] uppercase tracking-[0.22em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-[20px] italic text-gold sm:text-[22px]">
                    {it.title}
                  </span>
                  <span className="hidden text-[12px] text-ivory-muted sm:block">{it.venue}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Nominations */}
        <section className="mx-auto mt-12 max-w-7xl">
          <Reveal>
            <span className="pill pill-gold">Nominations</span>
            <h2 className="section-title mt-4 text-[32px] text-ivory md:text-[44px]">
              {nominationTotal} nominations across {ceremonyTotal} ceremonies.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-muted">
              Being nominated is its own form of recognition.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-px rounded-3xl bg-[var(--color-line)] md:grid-cols-3" style={{ overflow: 'hidden' }}>
            <div className="surface-ink-soft p-8 text-center">
              <span className="block font-display text-[56px] italic leading-none text-ivory md:text-[72px]">
                {nominationTotal}
              </span>
              <span className="mt-3 block text-[11px] uppercase tracking-[0.22em] text-ivory-faint">
                Nominations
              </span>
            </div>
            <div className="surface-ink-soft p-8 text-center">
              <span className="block font-display text-[56px] italic leading-none text-ivory md:text-[72px]">
                {ceremonyTotal}
              </span>
              <span className="mt-3 block text-[11px] uppercase tracking-[0.22em] text-ivory-faint">
                Ceremonies
              </span>
            </div>
            <div className="surface-ink-soft p-8 text-center">
              <span className="block font-display text-[44px] italic leading-none text-ivory md:text-[56px]">
                2021 — 26
              </span>
              <span className="mt-3 block text-[11px] uppercase tracking-[0.22em] text-ivory-faint">
                Span
              </span>
            </div>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {HONORS_NOMINATIONS.map((n, i) => (
              <Reveal key={i} delay={i * 60} className="bento grain p-5">
                <span className="pill pill-gold">{n.count} nominations</span>
                <p className="mt-3 font-display text-[18px] italic leading-tight text-ivory">
                  {n.title}
                </p>
                <p className="mt-2 text-[13px] text-ivory-muted">{n.venue}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="mx-auto mt-12 max-w-7xl">
          <Reveal className="bento grain p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="pill pill-gold">Certificates</span>
              <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
                {HONORS_CERTIFICATES.length} certificates
              </span>
            </div>
            <h3 className="section-title mt-4 text-[24px] text-ivory md:text-[28px]">
              The committee work, in writing.
            </h3>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ivory-muted">
              The proof that I was in the room and did the work.
            </p>
            <ul className="mt-6 grid gap-2 md:grid-cols-2">
              {HONORS_CERTIFICATES.map((c, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-[var(--color-line)] py-3">
                  <span className="block h-1 w-1 shrink-0 rounded-full bg-gold" />
                  <span className="text-[14px] leading-relaxed text-ivory/85">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Closing line */}
        <Reveal className="mt-12 bento grain p-8 text-center">
          <p className="font-display text-[24px] italic leading-snug text-gold md:text-[32px]">
            TOP is the epitome of excellence.
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}

function ScholarshipCover({ s, accent }) {
  const bg =
    accent === 0 ? 'bg-crimson-grad' : accent === 1 ? 'surface-ink-elev' : 'bg-wine-grad';
  return (
    <article className={[bg, 'bento grain p-7 md:p-8 flex flex-col gap-4'].join(' ')}>
      <span className="grid h-10 w-10 place-items-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
        <Award size={16} />
      </span>
      <h3 className="font-display text-[20px] italic leading-[1.2] text-ivory md:text-[22px]">
        {s.title}
      </h3>
      <p className="text-[13px] leading-relaxed text-ivory/85">{s.body}</p>
      <p className="mt-auto font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory/65">
        {s.dates}
      </p>
    </article>
  );
}
