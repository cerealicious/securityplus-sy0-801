import { useState } from 'react'
import { diagramById, simulationById } from '../lib/content'
import type { Block } from '../lib/types'
import DiagramView from './DiagramView'
import SimulationView from './SimulationView'
import { Rich } from '../components/ui'
import { playSuccess } from '../lib/sound'

const BOOK_NAMES: Record<string, string> = {
  DSH: 'Defensive Security Handbook',
  STRAT: '11 Strategies of a World-Class SOC',
  SOCN: 'SOC Analyst Notes',
  NET: 'Networking Fundamentals for SOC Analyst',
  OBJ: 'CompTIA Security+ SY0-801 — Official Objectives',
}

function CheckBlock({ block }: { block: Block }) {
  const [picked, setPicked] = useState<number | null>(null)
  const done = picked !== null
  const correct = picked === block.answer
  return (
    <div className="check-block">
      <div className="eyebrow" style={{ marginBottom: 6 }}>Quick check</div>
      <div className="check-q">{block.q}</div>
      {(block.options as string[]).map((opt, i) => {
        let cls = 'check-opt'
        if (done) {
          if (i === block.answer) cls += ' correct'
          else if (i === picked) cls += ' wrong'
        }
        return (
          <button
            key={i}
            className={cls}
            onClick={() => {
              if (done) return
              if (i === block.answer) playSuccess()
              setPicked(i)
            }}
            disabled={done}
          >
            <span className="mono-sm" style={{ opacity: 0.6 }}>{String.fromCharCode(65 + i)}</span>
            <span><Rich text={opt} /></span>
          </button>
        )
      })}
      {done && (
        <div className={`check-explain ${correct ? 'bravo' : ''}`}>
          <strong className={correct ? 'bravo-word' : ''} style={{ color: correct ? 'var(--ok)' : 'var(--bad)' }}>
            {correct ? 'Well done! ' : 'Not quite. '}
          </strong>
          <Rich text={block.explain} />
        </div>
      )}
    </div>
  )
}

function SourceBlock({ block }: { block: Block }) {
  const book = BOOK_NAMES[block.book] ?? block.book
  return (
    <div className="source-ref">
      <span className="src-book">{block.book}</span>
      <div>
        <div>
          <em>{book}</em>
          {block.chapter ? `, ch. ${block.chapter}` : ''} — <span className="src-page">p. {block.page}</span>
          {block.printed ? <span className="faint"> (printed {block.printed})</span> : null}
        </div>
        <div style={{ marginTop: 2 }}>
          {block.strength === 'primary' ? 'Primary source' : 'Supporting source'}
          {block.note ? ` · ${block.note}` : ''}
        </div>
      </div>
    </div>
  )
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'lead':
      return <p className="lead"><Rich text={block.text} /></p>
    case 'p':
      return <p><Rich text={block.text} /></p>
    case 'h':
      return <h3>{block.text}</h3>
    case 'list':
      return block.ordered ? (
        <ol>{block.items.map((it: string, i: number) => <li key={i}><Rich text={it} /></li>)}</ol>
      ) : (
        <ul>{block.items.map((it: string, i: number) => <li key={i}><Rich text={it} /></li>)}</ul>
      )
    case 'term':
      return (
        <div className="term-box">
          <div className="spread" style={{ alignItems: 'flex-start' }}>
            <div>
              <div className="term-en">{block.en}</div>
              <div className="term-fr">{block.fr}</div>
            </div>
            {block.gap && <span className="badge gap">Outside books</span>}
          </div>
          {block.field && (
            <div className="term-note">
              <strong style={{ color: 'var(--muted)' }}>In the field:</strong> {block.field}
            </div>
          )}
        </div>
      )
    case 'callout':
      return (
        <div className={`callout ${block.kind ?? 'tip'}`}>
          <div className="callout-title">
            {block.title ??
              (block.kind === 'exam'
                ? 'On the exam'
                : block.kind === 'warning'
                ? 'Warning'
                : block.kind === 'gap'
                ? 'Topic not covered in your books'
                : 'Key takeaway')}
          </div>
          <Rich text={block.text} />
        </div>
      )
    case 'compare':
      return (
        <div className="compare">
          <div className="left">
            <h4>{block.left.title}</h4>
            <ul>
              {block.left.points.map((p: string, i: number) => <li key={i}><Rich text={p} /></li>)}
            </ul>
          </div>
          <div>
            <h4>{block.right.title}</h4>
            <ul>
              {block.right.points.map((p: string, i: number) => <li key={i}><Rich text={p} /></li>)}
            </ul>
          </div>
        </div>
      )
    case 'table':
      return (
        <table className="tbl">
          <thead>
            <tr>{block.head.map((h: string, i: number) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((r: string[], i: number) => (
              <tr key={i}>{r.map((c, j) => <td key={j}><Rich text={c} /></td>)}</tr>
            ))}
          </tbody>
        </table>
      )
    case 'steps':
      return (
        <div className="stack-sm" style={{ margin: '18px 0' }}>
          {block.items.map((s: { title: string; text: string }, i: number) => (
            <div key={i} className="card" style={{ padding: '13px 15px' }}>
              <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
                <span
                  className="mono-sm"
                  style={{
                    background: 'var(--elev)', borderRadius: 6, padding: '2px 7px',
                    color: 'var(--accent)', flex: 'none', marginTop: 1,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.title}</div>
                  <div className="muted small" style={{ marginTop: 3 }}><Rich text={s.text} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    case 'diagram': {
      const d = diagramById.get(block.diagramId)
      if (!d) return <div className="callout warning">Diagram not found: {block.diagramId}</div>
      return <DiagramView diagram={d} />
    }
    case 'simulation': {
      const sim = simulationById.get(block.simId)
      if (!sim) return <div className="callout warning">Simulation not found: {block.simId}</div>
      return <SimulationView sim={sim} />
    }
    case 'source':
      return <SourceBlock block={block} />
    case 'check':
      return <CheckBlock block={block} />
    case 'summary':
      return (
        <div className="summary-box">
          <h4>Key takeaways</h4>
          <ul>
            {block.items.map((it: string, i: number) => <li key={i}><Rich text={it} /></li>)}
          </ul>
        </div>
      )
    case 'code':
      return (
        <pre
          className="mono"
          style={{
            background: '#f4f1ea',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '13px 15px',
            fontSize: 12.5,
            overflowX: 'auto',
            color: '#4338ca',
            margin: '16px 0',
          }}
        >
          {block.text}
        </pre>
      )
    default:
      return null
  }
}

export default function LessonRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="lesson-body">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  )
}
