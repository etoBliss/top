import { useState } from 'react';
import Reveal from './Reveal.jsx';
import portraitUrl from '/portrait.jpeg?url';
import { subscribeEmail } from '../firebase/subscribers.js';

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

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const slide = SLIDES[idx];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    setErr('');
    try {
      await subscribeEmail(email, dept || null, 'hero');
      setSubmitted(true);
    } catch (e2) {
      setErr(e2?.message || "Couldn't subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="top"
      className="surface-ink pt-32 md:pt-40"
      aria-label="Hero"
    >
      <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 pb-24 md:grid-cols-2 md:gap-16 md:px-10 md:pb-32">
        {/* ───── Headline + capture ───── */}
        <div>
          <Reveal as="span" delay={60} className="eyebrow text-gold">
            {slide.eyebrow}
          </Reveal>

          <Reveal as="h1" delay={140} className="mt-8 display-italic text-[44px] text-ivory sm:text-6xl md:text-[80px] lg:text-[92px]">
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {i === slide.headline.length - 1
                  ? line.split(' ').map((word, wi) =>
                      word.toUpperCase() === 'TOP' ? (
                        <span key={wi} className="text-wine">
                          {word}
                        </span>
                      ) : (
                        <span key={wi}>{word} </span>
                      ),
                    )
                  : line}
              </span>
            ))}
          </Reveal>

          {/* Email + dept capture */}
          <Reveal delay={320} id="join" className="mt-12 max-w-md">
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  aria-label="Email address"
                  className="w-full border-b border-line bg-transparent px-1 py-3 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
                />
                <div className="flex items-end gap-4">
                  <input
                    type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    placeholder="Department / Year"
                    aria-label="Department or year"
                    className="flex-1 border-b border-line bg-transparent px-1 py-3 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory disabled:opacity-50"
                  >
                    {loading ? '…' : 'Join →'}
                  </button>
                </div>
                {err && (
                  <p className="text-[12px] text-crimson-end">{err}</p>
                )}
              </form>
            ) : (
              <p className="text-[14px] text-ivory-muted">
                You're on the train. Welcome to the movement.
              </p>
            )}
          </Reveal>

          {/* Carousel control - minimal text dots */}
          <div className="mt-12 flex items-center gap-6">
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === idx ? 'true' : undefined}
                  className="h-1 motion-safe"
                  style={{
                    width: i === idx ? 32 : 8,
                    background: i === idx ? '#D9A441' : 'rgba(244,236,227,0.2)',
                    borderRadius: 999,
                  }}
                />
              ))}
            </div>
            <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
              {String(idx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ───── Portrait - clean, no frame ───── */}
        <Reveal delay={120}>
          <img
            src={portraitUrl}
            alt="Oluwadolapo Popoola, LAUMSA presidential candidate"
            loading="eager"
            decoding="async"
            className="aspect-[4/5] w-full max-w-md object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
