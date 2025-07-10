import { useState, useEffect } from 'react';

interface FastMobileOptimizations {
  isMobile: boolean;
  shouldReduceAnimations: boolean;
  shouldUseLowQuality: boolean;
}

export const useFastMobile = (): FastMobileOptimizations => {
  const [optimizations, setOptimizations] = useState<FastMobileOptimizations>({
    isMobile: false,
    shouldReduceAnimations: false,
    shouldUseLowQuality: false,
  });

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const connection = (navigator as any)?.connection;
    const isSlowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    const isLowMemory = (navigator as any)?.deviceMemory < 4;
    
    setOptimizations({
      isMobile,
      shouldReduceAnimations: isSlowConnection || isLowMemory,
      shouldUseLowQuality: isSlowConnection || isLowMemory,
    });
  }, []);

  return optimizations;
};