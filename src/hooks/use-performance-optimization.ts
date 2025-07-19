
import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Optimize scroll handlers with throttling
  const useThrottledScroll = useCallback((callback: () => void, delay: number = 16) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    
    return useCallback(() => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        callback();
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          callback();
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    }, [callback, delay]);
  }, []);

  // Preload critical resources
  const preloadImages = useCallback((imageUrls: string[]) => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Optimize font loading
  const preloadFonts = useCallback(() => {
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
    ];
    
    fonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = fontUrl;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    preloadFonts();
    
    // Preload critical images
    preloadImages([
      '/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png',
      '/lovable-uploads/f7afc3f5-36a2-49c4-a947-04e9bc701f3c.png'
    ]);
  }, [preloadFonts, preloadImages]);

  return {
    useThrottledScroll,
    preloadImages,
    preloadFonts
  };
};
