const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/24cb0928bd13ab4dde249a1d2135a570.loader.js",
    "Build/4b7cb99a484662ca05238ce8c0c5ba97.framework.js",
    "Build/00dddea54b711e4e32338a93a9c5caea.data",
    "Build/b3c6a7d9824923c47196bb80dd384a96.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
