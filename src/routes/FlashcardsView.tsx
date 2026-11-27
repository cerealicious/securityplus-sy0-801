import { useEffect, useMemo, useState } from 'react'
import { decks, decksFor, objectiveById } from '../lib/content'
import { useProgress } from '../lib/progress'
import { navigate } from '../lib/router'
import { Empty, ProgressBar } from '../components/ui'

const today = () => new Date().toISOString().slice(0, 10)

function Study({ deckId }: { deckId: string }) {
  const { progress, gradeCard } = useProgress()
  const deck = decks.find((d) => d.id === deckId)!
  const o = objectiveById.get(deck.objective)
  const [onlyDue, setOnlyDue] = useState(true)
  const [flipped, setFlipped] = useState(false)
  const [i, setI] = useState(0)
  const [session, setSession] = useState({ again: 0, hard: 0, good: 0 })

  const queue = useMemo(() => {
    const d = today()
    const due = deck.cards.filter((c) => {
      const s = progress.srs[c.id]
      return !s || s.due <= d
    })
    return onlyDue && due.length > 0 ? due : deck.cards
  }, [deck, progress.srs, onlyDue])

  useEffect(() => {
    setI(0)
    setFlipped(false)
    setSession({ again: 0, hard: 0, good: 0 })
  }, [onlyDue, deckId])

  const card = queue[Math.min(i, queue.length - 1)]
  const finished = i >= queue.length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return
      if (e.code === 'Space') {
        e.preventDefault()
        setFlipped((f) => !f)
      }
      if (flipped && ['1', '2', '3'].includes(e.key)) {
        e.preventDefault()
        const g = e.key === '1' ? 'again' : e.key === '2' ? 'hard' : 'good'
        gradeCard(card.id, g)
        setSession((s) => ({ ...s, [g]: s[g] + 1 }))
        setFlipped(false)
        setI((x) => x + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, finished, card, gradeCard])

  if (!card) return <Empty>Aucune carte dans ce deck.</Empty>

  const grade = (g: 'again' | 'hard' | 'good') => {
    gradeCard(card.id, g)
    setSession((s) => ({ ...s, [g]: s[g] + 1 }))
    setFlipped(false)
    setI((x) => x + 1)
  }

  const srs = progress.srs[card.id]

  return (
    <div>
      <div className="spread" style={{ marginBottom: 16 }}>
        <div>
          <div className="eyebrow">Objectif {deck.objective} · {o?.titleFr}</div>
          <h1 className="page-title" style={{ marginTop: 4 }}>{deck.title}</h1>
        </div>
        <div className="row">
          <label className="row small muted" style={{ gap: 7, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onlyDue}
              onChange={(e) => setOnlyDue(e.target.checked)}
            />
            Cartes dues seulement
          </label>
          <button className="btn btn-sm" onClick={() => navigate(`objective/${deck.objective}`)}>
            Plan de l'objectif
          </button>
        </div>
      </div>

      <div className="fc-stats" style={{ justifyContent: 'flex-start', marginBottom: 10 }}>
        <span>Carte {Math.min(i + 1, queue.length)} / {queue.length}</span>
        <span>·</span>
        <span>Boîte {srs?.box ?? 0} / 5</span>
        <span>·</span>
        <span>{srs ? `vue ${srs.seen} fois` : 'nouvelle'}</span>
      </div>
      <ProgressBar value={(i / queue.length) * 100} />

      {!finished ? (
        <>
          <div className="fc-stage">
            <div
              className={`fc-card ${flipped ? 'flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
            >
              {card.tag && (
                <div className="fc-tag">
                  <span className="badge neutral">{card.tag}</span>
                </div>
              )}
              {!flipped ? (
                <>
                  <div className="fc-front-term">{card.front}</div>
                  <div className="fc-front-hint">Cliquez ou appuyez sur Espace pour révéler la réponse</div>
                </>
              ) : (
                <div className="fc-back">
                  {card.en && <div className="fc-back-en">{card.en}</div>}
                  {card.back}
                </div>
              )}
            </div>
          </div>

          {flipped ? (
            <div className="fc-controls">
              <button className="btn btn-danger" onClick={() => grade('again')}>
                À revoir <kbd>1</kbd>
              </button>
              <button className="btn" onClick={() => grade('hard')}>
                Difficile <kbd>2</kbd>
              </button>
              <button className="btn btn-primary" onClick={() => grade('good')}>
                Acquis <kbd>3</kbd>
              </button>
            </div>
          ) : (
            <div className="fc-controls">
              <button className="btn" onClick={() => setFlipped(true)}>
                Révéler la réponse <kbd>Espace</kbd>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="card quiz-result" style={{ marginTop: 20 }}>
          <div className="eyebrow">Session terminée</div>
          <div className="quiz-score" style={{ fontSize: 38 }}>
            {session.good} / {queue.length}
          </div>
          <div className="muted" style={{ marginTop: 4 }}>
            cartes marquées comme acquises
          </div>
          <div className="row" style={{ justifyContent: 'center', marginTop: 16, gap: 18 }}>
            <span className="badge bad">{session.again} à revoir</span>
            <span className="badge warn">{session.hard} difficiles</span>
            <span className="badge ok">{session.good} acquises</span>
          </div>
          <div className="row" style={{ justifyContent: 'center', marginTop: 20 }}>
            <button
              className="btn"
              onClick={() => {
                setI(0)
                setFlipped(false)
                setSession({ again: 0, hard: 0, good: 0 })
              }}
            >
              Recommencer
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`objective/${deck.objective}/quiz`)}>
              Passer au quiz →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function FlashcardsView({ objectiveId }: { objectiveId?: string }) {
  const { progress } = useProgress()
  const d = today()

  if (objectiveId) {
    const ds = decksFor(objectiveId)
    if (!ds.length) {
      return (
        <div className="content-inner">
          <Empty>Ce deck n'est pas encore disponible.</Empty>
          <div style={{ textAlign: 'center' }}>
            <button className="btn" onClick={() => navigate(`objective/${objectiveId}`)}>
              Retour à l'objectif
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className="content-inner">
        <Study deckId={ds[0].id} />
      </div>
    )
  }

  const totalCards = decks.reduce((n, x) => n + x.cards.length, 0)
  const due = decks.reduce(
    (n, x) => n + x.cards.filter((c) => !progress.srs[c.id] || progress.srs[c.id].due <= d).length,
    0
  )

  return (
    <div className="content-inner">
      <div className="eyebrow">Répétition espacée · Leitner 5 boîtes</div>
      <h1 className="page-title" style={{ marginTop: 6 }}>Flashcards</h1>
      <p className="page-sub">
        {totalCards} cartes réparties sur les 27 objectifs officiels. {due} sont dues aujourd'hui.
        Une carte « acquise » revient dans 3, 7, 16 puis 35 jours ; une carte « à revoir » revient
        immédiatement.
      </p>

      <div className="grid grid-2" style={{ marginTop: 22 }}>
        {decks.map((deck) => {
          const o = objectiveById.get(deck.objective)
          const deckDue = deck.cards.filter(
            (c) => !progress.srs[c.id] || progress.srs[c.id].due <= d
          ).length
          const seen = deck.cards.filter((c) => progress.srs[c.id]?.seen).length
          return (
            <div
              key={deck.id}
              className="card hover clickable"
              onClick={() => navigate(`objective/${deck.objective}/flashcards`)}
            >
              <div className="spread">
                <div>
                  <span className="badge info">Objectif {deck.objective}</span>
                  <div style={{ fontSize: 15, fontWeight: 620, marginTop: 8 }}>{deck.title}</div>
                  <div className="faint small" style={{ marginTop: 3 }}>{o?.titleFr}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="stat-value" style={{ fontSize: 22 }}>{deck.cards.length}</div>
                  <div className="faint" style={{ fontSize: 11 }}>cartes</div>
                </div>
              </div>
              <div className="spread small faint" style={{ marginTop: 14, marginBottom: 6 }}>
                <span>{seen} vues · {deckDue} dues</span>
                <span>{Math.round((seen / deck.cards.length) * 100)}%</span>
              </div>
              <ProgressBar value={(seen / deck.cards.length) * 100} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
