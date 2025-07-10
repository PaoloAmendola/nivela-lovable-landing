
import { usePerformance } from '@/hooks/use-performance';

export const usePerformanceMetrics = () => {
  const { metrics } = usePerformance();

  const getPerformanceStatus = (value: number, thresholds: { good: number; warning: number }): 'good' | 'warning' | 'poor' => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.warning) return 'warning';
    return 'poor';
  };

  const formatBytes = (bytes: number) => `${bytes.toFixed(1)} MB`;
  const formatTime = (ms: number) => `${ms.toFixed(2)} ms`;

  const metricsData = [
    {
      title: 'Load Time',
      value: formatTime(metrics.loadTime),
      status: getPerformanceStatus(metrics.loadTime, { good: 1000, warning: 3000 }),
      description: 'Initial page load performance'
    },
    {
      title: 'Render Time',
      value: formatTime(metrics.renderTime),
      status: getPerformanceStatus(metrics.renderTime, { good: 16, warning: 33 }),
      description: 'Component render duration'
    },
    {
      title: 'Memory Usage',
      value: formatBytes(metrics.memoryUsage),
      status: getPerformanceStatus(metrics.memoryUsage, { good: 50, warning: 100 }),
      description: 'JavaScript heap memory'
    },
    {
      title: 'Frame Rate',
      value: `${metrics.frameRate} fps`,
      status: getPerformanceStatus(60 - metrics.frameRate, { good: 5, warning: 15 }),
      description: 'Animation smoothness'
    },
    {
      title: 'Cache Hit Rate',
      value: `${(metrics.cacheHitRate * 100).toFixed(1)}%`,
      status: getPerformanceStatus(100 - (metrics.cacheHitRate * 100), { good: 20, warning: 50 }),
      description: 'Data caching efficiency'
    }
  ] as const;

  return { metricsData, formatBytes, formatTime };
};
