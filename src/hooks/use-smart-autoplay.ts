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
  
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [isFirstView, setIsFirstView] = useState(false);

  useEffect(() => {
    try {
      const hasPlayed = localStorage.getItem(storageKey);
      const firstView = !hasPlayed;
      
      setIsFirstView(firstView);
      setShouldAutoplay(firstView && defaultAutoplay);
    } catch (error) {
      // Fallback se localStorage não estiver disponível
      setIsFirstView(true);
      setShouldAutoplay(defaultAutoplay);
    }
  }, [storageKey, defaultAutoplay]);

  const markAsPlayed = () => {
    try {
      localStorage.setItem(storageKey, 'true');
      setIsFirstView(false);
      setShouldAutoplay(false);
    } catch (error) {
      // Silently fail if localStorage is not available
      console.warn('Failed to save video play state:', error);
    }
  };

  const resetPlayState = () => {
    try {
      localStorage.removeItem(storageKey);
      setIsFirstView(true);
      setShouldAutoplay(defaultAutoplay);
    } catch (error) {
      console.warn('Failed to reset video play state:', error);
    }
  };

  return {
    shouldAutoplay,
    isFirstView,
    markAsPlayed,
    resetPlayState
  };
};