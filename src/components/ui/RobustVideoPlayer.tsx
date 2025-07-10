import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw, Play } from 'lucide-react';

interface RobustVideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
}

const RobustVideoPlayer = ({ src, className, poster }: RobustVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Simplified states - only what we need
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  console.log('🎬 RobustVideoPlayer init:', { src, isLoading, hasError, showControls });

  // Video event handlers with clear logging
  const handleLoadStart = useCallback(() => {
    console.log('🎬 Load started');
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleCanPlay = useCallback(() => {
    console.log('🎬 Can play - readyState:', videoRef.current?.readyState);
    setIsLoading(false);
  }, []);
  
  const handlePlay = useCallback(() => {
    console.log('🎬 Play event - video started playing');
    setShowControls(false);
  }, []);
  
  const handlePause = useCallback(() => {
    console.log('🎬 Pause event - video paused');
    setShowControls(true);
  }, []);
  
  const handleEnded = useCallback(() => {
    console.log('🎬 Video ended - showing replay button');
    setShowControls(true);
  }, []);
  
  const handleError = useCallback((event: any) => {
    console.error('🎬 Video error:', {
      error: event.target?.error,
      src,
      code: event.target?.error?.code,
      message: event.target?.error?.message
    });
    
    setIsLoading(false);
    setHasError(true);
    setShowControls(false);
  }, [src]);

  // Manual controls
  const handleRetry = useCallback(() => {
    console.log('🎬 Manual retry - reloading video');
    setHasError(false);
    setIsLoading(true);
    setShowControls(false);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleManualPlay = useCallback(async () => {
    console.log('🎬 Manual play triggered');
    const video = videoRef.current;
    
    if (!video) return;
    
    try {
      await video.play();
      console.log('🎬 Manual play successful');
    } catch (error) {
      console.error('🎬 Manual play failed:', error);
      setShowControls(true);
    }
  }, []);
  
  // Error state
  if (hasError) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center bg-muted/20 rounded-lg", className)}>
        <div className="text-center p-6">
          <div className="text-muted-foreground mb-4">Erro ao carregar vídeo</div>
          <button 
            onClick={handleRetry}
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
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mb-2 mx-auto" />
            <div className="text-sm text-muted-foreground">Carregando vídeo...</div>
          </div>
        </div>
      )}
      
      {/* Manual play button */}
      {showControls && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10">
          <button 
            onClick={handleManualPlay}
            className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full hover:bg-white transition-colors flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            Reproduzir
          </button>
        </div>
      )}
      
      {/* Video element with native autoplay */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover rounded-lg transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
};

export default RobustVideoPlayer;