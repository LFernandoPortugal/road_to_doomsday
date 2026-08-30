import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, CaretDown, Check, Clock, FilmSlate, Funnel, Heart, MagnifyingGlass, Play, ShareNetwork, Television, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { sagas, watchlist, type Priority, type RegionCode, type WatchItem } from './data'

const RELEASE = new Date('2026-12-18T00:00:00-05:00')
const STORAGE_KEY = 'ruta-al-fin-progress-v1'
const REGION_KEY = 'maraton-doomsday-region-v1'
const SUPPORT_URL = 'https://ko-fi.com/falconblade'
const regionNames: Record<RegionCode, string> = { latam:'Latinoamérica', pe:'Perú', co:'Colombia', ec:'Ecuador', mx:'México', other:'Otro país' }
const justWatchRegions: Partial<Record<RegionCode, string>> = { pe:'pe', co:'co', ec:'ec', mx:'mx' }

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

function WatchRow({ item, checked, onToggle, region }: { item: WatchItem; checked: boolean; onToggle: () => void; region: RegionCode }) {
  const [open, setOpen] = useState(false)
  const [showSpoilers, setShowSpoilers] = useState(false)
  const regionalLinks = item.watchLinks?.[region] || item.watchLinks?.latam || []
  const justWatchRegion = justWatchRegions[region]
  return <article className={`watch-row ${checked ? 'is-watched' : ''}`}>
    <button className="check" onClick={onToggle} aria-label={checked ? `Marcar ${item.title} como pendiente` : `Marcar ${item.title} como vista`} aria-pressed={checked}>{checked && <Check weight="bold" />}</button>
    <button className="row-main" onClick={() => setOpen(!open)} aria-expanded={open}>
      <span className="row-index">{String(watchlist.indexOf(item) + 1).padStart(2,'0')}</span>
      <span className="row-title"><strong>{item.title}</strong>{item.latamTitle && item.latamTitle !== item.title && <small className="latam-title">En Latinoamérica: {item.latamTitle}</small>}<small>{item.year} · {item.minutes ? `${Math.floor(item.minutes/60)} h ${item.minutes%60} min` : 'Próximamente'}</small></span>
      <span className={`priority ${item.priority}`}>{item.priority}</span>
      <span className="row-format">{item.kind === 'serie' ? <Television /> : <FilmSlate />}<CaretDown className={open ? 'is-open' : ''}/></span>
    </button>
    <AnimatePresence initial={false}>{open && <motion.div className="row-detail" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
      <p className="summary">{item.note}</p>
      {item.watchFor && <div className="watch-for"><b>Pon atención a</b><p>{item.watchFor}</p></div>}
      {item.tieIn && <div className="spoiler-block">
        <button onClick={() => setShowSpoilers(!showSpoilers)} aria-expanded={showSpoilers}>{showSpoilers ? 'Ocultar conexión' : 'Revelar cómo conecta'} <span>Contiene spoilers</span></button>
        <AnimatePresence initial={false}>{showSpoilers && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><b>Cómo conecta</b><p>{item.tieIn}</p></motion.div>}</AnimatePresence>
      </div>}
      <div className="availability"><b>Dónde ver en {regionNames[region]}</b>{regionalLinks.length ? <div>{regionalLinks.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} <span>{link.access}</span></a>)}</div> : item.watchUrl ? <a href={item.watchUrl} target="_blank" rel="noreferrer">Ver en plataforma oficial</a> : <><span className="unavailable">Aún no hay una opción autorizada verificada para esta región</span>{justWatchRegion && <a className="availability-check" href={`https://www.justwatch.com/${justWatchRegion}`} target="_blank" rel="noreferrer">Comprobar disponibilidad actual <ArrowUpRight/></a>}</>}</div>
    </motion.div>}</AnimatePresence>
  </article>
}

export default function App() {
  const [watched, setWatched] = useStoredProgress()
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'todo'|'pelicula'|'serie'>('todo')
  const [priority, setPriority] = useState<'todo'|Priority>('todo')
  const [hideWatched, setHideWatched] = useState(false)
  const [region, setRegion] = useState<RegionCode>(() => (localStorage.getItem(REGION_KEY) as RegionCode) || 'latam')
  const [menu, setMenu] = useState(false)
  const reduceMotion = useReducedMotion()
  useEffect(() => localStorage.setItem(REGION_KEY, region), [region])
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
    const data = { title: 'Maratón para Doomsday', text: `Llevo ${percent}% de mi maratón completada.`, url: location.href }
    if (navigator.share) await navigator.share(data)
    else await navigator.clipboard.writeText(location.href)
  }

  return <main>
    <nav>
      <a className="brand" href="#inicio"><span>MARATÓN</span> PARA DOOMSDAY</a>
      <div className="nav-links"><a href="#ruta">El maratón</a><a href="#proyecto">El proyecto</a><a className="support-link" href={SUPPORT_URL} target="_blank" rel="noreferrer"><Heart weight="fill" /> Apoyar</a></div>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Abrir menú">{menu ? <X/> : <Funnel/>}</button>
    </nav>
    {menu && <div className="mobile-menu"><a href="#ruta">El maratón</a><a href="#proyecto">El proyecto</a><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Apoyar</a></div>}

    <section className="hero" id="inicio">
      <img src="/hero-doomsday.png" alt="Ciudad bajo un fenómeno cósmico, arte original" fetchPriority="high" />
      <div className="hero-scrim" />
      <motion.div className="hero-copy" initial={reduceMotion ? false : {opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
        <p className="eyebrow">El maratón latino del UCM</p>
        <h1>Prepárate para<br/><em>Doomsday.</em></h1>
        <p className="hero-lead">Un maratón claro por películas y series para llegar preparado al próximo gran evento.</p>
        <a className="primary" href="#ruta">Continuar el maratón <ArrowDown /></a>
      </motion.div>
      <div className="hero-count"><Countdown/><span>Estreno previsto: 18 de diciembre de 2026</span></div>
    </section>

    <section className="dashboard" aria-label="Tu progreso">
      <div className="progress-copy"><span>Tu avance</span><strong>{percent}%</strong></div>
      <div className="progress-track"><span style={{width:`${percent}%`}}/></div>
      <div className="stats"><div><b>{done}/{required.length}</b><span>vistos</span></div><div><b>{hoursLeft}</b><span>horas restantes</span></div><div><b>{Math.ceil(hoursLeft/weeksLeft)}</b><span>horas por semana</span></div></div>
      {next && <a className="next-panel" href={`#${next.id}`}><span className="next-play"><Play weight="fill"/></span><span><small>Continúa tu maratón</small><b>{next.latamTitle || next.title}</b><em><Clock/> {Math.floor(next.minutes/60)} h {next.minutes%60} min</em></span><ArrowDown/></a>}
    </section>

    <section className="route" id="ruta">
      <header><h2>Tu maratón hacia el estreno</h2><p>Marca cada título al terminar. Abre una ficha para encontrar guiños sin spoilers y conexiones protegidas por advertencia.</p></header>
      <div className="saga-nav" aria-label="Saltar a una saga">{sagas.map(saga => { const all = watchlist.filter(item => item.saga === saga); const completed = all.filter(item => watched[item.id]).length; return <a href={`#saga-${sagas.indexOf(saga)}`} key={saga}><span>{completed}/{all.length}</span>{saga}</a> })}</div>
      <div className="controls">
        <label className="search"><MagnifyingGlass/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar un título" aria-label="Buscar un título"/></label>
        <select value={kind} onChange={e => setKind(e.target.value as typeof kind)} aria-label="Filtrar por formato"><option value="todo">Películas y series</option><option value="pelicula">Solo películas</option><option value="serie">Solo series</option></select>
        <select value={priority} onChange={e => setPriority(e.target.value as typeof priority)} aria-label="Filtrar por prioridad"><option value="todo">Toda prioridad</option><option value="esencial">Esencial</option><option value="recomendada">Recomendada</option><option value="opcional">Opcional</option></select>
        <select value={region} onChange={e => setRegion(e.target.value as RegionCode)} aria-label="Seleccionar país"><option value="latam">Latinoamérica</option><option value="pe">Perú</option><option value="co">Colombia</option><option value="ec">Ecuador</option><option value="mx">México</option><option value="other">Otro país</option></select>
        <button className={hideWatched ? 'active' : ''} onClick={() => setHideWatched(!hideWatched)}>Ocultar vistos</button>
        <button onClick={share}><ShareNetwork/> Compartir</button>
      </div>
      <div className="legend"><span><i className="essential"/> Esencial</span><span><i className="recommended"/> Recomendada</span><span><i className="optional"/> Opcional</span></div>
      {sagas.map(saga => {
        const entries = visible.filter(i => i.saga === saga)
        if (!entries.length) return null
        const sagaAll = watchlist.filter(item => item.saga === saga)
        const sagaDone = sagaAll.filter(item => watched[item.id]).length
        return <section className="saga" id={`saga-${sagas.indexOf(saga)}`} key={saga}><div className="saga-heading"><span>{String(sagas.indexOf(saga)+1).padStart(2,'0')}</span><h3>{saga}</h3><small>{sagaDone}/{sagaAll.length} vistos</small></div><div className="saga-progress" aria-label={`${sagaDone} de ${sagaAll.length} vistos`}><span style={{width:`${sagaDone/sagaAll.length*100}%`}}/></div><div>{entries.map(item => <div id={item.id} key={item.id}><WatchRow item={item} region={region} checked={!!watched[item.id]} onToggle={() => setWatched(prev => ({...prev,[item.id]:!prev[item.id]}))}/></div>)}</div></section>
      })}
      {!visible.length && <div className="empty"><FilmSlate/><h3>No encontramos ese título</h3><p>Prueba con otro filtro o borra la búsqueda.</p></div>}
    </section>

    <section className="project" id="proyecto">
      <div><h2>Una guía hecha por fans</h2><p>Maratón para Doomsday es gratuito, independiente y pensado para la comunidad latina. No está afiliado a Marvel, Disney, Sony ni sus subsidiarias, y no aloja copias de películas o series.</p><p className="availability-note">Los enlaces de disponibilidad se revisan manualmente por país y solo dirigen a fuentes autorizadas, opciones gratuitas legítimas o promociones oficiales.</p></div>
      <div className="project-action"><Heart weight="duotone"/><p>Tu apoyo ayuda a mantener el catálogo, verificar la disponibilidad regional y mejorar la experiencia.</p><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Apoyar en Ko-fi</a></div>
    </section>
    <footer><a className="brand" href="#inicio"><span>MARATÓN</span> PARA DOOMSDAY</a><div><p>Guía de visionado no oficial basada en información pública. Todos los títulos pertenecen a sus respectivos propietarios.</p><nav className="footer-links"><a href="/metodologia">Metodología</a><a href="/preguntas-frecuentes">Preguntas frecuentes</a><a href="/privacidad">Privacidad</a><a href="/aviso-legal">Aviso legal</a></nav></div><span>© {new Date().getFullYear()}</span></footer>
  </main>
}
