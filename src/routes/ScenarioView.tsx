import { useEffect, useState } from 'react'
import { objectiveById, scenarioById, scenarios } from '../lib/content'
import { useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import { Empty } from '../components/ui'
import { computeStats, xpForActivity } from '../lib/gamification'
import { playLevelUp, playSuccess } from '../lib/sound'
import Celebration from '../components/Celebration'

export default function ScenarioView({
  objectiveId,
  scenarioId,
}: {
  objectiveId: string
  scenarioId?: string
}) {
  const o = objectiveById.get(objectiveId)
  const list = scenarios.filter((s) => s.objective === objectiveId)
  const sc = scenarioId ? scenarioById.get(scenarioId) : list[0]
  const { completeScenario, progress } = useProgress()
  const [celebration, setCelebration] = useState<{ kind: 'xp' | 'level'; amount?: number; level?: number } | null>(null)
  const [nodeId, setNodeId] = useState(sc?.start ?? '')
  const [log, setLog] = useState<{ text: string; score: number; why: string }[]>([])
  const [saved, setSaved] = useState(false)

  const node = sc?.nodes[nodeId]
  const total = log.reduce((n, l) => n + l.score, 0)
  const ended = !!node && !node.choices?.length

  useEffect(() => {
    if (sc) {
      setNodeId(sc.start)
      setLog([])
      setSaved(false)
    }
  }, [sc?.id])

  useEffect(() => {
    if (ended && !saved && sc) {
      const before = computeStats(progress)
      const gain = xpForActivity('scenario')
      completeScenario(sc.objective, sc.id, 12)
      setSaved(true)
      const afterLevel = Math.floor((before.xp + gain) / 100) + 1
      if (afterLevel > before.level) {
        playLevelUp()
        setCelebration({ kind: 'level', level: afterLevel })
      } else {
        playSuccess()
        setCelebration({ kind: 'xp', amount: gain })
      }
    }
  }, [ended, saved, sc, completeScenario])

  if (!o || !sc || !node) {
    return (
      <div className="content-inner">
        <Empty>No scenario available for this objective.</Empty>
        <div style={{ textAlign: 'center' }}>
          <button className="btn" onClick={() => navigate(`objective/${objectiveId}`)}>Back</button>
        </div>
      </div>
    )
  }

  const verdict =
    total >= 10 ? { label: 'Strong decisions', tone: 'var(--ok)' }
    : total >= 5 ? { label: 'Acceptable, with some mistakes', tone: 'var(--warn)' }
    : { label: 'Needs improvement', tone: 'var(--bad)' }

  return (
    <div className="content-inner">
      <div className="spread" style={{ marginBottom: 12 }}>
        <div>
          <div className="eyebrow">Objective {o.id} · Assessment scenario</div>
          <h1 className="page-title" style={{ marginTop: 4 }}>{sc.title}</h1>
        </div>
        <button className="btn btn-sm" onClick={() => navigate(`objective/${o.id}`)}>Exit</button>
      </div>

      <div className="sc-context">{sc.context}</div>

      {!ended ? (
        <>
          <div className="row small faint" style={{ marginBottom: 10 }}>
            <span>Step {log.length + 1}</span>
            <span>·</span>
            <span>Current score: {total}</span>
          </div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 15.5, fontWeight: 560, lineHeight: 1.5 }}>{node.text}</div>
          </div>
          <div>
            {(node.choices ?? []).map((c, i) => (
              <button
                key={i}
                className="sc-choice"
                onClick={() => {
                  setLog([...log, { text: c.text, score: c.score, why: c.why }])
                  setNodeId(c.next)
                }}
              >
                <span>{c.text}</span>
                <span className="sc-arrow">→</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="fade-in">
          <div className="card" style={{ borderColor: '#ddd6fe' }}>
            <div className="eyebrow">Debrief</div>
            <div className="row" style={{ gap: 16, marginTop: 8 }}>
              <span className="quiz-score" style={{ fontSize: 40, color: verdict.tone }}>{total}</span>
              <div>
                <div style={{ fontWeight: 650 }}>{verdict.label}</div>
                <div className="faint small">{log.length} decisions made</div>
              </div>
            </div>
            {node.outcome && (
              <p style={{ marginTop: 14, color: 'var(--muted)' }}>{node.outcome}</p>
            )}
          </div>

          <div className="section-title" style={{ marginTop: 20, marginBottom: 8 }}>Your decisions</div>
          <div className="sc-log card" style={{ padding: '6px 16px' }}>
            {log.map((l, i) => (
              <div className="sc-log-item" key={i}>
                <span className={`pts ${l.score >= 0 ? 'pos' : 'neg'}`}>
                  {l.score > 0 ? '+' : ''}{l.score}
                </span>
                <div>
                  <div style={{ color: 'var(--text)' }}>{l.text}</div>
                  <div className="faint" style={{ marginTop: 2 }}>{l.why}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="callout exam" style={{ marginTop: 18 }}>
            <div className="callout-title">Key takeaways for the exam</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {sc.debrief.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          <div className="row" style={{ marginTop: 18, justifyContent: 'flex-end' }}>
            <button
              className="btn"
              onClick={() => {
                setNodeId(sc.start)
                setLog([])
                setSaved(false)
              }}
            >
              Replay
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`objective/${o.id}`)}>
              Back to objective
            </button>
          </div>
        </div>
      )}

      {celebration && (
        <Celebration
          kind={celebration.kind}
          amount={celebration.amount}
          level={celebration.level}
          onDone={() => setCelebration(null)}
        />
      )}
    </div>
  )
}
