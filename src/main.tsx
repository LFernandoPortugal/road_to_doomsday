import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import InfoPage from './InfoPage'
import './styles.css'

const infoPaths = ['/metodologia', '/preguntas-frecuentes', '/privacidad', '/aviso-legal']
const page = infoPaths.includes(window.location.pathname) ? <InfoPage path={window.location.pathname} /> : <App />

createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
}
