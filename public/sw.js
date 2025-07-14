// Minimal Service Worker - Disabled to prevent production loading issues
// This file exists only to prevent 404 errors for existing registrations

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass through all requests - no caching
  event.respondWith(fetch(event.request));
});