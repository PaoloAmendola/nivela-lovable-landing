
import { useCallback } from 'react';

export const useRenderTimer = () => {
  const measureRenderTime = useCallback(() => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      return end - start;
    };
  }, []);

  return {
    measureRenderTime
  };
};
