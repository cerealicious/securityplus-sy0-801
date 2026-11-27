import objectivesData from '../content/objectives.json'
import domainsData from '../content/domains.json'
import type {
  Deck,
  Diagram,
  Domain,
  Lesson,
  Objective,
  Pbq,
  Quiz,
  Scenario,
  Simulation,
} from './types'

function loadAll<T>(modules: Record<string, unknown>): T[] {
  const out: T[] = []
  for (const k of Object.keys(modules).sort()) {
    const mod = modules[k] as { default?: T | T[] } | T | T[]
    const value = (mod as { default?: T | T[] }).default ?? (mod as T | T[])
    if (Array.isArray(value)) out.push(...(value as T[]))
    else out.push(value as T)
  }
  return out
}

const lessonModules = import.meta.glob('../content/lessons/*.json', { eager: true })
const deckModules = import.meta.glob('../content/flashcards/*.json', { eager: true })
const quizModules = import.meta.glob('../content/quizzes/*.json', { eager: true })
const pbqModules = import.meta.glob('../content/pbqs/*.json', { eager: true })
const scenarioModules = import.meta.glob('../content/scenarios/*.json', { eager: true })
const diagramModules = import.meta.glob('../content/diagrams.json', { eager: true })
const diagramExtraModules = import.meta.glob('../content/diagrams-extra/*.json', { eager: true })
const simulationModules = import.meta.glob('../content/simulations.json', { eager: true })

export const objectives = objectivesData as unknown as Objective[]
export const domains = domainsData as unknown as Domain[]
export const lessons = loadAll<Lesson>(lessonModules)
export const decks = loadAll<Deck>(deckModules)
export const quizzes = loadAll<Quiz>(quizModules)
export const pbqs = loadAll<Pbq>(pbqModules)
export const scenarios = loadAll<Scenario>(scenarioModules)

const diagramsRaw = loadAll<{ diagrams: Diagram[] }>({ ...diagramModules, ...diagramExtraModules })
export const diagrams: Diagram[] = diagramsRaw.flatMap((d) => d.diagrams ?? [])
const simulationsRaw = loadAll<{ simulations: Simulation[] }>(simulationModules)
export const simulations: Simulation[] = simulationsRaw.flatMap((s) => s.simulations ?? [])

export const objectiveById = new Map(objectives.map((o) => [o.id, o]))
export const domainById = new Map(domains.map((d) => [d.id, d]))
export const lessonById = new Map(lessons.map((l) => [l.id, l]))
export const deckById = new Map(decks.map((d) => [d.id, d]))
export const quizById = new Map(quizzes.map((q) => [q.id, q]))
export const pbqById = new Map(pbqs.map((p) => [p.id, p]))
export const scenarioById = new Map(scenarios.map((s) => [s.id, s]))
export const diagramById = new Map(diagrams.map((d) => [d.id, d]))
export const simulationById = new Map(simulations.map((s) => [s.id, s]))

export function lessonsFor(objectiveId: string): Lesson[] {
  return lessons.filter((l) => l.objective === objectiveId).sort((a, b) => a.order - b.order)
}

export function pbqsFor(objectiveId: string): Pbq[] {
  return pbqs.filter((p) => p.objective === objectiveId)
}

export function scenariosFor(objectiveId: string): Scenario[] {
  return scenarios.filter((s) => s.objective === objectiveId)
}

export function decksFor(objectiveId: string): Deck[] {
  return decks.filter((d) => d.objective === objectiveId)
}

export const coverageLabel: Record<string, { label: string; tone: string }> = {
  solid: { label: 'Couverture solide', tone: 'ok' },
  partial: { label: 'Couverture partielle', tone: 'warn' },
  weak: { label: 'Couverture faible', tone: 'bad' },
  absent: { label: 'Absent des livres', tone: 'gap' },
}

export const totalSubtopics = objectives.reduce((n, o) => n + o.itemCount, 0)

export interface TermEntry {
  en: string
  fr: string
  field?: string
  gap?: boolean
  objective: string
  lessonId: string
  lessonTitle: string
}

export function collectTerms(): TermEntry[] {
  const out: TermEntry[] = []
  for (const l of lessons) {
    for (const b of l.blocks) {
      if (b.type === 'term') {
        out.push({
          en: b.en,
          fr: b.fr,
          field: b.field,
          gap: b.gap,
          objective: l.objective,
          lessonId: l.id,
          lessonTitle: l.title,
        })
      }
    }
  }
  return out
}

export const terms = collectTerms()
