//may need to add polyfill for cache

self.addEventListener('install', function(e){
    console.log('INSTALL event');
    e.waitUntil(
      caches.open('offline-clock').then(function(cache){
        return cache.addAll([
          '',
          'index.html',
          'index.css',
          'moment.js',
        ]);
      })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Finally active. Ready to start serving content!');  
});


//intercept all request and return cached version, if exists
self.addEventListener('fetch', function(event) {
    console.log('online: ',navigator.onLine);
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

