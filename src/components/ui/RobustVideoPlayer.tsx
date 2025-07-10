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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Core states
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(true);
  
  // Autoplay "once only" logic
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isFirstView, setIsFirstView] = useState(true);
  const [showManualButton, setShowManualButton] = useState(false);
  
  console.log('🎬 RobustVideoPlayer init:', { src, hasPlayedOnce, isFirstView, showManualButton });

  // Reset all states when src changes
  useEffect(() => {
    console.log('🎬 Source changed, resetting all states');
    
    // Clear any pending timeouts
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    
    // Reset states
    setIsLoading(true);
    setHasError(false);
    setCanAutoplay(true);
    setHasPlayedOnce(false);
    setIsFirstView(true);
    setShowManualButton(false);
    
    // Reload video
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  // Intersection Observer for first autoplay detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasPlayedOnce || !isFirstView) {
      return;
    }

    console.log('🎬 Setting up Intersection Observer');
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        console.log('🎬 Video in viewport, attempting first autoplay');
        
        // Disconnect observer immediately - we only want this once
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        
        // Debounce autoplay attempt
        if (autoplayTimeoutRef.current) {
          clearTimeout(autoplayTimeoutRef.current);
        }
        
        autoplayTimeoutRef.current = setTimeout(() => {
          attemptFirstAutoplay();
        }, 100);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: [0.5],
      rootMargin: '50px'
    });

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }
    };
  }, [hasPlayedOnce, isFirstView]);

  // Attempt first autoplay with proper checks
  const attemptFirstAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasError || hasPlayedOnce || !canAutoplay) {
      console.log('🎬 Skipping autoplay:', { hasError, hasPlayedOnce, canAutoplay });
      return;
    }

    // Check if video is ready to play
    if (video.readyState < 3) {
      console.log('🎬 Video not ready, readyState:', video.readyState);
      setShowManualButton(true);
      return;
    }

    try {
      console.log('🎬 Attempting autoplay...');
      
      // Ensure video is muted for autoplay
      video.muted = true;
      
      const playPromise = video.play();
      await playPromise;
      
      console.log('🎬 Autoplay successful!');
      
    } catch (error) {
      console.log('🎬 Autoplay blocked by browser:', error);
      setCanAutoplay(false);
      setShowManualButton(true);
    }
  }, [hasError, hasPlayedOnce, canAutoplay]);

  // Video event handlers with improved logic
  const handleLoadStart = useCallback(() => {
    console.log('🎬 Load started');
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleCanPlay = useCallback(() => {
    console.log('🎬 Can play - readyState:', videoRef.current?.readyState);
    setIsLoading(false);
    
    // If this is first view and we can autoplay, try it after a small delay
    if (isFirstView && !hasPlayedOnce && canAutoplay) {
      setTimeout(() => {
        attemptFirstAutoplay();
      }, 200);
    }
  }, [isFirstView, hasPlayedOnce, canAutoplay, attemptFirstAutoplay]);
  
  const handleError = useCallback((event: any) => {
    console.error('🎬 Video error:', {
      error: event.target?.error,
      src,
      code: event.target?.error?.code,
      message: event.target?.error?.message
    });
    
    setIsLoading(false);
    setHasError(true);
    setShowManualButton(true);
    setCanAutoplay(false);
  }, [src]);

  const handlePlayEvent = useCallback(() => {
    console.log('🎬 Play event - transitioning to played state');
    
    if (isFirstView) {
      setHasPlayedOnce(true);
      setIsFirstView(false);
      setShowManualButton(false);
    }
  }, [isFirstView]);

  const handlePauseEvent = useCallback(() => {
    console.log('🎬 Pause event');
    
    // Only show manual button if video has played once (not during loading)
    if (hasPlayedOnce && !isLoading) {
      setShowManualButton(true);
    }
  }, [hasPlayedOnce, isLoading]);

  const handleEndedEvent = useCallback(() => {
    console.log('🎬 Video ended - showing replay button');
    setShowManualButton(true);
  }, []);

  // Manual controls
  const manualRetry = useCallback(() => {
    console.log('🎬 Manual retry - full reset');
    
    // Clear timeouts
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    
    // Full reset
    setHasError(false);
    setIsLoading(true);
    setCanAutoplay(true);
    setHasPlayedOnce(false);
    setIsFirstView(true);
    setShowManualButton(false);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const manualPlay = useCallback(async () => {
    console.log('🎬 Manual play triggered');
    const video = videoRef.current;
    
    if (!video) return;
    
    try {
      setShowManualButton(false);
      
      // Ensure video is muted for compatibility
      video.muted = true;
      
      await video.play();
      console.log('🎬 Manual play successful');
      
    } catch (error) {
      console.error('🎬 Manual play failed:', error);
      setShowManualButton(true);
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