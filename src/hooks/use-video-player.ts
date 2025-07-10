import { useState, useRef, useEffect, useCallback } from 'react';
import { VideoPlayerState } from '@/components/ui/video/types';
import { logger } from '@/lib/logger';

interface UseVideoPlayerProps {
  priority: boolean;
  touchOptimized: boolean;
  enableFullscreen: boolean;
  title: string;
}

export const useVideoPlayer = ({
  priority,
  touchOptimized,
  enableFullscreen,
  title
}: UseVideoPlayerProps) => {
  const [state, setState] = useState<VideoPlayerState>({
    isLoading: true,
    hasError: false,
    isInView: true, // Sempre true para corrigir problemas de carregamento
    isPlaying: false,
    isMuted: true,
    showControls: false,
    isFullscreen: false
  });

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simplificar intersection observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, isInView: true }));
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [priority]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setState(prev => ({ ...prev, isFullscreen: !!document.fullscreenElement }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Removido touch gesture handling - usando controles nativos

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setState(prev => ({ ...prev, isPlaying: true }));
      } else {
        videoRef.current.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setState(prev => ({ ...prev, isMuted: videoRef.current!.muted }));
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current || !enableFullscreen) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      logger.error('Fullscreen error:', error);
    }
  }, [enableFullscreen]);

  const handleLoadedData = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: false, hasError: false }));
    logger.info(`${title} video loaded successfully`);
    
    // Don't try to autoplay - let user control playback
  }, [title]);

  const handleError = useCallback(() => {
    logger.error(`${title} video failed to load, attempt ${retryCount + 1}/${maxRetries}`);
    
    if (retryCount < maxRetries) {
      // Retry com backoff exponencial
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      setTimeout(() => {
        logger.info(`Retrying ${title} video in ${delay}ms...`);
        setRetryCount(prev => prev + 1);
        setState(prev => ({ ...prev, hasError: false, isLoading: true }));
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, delay);
    } else {
      setState(prev => ({ ...prev, isLoading: false, hasError: true }));
      setRetryCount(0); // Reset for manual retry
    }
  }, [title, retryCount, maxRetries]);

  const handleRetry = useCallback(() => {
    setRetryCount(0); // Reset retry counter for manual retry
    setState(prev => ({ ...prev, hasError: false, isLoading: true }));
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoClick = useCallback(() => {
    // Simplificado - sem controles customizados
  }, []);

  const setShowControls = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showControls: show }));
  }, []);

  const handlePlay = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const handlePause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  return {
    state,
    videoRef,
    containerRef,
    togglePlayPause,
    toggleMute,
    toggleFullscreen,
    handleLoadedData,
    handleError,
    handleRetry,
    handleVideoClick,
    handlePlay,
    handlePause,
    setShowControls
  };
};