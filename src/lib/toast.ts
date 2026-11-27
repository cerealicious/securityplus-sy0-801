export function toast(message: string) {
  window.dispatchEvent(new CustomEvent('sp801:toast', { detail: message }))
}
