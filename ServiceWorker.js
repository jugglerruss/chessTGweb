const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/20feaaeadf4bec450f7f23778ecf1f73.loader.js",
    "Build/5b43144c596b313a5677c1b2768f9a69.framework.js",
    "Build/8a63e7f0be26d02715dfc647c13829f4.data",
    "Build/67590b01eefd007e4e2b638f910b5c20.wasm",
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
