const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/7856efb2c96681005d0e183c44110bb6.loader.js",
    "Build/4b7cb99a484662ca05238ce8c0c5ba97.framework.js",
    "Build/364b822149079276364e293bf3172b59.data",
    "Build/a7b0b34f97ed66da5e22bbf8f14e1ca5.wasm",
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
