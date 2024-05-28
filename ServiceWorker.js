const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/38346bc50cd3a13dafb44981b0194708.loader.js",
    "Build/b1afa588990ed0bf905093ee66e262f4.framework.js",
    "Build/cf65d22db5412fceaf77a134c3a68299.data",
    "Build/8f8ad014c24eb0a487b1c1470441a194.wasm",
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
