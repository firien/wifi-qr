(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = '2';

  $prefix = 'WIFI-QR';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['bundle.3b29b8b3c20b3f77cb81.js', 'javascripts/index.557f5c261b9aca390fc2.js', 'javascripts/worker.c6d7474648d703e79648.js', 'stylesheets/index.1b26e23e94442574f47a.css', 'images/icon-152.85033eb51371860f3cfa.png', 'images/icon-167.fb225094cf8d87ef12f3.png', 'images/icon-180.5eb5df2f16cbe133de6e.png', 'images/icon-192.29f319cb88fabe83ff26.png', 'images/icon-512.1c96c8ca1b2628918cfa.png', 'pwa.ad29d7b873628beaef78.js', 'manifest.webmanifest', 'index.html', '/'];

  self.addEventListener('install', function(event) {
    return event.waitUntil(caches.open($cacheName).then(function(cache) {
      return cache.addAll($urls);
    }));
  });

  clearPreviousCaches = function() {
    return caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(key) {
        return (key !== $cacheName) && key.startsWith($prefix);
      }).map(function(key) {
        return caches.delete(key);
      }));
    });
  };

  self.addEventListener('activate', function(event) {
    return event.waitUntil(clearPreviousCaches());
  });

  self.addEventListener('fetch', function(event) {
    return event.respondWith(caches.open($cacheName).then(function(cache) {
      return cache.match(event.request, {
        ignoreSearch: true
      });
    }).then(function(response) {
      return response || fetch(event.request);
    }));
  });

  self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
      return self.skipWaiting();
    }
  });

}).call(this);
