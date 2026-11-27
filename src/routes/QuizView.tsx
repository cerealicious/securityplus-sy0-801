import { useEffect, useMemo, useState } from 'react'
import { objectiveById, quizById, quizzes } from '../lib/content'
import { useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import type { QuizQuestion } from '../lib/types'
import { Empty, ProgressBar } from '../components/ui'

function isCorrect(q: QuizQuestion, ans: any): boolean {
  if (q.type === 'single') return ans === q.answer?.[0]
  if (q.type === 'multi') {
    const a = Array.isArray(ans) ? [...ans].sort() : []
    const b = [...(q.answer ?? [])].sort()
    return a.length === b.length && a.every((x, i) => x === b[i])
  }
  if (q.type === 'match') {
    if (!ans || !q.pairs) return false
    return q.pairs.every((p, i) => ans[i] === p.right)
  }
  return false
}

function MatchQuestion({
  q,
  value,
  onChange,
  locked,
}: {
  q: QuizQuestion
  value: Record<number, string>
  onChange: (v: Record<number, string>) => void
  locked: boolean
}) {
  const rights = useMemo(() => {
    const set = Array.from(new Set((q.pairs ?? []).map((p) => p.right)))
    return set.sort(() => Math.random() - 0.5)
  }, [q.id])
  return (
    <div className="stack-sm">
      {(q.pairs ?? []).map((p, i) => {
        const chosen = value[i]
        const ok = locked && chosen === p.right
        const bad = locked && chosen !== p.right
        return (
          <div key={i} className="row" style={{ gap: 10, alignItems: 'center' }}>
            <div
              style={{
                flex: '1 1 50%',
                fontSize: 13,
                color: 'var(--text)',
                padding: '7px 10px',
                background: 'var(--bg-2)',
                borderRadius: 7,
                border: '1px solid var(--border-soft)',
              }}
            >
              {p.left}
            </div>
            <select
              className="pbq-select"
              value={chosen ?? ''}
              disabled={locked}
              onChange={(e) => onChange({ ...value, [i]: e.target.value })}
              style={{
                flex: '1 1 50%',
                borderColor: ok ? 'rgba(34,197,94,0.6)' : bad ? 'rgba(255,92,122,0.6)' : undefined,
              }}
            >
              <option value="">— choisir —</option>
              {rights.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )
      })}
    </div>
  )
}

export default function QuizView({ objectiveId }: { objectiveId: string }) {
  const { progress, recordQuiz } = useProgress()
  const o = objectiveById.get(objectiveId)
  const quiz = quizzes.find((x) => x.objective === objectiveId)
  const [idx, setIdx] = useState(0)
  const [ans, setAns] = useState<any>(undefined)
  const [locked, setLocked] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setIdx(0); setAns(undefined); setLocked(false); setResults([]); setFinished(false); setSaved(false)
  }, [objectiveId])

  if (!o || !quiz) {
    return (
      <div className="content-inner">
        <Empty>Le quiz de cet objectif n'est pas encore disponible.</Empty>
        <div style={{ textAlign: 'center' }}>
          <button className="btn" onClick={() => navigate(`objective/${objectiveId}`)}>Retour</button>
        </div>
      </div>
    )
  }

  const q = quiz.questions[idx]
  const score = results.length ? Math.round((results.filter(Boolean).length / results.length) * 100) : 0
  const op = progress.objectives[o.id]

  useEffect(() => {
    if (finished && !saved) {
      recordQuiz(o.id, score, 10)
      setSaved(true)
    }
  }, [finished, saved, score, o.id, recordQuiz])

  if (finished) {
    const wrong = quiz.questions.filter((_, i) => !results[i])
    return (
      <div className="content-inner">
        <div className="card quiz-result">
          <div className="eyebrow">Quiz terminé · Objectif {o.id}</div>
          <div className="quiz-score" style={{ color: score >= 80 ? 'var(--ok)' : score >= 60 ? 'var(--warn)' : 'var(--bad)' }}>
            {score}%
          </div>
          <div className="muted">
            {results.filter(Boolean).length} bonnes réponses sur {quiz.questions.length}
            {op && op.quizBest > 0 ? ` · meilleur score enregistré : ${Math.max(op.quizBest, score)}%` : ''}
          </div>
          <div style={{ maxWidth: 460, margin: '18px auto 0' }}>
            <ProgressBar value={score} color={score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#e11d48'} />
          </div>
          <div className="row" style={{ justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
            <button
              className="btn"
              onClick={() => {
                setIdx(0); setAns(undefined); setLocked(false); setResults([]); setFinished(false); setSaved(false)
              }}
            >
              Refaire le quiz
            </button>
            <button className="btn" onClick={() => navigate(`objective/${o.id}/flashcards`)}>
              Réviser les flashcards
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`objective/${o.id}`)}>
              Retour à l'objectif
            </button>
          </div>
        </div>

        {wrong.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div className="section-title" style={{ marginBottom: 10 }}>À revoir ({wrong.length})</div>
            <div className="stack-sm">
              {wrong.map((w) => (
                <div key={w.id} className="card" style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 560, marginBottom: 6 }}>{w.q}</div>
                  <div className="small" style={{ color: 'var(--muted)' }}>
                    <strong style={{ color: 'var(--ok)' }}>Bonne réponse :</strong>{' '}
                    {w.type === 'match'
                      ? (w.pairs ?? []).map((p) => `${p.left} → ${p.right}`).join(' · ')
                      : (w.answer ?? []).map((i) => w.options?.[i]).join(' · ')}
                  </div>
                  <div className="small" style={{ marginTop: 6, color: 'var(--muted)' }}>{w.explain}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const correctNow = locked ? isCorrect(q, ans) : false
  const canValidate =
    q.type === 'single' ? ans !== undefined
    : q.type === 'multi' ? Array.isArray(ans) && ans.length > 0
    : !!ans && Object.keys(ans).length === (q.pairs?.length ?? 0)

  return (
    <div className="content-inner">
      <div className="spread" style={{ marginBottom: 14 }}>
        <div>
          <div className="eyebrow">Objectif {o.id} · Quiz</div>
          <h1 className="page-title" style={{ marginTop: 4 }}>Vérifier ma compréhension</h1>
        </div>
        <button className="btn btn-sm" onClick={() => navigate(`objective/${o.id}`)}>Quitter</button>
      </div>

      <div className="spread small faint" style={{ marginBottom: 6 }}>
        <span>Question {idx + 1} / {quiz.questions.length}</span>
        <span>{q.type === 'single' ? 'Une seule réponse' : q.type === 'multi' ? 'Plusieurs réponses possibles' : 'Associez chaque élément'}</span>
      </div>
      <ProgressBar value={(idx / quiz.questions.length) * 100} />

      <div className="q-card" style={{ marginTop: 18 }}>
        <div className="q-num">QUESTION {String(idx + 1).padStart(2, '0')}</div>
        <div className="q-text">{q.q}</div>

        {q.type !== 'match' && (
          <div>
            {(q.options ?? []).map((opt, i) => {
              const selected = q.type === 'multi' ? (ans ?? []).includes(i) : ans === i
              let cls = 'opt'
              if (locked) {
                if ((q.answer ?? []).includes(i)) cls += ' correct'
                else if (selected) cls += ' wrong'
              } else if (selected) cls += ' selected'
              return (
                <button
                  key={i}
                  className={cls}
                  disabled={locked}
                  onClick={() => {
                    if (q.type === 'multi') {
                      const cur: number[] = ans ?? []
                      setAns(cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i])
                    } else {
                      setAns(i)
                    }
                  }}
                >
                  <span className="letter">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>
        )}

        {q.type === 'match' && (
          <MatchQuestion q={q} value={ans ?? {}} onChange={setAns} locked={locked} />
        )}

        {locked && (
          <div className="q-explain">
            <span className="tag">{correctNow ? 'Correct' : 'À revoir'}</span>
            {q.explain}
            {q.ref && (
              <div style={{ marginTop: 8, fontSize: 12 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ padding: 0, color: 'var(--accent)' }}
                  onClick={() => navigate(`objective/${o.id}/lesson/${q.ref}`)}
                >
                  Revoir la leçon associée →
                </button>
              </div>
            )}
          </div>
        )}

        <div className="row" style={{ marginTop: 16, justifyContent: 'flex-end' }}>
          {!locked ? (
            <button
              className="btn btn-primary"
              disabled={!canValidate}
              onClick={() => {
                setLocked(true)
                setResults((r) => [...r, isCorrect(q, ans)])
              }}
            >
              Valider
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                if (idx + 1 >= quiz.questions.length) setFinished(true)
                else {
                  setIdx(idx + 1)
                  setAns(undefined)
                  setLocked(false)
                }
              }}
            >
              {idx + 1 >= quiz.questions.length ? 'Voir le résultat' : 'Question suivante →'}
            </button>
          )}
        </div>
      </div>

      <div className="faint small" style={{ marginTop: 14 }}>
        {quiz.questions.length} questions · chaque réponse est expliquée et reliée à une leçon.
      </div>
    </div>
  )
}
