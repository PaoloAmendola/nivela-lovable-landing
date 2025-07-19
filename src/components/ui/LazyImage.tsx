
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePerformance } from '@/hooks/use-performance';
import { useResponsive } from '@/hooks/use-responsive';
import { AlertTriangle } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  blurDataURL,
  sizes = '100vw',
  quality = 75,
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const imgRef = useRef<HTMLImageElement>(null);
  const { cacheData, getCachedData } = usePerformance();
  const { isMobile, windowSize } = useResponsive();

  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: isMobile ? '20px' : '50px' // Menor margem no mobile para economia de dados
  });

  // Generate optimized srcSet
  const generateSrcSet = (baseSrc: string, baseWidth?: number) => {
    if (!baseWidth) return baseSrc;
    
    const breakpoints = isMobile ? [320, 640] : [640, 1024, 1280];
    const devicePixelRatio = window.devicePixelRatio || 1;
    const maxSize = Math.min(baseWidth * devicePixelRatio, windowSize.width * devicePixelRatio);
    
    return breakpoints
      .filter(bp => bp <= maxSize)
      .map(bp => {
        const optimizedQuality = isMobile ? Math.max(quality - 15, 60) : quality;
        return `${baseSrc}?w=${bp}&q=${optimizedQuality} ${bp}w`;
      })
      .join(', ');
  };

  // Load image when in viewport or priority
  useEffect(() => {
    if ((hasIntersected || priority) && !currentSrc && src) {
      const cacheKey = `img_${src}_${width}_${height}_${isMobile ? 'mobile' : 'desktop'}`;
      const cached = getCachedData<string>(cacheKey);
      
      if (cached) {
        setCurrentSrc(cached);
        setIsLoaded(true);
      } else {
        setCurrentSrc(src);
      }
    }
  }, [hasIntersected, priority, src, currentSrc, width, height, getCachedData, isMobile]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    
    // Cache with shorter TTL for mobile to save storage
    const cacheKey = `img_${src}_${width}_${height}_${isMobile ? 'mobile' : 'desktop'}`;
    const cacheDuration = isMobile ? 600000 : 1800000; // 10min mobile, 30min desktop
    cacheData(cacheKey, src, cacheDuration);
    
    onLoad?.();
  }, [src, width, height, isMobile, cacheData, onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  // Combine refs efficiently
  const setRefs = useCallback((element: HTMLImageElement | null) => {
    imgRef.current = element;
    observerRef.current = element;
  }, [observerRef]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Optimized blur placeholder */}
      {blurDataURL && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            filter: 'blur(4px)',
            transform: 'scale(1.05)'
          }}
        />
      )}

      {/* Main optimized image */}
      <img
        ref={setRefs}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        srcSet={width ? generateSrcSet(currentSrc, width) : undefined}
        sizes={isMobile ? `${Math.min(windowSize.width, 768)}px` : sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'low'}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-all duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'opacity-50' : ''}
        `}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />

      {/* Minimal loading state */}
      {!isLoaded && !hasError && currentSrc && (
        <div className="absolute inset-0 bg-muted/10 animate-pulse" />
      )}

      {/* Enhanced error state with accessibility */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center" role="img" aria-label="Falha ao carregar imagem">
          <div className="text-center text-muted-foreground text-sm">
            <AlertTriangle className="w-4 h-4 mx-auto mb-1 opacity-50" aria-hidden="true" />
            <p>Imagem indisponível</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
