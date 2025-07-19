import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedSkeletonLoaderProps {
  variant?: 'hero' | 'section' | 'card' | 'list' | 'form';
  lines?: number;
  className?: string;
  animate?: boolean;
}

const EnhancedSkeletonLoader: React.FC<EnhancedSkeletonLoaderProps> = ({
  variant = 'card',
  lines = 3,
  className = '',
  animate = true
}) => {
  const shimmerClass = animate ? 'animate-pulse' : '';
  
  const renderHeroSkeleton = () => (
    <div className={cn('space-y-8', className)}>
      <div className={cn('h-12 bg-muted rounded-lg', shimmerClass)} />
      <div className={cn('h-64 bg-muted rounded-xl', shimmerClass)} />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 bg-muted rounded',
              i === 2 ? 'w-3/4' : 'w-full',
              shimmerClass
            )}
          />
        ))}
      </div>
    </div>
  );

  const renderSectionSkeleton = () => (
    <div className={cn('space-y-6', className)}>
      <div className={cn('h-8 bg-muted rounded-lg w-1/2', shimmerClass)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className={cn('h-32 bg-muted rounded-lg', shimmerClass)} />
            <div className={cn('h-4 bg-muted rounded', shimmerClass)} />
            <div className={cn('h-4 bg-muted rounded w-3/4', shimmerClass)} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderCardSkeleton = () => (
    <div className={cn('space-y-4 p-6 border rounded-lg', className)}>
      <div className={cn('h-6 bg-muted rounded w-1/2', shimmerClass)} />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-muted rounded',
            i === lines - 1 ? 'w-2/3' : 'w-full',
            shimmerClass
          )}
        />
      ))}
    </div>
  );

  const renderListSkeleton = () => (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className={cn('h-10 w-10 bg-muted rounded-full', shimmerClass)} />
          <div className="flex-1 space-y-2">
            <div className={cn('h-4 bg-muted rounded w-1/4', shimmerClass)} />
            <div className={cn('h-3 bg-muted rounded w-1/2', shimmerClass)} />
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormSkeleton = () => (
    <div className={cn('space-y-4', className)}>
      <div className={cn('h-6 bg-muted rounded w-1/3', shimmerClass)} />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className={cn('h-4 bg-muted rounded w-1/4', shimmerClass)} />
          <div className={cn('h-10 bg-muted rounded', shimmerClass)} />
        </div>
      ))}
      <div className={cn('h-10 bg-primary/20 rounded w-1/3', shimmerClass)} />
    </div>
  );

  const skeletonComponents = {
    hero: renderHeroSkeleton,
    section: renderSectionSkeleton,
    card: renderCardSkeleton,
    list: renderListSkeleton,
    form: renderFormSkeleton
  };

  const SkeletonComponent = skeletonComponents[variant];

  return animate ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SkeletonComponent />
    </motion.div>
  ) : (
    <SkeletonComponent />
  );
};

export default EnhancedSkeletonLoader;