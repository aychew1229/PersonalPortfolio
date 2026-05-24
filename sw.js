const CACHE_NAME = 'portfolio-v1.4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './profile3.png',
  './Artificial Intelligence Fundamentals.jpg',
  './Android Developer Fundamentals.jpg',
  './Programming Fundamentals.jpg',
  './Data Analysis Fundamentals.jpg',
  './Online Certification Course.jpg',
  './Canva Masterclass.jpg',
  './Graphics Design & Video Editing.jpg',
  './university-specific courses.jpg',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Fraunces:ital,wght@0,300;0,600;1,300&display=swap'
];

// Install: Cache all files and force immediate activation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Forces the waiting service worker to become active
});

// Activate: Clean up old versions of the cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  // Ensure the new SW takes control of the page immediately
  self.clients.claim(); 
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
