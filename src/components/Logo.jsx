import logoUrl from '/logo.jpeg?url';

/**
 * Logo - campaign logo image.
 *
 * The logo is a circular wine-on-cream mark from the candidate. We render
 * it as a plain <img>, sized via the `size` prop. No frame, no chrome.
 */
export default function Logo({ size = 40, className = '' }) {
  return (
    <img
      src={logoUrl}
      alt="TOP campaign logo"
      width={size}
      height={size}
      className={`block shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
