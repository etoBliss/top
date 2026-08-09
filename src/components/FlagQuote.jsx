import Reveal from './Reveal.jsx';

export default function FlagQuote() {
  return (
    <section
      id="about"
      className="surface-ink-soft py-24 md:py-40"
      aria-label="A note from TOP"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal as="span" className="eyebrow text-gold">
          A note from TOP
        </Reveal>

        <Reveal as="blockquote" delay={120} className="mt-10">
          <p className="display-italic text-[28px] leading-[1.3] text-ivory sm:text-4xl md:text-[44px]">
            Thank you for trusting me as your representative.{' '}
            <span className="text-ivory-muted">
              I will be forever thankful that you gave me the ability to work for you and this exceptional Association that we love and call home.
            </span>{' '}
            God bless you and all of yours.
          </p>
        </Reveal>

        <Reveal as="div" delay={240} className="mt-14">
          <p className="font-display italic text-[28px] text-gold">
            O. Popoola.
          </p>
          <p className="mt-4 font-mono-set text-[11px] uppercase tracking-[0.24em] text-ivory-faint">
            Oluwadolapo Popoola · LAUMSA Presidential Candidate · 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
