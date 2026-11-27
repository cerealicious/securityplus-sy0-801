import { domainById, objectiveById, objectives } from '../lib/content'
import { domainPercent, objectivePercent, useProgress } from '../lib/progress'
import { isUnlocked, nextActivities, nextLessonFor, unlockHint } from '../lib/learning'
import { navigate } from '../lib/router'
import { CoverageBadge, ProgressBar, Ring } from '../components/ui'

export default function DomainView({ id }: { id: number }) {
  const { progress } = useProgress()
  const domain = domainById.get(id)
  if (!domain) {
    return (
      <div className="content-inner">
        <h1 className="page-title">Domaine introuvable</h1>
        <button className="btn" style={{ marginTop: 14 }} onClick={() => navigate('')}>Retour au tableau de bord</button>
      </div>
    )
  }
  const objs = domain.objectives.map((oid) => objectiveById.get(oid)!).filter(Boolean)
  const pct = domainPercent(domain.id, progress)
  const suggestions = nextActivities(progress, 12).filter((s) => s.objectiveId && objs.some((o) => o.id === s.objectiveId)).slice(0, 3)
  const current = objs.find((o) => isUnlocked(o, progress) && objectivePercent(o, progress) < 100) ?? objs[0]
  const currentLesson = nextLessonFor(current, progress)

  return (
    <div className="content-inner">
      <button className="btn btn-sm btn-ghost" onClick={() => navigate('')}>← Tableau de bord</button>
      <div className="eyebrow" style={{ color: domain.color, marginTop: 18 }}>
        Domaine {domain.id} · {domain.weight} % de l'examen
      </div>
      <div className="spread" style={{ alignItems: 'flex-start', marginTop: 8, gap: 20 }}>
        <div>
          <h1 className="page-title">{domain.name}</h1>
          <div className="page-sub">{domain.fr} — {domain.blurb}</div>
        </div>
        <Ring value={pct} size={68} stroke={5} color={domain.color} />
      </div>

      <div className="domain-hero-actions">
        {currentLesson && (
          <button className="btn btn-primary" onClick={() => navigate(`objective/${current.id}/lesson/${currentLesson.id}`)}>
            Continuer · {current.id} →
          </button>
        )}
        <button className="btn" onClick={() => navigate(`objective/${objs[0].id}`)}>Ouvrir le premier objectif</button>
      </div>

      <div className="grid grid-3" style={{ marginTop: 24, marginBottom: 26 }}>
        <div className="card"><div className="stat-label">Objectifs</div><div className="stat-value">{objs.length}</div></div>
        <div className="card"><div className="stat-label">Sous-thèmes officiels</div><div className="stat-value">{objs.reduce((n, o) => n + o.itemCount, 0)}</div></div>
        <div className="card"><div className="stat-label">Objectifs maîtrisés</div><div className="stat-value">{objs.filter((o) => objectivePercent(o, progress) >= 85).length} / {objs.length}</div></div>
      </div>

      <div className="section-title" style={{ marginBottom: 10 }}>Votre parcours</div>
      <div className="path-rail">
        {objs.map((o, i) => {
          const op = objectivePercent(o, progress)
          const unlocked = isUnlocked(o, progress)
          const done = op >= 85
          return (
            <div key={o.id} className="path-step">
              <button
                className={`path-dot ${done ? 'done' : ''} ${unlocked ? '' : 'locked'}`}
                style={{ ['--dc' as any]: domain.color }}
                onClick={() => unlocked && navigate(`objective/${o.id}`)}
                title={unlocked ? o.titleFr : unlockHint(o, progress)}
              >
                {done ? '✓' : unlocked ? String(i + 1) : '🔒'}
              </button>
              <div className="path-label">
                <span className="mono-sm" style={{ color: unlocked ? domain.color : 'var(--faint)' }}>{o.id}</span>
                <small>{unlocked ? o.titleFr : 'Verrouillé'}</small>
                {unlocked && <ProgressBar value={op} color={domain.color} thin />}
              </div>
            </div>
          )
        })}
      </div>

      {suggestions.length > 0 && (
        <>
          <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Recommandé dans ce domaine</div>
          <div className="grid grid-3">
            {suggestions.map((s, i) => (
              <button key={i} className="card hover clickable" onClick={() => navigate(s.path)} style={{ textAlign: 'left' }}>
                <div className="eyebrow" style={{ color: domain.color }}>{s.kind}</div>
                <div style={{ fontWeight: 620, margin: '6px 0' }}>{s.title}</div>
                <div className="faint small">{s.reason}</div>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="section-title" style={{ marginTop: 26, marginBottom: 10 }}>Objectifs du domaine</div>
      <div className="stack-sm">
        {objs.map((o) => {
          const op = objectivePercent(o, progress)
          const unlocked = isUnlocked(o, progress)
          return (
            <div
              key={o.id}
              className={`card hover clickable objective-row ${unlocked ? '' : 'is-locked'}`}
              onClick={() => navigate(`objective/${o.id}`)}
              style={{ padding: '15px 17px' }}
            >
              <div className="spread" style={{ alignItems: 'flex-start', gap: 16 }}>
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 8, marginBottom: 5 }}>
                    <span className="mono-sm" style={{ color: domain.color, fontWeight: 700 }}>{o.id}</span>
                    <CoverageBadge coverage={o.coverage} />
                    {!unlocked && <span className="badge neutral">🔒 {unlockHint(o, progress)}</span>}
                    {op >= 85 && <span className="badge ok">Maîtrisé</span>}
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 560 }}>{o.titleFr}</div>
                  <div className="faint small" style={{ marginTop: 3 }}>{o.title}</div>
                  <div className="faint small" style={{ marginTop: 7 }}>
                    {o.itemCount} sous-thèmes · {o.groups.length} groupes
                    {o.status === 'complete' ? ` · ${o.lessonIds?.length} leçons · ${o.pbqIds?.length ?? 0} exercices` : ` · ${o.plannedLessons} leçons prévues`}
                  </div>
                </div>
                <div style={{ width: 120, flex: 'none' }}>
                  <div className="spread faint small" style={{ marginBottom: 5 }}><span>Progression</span><span>{op}%</span></div>
                  <ProgressBar value={op} color={domain.color} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="callout tip" style={{ marginTop: 24 }}>
        <div className="callout-title">Comment lire la couverture</div>
        Les badges mesurent la présence des notions dans les quatre livres fournis, pas la qualité de la plateforme.
        Un badge « absent des livres » signifie que la notion est rédigée pour l'examen sans source inventée.
      </div>

      <div className="row" style={{ marginTop: 18 }}>
        <button className="btn btn-ghost" onClick={() => navigate('')}>← Tableau de bord</button>
        <button className="btn" onClick={() => navigate(`objective/${objectives.find((o) => o.domain === domain.id)!.id}`)}>
          Ouvrir le premier objectif →
        </button>
      </div>
    </div>
  )
}
