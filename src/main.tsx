import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

try {
  const saved = localStorage.getItem('sp801-theme')
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved
} catch { /* préférence indisponible */ }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
