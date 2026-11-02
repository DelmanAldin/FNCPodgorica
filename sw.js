const CACHE = 'fnc-podgorica-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './fnc.png',
  './abdulkadirov.png',
  './basbudak.png',
  './bubanja.png',
  './dobrijevic.png',
  './dragojevic.png',
  './ivansicaja.png',
  './kijamet.png',
  './lupu.png',
  './negru.png',
  './niedzielski.png',
  './opacic.png',
  './petrenyi.png',
  './politylo.png',
  './soldatkin.png',
  './sonmez.png',
  './stankovic.png',
  './sufiev.png',
  './tomislavsicaja.png',
  './vargas.png',
  './villalba.png',
  './zdravkovic.png',
  './zlaticanin.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
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
  if (e.request.url.includes('firebasedatabase.app') ||
      e.request.url.includes('googleapis.com') ||
      e.request.url.includes('gstatic.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
