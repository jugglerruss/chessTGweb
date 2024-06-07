const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/eb6a36f50e9be3d2421cd74b75b3940f.loader.js",
    "Build/4b7cb99a484662ca05238ce8c0c5ba97.framework.js",
    "Build/5e67a3bd731f9ffef6848bd52ecd3f68.data",
    "Build/d53d8c6a429211ec5226f9925ae56e5c.wasm",
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
