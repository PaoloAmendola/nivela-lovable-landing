import { useEffect, useCallback, useRef } from 'react';

interface UseAggressiveAutoplayOptions {
  videoRef: React.RefObject<HTMLVideoElement>;
  shouldAutoplay: boolean;
  isVisible: boolean;
  title: string;
}

export const useAggressiveAutoplay = ({
  videoRef,
  shouldAutoplay,
  isVisible,
  title
}: UseAggressiveAutoplayOptions) => {
  const hasTriedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const attemptPlay = useCallback(async () => {
    if (!videoRef.current || !shouldAutoplay) return false;

    const video = videoRef.current;
    
    try {
      // Ensure video is muted and has the right attributes
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      
      // Try to play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
        // Success
        return true;
      }
    } catch (error) {
      // Failed to autoplay
    }
    
    return false;
  }, [videoRef, shouldAutoplay, title]);

  const startAggressiveRetry = useCallback(() => {
    if (hasTriedRef.current || !shouldAutoplay) return;
    
    hasTriedRef.current = true;
    
    // Try immediately
    attemptPlay();
    
    // Set up interval to keep trying
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;
      
      const video = videoRef.current;
      
      // If video is already playing, stop trying
      if (!video.paused) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      
      // Try to play again
      await attemptPlay();
    }, 2000);
    
    // Stop trying after 30 seconds
    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 30000);
  }, [attemptPlay, shouldAutoplay]);

  // Start aggressive autoplay when video becomes visible
  useEffect(() => {
    if (isVisible && shouldAutoplay && !hasTriedRef.current) {
      // Wait a bit for video to be ready
      setTimeout(startAggressiveRetry, 1000);
    }
  }, [isVisible, shouldAutoplay, startAggressiveRetry]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Reset when video changes
  useEffect(() => {
    hasTriedRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [videoRef.current?.src]);

  return {
    forcePlay: attemptPlay,
    reset: () => {
      hasTriedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };
};
