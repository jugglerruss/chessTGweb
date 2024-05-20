const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/8e13e18b9ca19ca1632c77334ccf5af2.loader.js",
    "Build/5b43144c596b313a5677c1b2768f9a69.framework.js",
    "Build/e631963b693c2a0b847f71b92079c758.data",
    "Build/a00a2f7ea427afa3428e050633d573eb.wasm",
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
