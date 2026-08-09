import Reveal from './Reveal.jsx';
import { EXTERNAL, VOLUNTEER } from '../data/content.js';

export default function Record() {
  return (
    <section
      id="record"
      className="surface-ink-soft py-24 md:py-40"
      aria-label="The record"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal as="span" className="eyebrow text-gold">
          The record
        </Reveal>
        <Reveal as="h2" delay={120} className="mt-8 display-italic text-[36px] text-ivory sm:text-5xl md:text-[64px]">
          Where TOP has <br className="hidden md:block" />
          <span className="text-ivory-muted">shown up.</span>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-20">
          <Reveal delay={180}>
            <Column title="Leadership Experience (External)" items={EXTERNAL} />
          </Reveal>

          <Reveal delay={280}>
            <Column title="Volunteer Work" items={VOLUNTEER} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Column({ title, items }) {
  return (
    <div>
      <h3 className="eyebrow text-ivory-muted">{title}</h3>

      <ul className="mt-8 space-y-7">
        {items.map((it) => (
          <li key={it.role + it.org} className="flex flex-col gap-1.5">
            <span className="display-italic text-[20px] text-gold sm:text-[22px]">
              {it.role}
            </span>
            <span className="text-[14px] leading-relaxed text-ivory/80">
              {it.org}
            </span>
            <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
              {it.dates}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
