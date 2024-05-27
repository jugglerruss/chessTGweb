const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/dac9f639f390f2a4b2a9989cc5797810.loader.js",
    "Build/b1afa588990ed0bf905093ee66e262f4.framework.js",
    "Build/7da2857ed6b12cbdd7a0d9a8ab51cebf.data",
    "Build/b0a24774289d403e1e60d5fe6c1ed0c4.wasm",
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
