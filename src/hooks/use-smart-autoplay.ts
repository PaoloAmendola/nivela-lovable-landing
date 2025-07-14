
import { useState, useEffect } from 'react';

interface UseSmartAutoplayOptions {
  storageKey?: string;
  defaultAutoplay?: boolean;
}

export const useSmartAutoplay = (options: UseSmartAutoplayOptions = {}) => {
  const { 
    storageKey = 'manifesto-video-played', 
    defaultAutoplay = true 
  } = options;
  
  // Estado inicial seguro
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [isFirstView, setIsFirstView] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicialização segura apenas no cliente
  useEffect(() => {
    // Timeout para evitar problemas de hidratação
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') {
        setIsInitialized(true);
        return;
      }
      
      try {
        const hasPlayed = localStorage.getItem(storageKey);
        const firstView = !hasPlayed;
        
        setIsFirstView(firstView);
        setShouldAutoplay(false); // Desabilitar autoplay por enquanto
      } catch (error) {
        // Fallback silencioso
        setIsFirstView(true);
        setShouldAutoplay(false);
      } finally {
        setIsInitialized(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [storageKey, defaultAutoplay]);

  const markAsPlayed = () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(storageKey, 'true');
      setIsFirstView(false);
      setShouldAutoplay(false);
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  };

  const resetPlayState = () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(storageKey);
      setIsFirstView(true);
      setShouldAutoplay(defaultAutoplay);
    } catch (error) {
      // Silently fail
    }
  };

  return {
    shouldAutoplay: isInitialized ? shouldAutoplay : false,
    isFirstView,
    markAsPlayed,
    resetPlayState,
    isInitialized
  };
};
