const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/0e9d7f2c6c1d13b0bb97515b5ccf6510.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/76e56719f22a3e35782058da26e493e1.data",
    "Build/cb631ec68ce8424567b9e6cbdd28f98b.wasm",
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
