
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePerformance } from '@/hooks/use-performance';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface UnifiedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const UnifiedImage = React.memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  sizes = '100vw',
  onLoad,
  onError
}: UnifiedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { cacheData, getCachedData } = usePerformance();
  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: priority ? '0px' : '100px'
  });

  const cacheKey = `unified_img_${src}_${width}_${height}`;

  // Generate optimized srcSet
  const generateSrcSet = useCallback((baseSrc: string) => {
    // Support multiple image providers and local files
    const breakpoints = [480, 768, 1024, 1280, 1920];
    
    // For Unsplash images
    if (baseSrc.includes('unsplash.com')) {
      const baseUrl = baseSrc.split('?')[0];
      return breakpoints
        .filter(bp => !width || bp <= width * 2)
        .map(bp => {
          const params = new URLSearchParams();
          params.set('w', bp.toString());
          params.set('q', quality.toString());
          params.set('fm', 'webp');
          params.set('auto', 'format,compress');
          return `${baseUrl}?${params.toString()} ${bp}w`;
        })
        .join(', ');
    }
    
    // For other external images, try WebP conversion
    if (baseSrc.startsWith('http')) {
      return breakpoints
        .filter(bp => !width || bp <= width * 2)
        .map(bp => `${baseSrc}?w=${bp}&q=${quality}&format=webp ${bp}w`)
        .join(', ');
    }
    
    // For local files, return as-is
    return '';
  }, [quality, width]);

  // Load image when in viewport or priority
  useEffect(() => {
    if ((hasIntersected || priority) && !currentSrc) {
      const cached = getCachedData<string>(cacheKey);
      setCurrentSrc(cached || src);
    }
  }, [hasIntersected, priority, currentSrc, src, cacheKey, getCachedData]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    cacheData(cacheKey, src, 1800000); // 30min cache
    onLoad?.();
  }, [src, cacheKey, cacheData, onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  const setRefs = useCallback((element: HTMLImageElement | null) => {
    imgRef.current = element;
    observerRef.current = element;
  }, [observerRef]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Optimized loading skeleton */}
      {!isLoaded && currentSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 animate-pulse" />
      )}

      {/* Main image */}
      {currentSrc && (
        <img
          ref={setRefs}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          srcSet={generateSrcSet(currentSrc)}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}

      {/* Minimal error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-muted-foreground opacity-50" />
        </div>
      )}
    </div>
  );
});

UnifiedImage.displayName = 'UnifiedImage';

export default UnifiedImage;
