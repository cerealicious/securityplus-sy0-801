import { useState } from 'react'
import type { Simulation } from '../lib/types'
import { Rich } from '../components/ui'

function Check({ sim }: { sim: Simulation }) {
  const [picked, setPicked] = useState<number | null>(null)
  const correct = picked === sim.check.answer
  return (
    <div className="sim-check">
      <div className="eyebrow">Vérifier la compréhension</div>
      <div className="sim-check-q">{sim.check.q}</div>
      <div className="sim-check-options">
        {sim.check.options.map((opt, i) => {
          let cls = 'sim-check-opt'
          if (picked !== null) {
            if (i === sim.check.answer) cls += ' correct'
            else if (i === picked) cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => picked === null && setPicked(i)} disabled={picked !== null}>
              <span className="sim-check-letter">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className={`sim-check-feedback ${correct ? 'ok' : 'bad'}`}>
          <strong>{correct ? 'Exact. ' : 'Pas tout à fait. '}</strong>
          <Rich text={sim.check.explain} />
        </div>
      )}
    </div>
  )
}

export default function SimulationView({ sim }: { sim: Simulation }) {
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(1)
  const [layer, setLayer] = useState<number | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <div className="sim-wrap">
      <div className="sim-head">
        <div>
          <div className="eyebrow">Simulation interactive</div>
          <div className="sim-title">{sim.title}</div>
          <div className="sim-intro">{sim.intro}</div>
        </div>
        {sim.kind === 'flow' && (
          <span className="badge info">{Math.min(step + 1, sim.steps?.length ?? 0)} / {sim.steps?.length ?? 0}</span>
        )}
      </div>

      {sim.kind === 'flow' && (
        <div className="sim-flow">
          <div className="sim-rail">
            {(sim.steps ?? []).map((s, i) => (
              <button
                key={s.id}
                className={`sim-node ${i === step ? 'current' : ''} ${i < step ? 'past' : ''}`}
                onClick={() => setStep(i)}
              >
                <span className="sim-node-num">{i + 1}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <div className="sim-detail" key={step}>
            <div className="sim-detail-label">Étape {step + 1}</div>
            <h4>{(sim.steps ?? [])[step]?.label}</h4>
            <p><Rich text={(sim.steps ?? [])[step]?.detail ?? ''} /></p>
            {(sim.steps ?? [])[step]?.callout && (
              <div className="sim-callout">À l'examen — {(sim.steps ?? [])[step]?.callout}</div>
            )}
            <div className="sim-controls">
              <button className="btn btn-sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>← Précédent</button>
              <button
                className="btn btn-sm btn-primary"
                disabled={step >= (sim.steps?.length ?? 1) - 1}
                onClick={() => setStep((s) => s + 1)}
              >
                Étape suivante →
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => setStep(0)}>Rejouer</button>
            </div>
          </div>
        </div>
      )}

      {sim.kind === 'compare' && (
        <div className="sim-compare">
          <div className="sim-col">
            <div className="sim-col-title">{sim.left?.title}</div>
            {(sim.left?.points ?? []).map((p, i) => (
              <div key={i} className={`sim-reveal ${i < revealed ? 'shown' : ''}`}><Rich text={p} /></div>
            ))}
          </div>
          <div className="sim-col">
            <div className="sim-col-title alt">{sim.right?.title}</div>
            {(sim.right?.points ?? []).map((p, i) => (
              <div key={i} className={`sim-reveal ${i < revealed ? 'shown' : ''}`}><Rich text={p} /></div>
            ))}
          </div>
          <div className="sim-controls wide">
            <button
              className="btn btn-sm btn-primary"
              disabled={revealed >= Math.max(sim.left?.points?.length ?? 0, sim.right?.points?.length ?? 0)}
              onClick={() => setRevealed((n) => n + 1)}
            >
              Révéler la suite →
            </button>
            <button className="btn btn-sm btn-ghost" onClick={() => setRevealed(1)}>Recommencer</button>
          </div>
        </div>
      )}

      {sim.kind === 'layers' && (
        <div className="sim-layers">
          <div className="sim-layer-stack">
            {(sim.layers ?? []).map((l) => (
              <button
                key={l.n}
                className={`sim-layer ${layer === l.n ? 'active' : ''}`}
                onClick={() => setLayer(l.n)}
              >
                <span className="sim-layer-num">{l.n}</span>
                <span className="sim-layer-name">{l.name}</span>
                <span className="sim-layer-prot">{l.protocols}</span>
              </button>
            ))}
          </div>
          <div className="sim-detail">
            {layer === null ? (
              <p>Cliquez une couche pour afficher son rôle, ses protocoles et une attaque typique.</p>
            ) : (
              <div key={layer}>
                <div className="sim-detail-label">Couche {layer}</div>
                <h4>{(sim.layers ?? []).find((l) => l.n === layer)?.name}</h4>
                <p>{(sim.layers ?? []).find((l) => l.n === layer)?.detail}</p>
                {(sim.layers ?? []).find((l) => l.n === layer)?.attack && (
                  <div className="sim-callout">Attaque typique — {(sim.layers ?? []).find((l) => l.n === layer)?.attack}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {sim.kind === 'identify' && (
        <div className="sim-identify">
          <div className="sim-items">
            {(sim.items ?? []).map((it) => {
              let cls = 'sim-item'
              if (picked === it.id) cls += it.isTarget ? ' correct' : ' wrong'
              else if (picked && it.isTarget) cls += ' correct'
              return (
                <button key={it.id} className={cls} onClick={() => picked === null && setPicked(it.id)} disabled={picked !== null}>
                  <span>{it.label}</span>
                  <small>{it.detail}</small>
                </button>
              )
            })}
          </div>
          {picked && (
            <div className={`sim-check-feedback ${(sim.items ?? []).find((i) => i.id === picked)?.isTarget ? 'ok' : 'bad'}`}>
              <strong>{(sim.items ?? []).find((i) => i.id === picked)?.isTarget ? 'Bonne identification. ' : 'Ce n\'est pas le bon composant. '}</strong>
              {(sim.items ?? []).filter((i) => i.isTarget).map((i) => i.detail).join(' ')}
            </div>
          )}
        </div>
      )}

      <Check sim={sim} />
    </div>
  )
}
