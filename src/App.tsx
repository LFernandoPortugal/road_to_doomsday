import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, Check, Clock, FilmSlate, Funnel, Heart, MagnifyingGlass, ShareNetwork, Television, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { sagas, watchlist, type Priority, type WatchItem } from './data'

const RELEASE = new Date('2026-12-18T00:00:00-05:00')
const STORAGE_KEY = 'ruta-al-fin-progress-v1'

function useStoredProgress() {
  const [watched, setWatched] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
  })
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(watched)), [watched])
  return [watched, setWatched] as const
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, RELEASE.getTime() - Date.now()))
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, RELEASE.getTime() - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor(remaining / 3600000) % 24
  const minutes = Math.floor(remaining / 60000) % 60
  const seconds = Math.floor(remaining / 1000) % 60
  return <div className="countdown" aria-label={`${days} días para el estreno`}>
    {[[days,'días'],[hours,'horas'],[minutes,'min'],[seconds,'seg']].map(([value,label]) => <div key={label}><strong>{String(value).padStart(2,'0')}</strong><span>{label}</span></div>)}
  </div>
}

function WatchRow({ item, checked, onToggle }: { item: WatchItem; checked: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false)
  const [showSpoilers, setShowSpoilers] = useState(false)
  return <article className={`watch-row ${checked ? 'is-watched' : ''}`}>
    <button className="check" onClick={onToggle} aria-label={checked ? `Marcar ${item.title} como pendiente` : `Marcar ${item.title} como vista`} aria-pressed={checked}>{checked && <Check weight="bold" />}</button>
    <button className="row-main" onClick={() => setOpen(!open)} aria-expanded={open}>
      <span className="row-index">{String(watchlist.indexOf(item) + 1).padStart(2,'0')}</span>
      <span className="row-title"><strong>{item.title}</strong>{item.latamTitle && item.latamTitle !== item.title && <small className="latam-title">En Latinoamérica: {item.latamTitle}</small>}<small>{item.year} · {item.minutes ? `${Math.floor(item.minutes/60)} h ${item.minutes%60} min` : 'Próximamente'}</small></span>
      <span className={`priority ${item.priority}`}>{item.priority}</span>
      {item.kind === 'serie' ? <Television /> : <FilmSlate />}
    </button>
    <AnimatePresence initial={false}>{open && <motion.div className="row-detail" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
      <p className="summary">{item.note}</p>
      {item.watchFor && <div className="watch-for"><b>Pon atención a</b><p>{item.watchFor}</p></div>}
      {item.tieIn && <div className="spoiler-block">
        <button onClick={() => setShowSpoilers(!showSpoilers)} aria-expanded={showSpoilers}>{showSpoilers ? 'Ocultar conexión' : 'Revelar cómo conecta'} <span>Contiene spoilers</span></button>
        <AnimatePresence initial={false}>{showSpoilers && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><b>Cómo conecta</b><p>{item.tieIn}</p></motion.div>}</AnimatePresence>
      </div>}
      {item.watchUrl ? <a href={item.watchUrl} target="_blank" rel="noreferrer">Ver en plataforma oficial</a> : <span className="unavailable">Enlace de reproducción pendiente</span>}
    </motion.div>}</AnimatePresence>
  </article>
}

export default function App() {
  const [watched, setWatched] = useStoredProgress()
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'todo'|'pelicula'|'serie'>('todo')
  const [priority, setPriority] = useState<'todo'|Priority>('todo')
  const [hideWatched, setHideWatched] = useState(false)
  const [menu, setMenu] = useState(false)
  const reduceMotion = useReducedMotion()
  const required = watchlist.filter(i => i.priority !== 'opcional' && i.id !== 'avengers-doomsday')
  const done = required.filter(i => watched[i.id]).length
  const percent = Math.round(done / required.length * 100)
  const hoursLeft = Math.round(required.filter(i => !watched[i.id]).reduce((sum,i) => sum + i.minutes, 0) / 60)
  const weeksLeft = Math.max(1, Math.ceil((RELEASE.getTime() - Date.now()) / 604800000))
  const next = required.find(i => !watched[i.id])
  const visible = useMemo(() => watchlist.filter(item => {
    if (kind !== 'todo' && item.kind !== kind) return false
    if (priority !== 'todo' && item.priority !== priority) return false
    if (hideWatched && watched[item.id]) return false
    return item.title.toLowerCase().includes(query.toLowerCase())
  }), [kind, priority, hideWatched, watched, query])

  const share = async () => {
    const data = { title: 'Ruta al Fin', text: `Llevo ${percent}% de mi ruta completada.`, url: location.href }
    if (navigator.share) await navigator.share(data)
    else await navigator.clipboard.writeText(location.href)
  }

  return <main>
    <nav>
      <a className="brand" href="#inicio"><span>RUTA</span> AL FIN</a>
      <div className="nav-links"><a href="#ruta">La ruta</a><a href="#proyecto">El proyecto</a><a className="support-link" href="https://ko-fi.com/" target="_blank" rel="noreferrer"><Heart weight="fill" /> Apoyar</a></div>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Abrir menú">{menu ? <X/> : <Funnel/>}</button>
    </nav>
    {menu && <div className="mobile-menu"><a href="#ruta">La ruta</a><a href="#proyecto">El proyecto</a><a href="https://ko-fi.com/">Apoyar</a></div>}

    <section className="hero" id="inicio">
      <img src="/hero-doomsday.png" alt="Ciudad bajo un fenómeno cósmico, arte original" fetchPriority="high" />
      <div className="hero-scrim" />
      <motion.div className="hero-copy" initial={reduceMotion ? false : {opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
        <p className="eyebrow">Guía interactiva en español</p>
        <h1>Todo conduce<br/><em>al fin.</em></h1>
        <p className="hero-lead">Una ruta clara por películas y series para llegar preparado al próximo gran evento.</p>
        <a className="primary" href="#ruta">Continuar la ruta <ArrowDown /></a>
      </motion.div>
      <div className="hero-count"><Countdown/><span>Estreno previsto: 18 de diciembre de 2026</span></div>
    </section>

    <section className="dashboard" aria-label="Tu progreso">
      <div className="progress-copy"><span>Tu avance</span><strong>{percent}%</strong></div>
      <div className="progress-track"><span style={{width:`${percent}%`}}/></div>
      <div className="stats"><div><b>{done}/{required.length}</b><span>vistos</span></div><div><b>{hoursLeft}</b><span>horas restantes</span></div><div><b>{Math.ceil(hoursLeft/weeksLeft)}</b><span>horas por semana</span></div></div>
      {next && <a className="next" href={`#${next.id}`}>Siguiente: <b>{next.title}</b></a>}
    </section>

    <section className="route" id="ruta">
      <header><h2>Tu ruta hacia el estreno</h2><p>Marca cada título al terminar. Abre una ficha para encontrar guiños sin spoilers y conexiones protegidas por advertencia.</p></header>
      <div className="controls">
        <label className="search"><MagnifyingGlass/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar un título" aria-label="Buscar un título"/></label>
        <select value={kind} onChange={e => setKind(e.target.value as typeof kind)} aria-label="Filtrar por formato"><option value="todo">Películas y series</option><option value="pelicula">Solo películas</option><option value="serie">Solo series</option></select>
        <select value={priority} onChange={e => setPriority(e.target.value as typeof priority)} aria-label="Filtrar por prioridad"><option value="todo">Toda prioridad</option><option value="esencial">Esencial</option><option value="recomendada">Recomendada</option><option value="opcional">Opcional</option></select>
        <button className={hideWatched ? 'active' : ''} onClick={() => setHideWatched(!hideWatched)}>Ocultar vistos</button>
        <button onClick={share}><ShareNetwork/> Compartir</button>
      </div>
      <div className="legend"><span><i className="essential"/> Esencial</span><span><i className="recommended"/> Recomendada</span><span><i className="optional"/> Opcional</span></div>
      {sagas.map(saga => {
        const entries = visible.filter(i => i.saga === saga)
        if (!entries.length) return null
        return <section className="saga" key={saga}><div className="saga-heading"><span>{String(sagas.indexOf(saga)+1).padStart(2,'0')}</span><h3>{saga}</h3><small>{entries.length} títulos</small></div><div>{entries.map(item => <div id={item.id} key={item.id}><WatchRow item={item} checked={!!watched[item.id]} onToggle={() => setWatched(prev => ({...prev,[item.id]:!prev[item.id]}))}/></div>)}</div></section>
      })}
      {!visible.length && <div className="empty"><FilmSlate/><h3>No encontramos ese título</h3><p>Prueba con otro filtro o borra la búsqueda.</p></div>}
    </section>

    <section className="project" id="proyecto">
      <div><h2>Una guía hecha por fans</h2><p>Ruta al Fin es gratuita, independiente y no está afiliada a Marvel, Disney, Sony ni sus subsidiarias. No alojamos copias de películas o series.</p></div>
      <div className="project-action"><Heart weight="duotone"/><p>Tu apoyo ayuda a mantener el catálogo, la disponibilidad y la experiencia al día.</p><a href="https://ko-fi.com/" target="_blank" rel="noreferrer">Apoyar el proyecto</a></div>
    </section>
    <footer><a className="brand" href="#inicio"><span>RUTA</span> AL FIN</a><p>Guía de visionado no oficial basada en información pública. Todos los títulos pertenecen a sus respectivos propietarios.</p><span>© {new Date().getFullYear()}</span></footer>
  </main>
}
