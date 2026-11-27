import { useMemo, useState } from 'react'
import type { Block } from '../lib/types'
import { BlockView, default as LessonRenderer } from './LessonRenderer'

const INTERACTIVE = new Set(['simulation', 'diagram', 'check'])

function groupBlocks(blocks: Block[]): { blocks: Block[]; title: string }[] {
  const out: { blocks: Block[]; title: string }[] = []
  let cur: Block[] = []
  const flush = () => {
    if (!cur.length) return
    const head = cur.find((b) => b.type === 'h')
    out.push({ blocks: cur, title: head ? String(head.text).slice(0, 42) : `Étape ${out.length + 1}` })
    cur = []
  }
  for (const b of blocks) {
    if (INTERACTIVE.has(b.type)) {
      flush()
      const head = cur.find((x) => x.type === 'h')
      out.push({ blocks: [b], title: b.type === 'simulation' ? 'Simulation' : b.type === 'diagram' ? 'Schéma interactif' : 'Vérification' })
      void head
    } else {
      if (b.type === 'h' && cur.length >= 3) flush()
      cur.push(b)
    }
  }
  flush()
  return out.length ? out : [{ blocks, title: 'Leçon' }]
}

export default function StepLesson({
  blocks,
  completed,
  onComplete,
}: {
  blocks: Block[]
  completed: boolean
  onComplete: () => void
}) {
  const steps = useMemo(() => groupBlocks(blocks), [blocks])
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState<'steps' | 'all'>('steps')
  const step = steps[index]
  const last = index === steps.length - 1

  return (
    <div className="stepplayer">
      <div className="stepplayer-bar">
        <div className="stepplayer-dots">
          {steps.map((s, i) => (
            <button
              key={i}
              className={`step-dot ${i === index ? 'current' : ''} ${i < index ? 'done' : ''}`}
              title={s.title}
              onClick={() => setIndex(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="stepplayer-info">
          <span className="mono-sm">Étape {index + 1} / {steps.length}</span>
          <span className="faint small">{step.title}</span>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={() => setMode(mode === 'steps' ? 'all' : 'steps')}>
          {mode === 'steps' ? 'Lecture continue' : 'Mode étapes'}
        </button>
      </div>

      {mode === 'all' ? (
        <LessonRenderer blocks={blocks} />
      ) : (
        <>
          <div className="lesson-body step-body" key={index}>
            {step.blocks.map((b, i) => <BlockView key={i} block={b} />)}
          </div>
          <div className="stepplayer-nav">
            <button className="btn" disabled={index === 0} onClick={() => setIndex((n) => n - 1)}>
              ← Étape précédente
            </button>
            {last ? (
              <button
                className="btn btn-primary"
                disabled={completed}
                onClick={() => { onComplete(); setIndex(0) }}
              >
                {completed ? 'Leçon terminée ✓' : 'Terminer la leçon ✓'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setIndex((n) => n + 1)}>
                Étape suivante →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
