//PWA

const CACHE_NAME = 'readify-cache-v1';
const urlsToCache = [
  // html
  './',
  'index.html',
  'explorer.html',
  'feedback.html',
  'flow.html',
  'progress.html',
  'recommender.html',

  // css
  'css/navbar.css',
  'css/index.css',
  'css/footer.css',
  'css/loading.css',
  'css/explorer.css',
  'css/feedback.css',
  'css/flow.css',
  'css/progress.css',
  'css/recommender.css',

  // js
  'js/index.js',
  'js/explorer.js',
  'js/feedback.js',
  'js/flow.js',
  'js/loading.js',
  'js/recommender.js',
  'js/reuse.js',
  'js/tracker.js',

  // Favicon & manifest
  '../assets/images/favicon/favicon-16x16.png',
  '../assets/images/favicon/favicon-32x32.png',
  '../assets/images/favicon/favicon-96x96.png',
  '../assets/images/favicon/favicon.ico',
  '../assets/images/favicon/favicon.svg',
  '../assets/images/favicon/apple-touch-icon.png',
  '../assets/images/favicon/icon-192.png',
  '../assets/images/favicon/icon-512.png',
  '../assets/images/favicon/site.webmanifest',

  // background images
  'assets/images/Background/bookexplorer.jpg',
  'assets/images/Background/bookhome.jpg',
  'assets/images/Background/feedback.webp',
  'assets/images/Background/recommender.webp',
  'assets/images/Background/tracker.webp',

  // Audio 
  'assets/audio/Magical-Moments-chosiccom.mp3',
  'assets/audio/Morning-Routine-Lofi-Study-Music.mp3',
  'assets/audio/RELAX-LOFI-chosiccom.mp3',
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/Readify-webapp/index.html').then(response => response || fetch(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)));
    })
  );
});
