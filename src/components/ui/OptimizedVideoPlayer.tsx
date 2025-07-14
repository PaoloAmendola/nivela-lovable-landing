
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OptimizedVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  smartAutoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onPlay?: () => void;
}

const OptimizedVideoPlayer = ({ 
  src, 
  poster, 
  className = '',
  autoplay = false,
  smartAutoplay = false,
  muted = true,
  loop = true,
  preload = 'none',
  onPlay
}: OptimizedVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Carregamento imediato e autoplay simplificado
  useEffect(() => {
    setIsInView(true);
    setIsLoaded(true);
    
    const video = videoRef.current;
    if (!video || hasError) return;
    
    const attemptAutoplay = async () => {
      try {
        // Garantir que está mutado para autoplay
        video.muted = true;
        setIsMuted(true);
        
        await video.play();
        setIsPlaying(true);
        onPlay?.();
      } catch (error) {
        setShowControls(true);
      }
    };

    // Autoplay inteligente: tentar reproduzir se solicitado
    if (autoplay || smartAutoplay) {
      // Pequeno delay para garantir que o vídeo está pronto
      const timer = setTimeout(() => {
        attemptAutoplay();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [autoplay, smartAutoplay, onPlay, hasError]);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasError) return;

    try {
      if (isPlaying) {
        await video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
        onPlay?.();
      }
    } catch (error) {
      setHasError(true);
    }
  }, [isPlaying, onPlay, hasError]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
    if (loop && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [loop]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Placeholder de baixa resolução
  const placeholderSrc = useMemo(() => {
    if (!poster) return undefined;
    return poster;
  }, [poster]);


  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className={`relative bg-muted/20 rounded-xl overflow-hidden flex items-center justify-center ${className}`}
        style={{ aspectRatio: '16/9' }}
      >
        <div className="text-center text-muted-foreground">
          <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Erro ao carregar vídeo</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative group rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop={loop}
        playsInline
        preload={preload}
        onEnded={handleVideoEnd}
        onError={handleError}
        className="w-full rounded-xl"
        crossOrigin="anonymous"
      />

      {/* Loading overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Controls overlay */}
      {(showControls || !isPlaying) && isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity">
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              onClick={toggleMute}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedVideoPlayer;
