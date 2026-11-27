const MUTE_KEY = 'sp801-muted'
let audioContext: AudioContext | null = null

export function isMuted(): boolean {
  try {
    return window.localStorage.getItem(MUTE_KEY) === 'true'
  } catch {
    return false
  }
}

export function setMuted(v: boolean): void {
  try {
    window.localStorage.setItem(MUTE_KEY, v ? 'true' : 'false')
  } catch {
    /* stockage indisponible */
  }
}

function tone(ctx: AudioContext, frequency: number, start: number): void {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(0.05, start + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09)
  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start(start)
  oscillator.stop(start + 0.1)
}

function playNotes(notes: number[]): void {
  if (isMuted()) return
  try {
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return
    if (!audioContext) audioContext = new Ctor()
    const ctx = audioContext
    if (ctx.state === 'suspended') void ctx.resume()
    const now = ctx.currentTime
    notes.forEach((frequency, i) => tone(ctx, frequency, now + i * 0.1))
  } catch {
    /* Web Audio indisponible : échec silencieux */
  }
}

export function playSuccess(): void {
  playNotes([660, 880])
}

export function playLevelUp(): void {
  playNotes([523, 659, 784])
}
