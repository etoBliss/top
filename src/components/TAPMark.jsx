/**
 * TAPMark — campaign logo mark. Plain disc, no glow props, no frame.
 */

export default function TAPMark({ size = 56, className = '' }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id="tapRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C1392B" />
            <stop offset="100%" stopColor="#4A1219" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#tapRed)" />

        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="Montserrat, sans-serif"
          fontWeight={800}
          fontSize="28"
          letterSpacing="1.5"
          fill="#F4ECE3"
        >
          TAP
        </text>
      </svg>
    </span>
  );
}
