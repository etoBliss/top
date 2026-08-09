import Reveal from './Reveal.jsx';
import portraitUrl from '../../public/portrait.jpeg';

export default function MeetTop() {
  return (
    <section
      id="mission"
      className="surface-ink py-24 md:py-40"
      aria-label="Meet TOP"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: mission statement */}
          <div className="md:col-span-5">
            <Reveal as="span" className="eyebrow text-gold">
              Our mission
            </Reveal>
            <Reveal as="h2" delay={120} className="mt-8 display-italic text-[36px] text-ivory sm:text-5xl md:text-[64px]">
              Our mission is to <br />
              <span className="text-ivory-muted">bring change.</span>
            </Reveal>
            <Reveal as="p" delay={240} className="mt-8 text-[15px] leading-relaxed text-ivory-muted">
              Get the latest updates from the campaign trail. Follow us on
              Instagram and X today and join the movement in LAUMSA.
            </Reveal>
          </div>

          {/* Right: meet TOP — simple two-column portrait + copy */}
          <div className="md:col-span-7">
            <Reveal delay={180}>
              <img
                src={portraitUrl}
                alt="Oluwadolapo Popoola, headshot"
                loading="lazy"
                className="aspect-[4/3] w-full max-w-md object-cover"
              />
            </Reveal>

            <Reveal delay={280} className="mt-10 max-w-md">
              <span className="eyebrow text-gold">Meet TOP</span>
              <h3 className="mt-6 font-mono-set text-[28px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ivory md:text-[34px]">
                Oluwadolapo Popoola.
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed text-ivory-muted">
                "When I launched this campaign, I visited all clinical groups in
                LAUMSA. I kept hearing the same stories of fear, frustration,
                and financial pressure. This campaign exists because those
                stories deserve more than words — they deserve action."
              </p>
              <a
                href="#about"
                className="mt-8 inline-block font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory"
              >
                Read more →
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
