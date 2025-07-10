
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

interface RobustVideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
}

const RobustVideoPlayer = ({ src, className, poster }: RobustVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  console.log('🎬 RobustVideoPlayer: initializing with src:', src);

  // Reset states when src changes
  useEffect(() => {
    console.log('🎬 RobustVideoPlayer: src changed, resetting states');
    setIsLoading(true);
    setHasError(false);
    setCanAutoplay(true);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  // Intersection Observer for smart autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersecting;
        const nowIntersecting = entry.isIntersecting && entry.intersectionRatio > 0.5;
        
        setIsIntersecting(nowIntersecting);
        
        if (nowIntersecting && !wasIntersecting && videoRef.current && !hasError) {
          console.log('🎬 RobustVideoPlayer: entering view, attempting play');
          handlePlay();
        } else if (!nowIntersecting && wasIntersecting && videoRef.current) {
          console.log('🎬 RobustVideoPlayer: leaving view, pausing');
          videoRef.current.pause();
        }
      },
      { 
        threshold: [0, 0.5, 1],
        rootMargin: '50px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isIntersecting, hasError]);

  const handlePlay = useCallback(async () => {
    if (!videoRef.current || hasError) return;
    
    try {
      await videoRef.current.play();
      console.log('🎬 RobustVideoPlayer: video playing successfully');
    } catch (error) {
      console.log('🎬 RobustVideoPlayer: autoplay blocked, setting canAutoplay to false', error);
      setCanAutoplay(false);
    }
  }, [hasError]);

  const handleLoadStart = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: load started');
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleCanPlay = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: can play');
    setIsLoading(false);
    
    // Try autoplay only if in view and autoplay is allowed
    if (isIntersecting && canAutoplay && videoRef.current) {
      handlePlay();
    }
  }, [isIntersecting, canAutoplay, handlePlay]);
  
  const handleError = useCallback((event: any) => {
    console.error('🎬 RobustVideoPlayer: video error occurred', {
      error: event.target?.error,
      src,
      code: event.target?.error?.code,
      message: event.target?.error?.message
    });
    
    setIsLoading(false);
    setHasError(true);
  }, [src]);

  const handleLoadedData = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: video data loaded');
  }, []);

  const handleWaiting = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: video waiting/buffering');
  }, []);

  const handlePlayEvent = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: play event fired');
  }, []);

  const handlePauseEvent = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: pause event fired');
  }, []);

  const manualRetry = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: manual retry triggered');
    setHasError(false);
    setIsLoading(true);
    setCanAutoplay(true);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const manualPlay = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: manual play triggered');
    setCanAutoplay(true);
    handlePlay();
  }, [handlePlay]);
  
  if (hasError) {
    return (
      <div ref={containerRef} className={cn("w-full h-full flex items-center justify-center bg-muted/20 rounded-lg", className)}>
        <div className="text-center p-6">
          <div className="text-muted-foreground mb-4">Erro ao carregar vídeo</div>
          <div className="space-y-2">
            <button 
              onClick={manualRetry}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
            {poster && (
              <div className="mt-4">
                <img 
                  src={poster} 
                  alt="Video thumbnail" 
                  className="w-full h-32 object-cover rounded-lg opacity-50"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mb-2 mx-auto" />
            <div className="text-sm text-muted-foreground">Carregando vídeo...</div>
          </div>
        </div>
      )}
      
      {!canAutoplay && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10">
          <button 
            onClick={manualPlay}
            className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full hover:bg-white transition-colors flex items-center gap-2"
          >
            <div className="w-0 h-0 border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1" />
            Reproduzir
          </button>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={false} // Controlled manually
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onWaiting={handleWaiting}
        onPlay={handlePlayEvent}
        onPause={handlePauseEvent}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover rounded-lg transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        style={{ border: 'none', outline: 'none' }}
      />
    </div>
  );
};

export default RobustVideoPlayer;
