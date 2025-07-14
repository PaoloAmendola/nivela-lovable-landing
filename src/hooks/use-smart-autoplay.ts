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
  
  // Inicializar com estado correto desde o início
  const getInitialState = () => {
    try {
      const hasPlayed = localStorage.getItem(storageKey);
      const firstView = !hasPlayed;
      console.log('[SmartAutoplay] Initial state:', { hasPlayed, firstView, storageKey });
      return {
        shouldAutoplay: firstView && defaultAutoplay,
        isFirstView: firstView
      };
    } catch (error) {
      console.log('[SmartAutoplay] localStorage error, using fallback');
      return {
        shouldAutoplay: defaultAutoplay,
        isFirstView: true
      };
    }
  };

  const initialState = getInitialState();
  const [shouldAutoplay, setShouldAutoplay] = useState(initialState.shouldAutoplay);
  const [isFirstView, setIsFirstView] = useState(initialState.isFirstView);

  useEffect(() => {
    console.log('[SmartAutoplay] State updated:', { shouldAutoplay, isFirstView });
  }, [shouldAutoplay, isFirstView]);

  const markAsPlayed = () => {
    try {
      console.log('[SmartAutoplay] Marking video as played');
      localStorage.setItem(storageKey, 'true');
      setIsFirstView(false);
      setShouldAutoplay(false);
    } catch (error) {
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