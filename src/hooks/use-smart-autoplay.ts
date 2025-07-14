
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
  
  // Inicialização síncrona no cliente
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return { shouldAutoplay: false, isFirstView: true };
    }
    
    try {
      const hasPlayed = localStorage.getItem(storageKey);
      const isFirstView = !hasPlayed;
      // Autoplay inteligente: primeira visualização = autoplay muted
      const shouldAutoplay = isFirstView && defaultAutoplay;
      
      return { shouldAutoplay, isFirstView };
    } catch (error) {
      return { shouldAutoplay: false, isFirstView: true };
    }
  };

  const [state, setState] = useState(getInitialState);
  const [isInitialized, setIsInitialized] = useState(typeof window !== 'undefined');

  // Hidratação no cliente
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      setState(getInitialState());
      setIsInitialized(true);
    }
  }, [storageKey, defaultAutoplay, isInitialized]);

  const markAsPlayed = () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(storageKey, 'true');
      setState(prev => ({ 
        ...prev, 
        isFirstView: false, 
        shouldAutoplay: false 
      }));
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  };

  const resetPlayState = () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(storageKey);
      setState({ 
        isFirstView: true, 
        shouldAutoplay: defaultAutoplay 
      });
    } catch (error) {
      // Silently fail
    }
  };

  return {
    shouldAutoplay: isInitialized ? state.shouldAutoplay : false,
    isFirstView: state.isFirstView,
    markAsPlayed,
    resetPlayState,
    isInitialized
  };
};
