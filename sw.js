const CACHE = 'daron-solide-v1';
const ASSETS = [
  '/DARON-SOLIDE-APP/',
  '/DARON-SOLIDE-APP/index.html',
  '/DARON-SOLIDE-APP/manifest.json',
  '/DARON-SOLIDE-APP/icon-192.png',
  '/DARON-SOLIDE-APP/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
