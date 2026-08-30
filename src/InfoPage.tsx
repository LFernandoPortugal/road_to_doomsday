import { ArrowLeft, ArrowUpRight, Heart, ShieldCheck } from '@phosphor-icons/react'
import type { ReactNode } from 'react'

const SUPPORT_URL = 'https://ko-fi.com/falconblade'

type PageContent = { title: string; intro: string; sections: { heading: string; body: ReactNode }[] }

const pages: Record<string, PageContent> = {
  '/metodologia': {
    title: 'Metodología',
    intro: 'Cómo decidimos qué ver, en qué orden y qué significa cada prioridad.',
    sections: [
      { heading:'Orden editorial', body:<p>La lista sigue principalmente el orden de estreno, con ajustes puntuales cuando una escena o serie funciona mejor en otro lugar. El objetivo es proteger revelaciones y mantener claras las conexiones.</p> },
      { heading:'Niveles de prioridad', body:<p><b>Esencial</b> cubre la historia central. <b>Recomendada</b> mejora personajes o contextos. <b>Opcional</b> amplía el universo, pero puede omitirse sin perder la línea principal.</p> },
      { heading:'Disponibilidad regional', body:<><p>Los enlaces directos se revisan manualmente. Como los catálogos cambian, también ofrecemos acceso a JustWatch por país para consultar opciones legales actuales de suscripción, alquiler, compra o acceso gratuito.</p><p className="source-links"><a href="https://www.justwatch.com/pe" target="_blank" rel="noreferrer">Perú <ArrowUpRight/></a><a href="https://www.justwatch.com/co" target="_blank" rel="noreferrer">Colombia <ArrowUpRight/></a><a href="https://www.justwatch.com/ec" target="_blank" rel="noreferrer">Ecuador <ArrowUpRight/></a><a href="https://www.justwatch.com/mx" target="_blank" rel="noreferrer">México <ArrowUpRight/></a></p></> },
      { heading:'Correcciones', body:<p>La guía evoluciona cuando aparecen fechas oficiales, cambios de estreno o nueva información. No presentamos rumores como hechos confirmados.</p> }
    ]
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas frecuentes',
    intro: 'Respuestas breves para comenzar el maratón sin perderte.',
    sections: [
      { heading:'¿Debo verlo absolutamente todo?', body:<p>No. Empieza con los títulos esenciales. Las recomendaciones y opciones adicionales están separadas para que adaptes el maratón a tu tiempo.</p> },
      { heading:'¿Dónde se guarda mi progreso?', body:<p>En el almacenamiento local de tu navegador. No necesitas una cuenta y el proyecto no recibe tu historial de visionado.</p> },
      { heading:'¿Los enlaces son iguales en todos los países?', body:<p>No. Los catálogos, precios y promociones cambian por territorio. Selecciona tu país y comprueba siempre la disponibilidad actual.</p> },
      { heading:'¿El sitio ofrece películas gratis?', body:<p>El sitio no aloja ni distribuye películas o series. Puede enlazar opciones gratuitas cuando procedan de una fuente autorizada o una promoción oficial.</p> },
      { heading:'¿Puedo instalarlo en mi teléfono?', body:<p>Sí. Desde el menú de tu navegador usa “Agregar a pantalla de inicio”. Se abrirá como una aplicación y conservará tus marcas.</p> }
    ]
  },
  '/privacidad': {
    title: 'Privacidad',
    intro: 'Una experiencia útil con la menor recopilación de datos posible.',
    sections: [
      { heading:'Datos del maratón', body:<p>Las marcas de contenido visto y el país seleccionado se guardan localmente en tu dispositivo. No se envían a un servidor del proyecto.</p> },
      { heading:'Servicios externos', body:<p>Al abrir Ko-fi, JustWatch o una plataforma de streaming, pasas a sus sitios y se aplican sus propias políticas de privacidad y cookies.</p> },
      { heading:'Borrar tus datos', body:<p>Puedes borrar el progreso desde los datos del sitio en tu navegador. Una futura actualización incorporará un control directo dentro del tracker.</p> }
    ]
  },
  '/aviso-legal': {
    title: 'Aviso legal',
    intro: 'Un proyecto independiente de orientación y seguimiento para fans.',
    sections: [
      { heading:'Proyecto no oficial', body:<p>Maratón para Doomsday no está afiliado, patrocinado ni respaldado por Marvel Studios, The Walt Disney Company, Sony Pictures ni sus subsidiarias.</p> },
      { heading:'Marcas y títulos', body:<p>Los nombres de películas, series, personajes y plataformas pertenecen a sus respectivos titulares. Se mencionan con fines informativos y de identificación.</p> },
      { heading:'Contenido audiovisual', body:<p>Este sitio no almacena, transmite ni distribuye copias de películas o series. Los enlaces externos deben dirigir únicamente a fuentes autorizadas.</p> },
      { heading:'Disponibilidad', body:<p>La información puede cambiar sin previo aviso. Verifica precio, catálogo, idioma y condiciones directamente con el proveedor antes de usarlo.</p> }
    ]
  }
}

export default function InfoPage({ path }: { path: string }) {
  const page = pages[path] || pages['/preguntas-frecuentes']
  return <main className="info-page">
    <nav className="info-nav"><a className="brand" href="/"><span>MARATÓN</span> PARA DOOMSDAY</a><a href="/"><ArrowLeft/> Volver al maratón</a></nav>
    <header className="info-hero"><ShieldCheck weight="duotone"/><h1>{page.title}</h1><p>{page.intro}</p></header>
    <article className="info-content">{page.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.body}</section>)}</article>
    <aside className="info-support"><p>¿Te resulta útil esta guía?</p><a href={SUPPORT_URL} target="_blank" rel="noreferrer"><Heart weight="fill"/> Apoyar en Ko-fi <ArrowUpRight/></a></aside>
    <footer className="info-footer"><a href="/metodologia">Metodología</a><a href="/preguntas-frecuentes">Preguntas frecuentes</a><a href="/privacidad">Privacidad</a><a href="/aviso-legal">Aviso legal</a></footer>
  </main>
}
