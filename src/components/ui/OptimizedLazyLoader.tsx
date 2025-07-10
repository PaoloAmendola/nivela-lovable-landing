
import React, { Suspense, lazy, useMemo } from 'react';
import { BrandedSectionSkeleton } from './PremiumSkeletonLoader';
import { useMobileOptimizations } from '@/hooks/use-mobile-optimizations';
import { logger } from '@/lib/logger';

interface OptimizedLazyLoaderProps {
  componentName: string;
  fallback?: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
  onCTAClick?: () => void;
}

// Component registry with priorities
const componentRegistry = {
  high: {
    HeroSection: () => import('@/components/sections/HeroSection'),
    TechnologySection: () => import('@/components/sections/TechnologySection'),
  },
  medium: {
    ExclusivitySection: () => import('@/components/sections/ExclusivitySection'),
    TrustSection: () => import('@/components/sections/TrustSection'),
  },
  low: {
    EcosystemSection: () => import('@/components/sections/EcosystemSection'),
    FAQSection: () => import('@/components/sections/FAQSection'),
  }
};

const OptimizedLazyLoader = ({ 
  componentName, 
  fallback = <BrandedSectionSkeleton />, 
  priority = 'medium',
  onCTAClick 
}: OptimizedLazyLoaderProps) => {
  const { shouldPreloadLess } = useMobileOptimizations();
  
  const LazyComponent = useMemo(() => {
    const priorityLevel = shouldPreloadLess && priority === 'low' ? 'low' : priority;
    const componentImporter = componentRegistry[priorityLevel]?.[componentName as keyof typeof componentRegistry[typeof priorityLevel]];
    
    if (!componentImporter) {
      logger.warn(`Component ${componentName} not found in registry`);
      return null;
    }

    return lazy(componentImporter);
  }, [componentName, priority, shouldPreloadLess]);

  if (!LazyComponent) {
    return <div>Component não encontrado: {componentName}</div>;
  }

  return (
    <Suspense fallback={fallback}>
      <LazyComponent onCTAClick={onCTAClick} />
    </Suspense>
  );
};

export default OptimizedLazyLoader;
