import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface WebPImageProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const WebPImage = ({
  src,
  fallback,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  onLoad,
  onError
}: WebPImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate WebP source with fallback
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', quality.toString());
      params.set('fm', 'webp');
      params.set('auto', 'format,compress');
      return `${baseUrl}?${params.toString()}`;
    }
    return originalSrc;
  };

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  const currentSrc = imageError && fallback ? fallback : getWebPSrc(src);

  return (
    <div className={cn("relative", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 animate-pulse rounded" />
      )}
      
      <picture>
        {/* WebP source for modern browsers */}
        <source 
          srcSet={getWebPSrc(src)}
          type="image/webp"
        />
        
        {/* Fallback for older browsers */}
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
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
      </picture>
    </div>
  );
};

export default WebPImage;