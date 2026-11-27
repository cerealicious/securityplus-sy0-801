import { objectiveById } from './content'
import type { Activity, Progress } from './types'

export interface Badge {
  id: string
  label: string
  icon: string
  earned: boolean
  detail: string
}

export interface GameStats {
  xp: number
  level: number
  xpInLevel: number
  xpForNext: number
  streak: number
  todayXp: number
  dailyGoal: number
  goalPercent: number
  badges: Badge[]
  lessonsDone: number
  activitiesDone: number
  perfectQuizzes: number
  cardsReviewed: number
}

/** Plafond quotidien pour le XP gagné avec les cartes. */
const CARD_DAILY_CAP = 40

/** XP gagné pour une activité, sans tenir compte du plafond quotidien des cartes. */
export function xpForActivity(kind: Activity['kind'], score?: number): number {
  switch (kind) {
    case 'lesson':
      return 20
    case 'quiz': {
      const s = typeof score === 'number' && Number.isFinite(score) ? score : 0
      return s >= 90 ? 40 : Math.max(2, Math.round(s / 4))
    }
    case 'pbq':
      return 25
    case 'scenario':
      return 30
    case 'card':
      return 3
    default:
      return 0
  }
}

function computeStreak(p: Progress): number {
  if (!p.days.length) return 0
  const days = new Set(p.days)
  const d = new Date()
  // Tolérance : si aujourd'hui n'est pas présent, on s'arrête à hier.
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  let n = 0
  for (;;) {
    if (!days.has(d.toISOString().slice(0, 10))) break
    n += 1
    d.setDate(d.getDate() - 1)
  }
  return n
}

function plural(n: number, singular: string, pluralForm = `${singular}s`): string {
  return `${n} ${n > 1 ? pluralForm : singular}`
}

export function computeStats(p: Progress): GameStats {
  const today = new Date().toISOString().slice(0, 10)
  const cardXpByDay = new Map<string, number>()

  let xp = 0
  let todayXp = 0
  let lessonsDone = 0
  let perfectQuizzes = 0
  let cardsReviewed = 0
  const domainsSeen = new Set<number>()

  const history = Array.isArray(p.history) ? p.history : []
  for (const a of history) {
    const day = typeof a.date === 'string' ? a.date.slice(0, 10) : ''
    let gain = xpForActivity(a.kind, a.score)

    if (a.kind === 'card') {
      const used = cardXpByDay.get(day) ?? 0
      gain = Math.max(0, Math.min(gain, CARD_DAILY_CAP - used))
      cardXpByDay.set(day, used + gain)
      cardsReviewed += 1
    }

    if (a.kind === 'lesson') lessonsDone += 1
    if (a.kind === 'quiz' && (a.score ?? 0) >= 90) perfectQuizzes += 1

    if (a.objectiveId) {
      const objective = objectiveById.get(a.objectiveId)
      if (objective) domainsSeen.add(objective.domain)
    }

    xp += gain
    if (day === today) todayXp += gain
  }

  const level = Math.floor(xp / 100) + 1
  const streak = computeStreak(p)
  const dailyGoal = p.settings?.dailyGoal ?? 0

  const sessions = Array.isArray(p.sessions) ? p.sessions : []
  const minutesToday = sessions
    .filter((s) => typeof s.date === 'string' && s.date.slice(0, 10) === today)
    .reduce((n, s) => n + (Number.isFinite(s.minutes) ? s.minutes : 0), 0)
  const goalPercent =
    dailyGoal > 0 ? Math.min(100, Math.round((minutesToday / dailyGoal) * 100)) : 0

  const badges: Badge[] = [
    {
      id: 'first-lesson',
      label: 'Premier pas',
      icon: '🛡️',
      earned: lessonsDone >= 1,
      detail: `${plural(lessonsDone, 'leçon')} terminée${lessonsDone > 1 ? 's' : ''}`,
    },
    {
      id: 'ten-lessons',
      label: 'Explorateur',
      icon: '🧭',
      earned: lessonsDone >= 10,
      detail: `${plural(lessonsDone, 'leçon')} terminée${lessonsDone > 1 ? 's' : ''} sur 10`,
    },
    {
      id: 'quiz-ace',
      label: 'Tir à l’arc',
      icon: '🎯',
      earned: perfectQuizzes >= 1,
      detail: `${plural(perfectQuizzes, 'quiz parfait', 'quizzes parfaits')} (90 % et plus)`,
    },
    {
      id: 'cards-100',
      label: 'Mémoire d’éléphant',
      icon: '🧠',
      earned: cardsReviewed >= 100,
      detail: `${plural(cardsReviewed, 'carte')} révisée${cardsReviewed > 1 ? 's' : ''} sur 100`,
    },
    {
      id: 'streak-7',
      label: 'Série de feu',
      icon: '🔥',
      earned: streak >= 7,
      detail: `${plural(streak, 'jour')} d’affilée sur 7`,
    },
    {
      id: 'xp-500',
      label: 'Vétéran',
      icon: '⭐',
      earned: xp >= 500,
      detail: `${xp} XP sur 500`,
    },
    {
      id: 'all-domains',
      label: 'Tout terrain',
      icon: '🌐',
      earned: [1, 2, 3, 4, 5].every((d) => domainsSeen.has(d)),
      detail: `${domainsSeen.size}/5 domaines explorés`,
    },
    {
      id: 'level-5',
      label: 'Commandant',
      icon: '🏅',
      earned: level >= 5,
      detail: `Niveau ${level} sur 5`,
    },
  ]

  return {
    xp,
    level,
    xpInLevel: xp % 100,
    xpForNext: 100,
    streak,
    todayXp,
    dailyGoal,
    goalPercent,
    badges,
    lessonsDone,
    activitiesDone: history.length,
    perfectQuizzes,
    cardsReviewed,
  }
}

export function levelTitle(level: number): string {
  const titles = ['Novice', 'Initié', 'Praticien', 'Analyste', 'Vétéran', 'Expert']
  if (level < 1) return titles[0]
  if (level >= 7) return 'Maître'
  return titles[level - 1] ?? 'Maître'
}

export function formatXp(n: number): string {
  return String(Math.round(Number.isFinite(n) ? n : 0)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' '
  )
}
