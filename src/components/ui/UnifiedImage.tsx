
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

  return (
    <div className={cn("relative", className)}>
      <img
        src={src}
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
