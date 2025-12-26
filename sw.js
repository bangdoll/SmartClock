const CACHE_NAME = 'smart-clock-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png'
];

// Install event - cache app files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching app files');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Only cache same-origin requests (not API calls)
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        // Return cached version
                        return response;
                    }
                    // Fetch from network and cache
                    return fetch(event.request).then((response) => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        // Clone and cache the response
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    });
                })
                .catch(() => {
                    // Offline fallback - return cached index.html
                    return caches.match('/index.html');
                })
        );
    } else {
        // For external requests (APIs), try network first
        event.respondWith(
            fetch(event.request).catch(() => {
                // API calls fail silently when offline
                return new Response(JSON.stringify({ error: 'offline' }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
    }
});
