
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { AlertTriangle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E",
  blurDataURL,
  sizes = '100vw',
  quality = 75,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : placeholder);
  const imgRef = useRef<HTMLImageElement>(null);
  const { cacheData, getCachedData, measureRenderTime } = usePerformance();

  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  // Generate cache key
  const cacheKey = `img_optimized_${src}_${width}_${height}_${quality}`;

  // Generate responsive srcSet
  const generateSrcSet = useCallback((baseSrc: string, baseWidth?: number) => {
    if (!baseWidth || baseSrc === placeholder) return '';
    
    const breakpoints = [640, 768, 1024, 1280, 1536];
    return breakpoints
      .filter(bp => bp <= baseWidth * 2)
      .map(bp => {
        // For external images, assume they support query params for resizing
        if (baseSrc.includes('unsplash.com') || baseSrc.includes('images.')) {
          return `${baseSrc}?w=${bp}&q=${quality} ${bp}w`;
        }
        return `${baseSrc} ${bp}w`;
      })
      .join(', ');
  }, [placeholder, quality]);

  // Load image when in viewport or priority
  useEffect(() => {
    if ((hasIntersected || priority) && currentSrc === placeholder) {
      const cachedSrc = getCachedData<string>(cacheKey);
      
      if (cachedSrc) {
        setCurrentSrc(cachedSrc);
        setIsLoading(false);
      } else {
        setCurrentSrc(src);
      }
    }
  }, [hasIntersected, priority, currentSrc, placeholder, src, cacheKey, getCachedData]);

  const handleLoad = useCallback(() => {
    const endMeasure = measureRenderTime();
    setIsLoading(false);
    setHasError(false);
    
    // Cache the successful load
    cacheData(cacheKey, src, 1800000); // 30 minutes cache
    
    endMeasure();
    onLoad?.();
  }, [src, cacheKey, cacheData, measureRenderTime, onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // Combine refs for intersection observer
  const setRefs = useCallback((element: HTMLImageElement | null) => {
    imgRef.current = element;
    observerRef.current = element;
  }, [observerRef]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder background */}
      {blurDataURL && isLoading && currentSrc !== placeholder && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm scale-110 transition-opacity duration-300"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}

      {/* Main optimized image */}
      <img
        ref={setRefs}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        srcSet={generateSrcSet(currentSrc, width)}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-all duration-500 ease-out
          ${isLoading && currentSrc !== placeholder ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
          ${hasError ? 'opacity-50' : ''}
          ${currentSrc === placeholder ? 'blur-sm' : 'blur-0'}
        `}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />

      {/* Enhanced loading skeleton */}
      {isLoading && currentSrc !== placeholder && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted/10 via-muted/30 to-muted/10 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent" />
        </div>
      )}

      {/* Error state with retry */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center text-center">
          <div className="text-muted text-sm">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="mb-2">Failed to load image</p>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setCurrentSrc(src);
              }}
              className="text-xs text-primary hover:underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Performance indicator */}
      {!isLoading && !hasError && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-foreground">
            📸 Optimized
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
