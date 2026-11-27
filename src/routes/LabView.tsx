import { useMemo, useState } from 'react'
import { objectiveById, pbqById, pbqs } from '../lib/content'
import { useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import type { Pbq } from '../lib/types'
import { Empty, ProgressBar } from '../components/ui'
import { toast } from '../lib/toast'
import { computeStats, xpForActivity } from '../lib/gamification'
import { playLevelUp, playSuccess } from '../lib/sound'
import Celebration from '../components/Celebration'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function LabView({
  objectiveId,
  pbqId,
}: {
  objectiveId: string
  pbqId?: string
}) {
  const o = objectiveById.get(objectiveId)
  const list = pbqs.filter((p) => p.objective === objectiveId)
  const pbq = pbqId ? pbqById.get(pbqId) : list[0]

  if (!o || !pbq) {
    return (
      <div className="content-inner">
        <Empty>Aucun exercice pratique disponible pour cet objectif.</Empty>
        <div style={{ textAlign: 'center' }}>
          <button className="btn" onClick={() => navigate(`objective/${objectiveId}`)}>Retour</button>
        </div>
      </div>
    )
  }

  return (
    <div className="content-inner">
      <div className="spread" style={{ marginBottom: 12 }}>
        <div>
          <div className="eyebrow">Objectif {o.id} · Exercice pratique</div>
          <h1 className="page-title" style={{ marginTop: 4 }}>{pbq.title}</h1>
        </div>
        <button className="btn btn-sm" onClick={() => navigate(`objective/${o.id}`)}>Quitter</button>
      </div>
      <div className="row" style={{ gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {list.map((p) => (
          <button
            key={p.id}
            className={`btn btn-sm ${p.id === pbq.id ? 'btn-primary' : ''}`}
            onClick={() => navigate(`objective/${o.id}/lab/${p.id}`)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <PbqRunner key={pbq.id} pbq={pbq} />
    </div>
  )
}

function PbqRunner({ pbq }: { pbq: Pbq }) {
  const { completePbq, progress } = useProgress()
  const [celebration, setCelebration] = useState<{ kind: 'xp' | 'level'; amount?: number; level?: number } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [placement, setPlacement] = useState<Record<string, string>>({})
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [sequence, setSequence] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [rows, setRows] = useState<Record<string, string>>({})
  const [values, setValues] = useState<Record<string, string>>({})

  const displayItems = useMemo(() => {
    if (!pbq.items) return []
    if (pbq.type === 'order') return shuffle(pbq.items)
    return pbq.items
  }, [pbq])

  const rightOptions = useMemo(
    () => (pbq.pairs ? shuffle(Array.from(new Set(pbq.pairs.map((p) => p.right)))) : []),
    [pbq]
  )

  const correctness = useMemo(() => {
    const map: Record<string, boolean> = {}
    if (pbq.type === 'classify') {
      for (const it of pbq.items ?? []) map[it.id] = placement[it.id] === it.cat
    } else if (pbq.type === 'order') {
      const expected = (pbq.items ?? []).map((i) => i.id)
      sequence.forEach((id, i) => {
        map[id] = expected[i] === id
      })
      for (const it of pbq.items ?? []) if (!(it.id in map)) map[it.id] = false
    } else if (pbq.type === 'match') {
      for (const p of pbq.pairs ?? []) map[p.left] = mapping[p.left] === p.right
    } else if (pbq.type === 'table') {
      for (const r of pbq.rows ?? []) map[r.id] = rows[r.id] === r.answer
    } else if (pbq.type === 'calc') {
      for (const f of pbq.fields ?? []) {
        const v = Number(values[f.id])
        map[f.id] = Number.isFinite(v) && Math.abs(v - f.answer) <= (f.tolerance ?? 0.5)
      }
    }
    return map
  }, [pbq, placement, sequence, mapping, rows, values])

  const total = Object.keys(correctness).length || 1
  const good = Object.values(correctness).filter(Boolean).length
  const score = Math.round((good / total) * 100)

  const canSubmit =
    pbq.type === 'classify'
      ? Object.keys(placement).length === (pbq.items?.length ?? 0)
      : pbq.type === 'order'
      ? sequence.length === (pbq.items?.length ?? 0)
      : pbq.type === 'match'
      ? Object.keys(mapping).length === (pbq.pairs?.length ?? 0)
      : pbq.type === 'table'
      ? Object.keys(rows).length === (pbq.rows?.length ?? 0)
      : Object.keys(values).length === (pbq.fields?.length ?? 0)

  function submit() {
    setSubmitted(true)
    if (score >= 70) {
      const before = computeStats(progress)
      const gain = xpForActivity('pbq')
      completePbq(pbq.objective, pbq.id, 15)
      const afterLevel = Math.floor((before.xp + gain) / 100) + 1
      if (afterLevel > before.level) {
        playLevelUp()
        setCelebration({ kind: 'level', level: afterLevel })
      } else {
        playSuccess()
        setCelebration({ kind: 'xp', amount: gain })
      }
      toast(`Exercice réussi à ${score}% · +${gain} XP`)
    } else {
      toast(`Score ${score}% — révisez le corrigé puis réessayez.`)
    }
  }

  function reset() {
    setSubmitted(false)
    setPlacement({})
    setSequence([])
    setMapping({})
    setRows({})
    setValues({})
    setSelectedToken(null)
  }

  return (
    <div className="stack">
      <div className="card" style={{ borderColor: '#ddd6fe' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Énoncé · {pbq.type === 'classify' ? 'Classement' : pbq.type === 'order' ? 'Ordonnancement' : pbq.type === 'match' ? 'Association' : pbq.type === 'table' ? 'Analyse de tableau' : 'Calcul'}
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>{pbq.prompt}</div>
      </div>

      {pbq.type === 'classify' && (
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Éléments à classer</div>
            <div className="row wrap" style={{ gap: 7 }}>
              {(pbq.items ?? []).filter((it) => !placement[it.id]).map((it) => (
                <button
                  key={it.id}
                  className={`pbq-item pbq-token ${selectedToken === it.id ? 'selected' : ''}`}
                  style={{
                    margin: 0,
                    cursor: 'pointer',
                    borderColor: selectedToken === it.id ? 'var(--accent)' : undefined,
                    background: selectedToken === it.id ? 'rgba(37,99,235,0.12)' : undefined,
                  }}
                  draggable
                  onDragStart={() => setSelectedToken(it.id)}
                  onClick={() => setSelectedToken(it.id)}
                >
                  {it.label}
                </button>
              ))}
              {(pbq.items ?? []).every((it) => placement[it.id]) && (
                <span className="faint small">Tous les éléments sont placés.</span>
              )}
            </div>
            <div className="faint small" style={{ marginTop: 10 }}>
              Cliquez un élément puis une catégorie (ou glissez-déposez).
            </div>
          </div>

          <div className="grid grid-2">
            {(pbq.categories ?? []).map((cat) => (
              <div
                key={cat}
                className="pbq-cat"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (selectedToken) {
                    setPlacement({ ...placement, [selectedToken]: cat })
                    setSelectedToken(null)
                  }
                }}
                onClick={() => {
                  if (selectedToken) {
                    setPlacement({ ...placement, [selectedToken]: cat })
                    setSelectedToken(null)
                  }
                }}
              >
                <h5>{cat}</h5>
                <div className="row wrap" style={{ gap: 6 }}>
                  {(pbq.items ?? []).filter((it) => placement[it.id] === cat).map((it) => {
                    const ok = correctness[it.id]
                    return (
                      <span
                        key={it.id}
                        className="badge"
                        style={{
                          cursor: 'pointer',
                          background: submitted ? (ok ? 'rgba(34,197,94,0.14)' : 'rgba(255,92,122,0.14)') : 'var(--elev)',
                          color: submitted ? (ok ? '#047857' : '#be123c') : 'var(--text)',
                          borderColor: submitted ? (ok ? 'rgba(34,197,94,0.4)' : 'rgba(255,92,122,0.4)') : 'var(--border)',
                          padding: '5px 9px',
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!submitted) {
                            const next = { ...placement }
                            delete next[it.id]
                            setPlacement(next)
                          }
                        }}
                      >
                        {it.label} {submitted ? (ok ? '✓' : '✗') : '×'}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pbq.type === 'order' && (
        <div className="grid grid-2">
          <div className="card">
            <div className="eyebrow" style={{ marginBottom: 8 }}>Éléments</div>
            <div className="stack-sm">
              {displayItems.filter((it) => !sequence.includes(it.id)).map((it) => (
                <button
                  key={it.id}
                  className="pbq-item pbq-token"
                  style={{ margin: 0, textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => setSequence([...sequence, it.id])}
                >
                  {it.label}
                </button>
              ))}
              {sequence.length === (pbq.items?.length ?? 0) && (
                <span className="faint small">Séquence complète — vérifiez puis validez.</span>
              )}
            </div>
          </div>
          <div className="card">
            <div className="spread" style={{ marginBottom: 8 }}>
              <div className="eyebrow">Votre séquence</div>
              {sequence.length > 0 && !submitted && (
                <button className="btn btn-sm btn-ghost" onClick={() => setSequence([])}>Effacer</button>
              )}
            </div>
            {sequence.length === 0 && <div className="faint small">Cliquez les éléments dans l'ordre.</div>}
            <div className="stack-sm">
              {sequence.map((id, i) => {
                const it = (pbq.items ?? []).find((x) => x.id === id)
                const ok = correctness[id]
                return (
                  <div
                    key={id}
                    className="pbq-item"
                    style={{
                      margin: 0,
                      borderColor: submitted ? (ok ? 'rgba(34,197,94,0.45)' : 'rgba(255,92,122,0.45)') : undefined,
                    }}
                  >
                    <span className="grip">{i + 1}.</span>
                    <span style={{ flex: 1 }}>{it?.label}</span>
                    {submitted ? (
                      <span style={{ color: ok ? 'var(--ok)' : 'var(--bad)' }}>{ok ? '✓' : '✗'}</span>
                    ) : (
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '0 6px' }}
                        onClick={() => setSequence(sequence.filter((x) => x !== id))}
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {pbq.type === 'match' && (
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 10 }}>Associez chaque élément à la bonne réponse</div>
          <div className="stack-sm">
            {(pbq.pairs ?? []).map((p) => {
              const chosen = mapping[p.left]
              const ok = submitted && chosen === p.right
              const bad = submitted && chosen !== p.right
              return (
                <div key={p.left} className="row" style={{ gap: 10 }}>
                  <div style={{ flex: '1 1 48%', fontSize: 13 }}>{p.left}</div>
                  <select
                    className="pbq-select"
                    style={{
                      flex: '1 1 48%',
                      borderColor: ok ? 'rgba(34,197,94,0.6)' : bad ? 'rgba(255,92,122,0.6)' : undefined,
                    }}
                    disabled={submitted}
                    value={chosen ?? ''}
                    onChange={(e) => setMapping({ ...mapping, [p.left]: e.target.value })}
                  >
                    <option value="">— choisir —</option>
                    {rightOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {pbq.type === 'table' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="tbl" style={{ margin: 0 }}>
            <thead>
              <tr>
                {(pbq.columns ?? []).map((c) => <th key={c}>{c}</th>)}
                <th style={{ width: 200 }}>Votre analyse</th>
              </tr>
            </thead>
            <tbody>
              {(pbq.rows ?? []).map((r) => {
                const ok = submitted && rows[r.id] === r.answer
                const bad = submitted && rows[r.id] !== r.answer
                return (
                  <tr key={r.id}>
                    {r.cells.map((c, i) => (
                      <td key={i} className={i === 0 ? 'mono-sm' : ''}>{c}</td>
                    ))}
                    <td>
                      <select
                        className="pbq-select"
                        style={{
                          width: '100%',
                          borderColor: ok ? 'rgba(34,197,94,0.6)' : bad ? 'rgba(255,92,122,0.6)' : undefined,
                        }}
                        disabled={submitted}
                        value={rows[r.id] ?? ''}
                        onChange={(e) => setRows({ ...rows, [r.id]: e.target.value })}
                      >
                        <option value="">— choisir —</option>
                        {(pbq.options ?? []).map((op) => (
                          <option key={op} value={op}>{op}</option>
                        ))}
                      </select>
                      {submitted && !ok && (
                        <div className="small" style={{ color: 'var(--ok)', marginTop: 4 }}>
                          Attendu : {r.answer}
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {pbq.type === 'calc' && (
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 10 }}>Saisissez vos résultats</div>
          <div className="stack-sm">
            {(pbq.fields ?? []).map((f) => {
              const ok = submitted && correctness[f.id]
              const bad = submitted && !correctness[f.id]
              return (
                <div key={f.id} className="row" style={{ gap: 12 }}>
                  <div style={{ flex: 1, fontSize: 13 }}>{f.label}</div>
                  <input
                    className="pbq-input"
                    type="number"
                    step="any"
                    disabled={submitted}
                    value={values[f.id] ?? ''}
                    onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}
                    style={{
                      borderColor: ok ? 'rgba(34,197,94,0.6)' : bad ? 'rgba(255,92,122,0.6)' : undefined,
                    }}
                  />
                  <span className="faint small" style={{ width: 50 }}>{f.unit}</span>
                  {submitted && !ok && (
                    <span className="small" style={{ color: 'var(--ok)', width: 130 }}>
                      Attendu : {f.answer}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {submitted && (
        <div className="card">
          <div className="spread">
            <div>
              <div className="eyebrow">Corrigé</div>
              <div className="row" style={{ gap: 14, marginTop: 6 }}>
                <span className="quiz-score" style={{ fontSize: 34, color: score >= 70 ? 'var(--ok)' : 'var(--bad)' }}>
                  {score}%
                </span>
                <span className="muted small">{good} / {total} éléments corrects</span>
              </div>
            </div>
            <div style={{ width: 180 }}>
              <ProgressBar value={score} color={score >= 70 ? '#059669' : '#e11d48'} />
            </div>
          </div>
          <hr className="hr-soft" />
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>{pbq.explain}</div>
        </div>
      )}

      <div className="row" style={{ justifyContent: 'flex-end', marginTop: 4 }}>
        {submitted ? (
          <>
            <button className="btn" onClick={reset}>Recommencer</button>
            <button className="btn btn-primary" onClick={() => navigate(`objective/${pbq.objective}`)}>
              Retour à l'objectif
            </button>
          </>
        ) : (
          <button className="btn btn-primary" disabled={!canSubmit} onClick={submit}>
            Valider mes réponses
          </button>
        )}
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
