
import { useState, useCallback } from 'react';
import { logger } from '@/lib/logger';

interface SecureStorageOptions {
  encrypt?: boolean;
  expiry?: number; // em milissegundos
}

export const useSecureStorage = () => {
  const [isSupported, setIsSupported] = useState(() => {
    return typeof window !== 'undefined' && 'localStorage' in window;
  });

  // Função simples de "encriptação" (base64 - apenas ofuscação)
  const encode = useCallback((value: string): string => {
    try {
      return btoa(value);
    } catch {
      return value;
    }
  }, []);

  const decode = useCallback((value: string): string => {
    try {
      return atob(value);
    } catch {
      return value;
    }
  }, []);

  const setItem = useCallback((
    key: string, 
    value: any, 
    options: SecureStorageOptions = {}
  ) => {
    if (!isSupported) return false;

    try {
      const data = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry ? Date.now() + options.expiry : null,
      };

      const serialized = JSON.stringify(data);
      const finalValue = options.encrypt ? encode(serialized) : serialized;
      
      localStorage.setItem(key, finalValue);
      return true;
    } catch (error) {
      logger.warn('Secure storage setItem failed:', error);
      return false;
    }
  }, [isSupported, encode]);

  const getItem = useCallback((
    key: string, 
    options: SecureStorageOptions = {}
  ) => {
    if (!isSupported) return null;

    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const decoded = options.encrypt ? decode(stored) : stored;
      const data = JSON.parse(decoded);

      // Verificar expiração
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return data.value;
    } catch (error) {
      logger.warn('Secure storage getItem failed:', error);
      return null;
    }
  }, [isSupported, decode]);

  const removeItem = useCallback((key: string) => {
    if (!isSupported) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.warn('Secure storage removeItem failed:', error);
      return false;
    }
  }, [isSupported]);

  const clear = useCallback(() => {
    if (!isSupported) return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      logger.warn('Secure storage clear failed:', error);
      return false;
    }
  }, [isSupported]);

  return {
    isSupported,
    setItem,
    getItem,
    removeItem,
    clear,
  };
};
