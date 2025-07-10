
import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isLowEnd: boolean;
  isMidRange: boolean;
  isHighEnd: boolean;
  memoryGB: number;
  cores: number;
  connectionType: string;
  shouldReduceAnimations: boolean;
  shouldReduceImages: boolean;
}

export const useDevicePerformance = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    isMidRange: true,
    isHighEnd: false,
    memoryGB: 4,
    cores: 4,
    connectionType: '4g',
    shouldReduceAnimations: false,
    shouldReduceImages: false,
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Detect memory (if available)
      const memory = (navigator as any).deviceMemory || 4;
      
      // Detect cores
      const cores = navigator.hardwareConcurrency || 4;
      
      // Detect connection
      const connection = (navigator as any).connection || { effectiveType: '4g' };
      
      // Determine device tier
      const isLowEnd = memory <= 2 || cores <= 2 || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
      const isHighEnd = memory >= 8 && cores >= 8 && (connection.effectiveType === '4g' || connection.effectiveType === '5g');
      const isMidRange = !isLowEnd && !isHighEnd;

      // Performance recommendations
      const shouldReduceAnimations = isLowEnd || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
      const shouldReduceImages = isLowEnd || connection.effectiveType === 'slow-2g';

      setCapabilities({
        isLowEnd,
        isMidRange,
        isHighEnd,
        memoryGB: memory,
        cores,
        connectionType: connection.effectiveType,
        shouldReduceAnimations,
        shouldReduceImages,
      });
    };

    detectCapabilities();
  }, []);

  return capabilities;
};
