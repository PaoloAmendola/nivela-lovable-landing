import { useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  offset?: number;
}

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string,
    options: SmoothScrollOptions = {}
  ) => {
    const { duration = 800, easing = 'ease-in-out', offset = 0 } = options;
    
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    let startTime: number | null = null;

    // Custom easing functions
    const easingFunctions = {
      'ease': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      'ease-in': (t: number) => t * t,
      'ease-out': (t: number) => t * (2 - t),
      'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      'linear': (t: number) => t
    };

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const currentPosition = startPosition + distance * easedProgress;
      
      window.scrollTo(0, currentPosition);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const scrollToTop = useCallback((options: SmoothScrollOptions = {}) => {
    const { duration = 600, easing = 'ease-out' } = options;
    
    const startPosition = window.pageYOffset;
    let startTime: number | null = null;

    const easingFunctions = {
      'ease': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      'ease-in': (t: number) => t * t,
      'ease-out': (t: number) => t * (2 - t),
      'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      'linear': (t: number) => t
    };

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const currentPosition = startPosition * (1 - easedProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return {
    scrollToElement,
    scrollToTop
  };
};