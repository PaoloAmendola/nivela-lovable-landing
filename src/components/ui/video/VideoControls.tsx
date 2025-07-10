import React from 'react';
import { cn } from '@/lib/utils';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  enableFullscreen: boolean;
  onTogglePlayPause: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => Promise<void>;
}

const VideoControls = ({
  isPlaying,
  isMuted,
  enableFullscreen,
  onTogglePlayPause,
  onToggleMute,
  onToggleFullscreen
}: VideoControlsProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlayPause();
          }}
          className="bg-white/20 backdrop-blur-sm rounded-full p-3 @md:p-4 hover:bg-white/30 transition-colors touch-manipulation"
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          <Play className={cn(
            "w-5 h-5 @md:w-6 @md:h-6 text-white",
            isPlaying && "hidden"
          )} />
          <div className={cn(
            "w-5 h-5 @md:w-6 @md:h-6 text-white",
            !isPlaying && "hidden"
          )}>
            <div className="w-1.5 h-4 bg-white inline-block mr-1"></div>
            <div className="w-1.5 h-4 bg-white inline-block"></div>
          </div>
        </button>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors touch-manipulation"
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 @md:w-5 @md:h-5 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 @md:w-5 @md:h-5 text-white" />
            )}
          </button>

          {enableFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFullscreen();
              }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors touch-manipulation"
              aria-label="Tela cheia"
            >
              <Maximize2 className="w-4 h-4 @md:w-5 @md:h-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoControls;