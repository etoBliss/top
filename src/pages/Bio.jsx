import Reveal from '../components/Reveal.jsx';
import portraitUrl from '/portrait.jpeg?url';
import PageShell from '../components/app/PageShell.jsx';
import { StatTile, ListRow } from '../components/app/Tiles.jsx';
import { BIO_LEADERSHIP, BIO_VOLUNTEER, CANDIDATE } from '../data/pages.js';
import { GraduationCap, MapPin, Calendar, Sparkles } from 'lucide-react';

/**
 * Bio — "Who is TOP?"
 *
 * Bento composition:
 *   1. Portrait card (md:5) + Intro card (md:7)
 *   2. Pull-quote card
 *   3. Stat row (3)
 *   4. The story (long card)
 *   5. Roles — 2-column lists
 */
export default function Bio() {
  return (
    <PageShell
      subnav={{
        eyebrow: 'Who is TOP',
        title: 'Bio.',
        back: { to: '/', label: 'Home' },
        next: { to: '/exposure', label: 'Stages' },
      }}
    >
      <div className="page-gutter pt-8 pb-24 md:pt-12 md:pb-32">
        {/* ───── Hero grid ───── */}
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-12 md:gap-6">
            <Reveal className="bento grain overflow-hidden md:col-span-5">
              <img
                src={portraitUrl}
                alt="Oluwadolapo Popoola"
                loading="eager"
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </Reveal>

            <Reveal delay={120} className="bento grain p-6 md:p-8 md:col-span-7">
              <div className="flex h-full flex-col">
                <span className="pill pill-gold">Who is TOP</span>
                <h1 className="section-title mt-6 text-[40px] leading-[1.02] text-ivory sm:text-6xl md:text-[64px]">
                  Oluwadolapo <br /> Popoola.
                </h1>
                <p className="mt-6 max-w-xl font-display text-[20px] italic leading-snug text-ivory md:text-[24px]">
                  A builder of brands, organizer of rooms, and — if you'll
                  allow it — the next President of LAUMSA.
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  <Pill icon={GraduationCap}>{CANDIDATE.summary}</Pill>
                  <Pill icon={MapPin}>LAUMSA · Lagos NG</Pill>
                  <Pill icon={Calendar}>Class of 2026</Pill>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───── Pull quote ───── */}
        <section className="mx-auto mt-6 max-w-4xl sm:mt-8 md:mt-10">
          <Reveal className="bento grain p-8 md:p-12">
            <span className="pill pill-gold">Corner note</span>
            <blockquote className="mt-6 font-display text-[24px] italic leading-snug text-ivory sm:text-[32px] md:text-[40px]">
              “I'm not the loudest in the room. I'm usually the one taking
              notes in the corner — and then quietly making sure the thing
              actually happens.”
            </blockquote>
          </Reveal>
        </section>

        {/* ───── Stat row ───── */}
        <section className="mx-auto mt-6 max-w-7xl sm:mt-8 md:mt-10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
            <StatTile value="10+" label="Positions" hint="External + internal" delay={0} />
            <StatTile value="3"   label="Scholarships" delay={120} />
            <StatTile value="20+" label="Conventions" delay={240} />
            <StatTile value="1"   label="Goal" accent="crimson" hint="Lead LAUMSA with direction." delay={360} />
          </div>
        </section>

        {/* ───── Story ───── */}
        <section className="mx-auto mt-6 max-w-4xl sm:mt-8 md:mt-10">
          <Reveal className="bento grain p-8 md:p-12">
            <span className="pill pill-gold">The story</span>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ivory/85">
              <p>
                My name is <span className="text-gold">Oluwadolapo Popoola</span>,
                but people just call me TOP. I'm a final-year student who has
                spent the last three years showing up — for class boards, for
                committees, for trips, for the late-night edits, for the
                small thankless things that turn ideas into rooms and rooms
                into results.
              </p>
              <p>
                I started small. Head of a social committee. Class Governor.
                Assistant General Secretary. Then external — sitting in
                conventions, building campaigns, organizing with student
                bodies whose names barely made it to the email signature.
                Each role taught me one thing: this Association belongs to
                everyone in it, not to anyone in particular.
              </p>
              <p>
                And now I'm running for President. With direction. With the
                receipts. With a team that knows the difference between a
                flex and a finish.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ───── Roles ───── */}
        <section className="mx-auto mt-6 max-w-7xl sm:mt-8 md:mt-10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-6">
            <Reveal className="bento grain p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="pill pill-gold">External leadership</span>
              </div>
              <ul className="mt-6">
                {BIO_LEADERSHIP.map((r, i) => (
                  <ListRow
                    key={i}
                    kicker={r.role}
                    title={r.org}
                    body={r.body}
                    extra={r.dates}
                    delay={i * 60}
                  />
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="bento grain p-6 md:p-8">
              <span className="pill pill-gold">Volunteer · committees</span>
              <ul className="mt-6">
                {BIO_VOLUNTEER.map((r, i) => (
                  <ListRow
                    key={i}
                    kicker={r.role}
                    title={r.org}
                    body={r.body}
                    extra={r.dates}
                    delay={i * 60}
                  />
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

/* Small helper for inline portrait chips */
function Pill({ icon: Icon, children }) {
  return (
    <span className="pill">
      <Icon size={12} className="text-gold" />
      {children}
    </span>
  );
}

