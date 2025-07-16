import React, { useState, useCallback, useRef, useEffect } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { cn } from '@/lib/utils';
import { AlertTriangle, Loader2 } from 'lucide-react';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

interface BackgroundRemovalImageProps {
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

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

const removeBackground = async (imageElement: HTMLImageElement): Promise<string> => {
  try {
    console.log('Starting background removal process...');
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('Image converted to base64');
    
    // Process the image with the segmentation model
    console.log('Processing with segmentation model...');
    const result = await segmenter(imageData);
    
    console.log('Segmentation result:', result);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(
      0, 0,
      outputCanvas.width,
      outputCanvas.height
    );
    const data = outputImageData.data;
    
    // Apply inverted mask to alpha channel
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // Invert the mask value (1 - value) to keep the subject instead of the background
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Mask applied successfully');
    
    // Return data URL
    return outputCanvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

const BackgroundRemovalImage = React.memo(({
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
}: BackgroundRemovalImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = useCallback(async (img: HTMLImageElement) => {
    try {
      setIsProcessing(true);
      const processedImage = await removeBackground(img);
      setProcessedSrc(processedImage);
      setIsLoaded(true);
      setHasError(false);
      onLoad?.();
    } catch (error) {
      console.error('Failed to process image:', error);
      setHasError(true);
      setIsProcessing(false);
      onError?.();
    } finally {
      setIsProcessing(false);
    }
  }, [onLoad, onError]);

  useEffect(() => {
    if (src && !processedSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => handleImageLoad(img);
      img.onerror = () => {
        setHasError(true);
        setIsProcessing(false);
        onError?.();
      };
      img.src = src;
    }
  }, [src, processedSrc, handleImageLoad, onError]);

  const displaySrc = processedSrc || src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Processing indicator */}
      {isProcessing && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Removendo fundo...</p>
          </div>
        </div>
      )}

      {/* Premium loading skeleton */}
      {!isLoaded && !isProcessing && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 animate-pulse" />
      )}

      {/* Main image */}
      {displaySrc && (
        <img
          ref={imgRef}
          src={displaySrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            processedSrc ? 'drop-shadow-2xl' : ''
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            filter: isLoaded ? 'none' : 'blur(4px)'
          }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/10 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-muted p-4 glass-medium rounded-lg">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Falha ao processar imagem</p>
          </div>
        </div>
      )}
    </div>
  );
});

BackgroundRemovalImage.displayName = 'BackgroundRemovalImage';

export default BackgroundRemovalImage;
