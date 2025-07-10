
import { useRef, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
}

class SmartCache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize = 100;
  private hits = 0;
  private misses = 0;

  set<T>(key: string, data: T, ttl: number = 300000): void { // 5 min default TTL
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.misses++;
      return null;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    entry.accessCount++;
    this.hits++;
    return entry.data;
  }

  getHitRate(): number {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : this.hits / total;
  }

  private evictLRU(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
}

export const useSmartCache = () => {
  const cache = useRef(new SmartCache()).current;

  const cacheData = useCallback(<T>(key: string, data: T, ttl?: number) => {
    cache.set(key, data, ttl);
  }, [cache]);

  const getCachedData = useCallback(<T>(key: string): T | null => {
    return cache.get<T>(key);
  }, [cache]);

  const clearCache = useCallback(() => {
    cache.clear();
  }, [cache]);

  const getCacheHitRate = useCallback(() => {
    return cache.getHitRate();
  }, [cache]);

  return {
    cacheData,
    getCachedData,
    clearCache,
    getCacheHitRate
  };
};
