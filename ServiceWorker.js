const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/8361e0e132c453175032574d31286265.loader.js",
    "Build/5b43144c596b313a5677c1b2768f9a69.framework.js",
    "Build/4424a5f01ee65c34401ad3cb6d14824d.data",
    "Build/beca5a28bfd90b690cb7988f465dc3de.wasm",
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
