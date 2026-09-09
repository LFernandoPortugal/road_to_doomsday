# Maratón para Doomsday

Guía de visionado interactiva para la comunidad latina, inspirada en el objetivo funcional de Road to Doomsday pero con identidad, textos y arte originales.

## Desarrollo

```bash
npm install
npm run dev
```

El catálogo vive en `src/data.ts`. Cada entrada admite `watchLinks` por región (`latam`, `pe`, `co`, `ec`, `mx` y `other`). Solo debe usarse para contenido propio, de dominio público, con licencia de distribución o para enlazar una plataforma oficial.

El apoyo comunitario está conectado a `https://ko-fi.com/falconblade`.

## Publicación gratuita

El sitio es estático y funciona en Vercel, GitHub Pages, Cloudflare Pages o Netlify. No necesita base de datos. El avance queda en `localStorage` y no sale del dispositivo del visitante.

## Video y derechos

No es recomendable usar Google Drive para servir películas comerciales: los enlaces pueden revelar el archivo, agotar cuotas o ser retirados, y poseer una copia no concede derechos de distribución. La opción segura es enlazar proveedores oficiales por país. Para material propio o debidamente licenciado, usar un servicio de video/CDN con límites adecuados y añadir esos enlaces en `src/data.ts`.

## Pendientes antes del lanzamiento

- Revisar años, duraciones y prioridad editorial.
- Añadir enlaces oficiales por título y país cuando estén disponibles.
- Conectar dominio y analítica respetuosa de privacidad si se desea.
# Reproducción de archivos locales

Esta función solo se activa con `npm run dev` y no publica tus archivos en Vercel.

1. Crea la carpeta `public/media/`.
2. Copia allí tus videos, por ejemplo `public/media/iron-man.mp4`.
3. Copia `public/media-links.example.json` como `public/media-links.local.json`.
4. Relaciona el ID del título con su ruta. Los IDs están en `src/data.ts`.
5. Ejecuta `npm run dev` y abre la ficha del título. Aparecerá el reproductor "Biblioteca personal".

Ejemplo:

```json
{
  "iron-man": "/media/iron-man.mp4",
  "loki-1": "/media/loki-temporada-1.mp4"
}
```

Las carpetas y el archivo local están incluidos en `.gitignore` para evitar subir videos o rutas personales por accidente.
