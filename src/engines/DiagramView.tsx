import { useMemo, useState } from 'react'
import type { Diagram } from '../lib/types'
import { Rich } from '../components/ui'

const KIND_FILL: Record<string, string> = {
  artifact: '#eef3ff',
  actor: '#f4eeff',
  step: '#eaf8f2',
  risk: '#fff0f3',
  neutral: '#f5f3ee',
}
const KIND_STROKE: Record<string, string> = {
  artifact: '#3b6fe8',
  actor: '#7c3aed',
  step: '#0e9f8c',
  risk: '#e11d48',
  neutral: '#94a3b8',
}

export default function DiagramView({ diagram }: { diagram: Diagram }) {
  const modes = useMemo(() => {
    const m = ['explore']
    if (diagram.quiz) m.push('quiz')
    if (diagram.sequence?.length) m.push('order')
    return m
  }, [diagram])
  const [mode, setMode] = useState('explore')
  const [selected, setSelected] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [orderError, setOrderError] = useState(false)

  if (diagram.kind === 'matrix' && diagram.matrix) {
    return (
      <div className="diagram-wrap">
        <div className="diagram-head">
          <div>
            <div className="diagram-title">{diagram.title}</div>
            {diagram.subtitle && <div className="faint small">{diagram.subtitle}</div>}
          </div>
          <span className="badge neutral">Cliquez sur une case</span>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl" style={{ minWidth: 760, margin: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: 130 }}>Catégorie ↓ / Type →</th>
                  {diagram.matrix.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diagram.matrix.rows.map((r) => (
                  <tr key={r.label}>
                    <td style={{ fontWeight: 600, color: 'var(--text)' }}>{r.label}</td>
                    {r.cells.map((cell, i) => (
                      <td key={i} style={{ padding: 4 }}>
                        <button
                          onClick={() => setSelected(`${r.label}|${i}`)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: selected === `${r.label}|${i}` ? '#e4edff' : '#ffffff',
                            border: `1px solid ${selected === `${r.label}|${i}` ? '#4f46e5' : '#e3ddd0'}`,
                            color: '#37475a',
                            borderRadius: 7,
                            padding: '8px 9px',
                            fontSize: 11.8,
                            cursor: 'pointer',
                            minHeight: 44,
                            lineHeight: 1.35,
                          }}
                        >
                          {cell.text}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selected && (
            <div className="q-explain" style={{ marginTop: 14 }}>
              {(() => {
                const [rowLabel, idx] = selected.split('|')
                const row = diagram.matrix!.rows.find((r) => r.label === rowLabel)!
                const cell = row.cells[Number(idx)]
                return (
                  <>
                    <span className="tag">
                      {rowLabel} × {diagram.matrix!.columns[Number(idx)]}
                    </span>
                    <strong style={{ color: 'var(--text)' }}>{cell.text}</strong>
                    {cell.detail && <div style={{ marginTop: 4 }}>{cell.detail}</div>}
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    )
  }

  const nodes = diagram.nodes ?? []
  const edges = diagram.edges ?? []
  const nodeById = new Map(nodes.map((n) => [n.id, n]))
  const width = 780
  const height = Math.max(300, ...nodes.map((n) => n.y + (n.h ?? 54) + 20))

  const sel = selected ? nodeById.get(selected) : null
  const orderDone = order.length === (diagram.sequence?.length ?? 0)

  function clickNode(id: string) {
    if (mode === 'explore') {
      setSelected(id)
    } else if (mode === 'quiz') {
      setAnswer(id)
      setSelected(id)
    } else {
      if (orderDone) return
      const expected = diagram.sequence![order.length]
      if (id === expected) {
        setOrder([...order, id])
        setOrderError(false)
      } else {
        setOrderError(true)
        window.setTimeout(() => setOrderError(false), 900)
      }
    }
  }

  function resetMode(m: string) {
    setMode(m)
    setSelected(null)
    setAnswer(null)
    setOrder([])
    setOrderError(false)
  }

  return (
    <div className="diagram-wrap">
      <div className="diagram-head">
        <div>
          <div className="diagram-title">{diagram.title}</div>
          {diagram.subtitle && <div className="faint small">{diagram.subtitle}</div>}
        </div>
        <div className="row" style={{ gap: 4 }}>
          {modes.map((m) => (
            <button
              key={m}
              className={`btn btn-sm ${mode === m ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => resetMode(m)}
            >
              {m === 'explore' ? 'Explorer' : m === 'quiz' ? 'Quiz' : 'Remettre en ordre'}
            </button>
          ))}
        </div>
      </div>

      <div className="diagram-body">
        <div className="diagram-canvas">
          {mode === 'quiz' && (
            <div className="q-explain" style={{ margin: '4px 6px 8px' }}>
              <span className="tag">Cliquez sur le bon élément</span>
              {diagram.quiz!.question}
              {answer && (
                <div style={{ marginTop: 6, color: answer === diagram.quiz!.answer ? 'var(--ok)' : 'var(--bad)' }}>
                  {answer === diagram.quiz!.answer
                    ? '✓ Correct.'
                    : `✗ Réponse attendue : ${nodeById.get(diagram.quiz!.answer)?.label}`}
                </div>
              )}
            </div>
          )}
          {mode === 'order' && (
            <div className="q-explain" style={{ margin: '4px 6px 8px' }}>
              <span className="tag">Reconstituez la séquence</span>
              Cliquez les éléments dans l'ordre. {order.length}/{diagram.sequence!.length} placés.
              {orderError && <span style={{ color: 'var(--bad)' }}> Ce n'est pas l'étape suivante.</span>}
              {orderDone && <span style={{ color: 'var(--ok)' }}> Séquence complète.</span>}
            </div>
          )}

          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={diagram.title}>
            <defs>
              <marker id="dg-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#94a3b8" />
              </marker>
            </defs>
            {edges.map((e, i) => {
              const a = nodeById.get(e.from)
              const b = nodeById.get(e.to)
              if (!a || !b) return null
              const aw = a.w ?? 158, ah = a.h ?? 54
              const bw = b.w ?? 158, bh = b.h ?? 54
              const acx = a.x + aw / 2, acy = a.y + ah / 2
              const bcx = b.x + bw / 2, bcy = b.y + bh / 2
              const dx = bcx - acx, dy = bcy - acy
              const t1 = Math.min(
                dx === 0 ? Infinity : aw / 2 / Math.abs(dx),
                dy === 0 ? Infinity : ah / 2 / Math.abs(dy)
              )
              const t2 = Math.min(
                dx === 0 ? Infinity : bw / 2 / Math.abs(dx),
                dy === 0 ? Infinity : bh / 2 / Math.abs(dy)
              )
              const x1 = acx + dx * t1, y1 = acy + dy * t1
              const x2 = bcx - dx * t2, y2 = bcy - dy * t2
              const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
              return (
                <g key={i}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#94a3b8" strokeWidth={1.4}
                    markerEnd="url(#dg-arrow)"
                  />
                  {e.label && (
                    <text x={mx} y={my - 5} textAnchor="middle" className="edge-label">
                      {e.label}
                    </text>
                  )}
                </g>
              )
            })}
            {nodes.map((n) => {
              const w = n.w ?? 158
              const h = n.h ?? 54
              const isSel = selected === n.id
              const isCorrect = mode === 'quiz' && answer && n.id === diagram.quiz!.answer
              const isWrong = mode === 'quiz' && answer === n.id && n.id !== diagram.quiz!.answer
              const orderIdx = order.indexOf(n.id)
              const orderNext = mode === 'order' && !orderDone && diagram.sequence![order.length] === n.id
              return (
                <g
                  key={n.id}
                  className={`node ${isSel ? 'sel' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => clickNode(n.id)}
                >
                  <rect
                    x={n.x} y={n.y} width={w} height={h} rx={9}
                    fill={KIND_FILL[n.kind ?? 'artifact'] ?? KIND_FILL.artifact}
                    stroke={
                      isCorrect ? '#059669'
                      : isWrong ? '#e11d48'
                      : isSel ? '#4f46e5'
                      : orderNext ? '#d97706'
                      : KIND_STROKE[n.kind ?? 'artifact'] ?? KIND_STROKE.artifact
                    }
                    strokeWidth={isSel || orderNext ? 2 : 1.2}
                  />
                  <text x={n.x + w / 2} y={n.y + (n.sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" className="node-label">
                    {n.label}
                  </text>
                  {n.sub && (
                    <text x={n.x + w / 2} y={n.y + h / 2 + 15} textAnchor="middle" className="node-sub">
                      {n.sub}
                    </text>
                  )}
                  {mode === 'order' && orderIdx >= 0 && (
                    <circle cx={n.x + w - 11} cy={n.y + 11} r={9} fill="#059669" />
                  )}
                  {mode === 'order' && orderIdx >= 0 && (
                    <text x={n.x + w - 11} y={n.y + 15} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
                      {orderIdx + 1}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        <div className="diagram-side">
          {sel ? (
            <>
              <h4>{sel.label}</h4>
              {sel.sub && <div className="mono-sm faint" style={{ marginBottom: 8 }}>{sel.sub}</div>}
              <p style={{ margin: 0 }}>{sel.detail ? <Rich text={sel.detail} /> : '—'}</p>
              {sel.exam && (
                <div className="callout exam" style={{ marginTop: 12, fontSize: 12.5 }}>
                  <div className="callout-title">À l'examen</div>
                  <Rich text={sel.exam} />
                </div>
              )}
            </>
          ) : (
            <div>
              <h4 style={{ marginBottom: 6 }}>Comment utiliser ce schéma</h4>
              <p style={{ marginTop: 0 }}>
                {mode === 'explore' && 'Cliquez un élément pour afficher sa définition et le point d’examen associé.'}
                {mode === 'quiz' && 'Lisez la question, puis cliquez l’élément correspondant dans le schéma.'}
                {mode === 'order' && 'Cliquez les éléments dans l’ordre logique. Les étapes validées sont numérotées.'}
              </p>
              {mode === 'order' && (
                <div className="stack-sm" style={{ marginTop: 10 }}>
                  {diagram.sequence!.map((id, i) => (
                    <div key={id} className="row" style={{ gap: 8, fontSize: 12 }}>
                      <span className="mono-sm faint" style={{ width: 18 }}>{i + 1}.</span>
                      <span style={{ color: order[i] ? 'var(--ok)' : 'var(--faint)' }}>
                        {order[i] ? nodeById.get(id)?.label : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
