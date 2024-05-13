const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/126f996912f49ac60a4951f001ad4c0f.loader.js",
    "Build/1c34e42141c854b11468c74fcb22d112.framework.js",
    "Build/c5add30ec09057b76efd46e117566a17.data",
    "Build/4c95cce5aa5b545241340f20e3be8585.wasm",
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
