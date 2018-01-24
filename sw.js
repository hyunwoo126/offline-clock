//may need to add polyfill for cache

self.addEventListener('install', function(e){
    console.log('service worker install event');
    e.waitUntil(
      caches.open('offline-clock').then(function(cache){
        return cache.addAll([
          '/',
          '/index.html',
        ]);
      })
    );
});

//intercept all request and return cached version, if exists
self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    console.log('online status ', navigator.onLine);
    
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});