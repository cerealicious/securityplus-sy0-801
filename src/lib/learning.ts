import { decks, domains, lessonsFor, objectiveById, objectives, pbqsFor, scenariosFor } from './content'
import { objectivePercent } from './progress'
import type { Objective, Progress } from './types'

export interface Suggestion {
  kind: 'lesson' | 'quiz' | 'pbq' | 'scenario' | 'flashcards' | 'review'
  objectiveId: string
  refId?: string
  title: string
  reason: string
  path: string
  color: string
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10)

export function totalMinutes(p: Progress): number {
  return p.sessions.reduce((n, s) => n + s.minutes, 0)
}

export function weeklyMinutes(p: Progress): { day: string; minutes: number; label: string }[] {
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const out: { day: string; minutes: number; label: string }[] = []
  const now = new Date()
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const key = dayKey(d)
    out.push({
      day: key,
      minutes: p.sessions.find((s) => s.date === key)?.minutes ?? 0,
      label: labels[d.getDay() === 0 ? 6 : d.getDay() - 1],
    })
  }
  return out
}

export function recentResults(p: Progress, limit = 5) {
  return [...p.history]
    .filter((a) => typeof a.score === 'number')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map((a) => ({
      ...a,
      title: objectiveById.get(a.objectiveId)?.titleFr ?? a.objectiveId,
    }))
}

export function masteredObjectives(p: Progress): Objective[] {
  return objectives.filter((o) => objectivePercent(o, p) >= 85)
}

export function weakObjectives(p: Progress): { objective: Objective; reason: string }[] {
  const out: { objective: Objective; reason: string }[] = []
  for (const o of objectives) {
    if (o.status !== 'complete') continue
    const op = p.objectives[o.id]
    if (op?.quizAttempts && op.quizBest < 70) {
      out.push({ objective: o, reason: `Quiz at ${op.quizBest}% — needs review` })
      continue
    }
    const cardIds = new Set(decks.filter((d) => d.objective === o.id).flatMap((d) => d.cards.map((c) => c.id)))
    const lapses = [...cardIds].reduce((n, id) => n + (p.srs[id]?.lapses ?? 0), 0)
    if (lapses >= 3) out.push({ objective: o, reason: `${lapses} cards to review` })
  }
  return out.slice(0, 5)
}

export function domainColor(objectiveId: string): string {
  const o = objectiveById.get(objectiveId)
  return domains.find((d) => d.id === o?.domain)?.color ?? '#22d3ee'
}

export function nextLessonFor(o: Objective, p: Progress) {
  const done = p.objectives[o.id]?.lessonsDone ?? []
  return lessonsFor(o.id).find((l) => !done.includes(l.id)) ?? lessonsFor(o.id)[0]
}

/** Déblocage progressif : le premier objectif d'un domaine est ouvert,
 *  les suivants s'ouvrent quand l'objectif précédent atteint 35 %. */
export function isUnlocked(o: Objective, p: Progress): boolean {
  const list = domains.find((d) => d.id === o.domain)?.objectives ?? []
  const idx = list.indexOf(o.id)
  if (idx <= 0) return true
  const prev = objectiveById.get(list[idx - 1])
  if (!prev) return true
  return objectivePercent(prev, p) >= 35
}

export function unlockHint(o: Objective, p: Progress): string {
  const list = domains.find((d) => d.id === o.domain)?.objectives ?? []
  const idx = list.indexOf(o.id)
  const prev = objectiveById.get(list[idx - 1])
  return prev ? `Complete ${prev.id} to 35% to unlock this objective.` : ''
}

export function resumeActivity(p: Progress): Suggestion | null {
  const loc = p.lastLocation
  if (loc && loc.startsWith('objective/')) {
    const parts = loc.split('/')
    const o = objectiveById.get(parts[1])
    if (o) {
      if (parts[2] === 'lesson' && parts[3]) {
        const l = lessonsFor(o.id).find((x) => x.id === parts[3])
        if (l) return {
          kind: 'lesson', objectiveId: o.id, refId: l.id, title: l.title,
          reason: `Resume objective ${o.id}`, path: loc, color: domainColor(o.id),
        }
      }
      if (parts[2] === 'quiz') return {
        kind: 'quiz', objectiveId: o.id, title: `Quiz — Objective ${o.id}`,
        reason: 'Resume assessment', path: loc, color: domainColor(o.id),
      }
      return {
        kind: 'lesson', objectiveId: o.id, title: o.titleFr,
        reason: `Resume objective ${o.id}`, path: `objective/${o.id}`, color: domainColor(o.id),
      }
    }
  }
  const started = objectives.find((o) => o.status === 'complete' && (p.objectives[o.id]?.lessonsDone?.length ?? 0) > 0 && objectivePercent(o, p) < 100)
  if (started) {
    const l = nextLessonFor(started, p)
    return l ? {
      kind: 'lesson', objectiveId: started.id, refId: l.id, title: l.title,
      reason: `Continue objective ${started.id}`, path: `objective/${started.id}/lesson/${l.id}`, color: domainColor(started.id),
    } : null
  }
  const first = objectives.find((o) => o.status === 'complete')
  return first ? {
    kind: 'lesson', objectiveId: first.id, title: first.titleFr,
    reason: 'Start the learning path', path: `objective/${first.id}`, color: domainColor(first.id),
  } : null
}

export function nextActivities(p: Progress, limit = 5): Suggestion[] {
  const out: Suggestion[] = []
  const weak = weakObjectives(p)
  for (const w of weak) {
    out.push({
      kind: 'review', objectiveId: w.objective.id, title: `Review ${w.objective.id}`,
      reason: w.reason, path: `objective/${w.objective.id}`, color: domainColor(w.objective.id),
    })
    if (out.length >= limit) return out.slice(0, limit)
  }
  const started = objectives.filter((o) => o.status === 'complete' && (p.objectives[o.id]?.lessonsDone?.length ?? 0) > 0 && objectivePercent(o, p) < 100)
  for (const o of started) {
    const l = nextLessonFor(o, p)
    if (l) out.push({
      kind: 'lesson', objectiveId: o.id, refId: l.id, title: l.title,
      reason: `Objective ${o.id} · next lesson`, path: `objective/${o.id}/lesson/${l.id}`, color: domainColor(o.id),
    })
    if (out.length >= limit) return out.slice(0, limit)
  }
  const due = decks.reduce((n, d) => n + d.cards.filter((c) => {
    const s = p.srs[c.id]
    return !s || s.due <= dayKey(new Date())
  }).length, 0)
  if (due > 0) out.push({
    kind: 'flashcards', objectiveId: '', title: `${due} cards to review`,
    reason: 'Spaced repetition', path: 'flashcards', color: '#22d3ee',
  })
  for (const o of objectives) {
    if (o.status !== 'complete' || objectivePercent(o, p) >= 100) continue
    const op = p.objectives[o.id]
    const done = op?.lessonsDone ?? []
    if (done.length >= (o.lessonIds?.length ?? 0) && (op?.quizBest ?? 0) < 80) {
      out.push({
        kind: 'quiz', objectiveId: o.id, title: `Quiz — ${o.id}`,
        reason: 'Check your knowledge', path: `objective/${o.id}/quiz`, color: domainColor(o.id),
      })
    }
    const pbq = pbqsFor(o.id).find((x) => !(op?.pbqDone ?? []).includes(x.id))
    if (pbq) out.push({
      kind: 'pbq', objectiveId: o.id, refId: pbq.id, title: pbq.title,
      reason: `Hands-on lab · ${o.id}`, path: `objective/${o.id}/lab/${pbq.id}`, color: domainColor(o.id),
    })
    const sc = scenariosFor(o.id).find((x) => !(op?.scenariosDone ?? []).includes(x.id))
    if (sc) out.push({
      kind: 'scenario', objectiveId: o.id, refId: sc.id, title: sc.title,
      reason: `Scenario · ${o.id}`, path: `objective/${o.id}/scenario/${sc.id}`, color: domainColor(o.id),
    })
    if (out.length >= limit) break
  }
  return out.slice(0, limit)
}
