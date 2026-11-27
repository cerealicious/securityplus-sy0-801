import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'"

function productionCsp(): Plugin {
  return {
    name: 'inject-csp',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`
      )
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), productionCsp()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome130',
    chunkSizeWarningLimit: 2000,
  },
  server: { port: 5173, strictPort: true },
})
