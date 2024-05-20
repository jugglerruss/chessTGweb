const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/b5b481e7c2efe83d10dc99458eaf965b.loader.js",
    "Build/5b43144c596b313a5677c1b2768f9a69.framework.js",
    "Build/85bdefe7d7fab27d4592edf663d9f47c.data",
    "Build/22b02a80c371760f463cc959ab0aa0ed.wasm",
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
