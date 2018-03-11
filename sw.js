var cacheName = 'app-cache-shell-v2';
var filesToCache = [ 'index.html' , 'main.js', 'manifest.json'];

self.addEventListener('install', (e)=> {
    console.log('installing sw');
  e.waitUntil(
      caches.open(cacheName)
          .then( (cache)=> {
              cache.addAll(filesToCache)
          })
          .then( ()=> {
              self.skipWaiting();
          })
  );
});

self.addEventListener('activate', (e)=> {
    console.log('activate sw');
    e.waitUntil(
      caches.keys().then( (keyList)=> Promise.all(keyList.map( (key)=> {
          if (key !== cacheName) {
              return caches.delete(key);
          }
      } )))
    );
    return self.clients.claim();
});

/*
self.addEventListener('fetch', (e)=> {
    console.log(e);
   e.respondWith(
       caches.match(e.request)
           .then( (response)=> response || fetch(e.request).catch((err)=> console.log(err)) )
   )
});*/
