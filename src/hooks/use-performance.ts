
import { useEffect, useState, useCallback } from 'react';
import { useSmartCache } from './performance/use-smart-cache';
import { useMemoryMonitor } from './performance/use-memory-monitor';
import { useFrameRateMonitor } from './performance/use-frame-rate-monitor';
import { useRenderTimer } from './performance/use-render-timer';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  frameRate: number;
  cacheHitRate: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    frameRate: 60,
    cacheHitRate: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const { cacheData, getCachedData, clearCache, getCacheHitRate } = useSmartCache();
  const { memoryUsage, getMemoryUsage, updateMemoryUsage } = useMemoryMonitor();
  const { frameRate, monitorFrameRate } = useFrameRateMonitor();
  const { measureRenderTime } = useRenderTimer();

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    
    // Measure load time
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    // Start frame rate monitoring
    const cleanup = monitorFrameRate();

    // Update metrics every second
    const metricsInterval = setInterval(() => {
      updateMemoryUsage();
      const cacheHitRate = getCacheHitRate();
      
      setMetrics(prev => ({
        ...prev,
        memoryUsage,
        frameRate,
        cacheHitRate
      }));
    }, 1000);

    return () => {
      cleanup();
      clearInterval(metricsInterval);
      setIsMonitoring(false);
    };
  }, [monitorFrameRate, updateMemoryUsage, getCacheHitRate, memoryUsage, frameRate]);

  useEffect(() => {
    if (isMonitoring) {
      return startMonitoring();
    }
  }, [isMonitoring, startMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring: () => setIsMonitoring(true),
    stopMonitoring: () => setIsMonitoring(false),
    measureRenderTime,
    cacheData,
    getCachedData,
    clearCache,
    getMemoryUsage
  };
};
