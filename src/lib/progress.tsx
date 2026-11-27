import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { decks, domains, objectiveById, objectives } from './content'
import type { Activity, Objective, Progress } from './types'

const today = () => new Date().toISOString().slice(0, 10)

export function emptyProgress(): Progress {
  return {
    schema: 1,
    learner: { createdAt: new Date().toISOString() },
    objectives: {},
    srs: {},
    sessions: [],
    settings: { dailyGoal: 30, lang: 'fr+en' },
    days: [],
    history: [],
  }
}

function ensureObjective(p: Progress, id: string) {
  if (!p.objectives[id]) {
    p.objectives[id] = {
      lessonsDone: [],
      quizBest: 0,
      quizAttempts: 0,
      pbqDone: [],
      scenariosDone: [],
    }
  }
  return p.objectives[id]
}

function clone(p: Progress): Progress {
  return JSON.parse(JSON.stringify(p))
}

interface ProgressApi {
  progress: Progress
  ready: boolean
  completeLesson: (objectiveId: string, lessonId: string, minutes?: number) => void
  recordQuiz: (objectiveId: string, score: number, minutes?: number) => void
  completePbq: (objectiveId: string, pbqId: string, minutes?: number) => void
  completeScenario: (objectiveId: string, scenarioId: string, minutes?: number) => void
  gradeCard: (cardId: string, grade: 'again' | 'hard' | 'good') => void
  setLastLocation: (loc: string) => void
  setDailyGoal: (n: number) => void
  reset: () => void
  importData: (p: Progress) => void
}

const Ctx = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress)
  const [ready, setReady] = useState(false)
  const loaded = useRef(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    let alive = true
    async function load() {
      let data: Progress | null = null
      try {
        const api = (window as any).sp801
        if (api?.loadProgress) data = await api.loadProgress()
      } catch {
        data = null
      }
      if (!data) {
        try {
          const raw = localStorage.getItem('sp801.progress')
          if (raw) data = JSON.parse(raw)
        } catch {
          data = null
        }
      }
      if (!alive) return
      const base = data && data.schema === 1 ? data : emptyProgress()
      const merged: Progress = { ...emptyProgress(), ...base }
      merged.objectives = base.objectives ?? {}
      merged.srs = base.srs ?? {}
      merged.days = Array.isArray(base.days) ? base.days : []
      merged.history = Array.isArray(base.history) ? base.history : []
      if (!merged.days.includes(today())) merged.days.push(today())
      setProgress(merged)
      loaded.current = true
      setReady(true)
    }
    load()
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!loaded.current || !ready) return
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      const api = (window as any).sp801
      if (api?.saveProgress) {
        api.saveProgress(progress)
      }
      try {
        localStorage.setItem('sp801.progress', JSON.stringify(progress))
      } catch {
        /* quota */
      }
    }, 350)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [progress, ready])

  const mutate = useCallback((fn: (p: Progress) => void) => {
    setProgress((prev) => {
      const next = clone(prev)
      fn(next)
      if (!next.days.includes(today())) next.days.push(today())
      return next
    })
  }, [])

  const addMinutes = (p: Progress, minutes?: number) => {
    if (!minutes) return
    const d = today()
    const found = p.sessions.find((s) => s.date === d)
    if (found) found.minutes += minutes
    else p.sessions.push({ date: d, minutes })
  }

  const logActivity = (
    p: Progress,
    kind: Activity['kind'],
    objectiveId: string,
    refId?: string,
    score?: number,
    minutes?: number
  ) => {
    p.history.push({ date: new Date().toISOString(), objectiveId, kind, refId, score, minutes })
    if (p.history.length > 600) p.history = p.history.slice(-600)
  }

  const api: ProgressApi = useMemo(
    () => ({
      progress,
      ready,
      completeLesson: (objectiveId, lessonId, minutes = 12) =>
        mutate((p) => {
          const o = ensureObjective(p, objectiveId)
          if (!o.lessonsDone.includes(lessonId)) {
            o.lessonsDone.push(lessonId)
            addMinutes(p, minutes)
            logActivity(p, 'lesson', objectiveId, lessonId, undefined, minutes)
          }
        }),
      recordQuiz: (objectiveId, score, minutes = 10) =>
        mutate((p) => {
          const o = ensureObjective(p, objectiveId)
          o.quizAttempts += 1
          o.quizBest = Math.max(o.quizBest, Math.round(score))
          addMinutes(p, minutes)
          logActivity(p, 'quiz', objectiveId, undefined, Math.round(score), minutes)
        }),
      completePbq: (objectiveId, pbqId, minutes = 15) =>
        mutate((p) => {
          const o = ensureObjective(p, objectiveId)
          if (!o.pbqDone.includes(pbqId)) {
            o.pbqDone.push(pbqId)
            addMinutes(p, minutes)
            logActivity(p, 'pbq', objectiveId, pbqId, undefined, minutes)
          }
        }),
      completeScenario: (objectiveId, scenarioId, minutes = 12) =>
        mutate((p) => {
          const o = ensureObjective(p, objectiveId)
          if (!o.scenariosDone.includes(scenarioId)) {
            o.scenariosDone.push(scenarioId)
            addMinutes(p, minutes)
            logActivity(p, 'scenario', objectiveId, scenarioId, undefined, minutes)
          }
        }),
      gradeCard: (cardId, grade) =>
        mutate((p) => {
          const card = p.srs[cardId] ?? { box: 1, due: today(), lapses: 0, seen: 0 }
          card.seen += 1
          if (grade === 'again') {
            card.box = 1
            card.lapses += 1
            card.due = today()
          } else if (grade === 'hard') {
            card.box = Math.max(1, card.box)
            const d = new Date()
            d.setDate(d.getDate() + 1)
            card.due = d.toISOString().slice(0, 10)
          } else {
            card.box = Math.min(5, card.box + 1)
            const days = [0, 1, 3, 7, 16, 35][card.box] ?? 35
            const d = new Date()
            d.setDate(d.getDate() + days)
            card.due = d.toISOString().slice(0, 10)
          }
          p.srs[cardId] = card
          const deck = decks.find((d) => d.cards.some((c) => c.id === cardId))
          logActivity(
            p,
            'card',
            deck?.objective ?? '',
            cardId,
            grade === 'again' ? 0 : grade === 'hard' ? 50 : 100
          )
        }),
      setLastLocation: (loc) =>
        mutate((p) => {
          p.lastLocation = loc
        }),
      setDailyGoal: (n) =>
        mutate((p) => {
          p.settings.dailyGoal = n
        }),
      reset: () => setProgress(emptyProgress()),
      importData: (data) => {
        const merged = { ...emptyProgress(), ...data }
        merged.objectives = data.objectives ?? {}
        merged.srs = data.srs ?? {}
        merged.history = Array.isArray(data.history) ? data.history : []
        setProgress(merged)
      },
    }),
    [progress, ready, mutate]
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useProgress(): ProgressApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProgress outside provider')
  return ctx
}

export function objectivePercent(o: Objective, p: Progress): number {
  if (o.status !== 'complete') return 0
  const op = p.objectives[o.id]
  const parts: { w: number; v: number }[] = []
  const totalLessons = o.lessonIds?.length ?? 0
  if (totalLessons) {
    const done = op ? op.lessonsDone.filter((id) => o.lessonIds?.includes(id)).length : 0
    parts.push({ w: 40, v: done / totalLessons })
  }
  if (o.quizId) parts.push({ w: 30, v: (op?.quizBest ?? 0) / 100 })
  const totalPbq = o.pbqIds?.length ?? 0
  if (totalPbq) {
    const done = op ? op.pbqDone.filter((id) => o.pbqIds?.includes(id)).length : 0
    parts.push({ w: 20, v: done / totalPbq })
  }
  const totalSc = o.scenarioIds?.length ?? 0
  if (totalSc) {
    const done = op ? op.scenariosDone.filter((id) => o.scenarioIds?.includes(id)).length : 0
    parts.push({ w: 10, v: done / totalSc })
  }
  if (!parts.length) return 0
  const totalW = parts.reduce((n, x) => n + x.w, 0)
  return Math.round((parts.reduce((n, x) => n + x.w * x.v, 0) / totalW) * 100)
}

export function domainPercent(domainId: number, p: Progress): number {
  const d = domains.find((x) => x.id === domainId)
  if (!d) return 0
  const objs = d.objectives.map((id) => objectiveById.get(id)).filter(Boolean) as Objective[]
  const total = objs.reduce((n, o) => n + o.itemCount, 0)
  if (!total) return 0
  return Math.round(
    objs.reduce((n, o) => n + objectivePercent(o, p) * o.itemCount, 0) / total
  )
}

export function readiness(p: Progress): number {
  return Math.round(
    domains.reduce((n, d) => n + domainPercent(d.id, p) * d.weight, 0) / 100
  )
}

export function cardsDue(p: Progress, cardIds: string[]): number {
  const d = today()
  return cardIds.filter((id) => {
    const c = p.srs[id]
    return !c || c.due <= d
  }).length
}

export function totalDue(p: Progress): number {
  const d = today()
  let count = 0
  for (const deck of decks) {
    for (const card of deck.cards) {
      const s = p.srs[card.id]
      if (!s || s.due <= d) count += 1
    }
  }
  return count
}

export function streak(p: Progress): number {
  if (!p.days.length) return 0
  const set = new Set(p.days)
  let n = 0
  const d = new Date()
  for (;;) {
    const key = d.toISOString().slice(0, 10)
    if (set.has(key)) {
      n += 1
      d.setDate(d.getDate() - 1)
    } else break
  }
  return n
}
