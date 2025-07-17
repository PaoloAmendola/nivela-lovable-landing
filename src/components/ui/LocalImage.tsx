
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface LocalImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LocalImage = React.memo(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  onError
}: LocalImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  return (
    <div className={cn("relative", className)}>
      {/* Skeleton loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/3 to-accent/5 animate-pulse rounded-lg" />
      )}

      {/* Main image - optimized for local images */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full transition-all duration-500",
          // Use object-contain to prevent cropping and maintain aspect ratio
          "object-contain",
          // Remove any background that might interfere with section background
          "bg-transparent",
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        )}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          maxHeight: '600px', // Increased from 400px to match the larger dimensions
          filter: isLoaded ? 'none' : 'blur(2px)'
        }}
      />

      {/* Minimal error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/10 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center text-muted p-4">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Falha ao carregar imagem</p>
          </div>
        </div>
      )}
    </div>
  );
});

LocalImage.displayName = 'LocalImage';

export default LocalImage;
