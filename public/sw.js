const CACHE_NAME = 'nivela-performance-v1.0';
const STATIC_CACHE = 'nivela-static-performance-v1.0';
const DYNAMIC_CACHE = 'nivela-dynamic-performance-v1.0';

// Critical assets for performance
const CRITICAL_ASSETS = [
  '/',
  '/fonts/Wilkysta.woff2',
  '/fonts/Wilkysta.woff',
  '/manifest.json'
];

// Assets for dynamic cache with performance optimization
const CACHE_PATTERNS = [
  /\.(js|css|woff2?|png|jpg|jpeg|svg|webp|mp4)$/,
  /lovable-uploads/,
  /supabase\.co/,
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/
];

// Install event - cache crítico
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        // Caching critical assets
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            // Deleting old cache
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - estratégia híbrida otimizada para mobile
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Cache strategy for different types
  if (CRITICAL_ASSETS.includes(url.pathname)) {
    // Critical assets: Cache First
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    // Assets: Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  } else {
    // Other requests: Network First with fallback
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache strategies
async function cacheFirst(request, cacheName) {
  try {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    const fresh = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (error) {
    // Silent failure for cache
    return new Response('Offline content not available', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(fresh => {
    cache.put(request, fresh.clone());
    return fresh;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

async function networkFirst(request, cacheName) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(cacheName);
    
    // Cache successful responses
    if (fresh.status === 200) {
      cache.put(request, fresh.clone());
    }
    
    return fresh;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response('Network error', { status: 503 });
  }
}

// Background sync para formulários
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    const forms = await getStoredForms();
    for (const form of forms) {
      await submitForm(form);
      await removeStoredForm(form.id);
    }
  } catch (error) {
    // Silent failure for background sync
  }
}

async function getStoredForms() {
  return new Promise((resolve) => {
    const request = indexedDB.open('nivela-forms', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['forms'], 'readonly');
      const store = transaction.objectStore('forms');
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
    };
    request.onerror = () => resolve([]);
  });
}

async function submitForm(formData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.ok;
}

async function removeStoredForm(formId) {
  return new Promise((resolve) => {
    const request = indexedDB.open('nivela-forms', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['forms'], 'readwrite');
      const store = transaction.objectStore('forms');
      store.delete(formId);
      transaction.oncomplete = () => resolve();
    };
    request.onerror = () => resolve();
  });
}

// Web Vitals monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'REPORT_VITALS') {
    // Silent vitals reporting
  }
});
