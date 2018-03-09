var cacheName = 'app-cache-shell-v1';
var filesToCache = [ 'index.html' , 'main.js', 'manifest.json'];

self.addEventListener('install', (e)=> {
  e.waitUntil(
      caches.open(cacheName)
          .then( (cache)=> {
              console.log(cache);
              cache.addAll(filesToCache)
          })
          .then( (e)=> {
              console.log(e);
              self.skipWaiting();
          })
  );
});