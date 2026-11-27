import {
  decks,
  lessons,
  objectives,
  pbqs,
  scenarios,
  terms,
} from './content'

export interface SearchDoc {
  kind: string
  title: string
  sub: string
  path: string
  text: string
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

let index: SearchDoc[] | null = null

function blockText(b: any): string {
  const parts: string[] = []
  for (const k of ['text', 'md', 'title', 'question', 'q', 'explain']) {
    if (typeof b[k] === 'string') parts.push(b[k])
  }
  for (const k of ['items', 'options']) {
    if (Array.isArray(b[k])) parts.push(b[k].join(' '))
  }
  if (b.type === 'term') parts.push(b.en, b.fr, b.field ?? '')
  if (b.type === 'compare') {
    parts.push(b.left?.title ?? '', (b.left?.points ?? []).join(' '))
    parts.push(b.right?.title ?? '', (b.right?.points ?? []).join(' '))
  }
  if (b.type === 'table') {
    parts.push((b.head ?? []).join(' '))
    for (const r of b.rows ?? []) parts.push(r.join(' '))
  }
  return parts.join(' ')
}

function build(): SearchDoc[] {
  if (index) return index
  const docs: SearchDoc[] = []

  for (const o of objectives) {
    const subs = o.groups.flatMap((g) => g.items).join(' ')
    docs.push({
      kind: 'Objectif',
      title: `${o.id} — ${o.title}`,
      sub: o.titleFr,
      path: `objective/${o.id}`,
      text: norm(`${o.title} ${o.titleFr} ${o.summary} ${subs}`),
    })
  }

  for (const l of lessons) {
    docs.push({
      kind: 'Leçon',
      title: l.title,
      sub: `Objectif ${l.objective} · ${l.minutes} min`,
      path: `objective/${l.objective}/lesson/${l.id}`,
      text: norm(`${l.title} ${l.blocks.map(blockText).join(' ')}`),
    })
  }

  for (const d of decks) {
    for (const c of d.cards) {
      docs.push({
        kind: 'Carte',
        title: c.front,
        sub: `${d.title} · ${c.back.slice(0, 90)}`,
        path: `objective/${d.objective}/flashcards`,
        text: norm(`${c.front} ${c.back} ${c.en ?? ''}`),
      })
    }
  }

  for (const t of terms) {
    docs.push({
      kind: 'Terme',
      title: t.en,
      sub: t.fr,
      path: `objective/${t.objective}/lesson/${t.lessonId}`,
      text: norm(`${t.en} ${t.fr} ${t.field ?? ''} ${t.lessonTitle}`),
    })
  }

  for (const p of pbqs) {
    docs.push({
      kind: 'Exercice',
      title: p.title,
      sub: `Objectif ${p.objective} · ${p.type}`,
      path: `objective/${p.objective}/lab/${p.id}`,
      text: norm(`${p.title} ${p.prompt} ${p.explain}`),
    })
  }

  for (const s of scenarios) {
    docs.push({
      kind: 'Scénario',
      title: s.title,
      sub: `Objectif ${s.objective}`,
      path: `objective/${s.objective}/scenario/${s.id}`,
      text: norm(`${s.title} ${s.context} ${s.debrief.join(' ')}`),
    })
  }

  index = docs
  return docs
}

export function searchAll(query: string, limit = 24): SearchDoc[] {
  const q = norm(query.trim())
  if (q.length < 2) return []
  const tokens = q.split(/\s+/).filter(Boolean)
  const docs = build()
  const scored: { doc: SearchDoc; score: number }[] = []

  for (const doc of docs) {
    const title = norm(doc.title)
    const sub = norm(doc.sub)
    let score = 0
    if (title === q) score += 120
    if (title.startsWith(q)) score += 60
    if (title.includes(q)) score += 35
    if (sub.includes(q)) score += 15
    let tokenHits = 0
    for (const t of tokens) {
      if (title.includes(t)) score += 12
      else if (sub.includes(t)) score += 6
      else if (doc.text.includes(t)) score += 3
      if (doc.text.includes(t)) tokenHits += 1
    }
    if (tokenHits === tokens.length) score += 10
    if (score > 0) scored.push({ doc, score })
  }

  scored.sort((a, b) => b.score - a.score)
  const seen = new Set<string>()
  const out: SearchDoc[] = []
  for (const s of scored) {
    const key = s.doc.kind + '|' + s.doc.title + '|' + s.doc.path
    if (seen.has(key)) continue
    seen.add(key)
    out.push(s.doc)
    if (out.length >= limit) break
  }
  return out
}
