const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/0282d4062163af3cb77aa45e2dafd6d9.loader.js",
    "Build/4b7cb99a484662ca05238ce8c0c5ba97.framework.js",
    "Build/45961df31bbae657aa4da3c38d9ca990.data",
    "Build/edb38dd00da227de2b5eb153952ed241.wasm",
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
