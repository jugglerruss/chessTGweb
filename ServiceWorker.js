const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/603f103284b2ff2bd33311f5c7a73c84.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/5dd43f831d707a0629f9ce3f1c09e570.data",
    "Build/32adbefcea82f53fe19a74f8b66c9dd2.wasm",
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
