import Reveal from '../Reveal.jsx';

/**
 * BentoCard - single source of truth for cards across the site.
 * Wraps content in a card with hairline border, soft shadow, and reveal animation.
 */
export default function BentoCard({
  as = 'div',
  className = '',
  delay = 0,
  hover = true,
  children,
  ...rest
}) {
  const Comp = as;
  return (
    <Reveal as={Comp} delay={delay} className={['bento', !hover ? 'bento-flat' : '', 'grain', className].join(' ')} {...rest}>
      {children}
    </Reveal>
  );
}
