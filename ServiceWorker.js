const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/bf5d45126b2b89cf0f19aa0492ba9715.loader.js",
    "Build/1c34e42141c854b11468c74fcb22d112.framework.js",
    "Build/fcbe838677ed190296186e056c4fbd05.data",
    "Build/f49e79ce0041788777f17936bb4e2976.wasm",
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
