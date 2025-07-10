
import { useState, useRef, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

interface UseVideoControlsProps {
  autoPlay: boolean;
  muted: boolean;
  isInView: boolean;
}

export const useVideoControls = ({ autoPlay, muted, isInView }: UseVideoControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isInView && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    } else if (isInView && autoPlay && videoRef.current?.paused) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isInView, autoPlay]);

  const togglePlay = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      logger.warn('Video play/pause failed:', error);
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  return {
    videoRef,
    isPlaying,
    isMuted,
    showControls,
    setIsPlaying,
    setIsMuted,
    setShowControls,
    togglePlay,
    toggleMute
  };
};
