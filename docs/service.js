const tag = '10';
const $prefix = 'WIFI-QR';
const $cacheName = `${$prefix}-${tag}`;

const $urls = [
  
  '/wifi-qr/bundle.daf1911dd8f80c2e6be3.js',
  
  '/wifi-qr/javascripts/index.46f0cc388fe877dffc90.js',
  
  '/wifi-qr/stylesheets/index.05de6fb592343778cb35.css',
  
  '/wifi-qr/images/icon-152.66f47ef3afd38b1c0df8.png',
  
  '/wifi-qr/images/icon-167.203a1acd0aaf256b7f70.png',
  
  '/wifi-qr/images/icon-180.339b8ed031f52d5f0abe.png',
  
  '/wifi-qr/images/icon-192.01d21872e8880d9f5b6f.png',
  
  '/wifi-qr/images/icon-512.fa905a7bad166d5a9bc4.png',
  
  '/wifi-qr/pwa.2c3bccaa9a5e0b649e9a.js',
  
  '/wifi-qr/manifest.webmanifest',
  
  '/wifi-qr/index.html',
  
  '/wifi-qr/',
  
];

self.addEventListener('install', async (event) => {
  let cache = await event.waitUntil(caches.open($cacheName));
  await cache.addAll($urls);
})

const clearPreviousCaches = async () => {
  let keys = await caches.keys()
  keys = keys.filter((key) => {
    return (key != $cacheName) && key.startsWith($prefix)
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
    caches.open($cacheName).then((cache) => {
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
