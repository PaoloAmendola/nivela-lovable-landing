import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface OptimizedImageSystemProps {
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
  lazy?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImageSystem = React.memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  sizes = '100vw',
  onLoad,
  onError,
  lazy = true,
  placeholder = 'blur',
  blurDataURL
}: OptimizedImageSystemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection observer para lazy loading
  const { isIntersecting } = useIntersectionObserver(imgRef, {
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const shouldLoad = priority || !lazy || isIntersecting;

  // Gerar srcSet otimizado
  const generateSrcSet = useCallback((baseSrc: string): string => {
    if (!baseSrc || baseSrc.includes('lovable-uploads')) {
      return baseSrc;
    }

    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    return breakpoints
      .map(bp => {
        const size = Math.round(bp * devicePixelRatio);
        if (baseSrc.includes('unsplash.com')) {
          const url = new URL(baseSrc);
          url.searchParams.set('w', size.toString());
          url.searchParams.set('q', quality.toString());
          url.searchParams.set('fm', 'webp');
          url.searchParams.set('fit', 'crop');
          return `${url.toString()} ${bp}w`;
        }
        return `${baseSrc}?w=${size}&q=${quality}&fm=webp ${bp}w`;
      })
      .join(', ');
  }, [quality]);

  // Carregar imagem quando necessário
  useEffect(() => {
    if (shouldLoad && src && !currentSrc) {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
      img.src = src;
    }
  }, [shouldLoad, src, currentSrc, onLoad, onError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder blur */}
      {placeholder === 'blur' && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40">
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110"
              aria-hidden="true"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/10 to-muted/30 animate-pulse" />
          )}
        </div>
      )}

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground p-4">
            <div className="w-8 h-8 mx-auto mb-2 bg-muted rounded" />
            <p className="text-xs">Imagem indisponível</p>
          </div>
        </div>
      )}

      {/* Imagem otimizada */}
      {currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          srcSet={generateSrcSet(currentSrc)}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}
    </div>
  );
});

OptimizedImageSystem.displayName = 'OptimizedImageSystem';

export default OptimizedImageSystem;