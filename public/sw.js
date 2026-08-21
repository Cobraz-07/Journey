// Minimal lightweight Service Worker for Journey PWA Installability
const CACHE_NAME = "journey-pwa-v1";

self.addEventListener("install", (_event) => {
    // Activate immediately
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Network-first without caching dynamic Firebase or API requests
self.addEventListener("fetch", (_event) => {
    // Let browser handle requests normally
    return;
});
