import { useEffect, useState } from 'react'

export function parseHash(hash: string): string[] {
  const raw = hash.replace(/^#\/?/, '')
  if (!raw) return []
  return raw.split('/').filter(Boolean).map(decodeURIComponent)
}

export function navigate(path: string) {
  const clean = path.startsWith('#') ? path : '#/' + path.replace(/^\/+/, '')
  if (window.location.hash === clean) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = clean
  }
}

export function useRoute(): string[] {
  const [segs, setSegs] = useState<string[]>(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => {
      setSegs(parseHash(window.location.hash))
      const content = document.querySelector('.content')
      if (content) content.scrollTop = 0
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return segs
}
