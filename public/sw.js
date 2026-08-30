const CACHE = 'maraton-doomsday-v4'

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (event.request.method === 'GET' && response.ok && new URL(event.request.url).origin === self.location.origin) {
        const copy = response.clone()
        caches.open(CACHE).then(cache => cache.put(event.request, copy))
      }
      return response
    }))
  )
})
