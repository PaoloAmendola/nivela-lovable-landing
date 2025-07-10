import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw, Play } from 'lucide-react';

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
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isFirstView, setIsFirstView] = useState(true);
  const [showManualButton, setShowManualButton] = useState(false);
  
  console.log('🎬 RobustVideoPlayer: initializing with src:', src, 'hasPlayedOnce:', hasPlayedOnce);

  // Reset states when src changes
  useEffect(() => {
    console.log('🎬 RobustVideoPlayer: src changed, resetting states');
    setIsLoading(true);
    setHasError(false);
    setHasPlayedOnce(false);
    setIsFirstView(true);
    setShowManualButton(false);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  // Simplified Intersection Observer - only for first autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasPlayedOnce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5 && isFirstView && !hasError) {
          console.log('🎬 RobustVideoPlayer: first view detected, attempting autoplay');
          handleFirstAutoplay();
        }
      },
      { 
        threshold: [0.5],
        rootMargin: '50px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasPlayedOnce, isFirstView, hasError]);

  const handleFirstAutoplay = useCallback(async () => {
    if (!videoRef.current || hasError || hasPlayedOnce) return;
    
    try {
      await videoRef.current.play();
      console.log('🎬 RobustVideoPlayer: first autoplay successful');
    } catch (error) {
      console.log('🎬 RobustVideoPlayer: autoplay blocked, showing manual button', error);
      setShowManualButton(true);
    }
  }, [hasError, hasPlayedOnce]);

  const handleLoadStart = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: load started');
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleCanPlay = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: can play');
    setIsLoading(false);
  }, []);
  
  const handleError = useCallback((event: any) => {
    console.error('🎬 RobustVideoPlayer: video error occurred', {
      error: event.target?.error,
      src,
      code: event.target?.error?.code,
      message: event.target?.error?.message
    });
    
    setIsLoading(false);
    setHasError(true);
    setShowManualButton(true);
  }, [src]);

  const handlePlayEvent = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: play event fired');
    if (isFirstView) {
      setHasPlayedOnce(true);
      setIsFirstView(false);
      setShowManualButton(false);
    }
  }, [isFirstView]);

  const handlePauseEvent = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: pause event fired');
    if (hasPlayedOnce) {
      setShowManualButton(true);
    }
  }, [hasPlayedOnce]);

  const handleEndedEvent = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: video ended');
    setShowManualButton(true);
  }, []);

  const manualRetry = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: manual retry triggered');
    setHasError(false);
    setIsLoading(true);
    setHasPlayedOnce(false);
    setIsFirstView(true);
    setShowManualButton(false);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const manualPlay = useCallback(() => {
    console.log('🎬 RobustVideoPlayer: manual play triggered');
    if (videoRef.current) {
      setShowManualButton(false);
      videoRef.current.play();
    }
  }, []);
  
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
      
      {showManualButton && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10">
          <div className="text-center">
            <button 
              onClick={manualPlay}
              className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full hover:bg-white transition-colors flex items-center gap-2 mb-2"
            >
              <Play className="w-5 h-5 fill-current" />
              {hasPlayedOnce ? 'Assistir novamente' : 'Reproduzir'}
            </button>
            {hasPlayedOnce && (
              <div className="text-xs text-white/70">Toque para assistir novamente</div>
            )}
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={true} // Enable initial autoplay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onPlay={handlePlayEvent}
        onPause={handlePauseEvent}
        onEnded={handleEndedEvent}
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