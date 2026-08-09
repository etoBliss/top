import Reveal from './Reveal.jsx';

const PANELS = [
  {
    bg: 'bg-crimson-grad',
    title: 'Join the Movement',
    body: 'Sign up, show up, stand up — for every member of LAUMSA.',
    cta: 'Sign Up',
  },
  {
    bg: 'surface-ink-soft',
    title: 'Read the Mandate',
    body: 'Three commitments: representation, scholarships, direction.',
    cta: 'Read More',
  },
  {
    bg: 'bg-wine-grad',
    title: 'Donate & Help Us Win',
    body: 'Every naira funds fliers, town halls, and student outreach.',
    cta: 'Donate Now',
  },
];

export default function CTAPanels() {
  return (
    <section className="surface-ink" aria-label="Calls to action">
      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="grid gap-3 md:grid-cols-3">
          {PANELS.map((p, i) => (
            <Reveal key={p.title} delay={100 + i * 100}>
              <a
                href="#"
                className={`${p.bg} block px-8 py-12 motion-safe hover:opacity-90 md:px-10 md:py-14`}
              >
                <h3 className="font-mono-set text-[22px] font-extrabold leading-[1.15] tracking-[-0.01em] text-ivory md:text-[26px]">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ivory/80">
                  {p.body}
                </p>
                <div className="mt-10 font-mono-set text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory/95">
                  {p.cta} →
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
