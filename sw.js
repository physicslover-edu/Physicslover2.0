const CACHE_NAME = 'physics-lover-v2'; // ভার্সন বদলে দিলাম যাতে পুরানোটা ডিলিট হয়

self.addEventListener('install', (event) => {
  self.skipWaiting(); // নতুন সার্ভিস ওয়ার্কার সাথে সাথে অ্যাক্টিভেট হবে
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './logo.png'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

