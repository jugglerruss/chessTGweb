const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/9e6194adee56f55dcbf3765d29f838d4.loader.js",
    "Build/bf5b27c733d58354c648da05648cc488.framework.js",
    "Build/90f6d2c5b79a56ac13b513640dc5007f.data",
    "Build/2bd47fd6d64935e24594fc288838b2ed.wasm",
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
