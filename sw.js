const CACHE_NAME = 'portfolio-v2.1';
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
  'https://cdn-icons-png.flaticon.com/512/1999/1999625.png' ,
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
  // Do not put self.skipWaiting() here by itself, wait for the HTML message signal
});

// Activate: Clean up old versions of the cache and claim open clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      // Force control over all open tabs instantly without requiring a manual click
      return self.clients.claim();
    })
  );
});

// Handle incoming message signals from your HTML page safely
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
