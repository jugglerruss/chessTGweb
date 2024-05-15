const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/0070ba39a5d30e346517fa64faa8c9c2.loader.js",
    "Build/1c34e42141c854b11468c74fcb22d112.framework.js",
    "Build/3742b0b2bfce628cffb8e36f4fd1838c.data",
    "Build/b073e811a39b524938e19c1c63f0c3bd.wasm",
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
