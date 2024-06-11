const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/391416d9400f94cd98f9e8ee1d99c59a.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/d8a0de2933f6a975cca9e2b9ce1b5224.data",
    "Build/a81a6252e5f04143d3e8fe073d477d76.wasm",
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
