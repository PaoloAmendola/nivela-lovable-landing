
import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-responsive';

interface PerformanceMetricCardProps {
  title: string;
  value: string;
  status: 'good' | 'warning' | 'poor';
  icon: React.ReactNode;
  description: string;
}

const PerformanceMetricCard = ({
  title,
  value,
  status,
  icon,
  description
}: PerformanceMetricCardProps) => {
  const { isMobile } = useResponsive();
  
  const statusColors = {
    good: 'text-green-500',
    warning: 'text-yellow-500',
    poor: 'text-red-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-secondary/20 border border-accent/20 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted`}>
            {title}
          </span>
        </div>
        <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold ${statusColors[status]}`}>
          {value}
        </div>
      </div>
      {description && !isMobile && (
        <p className="text-xs text-muted/70">{description}</p>
      )}
    </motion.div>
  );
};

export default PerformanceMetricCard;
