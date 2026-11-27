import { useState } from 'react'
import { lessonById, lessonsFor, objectiveById, domainById } from '../lib/content'
import { useProgress } from '../lib/progress'
import { computeStats, xpForActivity } from '../lib/gamification'
import { playLevelUp, playSuccess } from '../lib/sound'
import Celebration from '../components/Celebration'
import { navigate } from '../lib/router'
import StepLesson from '../engines/StepLesson'
import { toast } from '../lib/toast'

export default function LessonView({ objectiveId, lessonId }: { objectiveId: string; lessonId?: string }) {
  const { progress, completeLesson } = useProgress()
  const [celebration, setCelebration] = useState<{ kind: 'xp' | 'level'; amount?: number; level?: number } | null>(null)
  const o = objectiveById.get(objectiveId)
  const lesson = lessonId ? lessonById.get(lessonId) : undefined
  if (!o || !lesson) {
    return (
      <div className="content-inner">
        <h1 className="page-title">Lesson not found</h1>
        <button className="btn" style={{ marginTop: 14 }} onClick={() => navigate(`objective/${objectiveId}`)}>
          Back to objective
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

  const award = () => {
    if (done) return
    const before = computeStats(progress)
    const gain = xpForActivity('lesson')
    completeLesson(o.id, lesson.id, lesson.minutes)
    const afterLevel = Math.floor((before.xp + gain) / 100) + 1
    if (afterLevel > before.level) {
      playLevelUp()
      setCelebration({ kind: 'level', level: afterLevel })
    } else {
      playSuccess()
      setCelebration({ kind: 'xp', amount: gain })
    }
    toast(`Lesson completed · +${gain} XP`)
  }

  return (
    <div className="content-inner">
      <div className="lesson-head">
        <div className="row" style={{ gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <span className="badge info">Objective {o.id}</span>
          <span className="badge neutral">{domain.name}</span>
          <span className="badge neutral">Lesson {idx + 1} / {ls.length}</span>
          {interactive > 0 && <span className="badge gap">{interactive} interactions</span>}
          {done && <span className="badge ok">Completed</span>}
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-meta">
          <span>{lesson.minutes} min</span>
          <span>·</span>
          <span>{lesson.blocks.length} blocks</span>
          <span>·</span>
          <span style={{ cursor: 'pointer', color: 'var(--accent)' }} onClick={() => navigate(`objective/${o.id}`)}>
            Objective plan
          </span>
        </div>
      </div>

      <StepLesson
        blocks={lesson.blocks}
        completed={done}
        onComplete={award}
      />

      <div className="lesson-nav">
        {prev ? (
          <button className="btn" onClick={() => navigate(`objective/${o.id}/lesson/${prev.id}`)}>
            ← {prev.title}
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={() => navigate(`objective/${o.id}`)}>← Objective plan</button>
        )}
        <div className="row">
          {!done && (
            <button className="btn" onClick={award}>Mark as completed</button>
          )}
          {next ? (
            <button className="btn btn-primary" onClick={() => { award(); navigate(`objective/${o.id}/lesson/${next.id}`) }}>
              Next lesson →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => { award(); navigate(`objective/${o.id}/quiz`) }}>
              Objective assessment →
            </button>
          )}
        </div>
      </div>

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
