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
      <div className="eyebrow">Suivi local · aucune donnée ne quitte cet ordinateur</div>
      <h1 className="page-title" style={{ marginTop: 6 }}>Ma progression</h1>
      <p className="page-sub">
        Le score de préparation est une estimation pédagogique pondérée par les pourcentages
        officiels. Il ne prédit pas votre résultat réel à l'examen.
      </p>

      <div className="grid grid-2" style={{ marginTop: 22 }}>
        <div className="card" style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <Ring value={total} size={96} stroke={7} color="#4f46e5" />
          <div>
            <div className="eyebrow">Préparation estimée</div>
            <div style={{ fontSize: 20, fontWeight: 680, marginTop: 4 }}>
              {total >= 80 ? 'Solide' : total >= 50 ? 'En progression' : total >= 20 ? 'En démarrage' : 'À construire'}
            </div>
            <div className="faint small" style={{ marginTop: 4 }}>
              {Math.round(totalMin / 60 * 10) / 10} h d'étude · {streak(progress)} jours d'affilée
            </div>
          </div>
        </div>
        <div className="card">
          <div className="spread" style={{ marginBottom: 8 }}>
            <span className="eyebrow">Objectif quotidien</span>
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
            Aujourd'hui : {progress.sessions.find((s) => s.date === new Date().toISOString().slice(0, 10))?.minutes ?? 0} min
          </div>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Par domaine</div>
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
                  <span className="faint small">· {d.weight}% de l'examen</span>
                </div>
                <span className="mono-sm">{pct}%</span>
              </div>
              <ProgressBar value={pct} color={d.color} />
            </div>
          )
        })}
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Activité des 14 derniers jours</div>
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

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Détail par objectif</div>
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
                    ? `${o.lessonIds?.length} leçons · quiz ${progress.objectives[o.id]?.quizBest ?? 0}%`
                    : 'contenu en préparation'}
                </small>
              </div>
              {o.status === 'complete' ? (
                <>
                  <div style={{ width: 110 }}><ProgressBar value={pct} /></div>
                  <span className="mono-sm faint" style={{ width: 38, textAlign: 'right' }}>{pct}%</span>
                </>
              ) : (
                <span className="badge neutral">À venir</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Sauvegarde</div>
      <div className="card">
        <div className="faint small" style={{ marginBottom: 12 }}>
          La progression est enregistrée dans <code>%APPDATA%\SecurityPlus-SY0-801\progress.json</code> avec
          une copie de secours. Exportez-la pour la conserver ou la transférer.
        </div>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true)
              const p = await exportProgressFile(progress)
              setBusy(false)
              if (p) toast('Progression exportée.')
            }}
          >
            Exporter ma progression
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
                toast('Progression importée.')
              } else if (data) {
                toast('Fichier invalide.')
              }
            }}
          >
            Importer une progression
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm('Réinitialiser toute la progression ? Cette action est irréversible.')) {
                reset()
                toast('Progression réinitialisée.')
              }
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}
