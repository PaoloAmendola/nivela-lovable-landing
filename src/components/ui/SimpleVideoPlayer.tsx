import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SimpleVideoPlayerProps {
  src: string;
  className?: string;
}

const SimpleVideoPlayer = ({ src, className }: SimpleVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const maxRetries = 3;
  
  // Reset states when src changes or component mounts
  useEffect(() => {
    // Reset states when src changes or component mounts
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
    
    // Force video element to reload when src changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  // Intersection Observer for autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          // Attempt autoplay when entering view
          videoRef.current.play().catch(() => {
            // Autoplay blocked - expected behavior
          });
        } else if (!entry.isIntersecting && videoRef.current) {
          // Pause when leaving view
          videoRef.current.pause();
        }
      },
      { threshold: 0.5, rootMargin: '50px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Cleanup effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cleanup = () => {
      // Clean up video resources
      video.pause();
      video.removeAttribute('src');
      video.load();
    };

    return cleanup;
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    
    // Try to auto-play
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked - normal behavior
      });
    }
  }, []);
  
  const handleError = useCallback((event: any) => {
    // Handle video loading errors
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
        setHasError(false);
        
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, delay);
    } else {
      // Max retries exceeded, show error state
      setIsLoading(false);
      setHasError(true);
    }
  }, [retryCount, maxRetries, src]);

  const handleLoadedData = useCallback(() => {
    // Video fully loaded
  }, []);

  const handleWaiting = useCallback(() => {
    // Video buffering
  }, []);

  const handlePlay = useCallback(() => {
    // Video started playing
  }, []);

  const manualRetry = useCallback(() => {
    setRetryCount(0);
    setHasError(false);
    setIsLoading(true);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);
  
  if (hasError) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center bg-muted/20 rounded-lg", className)}>
        <div className="text-center p-6">
          <div className="text-muted-foreground mb-2">Erro ao carregar vídeo</div>
          <button 
            onClick={manualRetry}
            className="text-accent hover:text-accent/80 transition-colors"
          >
            Tentar novamente ({retryCount}/{maxRetries})
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        autoPlay={true}
        muted
        loop
        playsInline
        controls={false}
        preload="metadata"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onWaiting={handleWaiting}
        onPlay={handlePlay}
        onError={handleError}
        className={cn("w-full h-full object-cover rounded-lg", isLoading ? "opacity-0" : "opacity-100", "transition-opacity duration-300")}
        style={{ border: 'none', outline: 'none' }}
      />
    </div>
  );
};

export default SimpleVideoPlayer;