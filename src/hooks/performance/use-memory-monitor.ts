
import { useCallback, useState, useEffect } from 'react';

interface MemoryInfo {
  used: number;
  total: number;
  limit: number;
}

export const useMemoryMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState(0);

  const getMemoryUsage = useCallback((): MemoryInfo => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return { used: 0, total: 0, limit: 0 };
  }, []);

  const updateMemoryUsage = useCallback(() => {
    const memory = getMemoryUsage();
    setMemoryUsage(memory.used);
  }, [getMemoryUsage]);

  useEffect(() => {
    updateMemoryUsage();
  }, [updateMemoryUsage]);

  return {
    memoryUsage,
    getMemoryUsage,
    updateMemoryUsage
  };
};
