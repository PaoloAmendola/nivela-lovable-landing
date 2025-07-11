import React, { useRef, useState, useEffect, useCallback } from 'react';

interface RobustVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const RobustVideoPlayer = ({ src, poster, className }: RobustVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isFirstView, setIsFirstView] = useState(true);
  const [showManualButton, setShowManualButton] = useState(false);

  const attemptFirstAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasPlayedOnce || !isFirstView) return;

    try {
      video.muted = true;
      await video.play();
      setHasPlayedOnce(true);
      setIsFirstView(false);
    } catch (err) {
      // Autoplay blocked, show manual button
      setShowManualButton(true);
    }
  }, [hasPlayedOnce, isFirstView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        attemptFirstAutoplay();
        observer.disconnect();
      }
    }, {
      threshold: [0.5],
      rootMargin: '50px'
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [attemptFirstAutoplay]);

  const handleManualPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.muted = true;
      await video.play();
      setShowManualButton(false);
    } catch (err) {
      // Manual play error - silent fail
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="w-full rounded-xl shadow-md"
      />

      {showManualButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={handleManualPlay}
            className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200"
          >
            Reproduzir
          </button>
        </div>
      )}
    </div>
  );
};

export default RobustVideoPlayer;