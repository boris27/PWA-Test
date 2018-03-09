var cacheName = 'app-cache-shell-v1';
var filesToCache = [ 'index.html' , 'main.js', 'manifest.json'];

self.addEventListener('install', (e)=> {
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
    e.waitUntil(
      caches.keys().then( (keyList)=> Promise.all(keyList.map( (key)=> {
          if (key !== cacheName) {
              return caches.delete(key);
          }
      } )))
    );
    console.log(self);
    return self.clients.claim();
});