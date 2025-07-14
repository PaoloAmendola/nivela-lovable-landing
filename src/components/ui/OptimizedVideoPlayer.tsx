import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings } from 'lucide-react';
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
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');

  // Connection-based quality selection
  const optimizedSrc = useMemo(() => {
    const connection = (navigator as any).connection;
    let selectedQuality = quality;
    
    if (connection) {
      if (connection.effectiveType === '4g' && !connection.saveData) {
        selectedQuality = 'high';
      } else if (connection.effectiveType === '3g' || connection.saveData) {
        selectedQuality = 'low';
      }
    }
    
    // For demo, using same source but could implement quality variants
    return src;
  }, [src, quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.25,
        rootMargin: '100px 0px'
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Auto-play attempt when in view
  useEffect(() => {
    if (!isInView || !videoRef.current || isLoaded) return;

    const video = videoRef.current;
    
    const attemptAutoplay = async () => {
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
        setIsLoaded(true);
        onPlay?.(); // Callback para marcar como reproduzido
      } catch (error) {
        // Autoplay blocked - show play button
        setShowControls(true);
        setIsLoaded(true);
      }
    };

    if (autoplay || smartAutoplay) {
      attemptAutoplay();
    } else {
      setIsLoaded(true);
    }
  }, [isInView, autoplay, smartAutoplay, isLoaded, onPlay]);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        await video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
        onPlay?.(); // Callback para marcar como reproduzido em play manual
      }
    } catch (error) {
      console.warn('Video play/pause failed:', error);
    }
  }, [isPlaying, onPlay]);

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
      videoRef.current.play().catch(() => {});
    }
  }, [loop]);

  // Low-res placeholder
  const placeholderSrc = useMemo(() => {
    if (!poster) return undefined;
    return poster.includes('unsplash') 
      ? poster.replace('&q=80', '&q=30').replace('w=1920', 'w=640')
      : poster;
  }, [poster]);

  if (!isInView) {
    return (
      <div 
        ref={containerRef} 
        className={`relative bg-muted/20 rounded-xl overflow-hidden ${className}`}
        style={{ aspectRatio: '16/9' }}
      >
        {placeholderSrc && (
          <img 
            src={placeholderSrc}
            alt="Video preview"
            className="w-full h-full object-cover blur-sm"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
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
        src={isLoaded ? optimizedSrc : undefined}
        poster={poster}
        muted={isMuted}
        loop={loop}
        playsInline
        preload={preload}
        onEnded={handleVideoEnd}
        className="w-full rounded-xl"
        crossOrigin="anonymous"
      />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Controls overlay */}
      {(showControls || !isPlaying) && isLoaded && (
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

      {/* Quality indicator */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
        {quality.toUpperCase()}
      </div>
    </div>
  );
};

export default OptimizedVideoPlayer;