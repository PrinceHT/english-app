const CACHE = 'vocab-20260531';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './data/level1/manifest.json',
  './data/level1/part01.json',
  './data/level1/part02.json',
  './data/level1/part03.json',
  './data/level1/part04.json',
  './data/level1/part05.json',
  './data/level1/part06.json',
  './data/level1/part07.json',
  './data/level1/part08.json',
  './data/level1/part09.json',
  './data/level1/part10.json',
  './data/level1/part11.json',
  './data/level1/part12.json',
  './data/level1/part13.json',
  './data/level1/part14.json',
  './data/level1/part15.json',
  './data/level1/part16.json',
  './data/level1/part17.json',
  './data/level1/part18.json',
  './data/level1/part19.json',
  './data/level1/part20.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.filter(a => !a.endsWith('.png') || self.location.origin !== 'null')))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith('http')) return;
  // Only cache same-origin assets — let Firebase/Google APIs go through the browser
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchAndCache = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchAndCache;
    })
  );
});
