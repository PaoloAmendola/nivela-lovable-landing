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
    // Simplified mobile detection - no experimental APIs
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    setOptimizations({
      isMobile,
      shouldReduceAnimations: false, // Disabled to prevent issues
      shouldUseLowQuality: false,    // Disabled to prevent issues
    });
  }, []);

  return optimizations;
};