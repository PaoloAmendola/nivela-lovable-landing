import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadConfig {
  images: string[];
  scripts: string[];
  styles: string[];
  routes: string[];
  priority: 'high' | 'low';
}

const preloadConfigs: Record<string, PreloadConfig> = {
  '/': {
    images: [
      '/assets/hero-product.jpg',
      '/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png'
    ],
    scripts: [],
    styles: [],
    routes: ['/contato', '/distribuidor'],
    priority: 'high'
  },
  '/contato': {
    images: [],
    scripts: [],
    styles: [],
    routes: ['/'],
    priority: 'low'
  }
};

export const usePreloadStrategy = () => {
  const location = useLocation();

  const preloadResource = useCallback((url: string, type: 'image' | 'script' | 'style' | 'fetch', priority: 'high' | 'low' = 'low') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.fetchPriority = priority;

    switch (type) {
      case 'image':
        link.as = 'image';
        break;
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'fetch':
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
        break;
    }

    // Evitar duplicatas
    const existing = document.querySelector(`link[href="${url}"]`);
    if (!existing) {
      document.head.appendChild(link);
    }
  }, []);

  const preloadRoute = useCallback((route: string) => {
    // Preload de rotas usando module preload
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = route;
    
    const existing = document.querySelector(`link[href="${route}"]`);
    if (!existing) {
      document.head.appendChild(link);
    }
  }, []);

  const preloadImagesOnHover = useCallback(() => {
    const links = document.querySelectorAll('a[href^="/"], button[data-route]');
    
    links.forEach(link => {
      const handleMouseEnter = () => {
        const href = link.getAttribute('href') || link.getAttribute('data-route');
        if (href && preloadConfigs[href]) {
          const config = preloadConfigs[href];
          
          // Preload imagens da próxima rota
          config.images.forEach(img => {
            preloadResource(img, 'image', config.priority);
          });
          
          // Preload scripts da próxima rota
          config.scripts.forEach(script => {
            preloadResource(script, 'script', config.priority);
          });
        }
      };

      link.addEventListener('mouseenter', handleMouseEnter, { once: true });
    });
  }, [preloadResource]);

  const preloadCriticalResources = useCallback(() => {
    const currentConfig = preloadConfigs[location.pathname];
    if (!currentConfig) return;

    // Preload recursos críticos
    currentConfig.images.forEach(img => {
      preloadResource(img, 'image', 'high');
    });

    currentConfig.scripts.forEach(script => {
      preloadResource(script, 'script', 'high');
    });

    currentConfig.styles.forEach(style => {
      preloadResource(style, 'style', 'high');
    });

    // Preload próximas rotas prováveis
    currentConfig.routes.forEach(route => {
      preloadRoute(route);
    });
  }, [location.pathname, preloadResource, preloadRoute]);

  const preloadOnUserInteraction = useCallback(() => {
    const events = ['mousedown', 'touchstart'];
    
    const handleInteraction = () => {
      // Preload recursos adicionais quando usuário interage
      const config = preloadConfigs[location.pathname];
      if (config) {
        config.routes.forEach(route => {
          if (preloadConfigs[route]) {
            preloadConfigs[route].images.forEach(img => {
              preloadResource(img, 'image', 'low');
            });
          }
        });
      }

      // Remove listeners após primeira interação
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });
  }, [location.pathname, preloadResource]);

  // Preload baseado em viewport
  const preloadOnIntersection = useCallback(() => {
    const sections = document.querySelectorAll('section[data-preload]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const preloadData = entry.target.getAttribute('data-preload');
            if (preloadData) {
              try {
                const resources = JSON.parse(preloadData);
                resources.forEach((resource: { url: string; type: string }) => {
                  preloadResource(resource.url, resource.type as any, 'low');
                });
              } catch (error) {
                console.warn('Invalid preload data:', preloadData);
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [preloadResource]);

  useEffect(() => {
    // Preload recursos críticos da rota atual
    preloadCriticalResources();
    
    // Setup preload on hover
    const timeoutId = setTimeout(preloadImagesOnHover, 1000);
    
    // Setup preload on user interaction
    preloadOnUserInteraction();
    
    // Setup preload on intersection
    const cleanup = preloadOnIntersection();

    return () => {
      clearTimeout(timeoutId);
      cleanup?.();
    };
  }, [location.pathname, preloadCriticalResources, preloadImagesOnHover, preloadOnUserInteraction, preloadOnIntersection]);

  return {
    preloadResource,
    preloadRoute
  };
};