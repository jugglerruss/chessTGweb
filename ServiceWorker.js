const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/127d472188e3759a84423f74d72ee2fa.loader.js",
    "Build/07f93919c608d6da39db4fade8ffb324.framework.js",
    "Build/3cf127030613e79f4fdb58e587cf49b2.data",
    "Build/92e7fec4b607f8edb5a02f9477a4ffbf.wasm",
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
