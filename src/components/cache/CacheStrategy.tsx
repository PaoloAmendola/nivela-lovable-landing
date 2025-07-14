import { useEffect, useCallback } from 'react';

interface CacheItem {
  data: any;
  timestamp: number;
  ttl: number;
  version: string;
}

interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
  version: string;
  enableCompression: boolean;
}

class SmartCache {
  private cache = new Map<string, CacheItem>();
  private config: CacheConfig;
  private hitRate = 0;
  private totalRequests = 0;
  private hits = 0;

  constructor(config: CacheConfig) {
    this.config = config;
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('smartCache');
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([key, value]) => {
          this.cache.set(key, value as CacheItem);
        });
      }
    } catch (error) {
      console.warn('Erro ao carregar cache:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = Object.fromEntries(this.cache);
      localStorage.setItem('smartCache', JSON.stringify(data));
    } catch (error) {
      console.warn('Erro ao salvar cache:', error);
      // Limpar cache se storage estiver cheio
      this.clear();
    }
  }

  private compress(data: any): string {
    if (!this.config.enableCompression) return JSON.stringify(data);
    
    // Compressão simples - em produção use bibliotecas como pako
    return JSON.stringify(data);
  }

  private decompress(data: string): any {
    return JSON.parse(data);
  }

  private isValid(item: CacheItem): boolean {
    const now = Date.now();
    const isExpired = now - item.timestamp > item.ttl;
    const isValidVersion = item.version === this.config.version;
    
    return !isExpired && isValidVersion;
  }

  private evictOldest() {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  set(key: string, data: any, ttl?: number): void {
    // Verificar tamanho máximo
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest();
    }

    const item: CacheItem = {
      data: this.compress(data),
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL,
      version: this.config.version
    };

    this.cache.set(key, item);
    this.saveToStorage();
  }

  get(key: string): any | null {
    this.totalRequests++;
    
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    if (!this.isValid(item)) {
      this.cache.delete(key);
      return null;
    }

    this.hits++;
    this.hitRate = this.hits / this.totalRequests;
    
    return this.decompress(item.data);
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    return item ? this.isValid(item) : false;
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.saveToStorage();
  }

  clear(): void {
    this.cache.clear();
    localStorage.removeItem('smartCache');
  }

  getStats() {
    return {
      size: this.cache.size,
      hitRate: this.hitRate,
      totalRequests: this.totalRequests,
      hits: this.hits
    };
  }

  // Pré-carregamento inteligente
  async preload(keys: string[], fetcher: (key: string) => Promise<any>) {
    const missingKeys = keys.filter(key => !this.has(key));
    
    if (missingKeys.length === 0) return;

    const promises = missingKeys.map(async key => {
      try {
        const data = await fetcher(key);
        this.set(key, data);
        return { key, data };
      } catch (error) {
        console.warn(`Erro ao pre-carregar ${key}:`, error);
        return { key, error };
      }
    });

    return Promise.allSettled(promises);
  }

  // Invalidação baseada em tags
  invalidateByTag(tag: string) {
    for (const [key, item] of this.cache) {
      if (key.includes(tag)) {
        this.cache.delete(key);
      }
    }
    this.saveToStorage();
  }

  // Limpeza automática
  cleanup() {
    const keysToDelete: string[] = [];
    
    for (const [key, item] of this.cache) {
      if (!this.isValid(item)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.cache.delete(key));
    
    if (keysToDelete.length > 0) {
      this.saveToStorage();
    }
  }
}

// Instância global do cache
const smartCache = new SmartCache({
  maxSize: 100,
  defaultTTL: 5 * 60 * 1000, // 5 minutos
  version: '1.0.0',
  enableCompression: true
});

export const CacheStrategy = () => {
  // Limpeza periódica
  useEffect(() => {
    const interval = setInterval(() => {
      smartCache.cleanup();
    }, 60000); // A cada minuto

    return () => clearInterval(interval);
  }, []);

  // Expor cache globalmente
  useEffect(() => {
    (window as any).smartCache = smartCache;
  }, []);

  return null;
};

// Hook para usar o cache
export const useSmartCache = () => {
  const get = useCallback((key: string) => {
    return smartCache.get(key);
  }, []);

  const set = useCallback((key: string, data: any, ttl?: number) => {
    smartCache.set(key, data, ttl);
  }, []);

  const invalidate = useCallback((key: string) => {
    smartCache.delete(key);
  }, []);

  const invalidateByTag = useCallback((tag: string) => {
    smartCache.invalidateByTag(tag);
  }, []);

  const preload = useCallback((keys: string[], fetcher: (key: string) => Promise<any>) => {
    return smartCache.preload(keys, fetcher);
  }, []);

  return {
    get,
    set,
    invalidate,
    invalidateByTag,
    preload,
    stats: smartCache.getStats()
  };
};

// Hook para cache de API
export const useAPICache = () => {
  const cache = useSmartCache();

  const cachedFetch = useCallback(async (url: string, options?: RequestInit) => {
    const key = `api:${url}:${JSON.stringify(options)}`;
    
    // Verificar cache primeiro
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }

    // Fazer requisição
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      // Cachear resultado
      cache.set(key, data, 2 * 60 * 1000); // 2 minutos para APIs
      
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }, [cache]);

  return { cachedFetch, ...cache };
};