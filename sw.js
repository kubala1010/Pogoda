const CACHE_NAME = 'pogoda-cache-v1';
const urlsToCache = [
  './pogoda.html',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Zwróć plik z pamięci cache, jeśli istnieje (działa bez internetu)
        // Jeśli nie, pobierz go normalnie z sieci
        return response || fetch(event.request);
      })
  );
});
