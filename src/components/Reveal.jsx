import { useEffect, useState } from 'react';

/**
 * Reveal — IntersectionObserver fade + translate-up wrapper.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  y = 16,
}) {
  const [el, setEl] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el]);

  return (
    <Tag
      ref={setEl}
      className={`motion-safe ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
