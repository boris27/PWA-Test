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
    return self.clients.claim();
});

self.addEventListener('fetch', (e)=> {
   e.respondWith(
       caches.match(e.request)
           .then( (response)=> response || fetch(e.request) )
   )
});

self.addEventListener('push', (e)=> {
   const title = 'PWA Test push message';
   const options = {
       body : e.data.json(),
       icon: 'img/icon.png',
       tag: 'first-msg',
       renotify: true,
       silent: false,
       data: 'my-data'
   };

   self.registration.showNotification(title, options);
});
