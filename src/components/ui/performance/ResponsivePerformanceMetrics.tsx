
import React from 'react';
import { motion } from 'framer-motion';
import PerformanceMetricCard from './PerformanceMetricCard';
import { useResponsive } from '@/hooks/use-responsive';

interface ResponsivePerformanceMetricsProps {
  metricsData: readonly {
    readonly title: string;
    readonly value: string;
    readonly status: 'good' | 'warning' | 'poor';
    readonly description: string;
  }[];
  icons: React.ReactNode[];
}

const ResponsivePerformanceMetrics = ({
  metricsData,
  icons
}: ResponsivePerformanceMetricsProps) => {
  const { isMobile, isTablet } = useResponsive();

  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-1';
  };

  const getMetricsToShow = () => {
    if (isMobile) {
      // Show only most important metrics on mobile
      return metricsData.slice(0, 3);
    }
    return metricsData;
  };

  return (
    <div className={`grid ${getGridCols()} gap-2 sm:gap-3`}>
      {getMetricsToShow().map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PerformanceMetricCard
            title={metric.title}
            value={metric.value}
            status={metric.status}
            icon={icons[index]}
            description={isMobile ? '' : metric.description}
          />
        </motion.div>
      ))}
      
      {isMobile && metricsData.length > 3 && (
        <div className="text-center pt-2">
          <p className="text-xs text-muted/70">
            +{metricsData.length - 3} more metrics
          </p>
        </div>
      )}
    </div>
  );
};

export default ResponsivePerformanceMetrics;
