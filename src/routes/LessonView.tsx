import { lessonById, lessonsFor, objectiveById, domainById } from '../lib/content'
import { useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import StepLesson from '../engines/StepLesson'
import { toast } from '../lib/toast'

export default function LessonView({ objectiveId, lessonId }: { objectiveId: string; lessonId?: string }) {
  const { progress, completeLesson } = useProgress()
  const o = objectiveById.get(objectiveId)
  const lesson = lessonId ? lessonById.get(lessonId) : undefined
  if (!o || !lesson) {
    return (
      <div className="content-inner">
        <h1 className="page-title">Leçon introuvable</h1>
        <button className="btn" style={{ marginTop: 14 }} onClick={() => navigate(`objective/${objectiveId}`)}>
          Retour à l'objectif
        </button>
      </div>
    )
  }
  const domain = domainById.get(o.domain)!
  const ls = lessonsFor(o.id)
  const idx = ls.findIndex((l) => l.id === lesson.id)
  const prev = idx > 0 ? ls[idx - 1] : null
  const next = idx < ls.length - 1 ? ls[idx + 1] : null
  const done = progress.objectives[o.id]?.lessonsDone.includes(lesson.id)
  const interactive = lesson.blocks.filter((b) => b.type === 'simulation' || b.type === 'diagram' || b.type === 'check').length

  return (
    <div className="content-inner">
      <div className="lesson-head">
        <div className="row" style={{ gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <span className="badge info">Objectif {o.id}</span>
          <span className="badge neutral">{domain.name}</span>
          <span className="badge neutral">Leçon {idx + 1} / {ls.length}</span>
          {interactive > 0 && <span className="badge gap">{interactive} interactions</span>}
          {done && <span className="badge ok">Terminée</span>}
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-meta">
          <span>{lesson.minutes} min</span>
          <span>·</span>
          <span>{lesson.blocks.length} blocs</span>
          <span>·</span>
          <span style={{ cursor: 'pointer', color: 'var(--accent)' }} onClick={() => navigate(`objective/${o.id}`)}>
            Plan de l'objectif
          </span>
        </div>
      </div>

      <StepLesson
        blocks={lesson.blocks}
        completed={done}
        onComplete={() => {
          if (!done) {
            completeLesson(o.id, lesson.id, lesson.minutes)
            toast('Leçon terminée — progression enregistrée.')
          }
        }}
      />

      <div className="lesson-nav">
        {prev ? (
          <button className="btn" onClick={() => navigate(`objective/${o.id}/lesson/${prev.id}`)}>
            ← {prev.title}
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={() => navigate(`objective/${o.id}`)}>← Plan de l'objectif</button>
        )}
        <div className="row">
          {!done && (
            <button className="btn" onClick={() => { completeLesson(o.id, lesson.id, lesson.minutes); toast('Leçon marquée comme terminée.') }}>
              Marquer comme terminée
            </button>
          )}
          {next ? (
            <button className="btn btn-primary" onClick={() => { if (!done) completeLesson(o.id, lesson.id, lesson.minutes); navigate(`objective/${o.id}/lesson/${next.id}`) }}>
              Leçon suivante →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => { if (!done) completeLesson(o.id, lesson.id, lesson.minutes); navigate(`objective/${o.id}/quiz`) }}>
              Évaluation de l'objectif →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
