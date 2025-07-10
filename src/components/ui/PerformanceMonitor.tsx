
import React, { useState } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { useResponsive } from '@/hooks/use-responsive';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Database, Monitor, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PerformanceControls from './performance/PerformanceControls';
import ResponsivePerformanceMetrics from './performance/ResponsivePerformanceMetrics';
import { usePerformanceMetrics } from './performance/usePerformanceMetrics';

const PerformanceMonitor = () => {
  const { isMonitoring, startMonitoring, stopMonitoring, clearCache } = usePerformance();
  const { metricsData } = usePerformanceMetrics();
  const { isMobile, isTablet, windowSize } = useResponsive();
  const [isExpanded, setIsExpanded] = useState(false);

  const icons = [
    <Zap className="w-4 h-4" />,
    <Monitor className="w-4 h-4" />,
    <Database className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
    <Database className="w-4 h-4" />
  ];

  // Responsive positioning and sizing
  const getPositionClasses = () => {
    if (isMobile) {
      return isExpanded 
        ? 'fixed inset-x-2 bottom-2 top-20 z-50' 
        : 'fixed bottom-20 right-2 z-50';
    }
    if (isTablet) {
      return isExpanded 
        ? 'fixed bottom-4 right-4 top-20 w-80 z-50' 
        : 'fixed bottom-4 right-4 z-50';
    }
    return isExpanded 
      ? 'fixed bottom-4 right-4 z-50 w-80' 
      : 'fixed bottom-4 right-4 z-50';
  };

  const getCardClasses = () => {
    const baseClasses = 'bg-background/95 backdrop-blur-sm border-accent/30';
    if (isMobile && isExpanded) {
      return `${baseClasses} h-full flex flex-col`;
    }
    return baseClasses;
  };

  if (!isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={getPositionClasses()}
      >
        <Button
          onClick={() => setIsExpanded(true)}
          size={isMobile ? "default" : "sm"}
          variant="outline"
          className="bg-background/90 backdrop-blur-sm border-accent/30"
        >
          <Activity className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} mr-2`} />
          {isMobile ? 'Performance' : 'Performance'}
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : 300, y: isMobile ? 300 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: isMobile ? 0 : 300, y: isMobile ? 300 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={getPositionClasses()}
      >
        <Card className={getCardClasses()}>
          <CardHeader className={`${isMobile ? 'pb-2' : 'pb-3'}`}>
            <div className="flex items-center justify-between">
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} gradient-text flex items-center`}>
                <Activity className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} mr-2`} />
                {isMobile ? 'Performance' : 'Performance Monitor'}
              </CardTitle>
              <div className="flex space-x-2">
                <PerformanceControls
                  isMonitoring={isMonitoring}
                  onStartMonitoring={() => startMonitoring()}
                  onStopMonitoring={() => stopMonitoring()}
                  onClearCache={clearCache}
                  onRefresh={() => window.location.reload()}
                />
                <Button
                  onClick={() => setIsExpanded(false)}
                  size="sm"
                  variant="ghost"
                  className={isMobile ? 'text-lg' : ''}
                >
                  ×
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className={`space-y-4 ${isMobile && isExpanded ? 'flex-1 overflow-y-auto' : ''}`}>
            {isMonitoring ? (
              <ResponsivePerformanceMetrics 
                metricsData={metricsData}
                icons={icons}
              />
            ) : (
              <div className={`text-center ${isMobile ? 'py-12' : 'py-8'} text-muted`}>
                <Activity className={`${isMobile ? 'w-16 h-16' : 'w-12 h-12'} mx-auto mb-3 opacity-50`} />
                <p className={isMobile ? 'text-base' : 'text-sm'}>
                  Click Start to begin monitoring
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
