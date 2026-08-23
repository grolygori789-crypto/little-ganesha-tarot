'use strict';

const BUILD = '0.13.0';
const CACHE_PREFIX = 'little-ganesha-tarot-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-${BUILD}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-${BUILD}`;

const scopeURL = self.registration.scope;
const url = (path) => new URL(path, scopeURL).href;

const APP_SHELL = [
  url('./'),
  url('index.html'),
  url('manifest.webmanifest?v=0.13.0'),
  url('css/app.css?v=0.13.0'),
  url('css/reading.css?v=0.13.0'),
  url('css/three-card-viewer.css?v=0.13.0'),
  url('css/golden-path.css?v=0.13.0'),
  url('css/obstacle.css?v=0.13.0'),
  url('css/focus-status.css?v=0.13.0'),
  url('css/profile-home.css?v=0.13.0'),
  url('css/hindi.css?v=0.13.0'),
  url('css/lucky.css?v=0.13.0'),
  url('css/tarot-library.css?v=0.13.0'),
  url('css/journal.css?v=0.13.0'),
  url('css/read-hub.css?v=0.13.0'),
  url('css/support.css?v=0.13.0'),
  url('js/pwa.js?v=0.13.0'),
  url('js/audio.js?v=0.13.0'),
  url('js/profile-details.js?v=0.13.0'),
  url('js/app.js?v=0.13.0'),
  url('js/reading-content.js?v=0.13.0'),
  url('js/hindi-content.js?v=0.13.0'),
  url('js/reading-engine.js?v=0.13.0'),
  url('js/reading-day.js?v=0.13.0'),
  url('js/reading-export.js?v=0.13.0'),
  url('js/deck-ritual.js?v=0.13.0'),
  url('js/three-narrative.js?v=0.13.0'),
  url('js/three-focus-narrative.js?v=0.13.0'),
  url('js/question-guard.js?v=0.13.0'),
  url('js/hindi-guard.js?v=0.13.0'),
  url('js/ask-content.js?v=0.13.0'),
  url('js/question-analyzer.js?v=0.13.0'),
  url('js/hindi-analyzer.js?v=0.13.0'),
  url('js/question-contract.js?v=0.13.0'),
  url('js/ask-context.js?v=0.13.0'),
  url('js/ask-semantic.js?v=0.13.0'),
  url('js/ask-storage.js?v=0.13.0'),
  url('js/hindi-storage.js?v=0.13.0'),
  url('js/reading-ui.js?v=0.13.0'),
  url('js/ask-export.js?v=0.13.0'),
  url('js/ask-ui.js?v=0.13.0'),
  url('js/three-export.js?v=0.13.0'),
  url('js/three-storage.js?v=0.13.0'),
  url('js/three-ui.js?v=0.13.0'),
  url('js/three-card-viewer.js?v=0.13.0'),
  url('js/golden-narrative.js?v=0.13.0'),
  url('js/golden-storage.js?v=0.13.0'),
  url('js/golden-export.js?v=0.13.0'),
  url('js/golden-ui.js?v=0.13.0'),
  url('js/golden-card-viewer.js?v=0.13.0'),
  url('js/obstacle-narrative.js?v=0.13.0'),
  url('js/obstacle-storage.js?v=0.13.0'),
  url('js/obstacle-export.js?v=0.13.0'),
  url('js/obstacle-ui.js?v=0.13.0'),
  url('js/obstacle-card-viewer.js?v=0.13.0'),
  url('js/hindi-narratives.js?v=0.13.0'),
  url('js/hindi-runtime.js?v=0.13.0'),
  url('js/hindi-export.js?v=0.13.0'),
  url('js/lucky-content.js?v=0.13.0'),
  url('js/lucky-storage.js?v=0.13.0'),
  url('js/lucky-machine.js?v=0.13.0'),
  url('js/lucky-sfx.js?v=0.13.0'),
  url('js/lucky-export.js?v=0.13.0'),
  url('js/lucky-ui.js?v=0.13.0'),
  url('js/tarot-library-content.js?v=0.13.0'),
  url('js/tarot-library-ui.js?v=0.13.0'),
  url('js/journal-content.js?v=0.13.0'),
  url('js/journal-storage.js?v=0.13.0'),
  url('js/journal-capture.js?v=0.13.0'),
  url('js/journal-ui.js?v=0.13.0'),
  url('js/read-hub.js?v=0.13.0'),
  url('js/support.js?v=0.13.0'),
  url('data/AUDIO_MANIFEST_V1.json'),
  url('assets/ui/title-hero.png'),
  url('assets/ui/card-back.png'),
  url('assets/support/promptpay-qr.png?v=0.13.0'),
  url('assets/icons/icon-192x192.png?v=0.13.0'),
  url('assets/icons/icon-512x512.png?v=0.13.0'),
  url('assets/icons/icon-maskable-512x512.png?v=0.13.0'),
  url('assets/icons/apple-touch-icon.png?v=0.13.0'),
  url('assets/icons/favicon-48x48.png?v=0.13.0'),
  url('assets/icons/favicon-32x32.png?v=0.13.0'),
  url('assets/icons/favicon.ico?v=0.13.0'),
  url('assets/motifs/daily-halo.svg'),
  url('assets/motifs/ask-ganesha.svg'),
  url('assets/motifs/three-cards.svg'),
  url('assets/motifs/golden-path.svg'),
  url('assets/motifs/release-knot.svg'),
  url('assets/motifs/lucky-numbers.svg'),
  url('assets/motifs/card-library.svg'),
  url('assets/motifs/journal-lotus.svg')
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    // addAll is deliberately used as a release gate: a broken core asset path
    // should fail installation instead of silently producing a partial shell.
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith(CACHE_PREFIX) && name !== SHELL_CACHE && name !== RUNTIME_CACHE)
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch (_) {
    const cached = await cache.match(request) || await caches.match(request);
    if (cached) return cached;
    throw _;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request) || await caches.match(request);
  const networkPromise = fetch(request).then((response) => {
    if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
    return response;
  }).catch(() => null);

  if (cached) {
    // Start revalidation immediately but return the cached asset without delay.
    networkPromise.catch(() => {});
    return cached;
  }

  return (await networkPromise) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const requestURL = new URL(request.url);

  // Do not interfere with cross-origin font/CDN requests or HTTP range requests
  // used by streaming audio/video. Those should remain browser/network managed.
  if (requestURL.origin !== self.location.origin || request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await networkFirst(request);
      } catch (_) {
        return (await caches.match(url('index.html'))) || (await caches.match(url('./'))) || Response.error();
      }
    })());
    return;
  }

  const destination = request.destination;
  if (destination === 'script' || destination === 'style' || requestURL.pathname.endsWith('.webmanifest')) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (destination === 'image' || destination === 'font') {
    event.respondWith(staleWhileRevalidate(request));
  }
});
