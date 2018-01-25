var offlineCache = 'cache-v1';

function addCache(){
    return caches.open(offlineCache).then(function(cache){
        return cache.addAll([
            '/',
            'index.html',
            'index.css',
            'moment.js',
            'manifest.json',
        ]);
    });
}

function clearCache(){
    return caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
                return true;
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
    });
}

//may need to add polyfill for cache

self.addEventListener('install', function(e){
    console.log('--------------INSTALL event----------------');
    //e.waitUntil(clearCache());
});



self.addEventListener('activate', function(e){
    console.log('-------------ACTIVATE event---------------');
    e.waitUntil(addCache());    
});

//intercept all request and return cached version, if exists
self.addEventListener('fetch', function(event) {
    //console.log('online: ',navigator.onLine);
    //console.log(event.request.url);



    event.respondWith(
        caches.match(event.request).then(function(response){
            caches.open(offlineCache).then(function(cache){
                console.log('cache updated: ',event.request.url);
                return cache.add(event.request);
            });


            if(response){
                console.log('cache exists');
                return response;
            }else{
                console.log('no catch, asset fetched');
                return fetch(event.request);
            }
        })
    );
});

