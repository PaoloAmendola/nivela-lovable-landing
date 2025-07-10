
import { useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface WebVitalsConfig {
  reportAllChanges?: boolean;
  onMetric?: (metric: WebVitalMetric) => void;
}

export const useWebVitals = (config: WebVitalsConfig = {}) => {
  const { reportAllChanges = true, onMetric } = config;

  const getPerformanceRating = useCallback((name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      FID: { good: 100, poor: 300 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }, []);

  const reportMetric = useCallback((metric: WebVitalMetric) => {
    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true
      });
    }

    // Custom handler
    onMetric?.(metric);

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      logger.info(`[Web Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
    }
  }, [onMetric]);

  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    // CLS Observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          reportMetric({
            name: 'CLS',
            value: clsValue,
            rating: getPerformanceRating('CLS', clsValue),
            delta: (entry as any).value,
            id: 'cls-' + Date.now()
          });
        }
      }
    });

    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      reportMetric({
        name: 'LCP',
        value: lastEntry.startTime,
        rating: getPerformanceRating('LCP', lastEntry.startTime),
        delta: lastEntry.startTime,
        id: 'lcp-' + Date.now()
      });
    });

    // FCP Observer
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric({
            name: 'FCP',
            value: entry.startTime,
            rating: getPerformanceRating('FCP', entry.startTime),
            delta: entry.startTime,
            id: 'fcp-' + Date.now()
          });
        }
      }
    });

    // Start observing
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    fcpObserver.observe({ type: 'paint', buffered: true });

    return () => {
      clsObserver.disconnect();
      lcpObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, [reportMetric, getPerformanceRating]);

  return {
    reportMetric
  };
};
