/**
 * Deploy Optimization Utilities
 * Funções para otimizar a aplicação antes do deploy
 */

// Remove todos os console.log/warn/error em produção
export const removeProductionLogs = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.debug = () => {};
    console.info = () => {};
  }
};

// Preload de recursos críticos
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png',
    '/lovable-uploads/9fbb7ab3-afc7-45bd-bbaf-6bbe40892873.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// Otimização de performance para mobile
export const optimizeMobilePerformance = () => {
  // Lazy loading de imagens
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.loading = 'lazy';
      img.decoding = 'async';
    }
  });

  // Touch delay otimization
  document.documentElement.style.touchAction = 'manipulation';
};

// Validação de URLs críticas
export const validateCriticalUrls = () => {
  const criticalUrls = [
    'https://xnexfhgtqlryfkyuvihq.supabase.co/storage/v1/object/public/videos/tecnologia-oficial-compactado.mp4',
    'https://xnexfhgtqlryfkyuvihq.supabase.co/storage/v1/object/public/videos/sample-demo.mp4'
  ];

  return Promise.allSettled(
    criticalUrls.map(url => 
      fetch(url, { method: 'HEAD' })
        .then(response => ({ url, status: response.status, ok: response.ok }))
        .catch(error => ({ url, error: error.message, ok: false }))
    )
  );
};

// Otimização de fontes
export const optimizeFonts = () => {
  // Font display swap para melhor performance
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    const url = new URL(link.getAttribute('href') || '');
    if (!url.searchParams.has('display')) {
      url.searchParams.append('display', 'swap');
      link.setAttribute('href', url.toString());
    }
  });
};

// Inicialização das otimizações
export const initializeOptimizations = () => {
  // Remove logs em produção
  removeProductionLogs();
  
  // Otimizações após DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeMobilePerformance();
      optimizeFonts();
    });
  } else {
    preloadCriticalResources();
    optimizeMobilePerformance();
    optimizeFonts();
  }

  // Validação de URLs críticas em background
  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      validateCriticalUrls().then(results => {
        const failed = results.filter(result => 
          result.status === 'rejected' || 
          (result.status === 'fulfilled' && !result.value.ok)
        );
        
        if (failed.length > 0) {
          // Reportar erros de URLs críticas para monitoramento
          console.warn('Critical URLs validation failed:', failed);
        }
      });
    }, 5000);
  }
};