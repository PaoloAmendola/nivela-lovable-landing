import { useEffect, useState } from 'react';

interface LoadingMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  cls: number | null; // Cumulative Layout Shift
  fid: number | null; // First Input Delay
}

/**
 * Hook para otimizar carregamento da página
 * Meta: < 3 segundos para carregamento completo
 */
export const useLoadingOptimization = () => {
  const [metrics, setMetrics] = useState<LoadingMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null
  });

  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Web Vitals measurement
    const measurePerformance = () => {
      // First Contentful Paint
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
      }

      // Largest Contentful Paint
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      
      if ('PerformanceObserver' in window) {
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.log('LCP measurement not supported');
        }
      }

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });

      if ('PerformanceObserver' in window) {
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('CLS measurement not supported');
        }
      }

      return () => {
        observer.disconnect();
        clsObserver.disconnect();
      };
    };

    const cleanup = measurePerformance();

    // Otimizações automáticas
    const optimizeLoading = () => {
      // Preload critical resources
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      
      // Critical CSS inlining
      const criticalStyles = `
        .hero-section { display: block; }
        .btn-premium-primary { background: hsl(23 75% 35%); color: white; }
        .gradient-text { background: linear-gradient(135deg, hsl(23 75% 35%), hsl(30 25% 71%)); }
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = criticalStyles;
      document.head.appendChild(styleSheet);

      setIsOptimized(true);
    };

    // Delay otimizações para não bloquear renderização inicial
    setTimeout(optimizeLoading, 100);

    return cleanup;
  }, []);

  const getPerformanceGrade = (): 'A' | 'B' | 'C' | 'D' => {
    const { fcp, lcp, cls } = metrics;
    
    if (!fcp || !lcp || cls === null) return 'C';
    
    const fcpGood = fcp < 1200; // < 1.2s
    const lcpGood = lcp < 2500; // < 2.5s  
    const clsGood = cls < 0.1;   // < 0.1
    
    const goodCount = [fcpGood, lcpGood, clsGood].filter(Boolean).length;
    
    if (goodCount === 3) return 'A';
    if (goodCount === 2) return 'B';
    if (goodCount === 1) return 'C';
    return 'D';
  };

  return {
    metrics,
    isOptimized,
    performanceGrade: getPerformanceGrade(),
    isTargetMet: metrics.fcp !== null && metrics.fcp < 3000 // Meta: < 3s
  };
};