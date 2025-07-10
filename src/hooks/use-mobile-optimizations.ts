
import { useState, useEffect } from 'react';
import { useDevicePerformance } from './use-device-performance';
import { useIsMobile } from './use-mobile';

interface MobileOptimizations {
  shouldReduceAnimations: boolean;
  shouldReduceImages: boolean;
  shouldUseLowQuality: boolean;
  shouldPreloadLess: boolean;
  fontScale: number;
  spacingScale: number;
  touchTargetSize: string;
}

export const useMobileOptimizations = (): MobileOptimizations => {
  const isMobile = useIsMobile();
  const devicePerformance = useDevicePerformance();
  
  const [optimizations, setOptimizations] = useState<MobileOptimizations>({
    shouldReduceAnimations: false,
    shouldReduceImages: false,
    shouldUseLowQuality: false,
    shouldPreloadLess: false,
    fontScale: 1,
    spacingScale: 1,
    touchTargetSize: '44px',
  });

  useEffect(() => {
    // Safely handle undefined values
    const safeMobile = Boolean(isMobile);
    const safeDevicePerformance = {
      shouldReduceAnimations: devicePerformance?.shouldReduceAnimations || false,
      shouldReduceImages: devicePerformance?.shouldReduceImages || false,
      isLowEnd: devicePerformance?.isLowEnd || false,
      connectionType: devicePerformance?.connectionType || '4g'
    };

    if (!safeMobile) {
      setOptimizations({
        shouldReduceAnimations: safeDevicePerformance.shouldReduceAnimations,
        shouldReduceImages: safeDevicePerformance.shouldReduceImages,
        shouldUseLowQuality: false,
        shouldPreloadLess: false,
        fontScale: 1,
        spacingScale: 1,
        touchTargetSize: '44px',
      });
      return;
    }

    // Otimizações específicas para mobile
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 768;
    const isSmallScreen = screenWidth < 375; // iPhone SE e similares
    const isVerySmallScreen = screenWidth < 320;

    // Calcular escalas baseadas no tamanho da tela
    let fontScale = 1;
    let spacingScale = 1;

    if (isVerySmallScreen) {
      fontScale = 0.9;
      spacingScale = 0.85;
    } else if (isSmallScreen) {
      fontScale = 0.95;
      spacingScale = 0.9;
    }

    // Tamanho mínimo de toque (44px é o recomendado)
    const touchTargetSize = isSmallScreen ? '48px' : '44px';

    setOptimizations({
      shouldReduceAnimations: safeDevicePerformance.shouldReduceAnimations || safeDevicePerformance.isLowEnd,
      shouldReduceImages: safeDevicePerformance.shouldReduceImages || safeDevicePerformance.isLowEnd,
      shouldUseLowQuality: safeDevicePerformance.isLowEnd || safeDevicePerformance.connectionType === 'slow-2g',
      shouldPreloadLess: safeDevicePerformance.isLowEnd,
      fontScale,
      spacingScale,
      touchTargetSize,
    });
  }, [isMobile, devicePerformance]);

  return optimizations;
};
