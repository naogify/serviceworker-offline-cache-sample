// sw.js — 超ミニマム（オフラインFallbackのみ）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((c) => c.addAll(['/offline.html']))
  );
  self.skipWaiting();
});

// ページ遷移だけをフック
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match('/offline.html'))

    // NOTE: 以下のようにして任意のテキストを返すことも可能
    // new Response('Hello from Service Worker', {
    //   headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    // })
  );
});
