import { useState, type ReactNode } from 'react'
import { domainById, objectiveById, objectives, totalSubtopics } from '../lib/content'
import {
  domainPercent,
  objectivePercent,
  readiness,
  streak,
  totalDue,
  useProgress,
} from '../lib/progress'
import {
  masteredObjectives,
  nextActivities,
  recentResults,
  resumeActivity,
  totalMinutes,
  weeklyMinutes,
  type Suggestion,
} from '../lib/learning'
import { navigate } from '../lib/router'
import { ProgressBar, Ring } from '../components/ui'

const KIND_ICON: Record<Suggestion['kind'], string> = {
  lesson: '▤', quiz: '✓', pbq: '◇', scenario: '◈', flashcards: '▦', review: '↺',
}

function SectionHead({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="spread" style={{ marginBottom: 12 }}>
      <div>
        <div className="section-title">{title}</div>
        {sub && <div className="faint small" style={{ marginTop: 2 }}>{sub}</div>}
      </div>
      {action}
    </div>
  )
}

export default function Dashboard() {
  const { progress } = useProgress()
  const [showAll, setShowAll] = useState(false)
  const ready = readiness(progress)
  const days = streak(progress)
  const minutes = totalMinutes(progress)
  const due = totalDue(progress)
  const resume = resumeActivity(progress)
  const suggestions = nextActivities(progress, showAll ? 10 : 5)
  const results = recentResults(progress, 4)
  const mastered = masteredObjectives(progress)
  const week = weeklyMinutes(progress)
  const maxWeek = Math.max(10, ...week.map((w) => w.minutes))

  return (
    <div className="content-inner wide dashboard">
      <section className="hero dash-hero">
        <div className="hero-copy">
          <div className="eyebrow">COMPTIA SECURITY+ · SY0-801 V8 · 27 OBJECTIFS OFFICIELS</div>
          <h1>Votre parcours Security+ commence ici.</h1>
          <p>Apprenez par l'action : leçons interactives, simulations, exercices et révisions espacées. Chaque notion est reliée au référentiel officiel.</p>
          <div className="row" style={{ marginTop: 20, flexWrap: 'wrap' }}>
            {resume && (
              <button className="btn btn-primary" onClick={() => navigate(resume.path)}>
                Continuer · {resume.title.length > 38 ? resume.title.slice(0, 38) + '…' : resume.title} →
              </button>
            )}
            <button className="btn" onClick={() => navigate('flashcards')}>Réviser les cartes</button>
          </div>
        </div>
        <div className="hero-stats dash-stats">
          <div className="dash-stat-main">
            <Ring value={ready} size={78} stroke={6} color="#22d3ee" />
            <div>
              <div className="stat-label">Préparation globale</div>
              <div className="stat-value">{ready}%</div>
              <div className="faint small">pondérée par les domaines</div>
            </div>
          </div>
          <div className="dash-stat-grid">
            <div className="stat"><span className="stat-value">{days}</span><span className="stat-label">jours de série</span></div>
            <div className="stat"><span className="stat-value">{Math.round(minutes)}</span><span className="stat-label">minutes apprises</span></div>
            <div className="stat"><span className="stat-value">{mastered.length}</span><span className="stat-label">objectifs maîtrisés</span></div>
            <div className="stat"><span className="stat-value">{due}</span><span className="stat-label">cartes dues</span></div>
          </div>
        </div>
      </section>

      {resume && (
        <button className="resume-banner" onClick={() => navigate(resume.path)}>
          <span className="resume-icon">▶</span>
          <span className="resume-body">
            <span className="eyebrow">Reprendre là où vous en étiez</span>
            <strong>{resume.title}</strong>
            <small>{resume.reason}</small>
          </span>
          <span className="resume-arrow">→</span>
        </button>
      )}

      <div className="dash-columns">
        <div className="dash-main">
          <SectionHead
            title="Les cinq domaines officiels"
            sub="La pondération reflète le poids réel à l'examen."
            action={<button className="btn btn-sm btn-ghost" onClick={() => navigate('progress')}>Voir ma progression →</button>}
          />
          <div className="grid grid-2 domain-grid">
            {[1, 2, 3, 4, 5].map((id) => {
              const d = domainById.get(id)!
              const pct = domainPercent(id, progress)
              const objs = d.objectives.map((x) => objectiveById.get(x)!).filter(Boolean)
              const done = objs.filter((o) => objectivePercent(o, progress) >= 85).length
              return (
                <button key={id} className="domain-card card hover" style={{ ['--dc' as any]: d.color }} onClick={() => navigate(`domain/${id}`)}>
                  <div className="spread" style={{ alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'left' }}>
                      <div className="row" style={{ gap: 7 }}>
                        <span className="domain-dot" style={{ background: d.color }} />
                        <span className="eyebrow" style={{ color: d.color }}>Domaine {id}</span>
                        <span className="badge neutral">{d.weight} %</span>
                      </div>
                      <div className="d-title" style={{ marginTop: 8 }}>{d.name}</div>
                      <div className="d-fr">{d.fr}</div>
                    </div>
                    <Ring value={pct} size={46} stroke={4} color={d.color} />
                  </div>
                  <div className="faint small" style={{ margin: '10px 0', textAlign: 'left', lineHeight: 1.45 }}>{d.blurb}</div>
                  <div className="spread small faint" style={{ marginBottom: 6 }}>
                    <span>{objs.length} objectifs · {objs.reduce((n, o) => n + o.itemCount, 0)} sous-thèmes</span>
                    <span>{done}/{objs.length} maîtrisés</span>
                  </div>
                  <ProgressBar value={pct} color={d.color} />
                  <span className="domain-open">Ouvrir le parcours →</span>
                </button>
              )
            })}
            <div className="card overview-card">
              <div className="eyebrow">Vue d'ensemble</div>
              <div className="stat-value" style={{ marginTop: 8 }}>{objectives.length}</div>
              <div className="stat-label">objectifs officiels</div>
              <div className="faint small" style={{ margin: '10px 0' }}>{totalSubtopics} sous-thèmes cartographiés, 5 domaines.</div>
              <div style={{ display: 'flex', height: 10, borderRadius: 99, overflow: 'hidden', marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((id) => (
                  <div key={id} style={{ width: `${domainById.get(id)!.weight}%`, background: domainById.get(id)!.color }} title={`Domaine ${id} — ${domainById.get(id)!.weight} %`} />
                ))}
              </div>
              <div className="stack-sm" style={{ fontSize: 11.5 }}>
                {[1, 2, 3, 4, 5].map((id) => {
                  const d = domainById.get(id)!
                  return (
                    <div key={id} className="spread">
                      <span className="row" style={{ gap: 7 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: d.color }} /><span className="muted">{d.fr}</span></span>
                      <span className="mono-sm">{d.weight} %</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 26 }}>
            <SectionHead title="Objectifs maîtrisés" sub="Score d'objectif supérieur à 85 %." />
            {mastered.length ? (
              <div className="pill-row">
                {mastered.map((o) => (
                  <button key={o.id} className="mastered-pill" onClick={() => navigate(`objective/${o.id}`)}>
                    <span className="mono-sm">{o.id}</span> {o.titleFr}
                  </button>
                ))}
              </div>
            ) : (
              <div className="card empty small">Aucun objectif maîtrisé pour l'instant — terminez un objectif pour le voir apparaître ici.</div>
            )}
          </div>
        </div>

        <aside className="dash-side">
          <div className="card side-card">
            <SectionHead title="À faire ensuite" sub="Recommandé d'après votre progression" />
            <div className="stack-sm">
              {suggestions.length ? suggestions.map((s, i) => (
                <button key={i} className="suggestion" onClick={() => navigate(s.path)}>
                  <span className="suggestion-icon" style={{ color: s.color }}>{KIND_ICON[s.kind]}</span>
                  <span style={{ minWidth: 0, flex: 1, textAlign: 'left' }}>
                    <strong>{s.title}</strong>
                    <small>{s.reason}</small>
                  </span>
                  <span className="faint">→</span>
                </button>
              )) : <div className="faint small">Tout est à jour.</div>}
            </div>
            <button className="btn btn-sm btn-ghost" style={{ marginTop: 10 }} onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Réduire' : 'Voir plus d’activités'}
            </button>
          </div>

          <div className="card side-card">
            <SectionHead title="Résultats récents" sub="Scores enregistrés localement" />
            {results.length ? (
              <div className="stack-sm">
                {results.map((r, i) => (
                  <div key={i} className="result-row">
                    <span className={`result-score ${r.score! >= 80 ? 'ok' : r.score! >= 60 ? 'warn' : 'bad'}`}>{r.score}%</span>
                    <span style={{ minWidth: 0 }}>
                      <strong>{r.title}</strong>
                      <small>{r.kind === 'quiz' ? 'Quiz' : r.kind === 'card' ? 'Flashcards' : r.kind} · {new Date(r.date).toLocaleDateString('fr-FR')}</small>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="faint small">Aucun résultat pour l'instant. Un quiz enregistrera votre premier score.</div>
            )}
          </div>

          <div className="card side-card">
            <SectionHead title="Activité sur 7 jours" sub={`${Math.round(minutes)} minutes au total`} />
            <div className="week-bars">
              {week.map((w) => (
                <div key={w.day} className="week-col" title={`${w.minutes} min`}>
                  <div className="week-bar" style={{ height: `${Math.max(4, (w.minutes / maxWeek) * 76)}px` }} />
                  <span>{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
