import { useEffect } from 'react';
import { logger } from '@/lib/logger';

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      // Register service worker
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          logger.info('Service Worker registered:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  if (window.confirm('Nova versão disponível. Recarregar página?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          logger.warn('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          logger.info('Cache updated by service worker');
        }
      });
    }
  }, []);
};