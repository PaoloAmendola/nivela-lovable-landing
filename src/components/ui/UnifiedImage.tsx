
import React, { useState, useCallback } from 'react';
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
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate responsive srcSet for better image delivery
  const generateSrcSet = useCallback((baseSrc: string): string => {
    if (!baseSrc || baseSrc.includes('lovable-uploads')) {
      return baseSrc; // Return original for uploaded images
    }
    
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes.map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`).join(', ');
  }, [quality]);

  const srcSet = generateSrcSet(src);

  return (
    <div className={cn("relative", className)}>
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full object-cover"
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />

      {/* Enhanced error state with better accessibility */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center" role="img" aria-label="Falha ao carregar imagem">
          <AlertTriangle className="w-6 h-6 text-muted-foreground opacity-50" aria-hidden="true" />
        </div>
      )}
    </div>
  );
});

UnifiedImage.displayName = 'UnifiedImage';

export default UnifiedImage;
