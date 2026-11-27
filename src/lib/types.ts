export type Coverage = 'solid' | 'partial' | 'weak' | 'absent'

export interface ObjectiveGroup {
  name: string
  fr?: string
  items: string[]
}

export interface Objective {
  id: string
  domain: number
  title: string
  titleFr: string
  coverage: Coverage
  summary: string
  status: 'complete' | 'planned'
  groups: ObjectiveGroup[]
  itemCount: number
  lessonIds?: string[]
  deckId?: string
  quizId?: string
  pbqIds?: string[]
  scenarioIds?: string[]
  plannedLessons?: number
}

export interface Domain {
  id: number
  name: string
  fr: string
  short?: string
  weight: number
  color: string
  blurb: string
  objectives: string[]
}

export type Block = { type: string; [key: string]: any }

export interface Lesson {
  id: string
  objective: string
  order: number
  title: string
  minutes: number
  blocks: Block[]
}

export interface Flashcard {
  id: string
  front: string
  back: string
  en?: string
  tag?: string
}

export interface Deck {
  id: string
  objective: string
  title: string
  cards: Flashcard[]
}

export interface QuizQuestion {
  id: string
  type: 'single' | 'multi' | 'match'
  q: string
  options?: string[]
  answer?: number[]
  pairs?: { left: string; right: string }[]
  explain: string
  ref?: string
}

export interface Quiz {
  id: string
  objective: string
  title: string
  questions: QuizQuestion[]
}

export type PbqType = 'classify' | 'order' | 'match' | 'table' | 'calc'

export interface Pbq {
  id: string
  objective: string
  type: PbqType
  title: string
  prompt: string
  categories?: string[]
  items?: { id: string; label: string; cat?: string; order?: number }[]
  rows?: { id: string; cells: string[]; answer: string }[]
  columns?: string[]
  options?: string[]
  pairs?: { left: string; right: string }[]
  fields?: { id: string; label: string; answer: number; unit?: string; tolerance?: number }[]
  explain: string
}

export interface ScenarioNode {
  id: string
  text: string
  choices?: { text: string; next: string; score: number; why: string }[]
  outcome?: string
}

export interface Scenario {
  id: string
  objective: string
  title: string
  context: string
  start: string
  nodes: Record<string, ScenarioNode>
  debrief: string[]
}

export interface DiagramNode {
  id: string
  label: string
  sub?: string
  x: number
  y: number
  w?: number
  h?: number
  kind?: string
  detail?: string
  exam?: string
}

export interface Diagram {
  id: string
  kind: 'flow' | 'matrix'
  title: string
  subtitle?: string
  nodes?: DiagramNode[]
  edges?: { from: string; to: string; label?: string }[]
  modes?: string[]
  sequence?: string[]
  quiz?: { question: string; answer: string }
  matrix?: {
    columns: string[]
    rows: { label: string; cells: { text: string; detail?: string }[] }[]
  }
}

export interface ProgressCard {
  box: number
  due: string
  lapses: number
  seen: number
}

export interface ObjectiveProgress {
  lessonsDone: string[]
  quizBest: number
  quizAttempts: number
  pbqDone: string[]
  scenariosDone: string[]
}

export type ActivityKind = 'lesson' | 'quiz' | 'pbq' | 'scenario' | 'card'

export interface Activity {
  date: string
  objectiveId: string
  kind: ActivityKind
  refId?: string
  score?: number
  minutes?: number
}

export interface SimulationStep {
  id: string
  label: string
  detail: string
  callout?: string
}
export interface SimulationLayer {
  n: number
  name: string
  detail: string
  protocols?: string
  attack?: string
}
export interface SimulationItem {
  id: string
  label: string
  detail: string
  isTarget?: boolean
}
export interface Simulation {
  id: string
  objective: string
  title: string
  kind: 'flow' | 'compare' | 'layers' | 'identify'
  intro: string
  steps?: SimulationStep[]
  left?: { title: string; points: string[] }
  right?: { title: string; points: string[] }
  layers?: SimulationLayer[]
  items?: SimulationItem[]
  check: { q: string; options: string[]; answer: number; explain: string }
  source?: { book: string; page: string | number; printed?: number }
}

export interface Progress {
  schema: 1
  learner: { createdAt: string }
  objectives: Record<string, ObjectiveProgress>
  srs: Record<string, ProgressCard>
  sessions: { date: string; minutes: number }[]
  settings: { dailyGoal: number; lang: string }
  lastLocation?: string
  days: string[]
  history: Activity[]
}
