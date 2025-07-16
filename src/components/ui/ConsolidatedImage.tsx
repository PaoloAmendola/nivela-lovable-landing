
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePerformance } from '@/hooks/use-performance';
import { useMobileOptimizations } from '@/hooks/use-mobile-optimizations';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import BackgroundRemovalImage from './BackgroundRemovalImage';

interface ConsolidatedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  removeBackground?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ConsolidatedImage = React.memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  sizes = '100vw',
  removeBackground = false,
  onLoad,
  onError
}: ConsolidatedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { cacheData, getCachedData } = usePerformance();
  const { shouldUseLowQuality, shouldReduceImages } = useMobileOptimizations();
  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: priority ? '0px' : shouldReduceImages ? '50px' : '100px'
  });

  const optimizedQuality = shouldUseLowQuality ? Math.max(quality - 20, 50) : quality;
  const cacheKey = `consolidated_img_${src}_${width}_${height}_${optimizedQuality}`;

  // Generate optimized srcSet
  const generateSrcSet = useCallback((baseSrc: string) => {
    if (!baseSrc.includes('unsplash.com') || !width) return '';
    
    const breakpoints = shouldReduceImages ? [640, 1024] : [640, 768, 1024, 1280];
    const baseUrl = baseSrc.split('?')[0];
    
    return breakpoints
      .filter(bp => bp <= width * 2)
      .map(bp => {
        const params = new URLSearchParams();
        params.set('w', bp.toString());
        params.set('q', optimizedQuality.toString());
        params.set('fm', 'webp');
        params.set('auto', 'format,compress');
        return `${baseUrl}?${params.toString()} ${bp}w`;
      })
      .join(', ');
  }, [width, optimizedQuality, shouldReduceImages]);

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
    cacheData(cacheKey, src, shouldReduceImages ? 900000 : 1800000);
    onLoad?.();
  }, [src, cacheKey, cacheData, shouldReduceImages, onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  const setRefs = useCallback((element: HTMLImageElement | null) => {
    imgRef.current = element;
    observerRef.current = element;
  }, [observerRef]);

  // If background removal is requested, use the specialized component
  if (removeBackground && currentSrc) {
    return (
      <div className={cn("relative overflow-hidden glass-subtle", className)}>
        <BackgroundRemovalImage
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={optimizedQuality}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden glass-subtle", className)}>
      {/* Premium loading skeleton */}
      {!isLoaded && currentSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 animate-pulse" />
      )}

      {/* Main image with premium styling */}
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
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 hover-lift",
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            filter: isLoaded ? 'none' : 'blur(4px)'
          }}
        />
      )}

      {/* Error state with premium styling */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/10 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-muted p-4 glass-medium rounded-lg">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Falha ao carregar</p>
          </div>
        </div>
      )}
    </div>
  );
});

ConsolidatedImage.displayName = 'ConsolidatedImage';

export default ConsolidatedImage;
