import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SimpleVideoPlayerProps {
  src: string;
  className?: string;
}

const SimpleVideoPlayer = ({ src, className }: SimpleVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  // Reset states when src changes or component mounts
  useEffect(() => {
    console.log('🎬 SimpleVideoPlayer: src changed or mounted', { src, timestamp: new Date().toISOString() });
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
    
    // Force video element to reload when src changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  // Cleanup effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cleanup = () => {
      console.log('🎬 SimpleVideoPlayer: cleanup');
      video.pause();
      video.removeAttribute('src');
      video.load();
    };

    return cleanup;
  }, []);

  const handleLoadStart = useCallback(() => {
    console.log('🎬 SimpleVideoPlayer: loadstart event');
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleCanPlay = useCallback(() => {
    console.log('🎬 SimpleVideoPlayer: canplay event');
    setIsLoading(false);
    setHasError(false);
    
    // Try to auto-play
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('🎬 SimpleVideoPlayer: autoplay blocked (normal behavior)', error);
      });
    }
  }, []);
  
  const handleError = useCallback((event: any) => {
    console.error('🎬 SimpleVideoPlayer: error event', { 
      error: event, 
      retryCount, 
      maxRetries,
      src 
    });
    
    // Auto-retry with exponential backoff
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      console.log(`🎬 SimpleVideoPlayer: auto-retry in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
        setHasError(false);
        
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, delay);
    } else {
      console.error('🎬 SimpleVideoPlayer: max retries exceeded, showing error state');
      setIsLoading(false);
      setHasError(true);
    }
  }, [retryCount, maxRetries, src]);

  const handleLoadedData = useCallback(() => {
    console.log('🎬 SimpleVideoPlayer: loadeddata event - video fully loaded');
  }, []);

  const handleWaiting = useCallback(() => {
    console.log('🎬 SimpleVideoPlayer: waiting event - buffering');
  }, []);

  const handlePlay = useCallback(() => {
    console.log('🎬 SimpleVideoPlayer: play event');
  }, []);

  const manualRetry = useCallback(() => {
    console.log('🎬 SimpleVideoPlayer: manual retry triggered');
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
    <div className={cn("relative w-full h-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        autoPlay={false}
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