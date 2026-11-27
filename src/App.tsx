import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { domains, objectiveById } from './lib/content'
import { navigate, useRoute } from './lib/router'
import { ProgressProvider, domainPercent, readiness, totalDue, useProgress } from './lib/progress'
import { searchAll, type SearchDoc } from './lib/search'
import { toast } from './lib/toast'
import { exportProgressFile, importProgressFile } from './lib/io'
import { StatusDots } from './components/ui'
import { computeStats, levelTitle, formatXp } from './lib/gamification'
import { isMuted, setMuted } from './lib/sound'
import Dashboard from './routes/Dashboard'
import DomainView from './routes/DomainView'
import ObjectiveView from './routes/ObjectiveView'
import LessonView from './routes/LessonView'
import FlashcardsView from './routes/FlashcardsView'
import QuizView from './routes/QuizView'
import LabView from './routes/LabView'
import ScenarioView from './routes/ScenarioView'
import ProgressView from './routes/ProgressView'
import GlossaryView from './routes/GlossaryView'

class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40 }}>
          <h2>An error occurred</h2>
          <p className="muted">{String(this.state.error)}</p>
          <button className="btn" onClick={() => { this.setState({ error: null }); navigate('') }}>
            Back to dashboard
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function Sidebar({ segs }: { segs: string[] }) {
  const { progress } = useProgress()
  const currentObj = segs[0] === 'objective' ? segs[1] : null
  const currentDomain = currentObj ? objectiveById.get(currentObj)?.domain : null
  const [open, setOpen] = useState<number[]>(currentDomain ? [currentDomain] : [1])

  useEffect(() => {
    if (currentDomain && !open.includes(currentDomain)) setOpen((x) => [...x, currentDomain])
  }, [currentDomain])

  const toggle = (id: number) =>
    setOpen((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]))

  const due = totalDue(progress)

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.4 7.5 9.9 4.4-1.5 7.5-5.3 7.5-9.9v-6L12 2.5Z" />
            <path d="m8.8 11.6 2.3 2.3 4.3-4.6" />
          </svg>
        </div>
        <div>
          <div className="brand-title">Security+ SY0-801</div>
          <div className="brand-sub">LEARNING PLATFORM</div>
        </div>
      </div>

      <div className="nav-scroll">
        <button
          className={`nav-item ${segs.length === 0 ? 'active' : ''}`}
          onClick={() => navigate('')}
        >
          <span className="nav-ico">◆</span> Dashboard
        </button>

        <div className="nav-label">Official syllabus</div>

        {domains.map((d) => {
          const isOpen = open.includes(d.id)
          const dp = domainPercent(d.id, progress)
          return (
            <div className="domain-block" key={d.id}>
              <button className="domain-head" onClick={() => toggle(d.id)}>
                <span className="domain-dot" style={{ background: d.color }} />
                <span className="domain-name">
                  {d.id}. {d.short ?? d.fr}
                  <span className="faint"> · {d.weight}%</span>
                </span>
                <span className="domain-weight">{dp}%</span>
                <span className="faint" style={{ fontSize: 10 }}>{isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && (
                <div className="obj-list">
                  {d.objectives.map((id) => {
                    const o = objectiveById.get(id)
                    if (!o) return null
                    const active = currentObj === id
                    return (
                      <button
                        key={id}
                        className={`obj-item ${active ? 'active' : ''}`}
                        onClick={() => navigate(`objective/${id}`)}
                        title={o.title}
                      >
                        <span className="obj-id">{id}</span>
                        <span className="obj-name">{o.titleFr}</span>
                        {o.status === 'complete' ? (
                          <StatusDots
                            objective={o}
                            progress={domainPercent(d.id, progress)}
                          />
                        ) : (
                          <span className="faint" style={{ fontSize: 9 }}>○</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        <div className="nav-label">Review</div>
        <button
          className={`nav-item ${segs[0] === 'flashcards' ? 'active' : ''}`}
          onClick={() => navigate('flashcards')}
        >
          <span className="nav-ico">▤</span> Flashcards
          {due > 0 && (
            <span className="badge info" style={{ marginLeft: 'auto' }}>
              {due}
            </span>
          )}
        </button>
        <button
          className={`nav-item ${segs[0] === 'glossary' ? 'active' : ''}`}
          onClick={() => navigate('glossary')}
        >
          <span className="nav-ico">⌕</span> Bilingual glossary
        </button>
        <button
          className={`nav-item ${segs[0] === 'progress' ? 'active' : ''}`}
          onClick={() => navigate('progress')}
        >
          <span className="nav-ico">◔</span> My progress
        </button>
      </div>

      <div className="sidebar-foot">
        <span>V8 · 27 objectives</span>
        <span style={{ color: 'var(--accent)' }}>{readiness(progress)}% ready</span>
      </div>
    </aside>
  )
}

const TAB_LABEL: Record<string, string> = {
  lesson: 'Lesson',
  flashcards: 'Flashcards',
  quiz: 'Quiz',
  lab: 'Hands-on lab',
  scenario: 'Scenario',
}

function Breadcrumbs({ segs }: { segs: string[] }) {
  const items: { label: string; path?: string }[] = []
  if (segs.length === 0) items.push({ label: 'Dashboard' })
  else if (segs[0] === 'domain') {
    const d = domains.find((x) => String(x.id) === segs[1])
    items.push({ label: 'Dashboard', path: '' })
    items.push({ label: d ? `Domain ${d.id} — ${d.fr}` : 'Domain' })
  } else if (segs[0] === 'objective') {
    const o = objectiveById.get(segs[1])
    const d = o ? domains.find((x) => x.id === o.domain) : null
    items.push({ label: 'Dashboard', path: '' })
    if (d) items.push({ label: `Domain ${d.id}`, path: `domain/${d.id}` })
    items.push({ label: o ? `${o.id} — ${o.titleFr}` : segs[1], path: `objective/${segs[1]}` })
    if (segs[2]) items.push({ label: TAB_LABEL[segs[2]] ?? segs[2] })
  } else if (segs[0] === 'flashcards') {
    items.push({ label: 'Dashboard', path: '' })
    items.push({ label: 'Flashcards' })
  } else if (segs[0] === 'progress') {
    items.push({ label: 'Dashboard', path: '' })
    items.push({ label: 'My progress' })
  } else if (segs[0] === 'glossary') {
    items.push({ label: 'Dashboard', path: '' })
    items.push({ label: 'Bilingual glossary' })
  }
  return (
    <div className="crumbs">
      {items.map((it, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {i > 0 && <span className="sep">/</span>}
          {it.path !== undefined && i < items.length - 1 ? (
            <button className="crumb-link" onClick={() => navigate(it.path!)}>
              {it.label}
            </button>
          ) : (
            <span className={i === items.length - 1 ? 'current' : ''}>{it.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => searchAll(q), [q])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => setSel(0), [q])

  const go = (doc: SearchDoc) => {
    navigate(doc.path)
    onClose()
  }

  return (
    <div className="search-overlay" onMouseDown={onClose}>
      <div className="search-panel" onMouseDown={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Search a term, objective, lesson…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSel((s) => Math.min(results.length - 1, s + 1))
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSel((s) => Math.max(0, s - 1))
            }
            if (e.key === 'Enter' && results[sel]) go(results[sel])
          }}
        />
        <div className="search-results">
          {q.length < 2 && (
            <div className="faint small" style={{ padding: '18px 12px' }}>
              Enter at least two characters. Search covers all 27 objectives, lessons,
              official terms, and flashcards.
            </div>
          )}
          {q.length >= 2 && results.length === 0 && (
            <div className="faint small" style={{ padding: '18px 12px' }}>
              No results for "{q}".
            </div>
          )}
          {results.map((r, i) => (
            <div
              key={r.kind + r.title + i}
              className={`search-result ${i === sel ? 'sel' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => go(r)}
            >
              <span className="sr-kind">{r.kind}</span>
              <div style={{ minWidth: 0 }}>
                <div className="sr-title">{r.title}</div>
                <div className="sr-sub">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="search-foot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}

function Topbar({ segs, onSearch }: { segs: string[]; onSearch: () => void }) {
  const { progress } = useProgress()
  const stats = computeStats(progress)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return (localStorage.getItem('sp801-theme') as 'light' | 'dark') || 'dark' } catch { return 'dark' }
  })
  const [muted, setMutedState] = useState(() => isMuted())
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('sp801-theme', theme) } catch { /* stockage indisponible */ }
  }, [theme])
  return (
    <header className="topbar">
      <Breadcrumbs segs={segs} />
      <div className="topbar-right">
        <div className="xp-pill" title={`${formatXp(stats.xp)} total XP · ${levelTitle(stats.level)}`}>
          <span className="xp-level">{stats.level}</span>
          <span className="xp-pill-body">
            <span className="xp-pill-label">{levelTitle(stats.level)} · {formatXp(stats.xp)} XP</span>
            <span className="xp-mini-bar"><span style={{ width: `${stats.xpInLevel}%` }} /></span>
          </span>
        </div>
        <div className={`streak-pill ${stats.streak > 0 ? 'hot' : ''}`} title={`${stats.streak} day streak`}>
          <span>🔥</span><strong>{stats.streak}</strong>
        </div>
        <button
          className="icon-btn"
          onClick={() => { const v = !muted; setMuted(v); setMutedState(v) }}
          title={muted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label="Sounds"
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
            </svg>
          )}
        </button>
        <button className="search-btn" onClick={onSearch}>
          <span>⌕</span>
          <span>Search…</span>
          <kbd style={{ marginLeft: 'auto' }}>Ctrl K</kbd>
        </button>
      </div>
    </header>
  )
}

function Router({ segs }: { segs: string[] }) {
  if (segs.length === 0) return <Dashboard />
  switch (segs[0]) {
    case 'domain':
      return <DomainView id={Number(segs[1])} />
    case 'objective':
      if (segs[2] === 'lesson') return <LessonView objectiveId={segs[1]} lessonId={segs[3]} />
      if (segs[2] === 'flashcards') return <FlashcardsView objectiveId={segs[1]} />
      if (segs[2] === 'quiz') return <QuizView objectiveId={segs[1]} />
      if (segs[2] === 'lab') return <LabView objectiveId={segs[1]} pbqId={segs[3]} />
      if (segs[2] === 'scenario') return <ScenarioView objectiveId={segs[1]} scenarioId={segs[3]} />
      return <ObjectiveView objectiveId={segs[1]} />
    case 'flashcards':
      return <FlashcardsView />
    case 'progress':
      return <ProgressView />
    case 'glossary':
      return <GlossaryView />
    default:
      return <Dashboard />
  }
}

function Shell() {
  const segs = useRoute()
  const [search, setSearch] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const { setLastLocation, progress, importData } = useProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    const api = (window as any).sp801
    if (!api) return
    api.onMenuExport?.(async () => {
      await exportProgressFile(progressRef.current)
      toast('Progress exported.')
    })
    api.onMenuImport?.(async () => {
      const data = await importProgressFile()
      if (data && data.schema === 1) {
        importData(data)
        toast('Progress imported.')
      } else if (data) {
        toast('Invalid progress file.')
      }
    })
  }, [])

  useEffect(() => {
    const loc = window.location.hash.replace(/^#\/?/, '')
    if (loc) setLastLocation(loc)
  }, [segs.join('/')])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onToast = (e: Event) => {
      setMsg((e as CustomEvent).detail)
      window.setTimeout(() => setMsg(null), 3200)
    }
    window.addEventListener('sp801:toast', onToast)
    return () => window.removeEventListener('sp801:toast', onToast)
  }, [])

  return (
    <div className="app">
      <Sidebar segs={segs} />
      <div className="main">
        <Topbar segs={segs} onSearch={() => setSearch(true)} />
        <div className="content">
          <div className="fade-in" key={segs.join('/')}>
            <Router segs={segs} />
          </div>
        </div>
      </div>
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
      {msg && <div className="toast">{msg}</div>}
    </div>
  )
}

export default function App() {
  return (
    <Boundary>
      <ProgressProvider>
        <Shell />
      </ProgressProvider>
    </Boundary>
  )
}
