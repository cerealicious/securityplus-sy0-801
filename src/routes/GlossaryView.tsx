import { useMemo, useState } from 'react'
import { terms } from '../lib/content'
import { navigate } from '../lib/router'
import { Empty } from '../components/ui'

export default function GlossaryView() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return terms
    return terms.filter(
      (t) =>
        t.en.toLowerCase().includes(s) ||
        t.fr.toLowerCase().includes(s) ||
        (t.field ?? '').toLowerCase().includes(s)
    )
  }, [q])

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.en.localeCompare(b.en)),
    [filtered]
  )

  return (
    <div className="content-inner">
      <div className="eyebrow">Official English terms · definitions & field usage</div>
      <h1 className="page-title" style={{ marginTop: 6 }}>Bilingual Glossary</h1>
      <p className="page-sub">
        {terms.length} concepts extracted from the prototype lessons. Each entry gives the official
        exam term, its translation, and, when useful, the term used in the field — the gap between
        the two is a classic source of exam errors.
      </p>

      <input
        className="search-input"
        style={{
          border: '1px solid var(--border)',
          borderRadius: 10,
          marginTop: 20,
          background: 'var(--surface)',
        }}
        placeholder="Filter by English or French term…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="faint small" style={{ margin: '10px 0 16px' }}>
        {sorted.length} entr{sorted.length > 1 ? 'ies' : 'y'}
      </div>

      {sorted.length === 0 && <Empty>No terms match "{q}".</Empty>}

      <div className="stack-sm">
        {sorted.map((t) => (
          <div
            key={t.lessonId + t.en}
            className="card hover clickable"
            style={{ padding: '12px 16px' }}
            onClick={() => navigate(`objective/${t.objective}/lesson/${t.lessonId}`)}
          >
            <div className="spread" style={{ alignItems: 'flex-start', gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div className="term-en" style={{ fontSize: 13.5 }}>{t.en}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{t.fr}</div>
                {t.field && (
                  <div className="faint small" style={{ marginTop: 4 }}>
                    Field: {t.field}
                  </div>
                )}
              </div>
              <div className="row" style={{ gap: 6, flex: 'none' }}>
                {t.gap && <span className="badge gap">Not in books</span>}
                <span className="badge neutral">{t.objective}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
