import { useEffect, useState } from 'react'
import { domainById, objectiveById, objectives } from '../lib/content'
import { domainPercent, objectivePercent, readiness, streak, totalDue, useProgress } from '../lib/progress'
import {
  masteredObjectives, nextActivities, recentResults, resumeActivity,
  totalMinutes, weeklyMinutes, type Suggestion,
} from '../lib/learning'
import { computeStats, formatXp, levelTitle } from '../lib/gamification'
import { navigate } from '../lib/router'
import { ProgressBar, Ring } from '../components/ui'
import Mascot from '../components/Mascot'

const KIND_ICON: Record<Suggestion['kind'], string> = {
  lesson: '▤', quiz: '✓', pbq: '◇', scenario: '◈', flashcards: '▦', review: '↺',
}

function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(target)
  useEffect(() => {
    const start = performance.now()
    const from = value
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (target - from) * ease))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
  return value
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { progress } = useProgress()
  const stats = computeStats(progress)
  const animatedXp = useAnimatedNumber(stats.xp)
  const ready = readiness(progress)
  const suggestions = nextActivities(progress, 4)
  const results = recentResults(progress, 3)
  const mastered = masteredObjectives(progress)
  const week = weeklyMinutes(progress)
  const resume = resumeActivity(progress)
  const due = totalDue(progress)

  return (
    <div className="content-inner wide duo-dashboard">
      <section className="duo-hero">
        <div className="duo-hero-left">
          <Mascot size={104} mood={stats.todayXp > 0 ? 'cheer' : 'happy'} />
          <div>
            <div className="eyebrow">{greeting()} · Level {stats.level} · {levelTitle(stats.level)}</div>
            <h1>Ready to learn something new?</h1>
            <p>Small steps, big wins. Every activity earns you XP.</p>
          </div>
        </div>
        <div className="duo-hero-right">
          <div className="duo-xp-main">
            <span className="duo-xp-badge">{stats.level}</span>
            <div>
              <div className="duo-xp-value"><span>{formatXp(animatedXp)}</span> XP</div>
              <div className="duo-xp-sub">Level {stats.level} · {stats.xpInLevel}/100 XP</div>
            </div>
          </div>
          <div className="duo-xp-track"><span style={{ width: `${stats.xpInLevel}%` }} /></div>
          <div className="duo-hero-metrics">
            <div className="duo-metric"><span>🔥</span><strong>{stats.streak}</strong><small>day streak</small></div>
            <div className="duo-metric"><span>🎯</span><strong>{stats.goalPercent}%</strong><small>daily goal</small></div>
            <div className="duo-metric"><span>🃏</span><strong>{due}</strong><small>cards due</small></div>
          </div>
          {resume && (
            <button className="duo-cta" onClick={() => navigate(resume.path)}>
              Continue · {resume.title.length > 34 ? resume.title.slice(0, 34) + '…' : resume.title} →
            </button>
          )}
        </div>
      </section>

      <section className="duo-section">
        <div className="duo-section-head">
          <div>
            <div className="section-title">Your path</div>
            <div className="faint small">Five domains, one step at a time.</div>
          </div>
          <div className="duo-ready">{ready}% ready</div>
        </div>
        <div className="duo-path">
          {[1, 2, 3, 4, 5].map((id) => {
            const d = domainById.get(id)!
            const pct = domainPercent(id, progress)
            const objs = d.objectives.map((x) => objectiveById.get(x)!).filter(Boolean)
            const done = objs.filter((o) => objectivePercent(o, progress) >= 85).length
            return (
              <button key={id} className="duo-node" onClick={() => navigate(`domain/${id}`)} style={{ ['--dc' as any]: d.color }}>
                <span className="duo-node-ring" style={{ background: `conic-gradient(${d.color} ${pct}%, rgba(255,255,255,.08) 0)` }}>
                  <span className="duo-node-inner">{done}/{objs.length}</span>
                </span>
                <strong>{d.short ?? d.fr}</strong>
                <small>{d.weight}% of exam</small>
              </button>
            )
          })}
        </div>
      </section>

      <div className="duo-columns">
        <div>
          <div className="duo-section-head">
            <div className="section-title">Up next</div>
          </div>
          <div className="duo-list">
            {suggestions.length ? suggestions.map((s, i) => (
              <button key={i} className="duo-item" onClick={() => navigate(s.path)}>
                <span className="duo-item-icon" style={{ color: s.color }}>{KIND_ICON[s.kind]}</span>
                <span className="duo-item-body"><strong>{s.title}</strong><small>{s.reason}</small></span>
                <span className="duo-item-arrow">→</span>
              </button>
            )) : <div className="faint small">Everything is up to date for now.</div>}
          </div>

          <div className="duo-section-head" style={{ marginTop: 24 }}>
            <div className="section-title">Your badges</div>
            <button className="btn btn-sm btn-ghost" onClick={() => navigate('progress')}>View all →</button>
          </div>
          <div className="duo-badges">
            {stats.badges.map((b) => (
              <div key={b.id} className={`duo-badge ${b.earned ? 'earned' : ''}`} title={b.detail}>
                <span>{b.icon}</span><small>{b.label}</small>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="duo-section-head"><div className="section-title">Recent results</div></div>
          <div className="duo-panel">
            {results.length ? results.map((r, i) => (
              <div key={i} className="duo-result">
                <span className={`duo-result-score ${r.score! >= 80 ? 'ok' : r.score! >= 60 ? 'warn' : 'bad'}`}>{r.score}%</span>
                <span><strong>{objectiveById.get(r.objectiveId)?.titleFr ?? r.objectiveId}</strong><small>{new Date(r.date).toLocaleDateString('en-US')}</small></span>
              </div>
            )) : <div className="faint small">Your first scores will appear here.</div>}
          </div>

          <div className="duo-section-head" style={{ marginTop: 24 }}><div className="section-title">Last 7 days</div></div>
          <div className="duo-panel">
            <div className="duo-week">
              {week.map((w) => (
                <div key={w.day} className="duo-week-col" title={`${w.minutes} min`}>
                  <span style={{ height: `${Math.max(6, (w.minutes / Math.max(10, ...week.map((x) => x.minutes))) * 70)}px` }} />
                  <small>{w.label}</small>
                </div>
              ))}
            </div>
            <div className="faint small" style={{ textAlign: 'center', marginTop: 8 }}>
              {Math.round(totalMinutes(progress))} minutes learned · {mastered.length} objectives mastered
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
