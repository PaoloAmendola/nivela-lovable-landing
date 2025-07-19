
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedResponsiveImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '100vw',
  quality = 80,
  onLoad,
  onError
}: OptimizedResponsiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate responsive srcSet for Unsplash images
  const generateSrcSet = useCallback((baseSrc: string) => {
    if (!baseSrc.includes('unsplash.com')) return baseSrc;
    
    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    const baseUrl = baseSrc.split('?')[0];
    const params = new URLSearchParams(baseSrc.split('?')[1] || '');
    
    return breakpoints
      .map(bp => {
        const newParams = new URLSearchParams(params);
        newParams.set('w', bp.toString());
        newParams.set('q', quality.toString());
        newParams.set('fm', 'webp');
        return `${baseUrl}?${newParams.toString()} ${bp}w`;
      })
      .join(', ');
  }, [quality]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* Enhanced error fallback with accessibility */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center" role="img" aria-label="Imagem indisponível">
          <div className="text-center text-muted-foreground p-4">
            <div className="w-8 h-8 mx-auto mb-2 bg-muted rounded" aria-hidden="true"></div>
            <p className="text-sm">Imagem indisponível</p>
          </div>
        </div>
      )}

      {/* Optimized image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading || hasError ? "opacity-0" : "opacity-100"
        )}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
    </div>
  );
};

export default OptimizedResponsiveImage;
