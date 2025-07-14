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
    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      
      let isSlowConnection = false;
      let isLowMemory = false;
      
      // Safe check for connection API
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType) {
          isSlowConnection = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
        }
      }
      
      // Safe check for device memory API
      if (typeof navigator !== 'undefined' && 'deviceMemory' in navigator) {
        const deviceMemory = (navigator as any).deviceMemory;
        if (typeof deviceMemory === 'number') {
          isLowMemory = deviceMemory < 4;
        }
      }
      
      setOptimizations({
        isMobile,
        shouldReduceAnimations: isSlowConnection || isLowMemory,
        shouldUseLowQuality: isSlowConnection || isLowMemory,
      });
    } catch (error) {
      // Fallback to basic mobile detection
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setOptimizations({
        isMobile,
        shouldReduceAnimations: false,
        shouldUseLowQuality: false,
      });
    }
  }, []);

  return optimizations;
};