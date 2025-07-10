import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface RobustVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const RobustVideoPlayer = ({ src, poster, className }: RobustVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleError = () => {
    console.error('Erro ao carregar vídeo:', src);
    setHasError(true);
  };

  const handleClick = () => {
    const video = document.querySelector(`video[src="${src}"]`) as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        className="w-full rounded-xl shadow-md cursor-pointer"
        onPlay={handlePlay}
        onError={handleError}
        onClick={handleClick}
        controls
      />

      {/* Botão de play sempre visível quando pausado */}
      {!isPlaying && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl cursor-pointer" onClick={handleClick}>
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white/100 transition-all duration-300">
            <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Estado de erro */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 rounded-xl">
          <div className="text-center text-muted p-4">
            <p className="text-sm">Erro ao carregar vídeo</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-xs text-primary hover:underline mt-2"
            >
              Recarregar página
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobustVideoPlayer;