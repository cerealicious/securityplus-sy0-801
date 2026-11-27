import type { Progress } from './types'

export async function exportProgressFile(progress: Progress): Promise<string | null> {
  const api = (window as any).sp801
  if (api?.exportProgress) {
    const res = await api.exportProgress(progress)
    return res?.ok ? res.path ?? 'ok' : null
  }
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `progression-securityplus-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  return a.download
}

export async function importProgressFile(): Promise<Progress | null> {
  const api = (window as any).sp801
  if (api?.importProgress) {
    const res = await api.importProgress()
    return res?.ok ? (res.data as Progress) : null
  }
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return resolve(null)
      try {
        resolve(JSON.parse(await file.text()) as Progress)
      } catch {
        resolve(null)
      }
    }
    input.click()
  })
}
