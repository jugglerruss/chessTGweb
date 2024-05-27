const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/71a44d4831b7b8343f394fb99b28e86a.loader.js",
    "Build/299fe1496e6478071d5f3ccc11c6bb35.framework.js",
    "Build/6e6c7f356fea6446041c0d040404bb55.data",
    "Build/6823da409b4b96c3f903200f0c14b002.wasm",
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
