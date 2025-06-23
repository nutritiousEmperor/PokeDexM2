const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline-v" + OFFLINE_VERSION;
const OFFLINE_URL = "/view/offline.html";

const ASSETS_TO_CACHE = [
  OFFLINE_URL,
  "/view/images/offline.png",
  "/view/style.css",
  "/view/imports/import.css",
  "/view/imports/import.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS_TO_CACHE);
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Clean up old caches if needed
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );

      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;

          return await fetch(event.request);
        } catch (error) {
          console.warn("Fetch failed; serving offline page instead.", error);
          const cache = await caches.open(CACHE_NAME);
          return await cache.match(OFFLINE_URL);
        }
      })()
    );
  } else {
    // Respond with cache-first for other static assets
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
