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
   let reqClone = e.request.clone();
   e.respondWith(
       fetch(e.request).then( (res)=> {
         let resClone = res.clone();
         if (res.status === 200) {
            caches.open(cacheName)
                .then((cache)=> {
                    if(cache.delete(e.request)) {
                        cache.put(e.request, resClone)
                    }
                });
            return res
         } else {
            return caches.match(reqClone).then( (res)=> res)
         }
       })
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
