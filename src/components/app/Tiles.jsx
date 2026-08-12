import Reveal from '../Reveal.jsx';

export function StatTile({ value, label, hint, accent = 'gold', delay = 0 }) {
  const accentClass =
    accent === 'crimson' ? 'text-crimson-start' :
    accent === 'wine' ? 'text-wine' :
    'text-gold';
  return (
    <Reveal delay={delay} className={['bento p-5 md:p-7 grain', 'flex flex-col gap-2'].join(' ')}>
      <span className={['font-mono-set text-[10px] font-semibold uppercase tracking-[0.22em]', accentClass].join(' ')}>
        {label}
      </span>
      <span className="font-display text-[40px] font-medium leading-[1] text-ivory md:text-[56px]">
        {value}
      </span>
      {hint && <span className="text-[12px] text-ivory-muted">{hint}</span>}
    </Reveal>
  );
}

export function ListRow({ kicker, title, body, extra, delay = 0 }) {
  return (
    <Reveal as="li" delay={delay} className="flex flex-col gap-1 border-b border-[var(--color-line)] py-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
          {kicker}
        </span>
        {extra && (
          <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
            {extra}
          </span>
        )}
      </div>
      <h3 className="font-display text-[18px] italic text-ivory">{title}</h3>
      {body && <p className="text-[14px] leading-relaxed text-ivory-muted">{body}</p>}
    </Reveal>
  );
}

export function Tile({ title, body, eyebrow, icon: Icon, delay = 0, accent = 'gold' }) {
  const accentClass =
    accent === 'crimson' ? 'border-crimson-start/30 bg-crimson-start/5' :
    accent === 'wine' ? 'border-wine/30 bg-wine/5' :
    'border-gold/30 bg-gold/10';
  const iconClass =
    accent === 'crimson' ? 'text-crimson-start' :
    accent === 'wine' ? 'text-wine' :
    'text-gold';
  return (
    <Reveal delay={delay} className={['bento p-6 md:p-7 grain flex flex-col gap-4'].join(' ')}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className={['grid h-9 w-9 place-items-center rounded-2xl border', accentClass].join(' ')}>
            <Icon size={16} className={iconClass} />
          </span>
        )}
        {eyebrow && (
          <span className="eyebrow text-ivory-faint">{eyebrow}</span>
        )}
      </div>
      <h3 className="font-display text-[22px] italic leading-[1.1] text-ivory">{title}</h3>
      {body && <p className="text-[14px] leading-relaxed text-ivory-muted">{body}</p>}
    </Reveal>
  );
}
