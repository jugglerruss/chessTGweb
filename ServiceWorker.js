const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/d9493f62d3a2b94a0f338ebcbd1f1ae1.loader.js",
    "Build/4b7cb99a484662ca05238ce8c0c5ba97.framework.js",
    "Build/89b4334c71ce91035a5bf94f1816c8a5.data",
    "Build/8c02e5e1f0c99df051f7538bb0304aef.wasm",
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
