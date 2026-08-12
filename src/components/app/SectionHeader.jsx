import Reveal from '../Reveal.jsx';

/**
 * SectionHeader — title + optional eyebrow + optional description.
 * Visually shared across every page to create consistency.
 */
export default function SectionHeader({ eyebrow, title, description, align = 'left', children }) {
  const isCenter = align === 'center';
  return (
    <header
      className={[
        'flex flex-col gap-4',
        isCenter ? 'items-center text-center' : 'items-start',
      ].join(' ')}
    >
      {eyebrow && (
        <Reveal as="span" className="pill pill-gold">
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" delay={120} className="section-title text-[40px] text-ivory sm:text-[52px] md:text-[64px]">
        {title}
      </Reveal>
      {description && (
        <Reveal as="p" delay={200} className={['max-w-xl text-[15px] leading-relaxed text-ivory-muted', isCenter ? 'text-center' : ''].join(' ')}>
          {description}
        </Reveal>
      )}
      {children}
    </header>
  );
}
