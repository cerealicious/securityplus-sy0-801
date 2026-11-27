import { useEffect, useRef, type CSSProperties } from 'react'
import { formatXp, levelTitle } from '../lib/gamification'

export interface CelebrationProps {
  kind: 'xp' | 'level' | 'badge'
  amount?: number
  level?: number
  label?: string
  icon?: string
  onDone?: () => void
}

const CONFETTI_COUNT = 16

function confettiStyle(i: number): CSSProperties {
  return {
    '--angle': `${i * (360 / CONFETTI_COUNT) + (i % 3) * 6}deg`,
    '--delay': `${(i % 5) * 80}ms`,
    '--hue': `${(i * 47) % 360}`,
  } as CSSProperties
}

export default function Celebration({
  kind,
  amount = 0,
  level = 1,
  label = '',
  icon = '🏆',
  onDone,
}: CelebrationProps) {
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onDone?.()
  }

  useEffect(() => {
    const timer = window.setTimeout(finish, 2600)
    return () => window.clearTimeout(timer)
    // `finish` est volontairement ignoré : le timer ne doit démarrer qu'une fois.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="celebration-overlay" role="dialog" aria-modal="true" aria-label="Congratulations">
      <div className="celebration-card">
        <div className="celebration-rings" aria-hidden="true">
          <span className="celebration-ring" />
          <span className="celebration-ring" />
        </div>

        <div className="celebration-confetti" aria-hidden="true">
          {Array.from({ length: CONFETTI_COUNT }, (_, i) => (
            <span key={i} className="confetti" style={confettiStyle(i)} />
          ))}
        </div>

        {kind === 'xp' && (
          <>
            <div className="celebration-kicker">Well done!</div>
            <div className="celebration-pop">+{formatXp(amount)} XP</div>
          </>
        )}

        {kind === 'level' && (
          <>
            <div className="celebration-kicker">Level up!</div>
            <div className="celebration-medal celebration-pop">{level}</div>
            <div className="celebration-title">{levelTitle(level)}</div>
          </>
        )}

        {kind === 'badge' && (
          <>
            <div className="celebration-kicker">Badge unlocked!</div>
            <div className="celebration-badge-icon celebration-pop">{icon}</div>
            <div className="celebration-title">{label}</div>
          </>
        )}

        <button type="button" className="celebration-button" onClick={finish}>
          Continue
        </button>
      </div>
    </div>
  )
}
