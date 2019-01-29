(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = '7';

  $prefix = 'WIFI-QR';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['/wifi-qr/bundle.0d2a1e6a7f2728caebfa.js', '/wifi-qr/javascripts/index.96b2a779aedc7780e783.js', '/wifi-qr/stylesheets/index.16d18585872ed907a5ac.css', '/wifi-qr/images/icon-152.66f47ef3afd38b1c0df8.png', '/wifi-qr/images/icon-167.203a1acd0aaf256b7f70.png', '/wifi-qr/images/icon-180.339b8ed031f52d5f0abe.png', '/wifi-qr/images/icon-192.01d21872e8880d9f5b6f.png', '/wifi-qr/images/icon-512.fa905a7bad166d5a9bc4.png', '/wifi-qr/pwa.701a9841b79c0debf8e2.js', '/wifi-qr/manifest.webmanifest', '/wifi-qr/index.html', '/wifi-qr/'];

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
