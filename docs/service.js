(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = '4';

  $prefix = 'WIFI-QR';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['/wifi-qr/bundle.0d2a1e6a7f2728caebfa.js', '/wifi-qr/javascripts/index.6826c39a5555602ed6fa.js', '/wifi-qr/javascripts/worker.c6d7474648d703e79648.js', '/wifi-qr/stylesheets/index.01c5a012aeb1af073af8.css', '/wifi-qr/images/icon-152.85033eb51371860f3cfa.png', '/wifi-qr/images/icon-167.fb225094cf8d87ef12f3.png', '/wifi-qr/images/icon-180.5eb5df2f16cbe133de6e.png', '/wifi-qr/images/icon-192.29f319cb88fabe83ff26.png', '/wifi-qr/images/icon-512.1c96c8ca1b2628918cfa.png', '/wifi-qr/pwa.701a9841b79c0debf8e2.js', '/wifi-qr/manifest.webmanifest', '/wifi-qr/index.html', '/wifi-qr/'];

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
