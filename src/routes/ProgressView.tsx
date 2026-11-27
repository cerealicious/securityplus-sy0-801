import { useMemo, useState } from 'react'
import { domains, objectiveById, objectives } from '../lib/content'
import {
  domainPercent,
  objectivePercent,
  readiness,
  streak,
  useProgress,
} from '../lib/progress'
import { exportProgressFile, importProgressFile } from '../lib/io'
import { navigate } from '../lib/router'
import { toast } from '../lib/toast'
import { ProgressBar, Ring } from '../components/ui'

export default function ProgressView() {
  const { progress, setDailyGoal, reset, importData } = useProgress()
  const [busy, setBusy] = useState(false)
  const total = readiness(progress)
  const days = useMemo(() => {
    const map = new Map(progress.sessions.map((s) => [s.date, s.minutes]))
    const out: { date: string; minutes: number }[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      out.push({ date: key, minutes: map.get(key) ?? 0 })
    }
    return out
  }, [progress.sessions])
  const maxMin = Math.max(30, ...days.map((d) => d.minutes))
  const totalMin = progress.sessions.reduce((n, s) => n + s.minutes, 0)

  return (
    <div className="content-inner">
      <div className="eyebrow">Local tracking · no data leaves this computer</div>
      <h1 className="page-title" style={{ marginTop: 6 }}>My Progress</h1>
      <p className="page-sub">
        The readiness score is a pedagogical estimate weighted by official exam percentages. It does
        not predict your actual exam result.
      </p>

      <div className="grid grid-2" style={{ marginTop: 22 }}>
        <div className="card" style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <Ring value={total} size={96} stroke={7} color="#4f46e5" />
          <div>
            <div className="eyebrow">Estimated readiness</div>
            <div style={{ fontSize: 20, fontWeight: 680, marginTop: 4 }}>
              {total >= 80 ? 'Strong' : total >= 50 ? 'In progress' : total >= 20 ? 'Getting started' : 'Just beginning'}
            </div>
            <div className="faint small" style={{ marginTop: 4 }}>
              {Math.round(totalMin / 60 * 10) / 10} hrs studied · {streak(progress)} day streak
            </div>
          </div>
        </div>
        <div className="card">
          <div className="spread" style={{ marginBottom: 8 }}>
            <span className="eyebrow">Daily goal</span>
            <span className="mono-sm">{progress.settings.dailyGoal} min</span>
          </div>
          <input
            type="range"
            min={10}
            max={120}
            step={10}
            value={progress.settings.dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#4f46e5' }}
          />
          <div className="faint small" style={{ marginTop: 8 }}>
            Today: {progress.sessions.find((s) => s.date === new Date().toISOString().slice(0, 10))?.minutes ?? 0} min
          </div>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>By domain</div>
      <div className="stack-sm">
        {domains.map((d) => {
          const pct = domainPercent(d.id, progress)
          return (
            <div key={d.id} className="card" style={{ padding: '14px 16px' }}>
              <div className="spread" style={{ marginBottom: 7 }}>
                <div className="row" style={{ gap: 9 }}>
                  <span className="domain-dot" style={{ background: d.color, width: 9, height: 9 }} />
                  <span style={{ fontSize: 13.5, fontWeight: 570 }}>
                    {d.id}. {d.name}
                  </span>
                  <span className="faint small">· {d.weight}% of exam</span>
                </div>
                <span className="mono-sm">{pct}%</span>
              </div>
              <ProgressBar value={pct} color={d.color} />
            </div>
          )
        })}
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Last 14 days activity</div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
          {days.map((d) => (
            <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 5 }} title={`${d.date} · ${d.minutes} min`}>
              <div
                style={{
                  width: '100%',
                  height: `${Math.max(3, (d.minutes / maxMin) * 82)}px`,
                  background: d.minutes ? '#4f46e5' : '#e9e4da',
                  borderRadius: 4,
                }}
              />
              <span className="faint" style={{ fontSize: 9 }}>{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Breakdown by objective</div>
      <div className="card" style={{ padding: 8 }}>
        {objectives.map((o) => {
          const pct = objectivePercent(o, progress)
          return (
            <div key={o.id} className="obj-row" onClick={() => navigate(`objective/${o.id}`)}>
              <span className="oid">{o.id}</span>
              <div className="otitle">
                {o.titleFr}
                <small>
                  {o.status === 'complete'
                    ? `${o.lessonIds?.length} lessons · quiz ${progress.objectives[o.id]?.quizBest ?? 0}%`
                    : 'content in progress'}
                </small>
              </div>
              {o.status === 'complete' ? (
                <>
                  <div style={{ width: 110 }}><ProgressBar value={pct} /></div>
                  <span className="mono-sm faint" style={{ width: 38, textAlign: 'right' }}>{pct}%</span>
                </>
              ) : (
                <span className="badge neutral">Coming soon</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Backup</div>
      <div className="card">
        <div className="faint small" style={{ marginBottom: 12 }}>
          Progress is saved in <code>%APPDATA%\SecurityPlus-SY0-801\progress.json</code> with
          a backup copy. Export it to keep or transfer it.
        </div>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true)
              const p = await exportProgressFile(progress)
              setBusy(false)
              if (p) toast('Progress exported.')
            }}
          >
            Export progress
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true)
              const data = await importProgressFile()
              setBusy(false)
              if (data && data.schema === 1) {
                importData(data)
                toast('Progress imported.')
              } else if (data) {
                toast('Invalid file.')
              }
            }}
          >
            Import progress
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm('Reset all progress? This action cannot be undone.')) {
                reset()
                toast('Progress reset.')
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
