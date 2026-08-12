import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import portraitUrl from '/portrait.jpeg?url';
import { subscribeEmail } from '../firebase/subscribers.js';
import { CANDIDATE } from '../data/pages.js';
import { ArrowUpRight, MapPin, Calendar, GraduationCap, Sparkles, Award, Users, BookOpen, Flag } from 'lucide-react';

const SLIDES = [
  {
    eyebrow: 'A mandate for LAUMSA',
    headline: ['Today we take', 'LAUMSA to the', 'TOP.'],
  },
  {
    eyebrow: 'Representation that answers',
    headline: ['Real voice.', 'Real seats.', 'Real work.'],
  },
  {
    eyebrow: 'Community for every member',
    headline: ['No one left', 'on the', 'outside.'],
  },
];

const PAGES = [
  { to: '/leadership',  label: 'Bio',     desc: 'The story behind the work — external roles, committees, and the build beyond boundaries.', eyebrow: 'Who is TOP',    start: 'Start here if you want to know the person behind the campaign.' },
  { to: '/exposure',    label: 'Stages',  desc: 'Conferences, conventions, summits — every room TOP has shown up in.',                    eyebrow: 'Experience', start: 'Start here if you want proof of perspective — what TOP has seen and shaped.' },
  { to: '/awards',      label: 'Honors',  desc: 'Scholarships, awards, nominations — proof on paper.',                                  eyebrow: 'Proof',       start: 'Start here if you want the wins: scholarships, awards, nominations.' },
  { to: '/experience',  label: 'Roots',   desc: 'Posts, committees, the work that built the habit before the campaign.',                 eyebrow: 'Inside LAUMSA', start: 'Start here if you want receipts: every post, every committee inside LAUMSA.' },
];

const STARTHERE = [
  { num: '01', title: 'The Mandate',   to: '/#mandate',          body: "What TOP stands for — representation, welfare, community." },
  { num: '02', title: 'Meet TOP',      to: '/leadership',        body: "Who he is, what he's done, what the past five years read like." },
  { num: '03', title: "What's on his record", to: '/exposure',   body: "Stages · Honors · Roots — the rooms, the wins, the receipts." },
];

export default function Landing() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const slide = SLIDES[idx];

  // Auto-rotate the headline every 6s, pause on hover or when the tab is hidden.
  useEffect(() => {
    if (paused) return;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setIdx((i) => (i + 1) % SLIDES.length);
    };
    const id = setTimeout(tick, 6000);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [idx, paused]);

  // Pause when the tab loses focus so we don't silently change headlines off-screen.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Click a dot manually → reset the timer by bumping idx.
  const selectSlide = (i) => setIdx(i);
  // For keyboard arrows later if you want:
  // const onKey = (e) => { if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % SLIDES.length); ... };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    setErr('');
    try {
      await subscribeEmail(email, dept || null, 'hero');
      // Call Vercel serverless welcome endpoint to send welcome email (non-fatal)
      try {
        await fetch('/api/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, dept: dept || null, source: 'hero' }),
        });
      } catch (es) {
        // non-fatal — subscription succeeded even if welcome mail fails
        // eslint-disable-next-line no-console
        console.error('welcome send failed', es);
      }
      setSubmitted(true);
    } catch (e2) {
      setErr(e2?.message || "Couldn't subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-gutter">
      {/* ============ HERO BENTO ============ */}
      <section className="mx-auto max-w-7xl pt-6 md:pt-10">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-12 md:gap-6">
          {/* Headline card */}
          {/* Headline card — on mobile, the portrait sits as its backdrop */}
          <Reveal
            className="bento grain relative overflow-hidden md:col-span-7 md:row-span-1 isolate"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Portrait backdrop, mobile only */}
            <div className="absolute inset-0 md:hidden">
              <img
                src={portraitUrl}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-[50%_28%]"
              />
              {/* Legibility scrim — dark gradient + grain */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.78) 50%, rgba(10,10,10,0.92) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 flex h-full flex-col p-6 sm:p-10 min-h-[480px]">
              <Reveal as="span" delay={80} className="pill pill-gold">
                {slide.eyebrow}
              </Reveal>
              <h1 className="section-title mt-8 text-[44px] text-ivory sm:text-6xl md:text-[80px]">
                {slide.headline.map((line, i) => (
                  <span key={i} className="block">
                    {i === slide.headline.length - 1
                      ? line.split(' ').map((word, wi) => (
                          <span key={wi}>
                            {word.toUpperCase() === 'TOP' ? (
                              <span className="text-crimson-end">{word}</span>
                            ) : (
                              word + ' '
                            )}
                          </span>
                        ))
                      : line}
                  </span>
                ))}
              </h1>

              {/* Slide dots + autoplay progress */}
              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === idx ? 'true' : undefined}
                        className="h-1 motion-safe"
                        style={{
                          width: i === idx ? 32 : 8,
                          background: i === idx ? 'var(--color-gold)' : 'rgba(244,236,227,0.2)',
                          borderRadius: 999,
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
                    {String(idx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                  </span>
                </div>

                {/* 6s cycle bar — animates across then resets on slide change */}
                <div
                  aria-hidden="true"
                  className="mt-3 h-px w-32 overflow-hidden bg-[rgba(244,236,227,0.08)]"
                >
                  <div
                    key={`bar-${idx}-${paused ? 'p' : 'r'}`}
                    className="h-full bg-gold motion-safe"
                    style={
                      paused
                        ? { width: '0%', transition: 'none' }
                        : {
                            width: '0%',
                            transition: 'width 6000ms linear',
                          }
                    }
                    ref={(el) => {
                      // Trigger the transition after mount by setting the target width.
                      if (el && !paused) requestAnimationFrame(() => {
                        el.style.width = '100%';
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Portrait card — desktop only (hidden on mobile since headline card carries the image) */}
          <Reveal delay={140} className="bento grain overflow-hidden md:col-span-5 hidden md:block">
            <img
              src={portraitUrl}
              alt="Oluwadolapo Popoola, LAUMSA presidential candidate"
              loading="eager"
              decoding="async"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </Reveal>

          {/* Email capture card */}
          <Reveal delay={220} className="bento grain p-6 sm:p-7 md:col-span-7 md:row-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
                <Sparkles size={16} />
              </span>
              <span className="eyebrow text-ivory-faint">Get involved</span>
            </div>
            <p className="mt-4 max-w-md font-display text-[20px] italic leading-tight text-ivory">
              Get field dispatches from the campaign — straight to your inbox.
            </p>

            {!submitted ? (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent px-1 py-2 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
                  />
                </label>
                <label className="block">
                  <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
                    Department / year
                  </span>
                  <input
                    type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    placeholder="Optional"
                    aria-label="Department or year"
                    className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent px-1 py-2 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-gold px-5 py-3 font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-ink motion-safe hover:bg-ivory disabled:opacity-50 sm:col-span-2"
                >
                  {loading ? '…' : 'Subscribe — get a welcome mail'}
                </button>
                {err && (
                  <p className="text-[12px] text-crimson-end sm:col-span-2">{err}</p>
                )}
              </form>
            ) : (
              <p className="mt-6 text-[14px] text-ivory-muted">
                You're on the train. Welcome to the movement.
              </p>
            )}
          </Reveal>

          {/* Quick facts card */}
          <Reveal delay={280} className="bento grain p-6 md:col-span-5">
            <span className="eyebrow text-ivory-faint">Quick facts</span>
            <ul className="mt-5 space-y-3 text-[14px] text-ivory">
              <li className="flex items-center gap-3">
                <GraduationCap size={16} className="text-gold" /> {CANDIDATE.summary}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-gold" /> LAUMSA · Ogbomoso NG
              </li>
              <li className="flex items-center gap-3">
                <Calendar size={16} className="text-gold" /> 2026 Electoral Cycle
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ START HERE (first-timer nav direction) ============ */}
      <section className="mx-auto mt-16 max-w-7xl md:mt-24" aria-label="Start here">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <span className="pill pill-gold">First time?</span>
          <h2 className="section-title text-[32px] text-ivory sm:text-[44px] md:text-[52px]">
            Start here.
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-ivory-muted">
            Three doors — pick the one you're looking for.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-6">
          {STARTHERE.map((s, i) => (
            <Reveal as="li" key={s.title} delay={120 + i * 100} className="bento grain relative p-6 md:p-8">
              <a
                href={s.to}
                className="group flex h-full flex-col"
              >
                <span className="font-display text-[36px] italic leading-none text-gold md:text-[44px]">
                  {s.num}
                </span>
                <h3 className="mt-4 font-display text-[22px] italic leading-tight text-ivory md:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ivory-muted">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono-set text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Open this one
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-safe" />
                </span>
              </a>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="mx-auto mt-12 max-w-7xl" aria-label="At a glance">
        <Reveal className="bento grain flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <p className="font-display text-[16px] italic leading-snug text-ivory">
            At a glance.
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono-set text-[11px] uppercase tracking-[0.22em] text-ivory-muted">
            <li>
              <span className="text-gold">5 yrs</span> active in LAUMSA
            </li>
            <li>
              <span className="text-gold">21+</span> rooms stood in
            </li>
            <li>
              <span className="text-gold">3</span> scholarships earned
            </li>
            <li>
              <span className="text-gold">9</span> peer nominations
            </li>
          </ul>
        </Reveal>
      </section>

      {/* ============ A NOTE FROM TOP ============ */}
      <section className="mx-auto mt-16 max-w-4xl md:mt-24">
        <Reveal className="bento grain relative overflow-hidden p-8 md:p-14">
          <span className="pill pill-gold">A note from TOP</span>
          <blockquote className="mt-8 font-display text-[24px] italic leading-snug text-ivory sm:text-[32px] md:text-[40px]">
            “Thank you for trusting me as your representative. I will be forever
            thankful that you gave me the ability to work for you and this
            exceptional Association that we love and call home. God bless you
            and all of yours.”
          </blockquote>
          <div className="mt-8 flex flex-col gap-1">
            <span className="font-mono-set text-[12px] uppercase tracking-[0.22em] text-gold">
              O. Popoola.
            </span>
            <span className="text-[12px] text-ivory-faint">
              Oluwadolapo Popoola · LAUMSA Presidential Candidate · 2026
            </span>
          </div>
        </Reveal>
      </section>

      {/* ============ PAGES BENTO ============ */}
      <section className="mx-auto mt-16 max-w-7xl md:mt-24">
        <Reveal className="flex flex-col items-start gap-3">
          <span className="pill pill-gold">Read further</span>
          <h2 className="section-title text-[40px] text-ivory sm:text-[52px] md:text-[64px]">
            The build.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          {PAGES.map((p, i) => (
            <Reveal key={p.to} delay={120 + i * 80}>
              <Link
                to={p.to}
                className="bento grain group block h-full p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="pill pill-gold">{p.eyebrow}</span>
                  <ArrowUpRight
                    size={20}
                    className="text-ivory-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold motion-safe"
                  />
                </div>
                <h3 className="mt-6 font-display text-[36px] italic leading-[1] text-ivory md:text-[44px]">
                  {p.label}.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ivory-muted">
                  {p.desc}
                </p>
                <p className="mt-6 border-l-2 border-gold/40 pl-3 font-mono-set text-[11px] uppercase leading-snug tracking-[0.18em] text-ivory-faint">
                  {p.start}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 font-mono-set text-[12px] uppercase tracking-[0.22em] text-gold">
                  <span>
                    {p.label === 'Bio' && 'Read the bio'}
                    {p.label === 'Stages' && 'See the stages'}
                    {p.label === 'Honors' && 'See the honors'}
                    {p.label === 'Roots' && 'See the roots'}
                    {' →'}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-gold/40" />
                  <span className="text-ivory-faint">or browse</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ THE MANDATE ============ */}
      <section id="mandate" className="mx-auto mt-16 max-w-7xl md:mt-24 scroll-mt-24">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-6">
          {[
            { icon: BookOpen, eyebrow: 'Representation', title: 'Every voice counted.', body: 'A president that answers — not performs.' },
            { icon: Award,     eyebrow: 'Welfare',        title: 'Money that helps.',     body: 'Scholarship funds that reach the students who need them.' },
            { icon: Users,     eyebrow: 'Community',      title: 'Rooms for everyone.',   body: 'Conventions, summits, and skills that build careers.' },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.title} delay={i * 120} className="bento grain p-6 md:p-7">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                  <Icon size={18} />
                </span>
                <span className="mt-5 block eyebrow text-ivory-faint">{m.eyebrow}</span>
                <h3 className="mt-2 font-display text-[26px] italic leading-tight text-ivory md:text-[30px]">
                  {m.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-ivory-muted">
                  {m.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ JOIN CTA ============ */}
      <section className="mx-auto mt-16 max-w-7xl md:mt-24">
        <Reveal className="bento grain relative overflow-hidden p-8 md:p-14 bg-crimson-grad">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(60% 60% at 80% 10%, rgba(217,164,65,0.4) 0%, transparent 50%)',
            }}
          />
          <div className="relative grid items-end gap-8 md:grid-cols-2">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 text-gold">
                <Flag size={14} /> A mandate for LAUMSA
              </span>
              <h2 className="section-title mt-4 text-[40px] text-ivory sm:text-[52px] md:text-[64px]">
                Run with direction.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/85">
                We don't ship vibes. We ship a mandate — for every member of
                LAUMSA, to where they belong. Right at the TOP.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-ink px-5 py-3 font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-ivory motion-safe hover:bg-ink-soft"
              >
                Join up
              </a>
              <Link
                to="/leadership"
                className="border border-ivory/40 px-5 py-3 font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-ivory motion-safe hover:bg-white/10"
              >
                Read the bio
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
