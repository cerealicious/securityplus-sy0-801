import {
  decksFor,
  domainById,
  lessonsFor,
  objectiveById,
  pbqsFor,
  scenariosFor,
} from '../lib/content'
import { objectivePercent, useProgress } from '../lib/progress'
import { isUnlocked, unlockHint } from '../lib/learning'
import { navigate } from '../lib/router'
import { CoverageBadge, ProgressBar } from '../components/ui'

export default function ObjectiveView({ objectiveId }: { objectiveId: string }) {
  const { progress } = useProgress()
  const o = objectiveById.get(objectiveId)
  if (!o) {
    return (
      <div className="content-inner">
        <h1 className="page-title">Objective not found</h1>
        <button className="btn" style={{ marginTop: 14 }} onClick={() => navigate('')}>
          Back to dashboard
        </button>
      </div>
    )
  }
  const domain = domainById.get(o.domain)!
  const ls = lessonsFor(o.id)
  const ds = decksFor(o.id)
  const ps = pbqsFor(o.id)
  const ss = scenariosFor(o.id)
  const op = progress.objectives[o.id]
  const pct = objectivePercent(o, progress)
  const doneLessons = op?.lessonsDone ?? []
  const nextLesson = ls.find((l) => !doneLessons.includes(l.id)) ?? ls[0]

  return (
    <div className="content-inner">
      <div className="eyebrow" style={{ color: domain.color }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(`domain/${domain.id}`)}>
          Domain {domain.id} — {domain.name}
        </span>
        <span className="faint"> · Objective {o.id}</span>
      </div>

      <div className="spread" style={{ alignItems: 'flex-start', gap: 24, marginTop: 8 }}>
        <div style={{ minWidth: 0 }}>
          <h1 className="page-title" style={{ maxWidth: '30ch' }}>{o.titleFr}</h1>
          <div className="mono-sm faint" style={{ marginTop: 8, maxWidth: '80ch' }}>{o.title}</div>
          <div className="row" style={{ marginTop: 12, gap: 8, flexWrap: 'wrap' }}>
            <CoverageBadge coverage={o.coverage} />
            <span className="badge neutral">{o.itemCount} subtopics</span>
            <span className="badge neutral">{o.groups.length} groups</span>
            {o.status === 'complete' ? (
              <span className="badge ok">Complete content</span>
            ) : (
              <span className="badge warn">Content in progress</span>
            )}
          </div>
        </div>
        <div style={{ width: 150, flex: 'none' }}>
          <div className="spread faint small" style={{ marginBottom: 6 }}>
            <span>Progress</span>
            <span className="mono-sm">{pct}%</span>
          </div>
          <ProgressBar value={pct} color={domain.color} />
        </div>
      </div>

      <p className="page-sub" style={{ marginTop: 16 }}>{o.summary}</p>

      {!isUnlocked(o, progress) && (
        <div className="callout warning" style={{ marginTop: 18 }}>
          <div className="callout-title">Progressive unlocking</div>
          {unlockHint(o, progress)} You can still open this objective to explore its content.
          <div style={{ marginTop: 10 }}>
            <button className="btn btn-sm" onClick={() => navigate(`objective/${o.id}/lesson/${ls[0]?.id ?? ''}`)}>
              Open anyway →
            </button>
          </div>
        </div>
      )}

      {o.status === 'complete' ? (
        <>
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            <div className="card hover clickable" onClick={() => nextLesson && navigate(`objective/${o.id}/lesson/${nextLesson.id}`)}>
              <div className="spread">
                <span className="eyebrow">Lessons</span>
                <span className="mono-sm faint">{doneLessons.length}/{ls.length}</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 650, margin: '8px 0 4px' }}>
                {ls.reduce((n, l) => n + l.minutes, 0)} min reading
              </div>
              <div className="faint small">
                {nextLesson ? `Resume: ${nextLesson.title}` : 'All lessons completed'}
              </div>
              <div className="progress thin" style={{ marginTop: 12 }}>
                <span style={{ width: `${(doneLessons.length / Math.max(1, ls.length)) * 100}%`, background: domain.color }} />
              </div>
            </div>

            <div className="card hover clickable" onClick={() => navigate(`objective/${o.id}/flashcards`)}>
              <div className="spread">
                <span className="eyebrow">Flashcards</span>
                <span className="mono-sm faint">{ds.reduce((n, d) => n + d.cards.length, 0)} cards</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 650, margin: '8px 0 4px' }}>Spaced repetition</div>
              <div className="faint small">5-box Leitner · daily review</div>
            </div>

            <div className="card hover clickable" onClick={() => navigate(`objective/${o.id}/quiz`)}>
              <div className="spread">
                <span className="eyebrow">Quiz</span>
                <span className="mono-sm faint">
                  {op?.quizAttempts ? `best ${op.quizBest}%` : 'not attempted'}
                </span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 650, margin: '8px 0 4px' }}>Explained answers</div>
              <div className="faint small">Each answer is justified and linked to the lesson</div>
            </div>

            {ps.map((p) => (
              <div key={p.id} className="card hover clickable" onClick={() => navigate(`objective/${o.id}/lab/${p.id}`)}>
                <div className="spread">
                  <span className="eyebrow">Hands-on Lab</span>
                  <span className="mono-sm faint">{p.type}</span>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 620, margin: '8px 0 4px' }}>{p.title}</div>
                <div className="faint small">
                  {op?.pbqDone.includes(p.id) ? '✓ already passed' : 'To complete'}
                </div>
              </div>
            ))}

            {ss.map((s) => (
              <div key={s.id} className="card hover clickable" onClick={() => navigate(`objective/${o.id}/scenario/${s.id}`)}>
                <div className="spread">
                  <span className="eyebrow">Scenario</span>
                  <span className="mono-sm faint">{Object.keys(s.nodes).length} steps</span>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 620, margin: '8px 0 4px' }}>{s.title}</div>
                <div className="faint small">
                  {op?.scenariosDone.includes(s.id) ? '✓ completed' : 'Decisions & debrief'}
                </div>
              </div>
            ))}
          </div>

          <div className="eval-card">
            <div>
              <div className="eyebrow" style={{ color: domain.color }}>End-of-objective assessment</div>
              <h3 style={{ fontSize: 17, marginTop: 6 }}>Validate your skills on {o.id}</h3>
              <div className="faint small" style={{ marginTop: 4 }}>
                Graded quiz · hands-on lab · scenario. Your score counts toward your progress.
              </div>
            </div>
            <div className="row" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => navigate(`objective/${o.id}/quiz`)}>Start quiz →</button>
              {ps[0] && <button className="btn btn-sm" onClick={() => navigate(`objective/${o.id}/lab/${ps[0].id}`)}>Hands-on Lab</button>}
              {ss[0] && <button className="btn btn-sm" onClick={() => navigate(`objective/${o.id}/scenario/${ss[0].id}`)}>Scenario</button>}
            </div>
          </div>

          <div className="section-title" style={{ marginTop: 30, marginBottom: 10 }}>Lesson plan</div>
          <div className="card" style={{ padding: 8 }}>
            {ls.map((l) => {
              const done = doneLessons.includes(l.id)
              return (
                <div
                  key={l.id}
                  className="obj-row"
                  onClick={() => navigate(`objective/${o.id}/lesson/${l.id}`)}
                >
                  <span className={`oid ${done ? '' : ''}`} style={{ color: done ? 'var(--ok)' : domain.color }}>
                    {done ? '✓' : String(l.order).padStart(2, '0')}
                  </span>
                  <div className="otitle">
                    {l.title}
                    <small>{l.minutes} min · {l.blocks.length} blocks</small>
                  </div>
                  <span className="faint small">Open →</span>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="callout gap" style={{ marginTop: 24 }}>
          <div className="callout-title">Content in progress</div>
          This objective is fully mapped — its {o.itemCount} official subtopics are listed below —
          but its {o.plannedLessons} lessons, flashcards, quizzes, and labs will be produced in a
          later phase. All 27 official objectives and their subtopics are already mapped and
          browsable.
          <div style={{ marginTop: 10 }}>
            <button className="btn btn-sm" onClick={() => navigate('objective/1.1')}>
              View a complete objective (1.1)
            </button>
          </div>
        </div>
      )}

      <div className="section-title" style={{ marginTop: 30, marginBottom: 4 }}>
        Official subtopics
      </div>
      <div className="faint small" style={{ marginBottom: 14 }}>
        Exact exam blueprint terms in English. Group labels are provided for objectives covered in
        depth.
      </div>

      <div className="stack">
        {o.groups.map((g, gi) => (
          <div className="card" key={gi} style={{ padding: '15px 17px' }}>
            <div className="spread" style={{ marginBottom: 9 }}>
              <div style={{ fontSize: 13.5, fontWeight: 620 }}>{g.fr || g.name}</div>
              <span className="faint small">{g.items.length}</span>
            </div>
            {g.fr && g.fr !== g.name && (
              <div className="mono-sm faint" style={{ marginTop: -6, marginBottom: 9 }}>{g.name}</div>
            )}
            <div className="pill-row">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="badge neutral"
                  style={{ fontWeight: 450, fontSize: 11.5, padding: '4px 9px', whiteSpace: 'normal', textAlign: 'left' }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="row" style={{ marginTop: 22 }}>
        <button className="btn btn-ghost" onClick={() => navigate(`domain/${domain.id}`)}>
          ← Domain {domain.id}
        </button>
        {o.status === 'complete' && (
          <button className="btn" onClick={() => navigate(`objective/${o.id}/lesson/${ls[0].id}`)}>
            Start first lesson →
          </button>
        )}
      </div>
    </div>
  )
}
