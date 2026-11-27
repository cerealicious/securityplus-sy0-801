export default function Mascot({ size = 96, mood = 'happy' }: { size?: number; mood?: 'happy' | 'cheer' }) {
  return (
    <svg
      className={`mascot mascot-${mood}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Mascotte bouclier Security+"
    >
      <defs>
        <linearGradient id="mascotBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="30" ry="5" fill="rgba(0,0,0,.25)" />
      <path
        d="M60 8 100 24v34c0 24-17 42-40 52C37 100 20 82 20 58V24Z"
        fill="url(#mascotBody)"
        stroke="rgba(255,255,255,.35)"
        strokeWidth="2"
      />
      <path d="M60 8 100 24v34c0 24-17 42-40 52Z" fill="rgba(255,255,255,.08)" />
      <g className="mascot-eyes">
        <ellipse cx="46" cy="56" rx="6" ry="8" fill="#0b1728" />
        <ellipse cx="74" cy="56" rx="6" ry="8" fill="#0b1728" />
        <circle cx="48" cy="53" r="2" fill="#fff" />
        <circle cx="76" cy="53" r="2" fill="#fff" />
      </g>
      <path
        className="mascot-mouth"
        d={mood === 'cheer' ? 'M46 76 Q60 90 74 76' : 'M48 75 Q60 83 72 75'}
        fill="none"
        stroke="#e6fbff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M32 72 26 78" stroke="rgba(255,255,255,.5)" strokeWidth="3" strokeLinecap="round" />
      <path d="M88 72 94 78" stroke="rgba(255,255,255,.5)" strokeWidth="3" strokeLinecap="round" />
      <path d="m60 32 4 8 9 1-6.5 6.5L68 56l-8-4-8 4 1.5-8.5L47 41l9-1Z" fill="rgba(255,255,255,.85)" />
    </svg>
  )
}
