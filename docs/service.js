const tag = '1';
const prefix = 'WIFI-QR';
const cacheName = `${prefix}-${tag}`;

const urls = [
  "/wifi-qr/javascripts/index-QORYYG7Q.js.map",
  "/wifi-qr/javascripts/index-QORYYG7Q.js",
  "/wifi-qr/stylesheets/index-QP2AH4VW.css.map",
  "/wifi-qr/stylesheets/index-QP2AH4VW.css",
  "/wifi-qr/images/icon-152-YPJW54XW.png",
  "/wifi-qr/images/icon-167-7PH5PONM.png",
  "/wifi-qr/images/icon-180-36LXCBYR.png",
  "/wifi-qr/images/icon-192-LZYI3CPO.png",
  "/wifi-qr/images/icon-512-UXGKNZA6.png",
  "/wifi-qr/index.html",
  "/wifi-qr/"
];

self.addEventListener('install', async (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll(urls);
  }))
})

const clearPreviousCaches = async () => {
  let keys = await caches.keys()
  keys = keys.filter((key) => {
    return (key != cacheName) && key.startsWith(prefix)
  })
  for (let key of keys) {
   await caches.delete(key);
  }
}

self.addEventListener('activate', (event) => {
  return event.waitUntil(clearPreviousCaches())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request, {ignoreSearch: true})
    }).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
})
