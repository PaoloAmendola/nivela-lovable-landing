
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface ResponsiveImageProps {
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

const ResponsiveImage = ({
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
}: ResponsiveImageProps) => {
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

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <div className="text-center text-muted p-4">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm mb-2">Falha ao carregar imagem</p>
            <button 
              onClick={handleRetry}
              className="text-xs text-primary hover:underline bg-background/80 px-3 py-2 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
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
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          hasError ? "opacity-0" : "opacity-100"
        )}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />

      {/* Performance indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-foreground">
          📸 WebP
        </div>
      </div>
    </div>
  );
};

export default ResponsiveImage;
