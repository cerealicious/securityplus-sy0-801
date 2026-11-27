import type { ReactNode } from 'react'
import { coverageLabel } from '../lib/content'
import type { Objective } from '../lib/types'

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('`') && p.endsWith('`'))
          return (
            <code key={i} className="mono">
              {p.slice(1, -1)}
            </code>
          )
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2)
          return <em key={i}>{p.slice(1, -1)}</em>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: string
  children: ReactNode
}) {
  return <span className={`badge ${tone}`}>{children}</span>
}

export function CoverageBadge({ coverage }: { coverage: string }) {
  const c = coverageLabel[coverage] ?? coverageLabel.partial
  return <Badge tone={c.tone}>{c.label}</Badge>
}

export function ProgressBar({ value, color, thin }: { value: number; color?: string; thin?: boolean }) {
  return (
    <div className={`progress ${thin ? 'thin' : ''}`}>
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
    </div>
  )
}

export function Ring({
  value,
  size = 54,
  stroke = 4,
  color = '#22d3ee',
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (Math.max(0, Math.min(100, value)) / 100) * c
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 400ms ease' }}
        />
      </svg>
      <span className="ring-label">{value}%</span>
    </div>
  )
}

export function StatusDots({ objective, progress }: { objective: Objective; progress: number }) {
  const filled = progress >= 85 ? 4 : progress >= 60 ? 3 : progress >= 25 ? 2 : progress > 0 ? 1 : 0
  return (
    <span className="dots" title={`${progress}%`}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`dot ${i < filled ? 'on' : ''} ${progress >= 85 ? 'mastered' : ''}`}
        />
      ))}
    </span>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>
}

export function SectionHead({
  title,
  right,
  sub,
}: {
  title: string
  sub?: string
  right?: ReactNode
}) {
  return (
    <div className="spread" style={{ marginBottom: 12 }}>
      <div>
        <div className="section-title">{title}</div>
        {sub && <div className="faint small" style={{ marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}
