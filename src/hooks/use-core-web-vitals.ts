
import { useEffect, useCallback, useState } from 'react';
import { logger } from '@/lib/logger';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface CoreWebVitalsData {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  inp: number | null;
}

export const useCoreWebVitals = () => {
  const [metrics, setMetrics] = useState<CoreWebVitalsData>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  const updateMetric = useCallback((metric: WebVitalMetric) => {
    setMetrics(prev => ({
      ...prev,
      [metric.name.toLowerCase()]: metric.value
    }));

    // Performance monitoring in production
    if (process.env.NODE_ENV === 'development') {
      logger.info(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta
      });
    }

    // Enviar para analytics em produção
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        custom_map: { metric_rating: metric.rating }
      });
    }
  }, []);

  const startMonitoring = useCallback(async () => {
    if (isMonitoring) return;

    try {
      setIsMonitoring(true);
      
      // Import dinâmico para reduzir bundle inicial
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

      // Monitorar Core Web Vitals
      onLCP(updateMetric);
      onINP(updateMetric); // Substitui FID
      onCLS(updateMetric);
      onFCP(updateMetric);
      onTTFB(updateMetric);

      // Otimizações específicas baseadas nos valores
      onLCP((metric) => {
        updateMetric(metric);
        if (metric.value > 2500) {
          logger.warn('LCP needs improvement:', metric.value);
          // Implementar otimizações automáticas
          optimizeLCP();
        }
      });

      onCLS((metric) => {
        updateMetric(metric);
        if (metric.value > 0.1) {
          logger.warn('CLS needs improvement:', metric.value);
          optimizeCLS();
        }
      });

    } catch (error) {
      logger.warn('Failed to load web-vitals:', error);
      setIsMonitoring(false);
    }
  }, [isMonitoring, updateMetric]);

  // Otimizações automáticas
  const optimizeLCP = useCallback(() => {
    // Preload recursos críticos
    const criticalResources = document.querySelectorAll('img[data-priority="high"]');
    criticalResources.forEach((img) => {
      if (img instanceof HTMLImageElement && !img.complete) {
        img.loading = 'eager';
        (img as any).fetchpriority = 'high';
      }
    });
  }, []);

  const optimizeCLS = useCallback(() => {
    // Adicionar aspect-ratio para imagens sem dimensões
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.style.aspectRatio = '16/9';
      }
    });
  }, []);

  useEffect(() => {
    // Iniciar monitoramento após carregamento
    if (document.readyState === 'complete') {
      startMonitoring();
    } else {
      window.addEventListener('load', startMonitoring);
      return () => window.removeEventListener('load', startMonitoring);
    }
  }, [startMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring
  };
};
