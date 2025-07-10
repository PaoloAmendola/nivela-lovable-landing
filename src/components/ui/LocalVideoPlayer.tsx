
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Play, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { logger } from '@/lib/logger';

interface LocalVideoPlayerProps {
  designId: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}

const LocalVideoPlayer = ({ 
  designId, 
  title = "Video Player", 
  className, 
  autoPlay = false 
}: LocalVideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const embedUrl = `https://www.canva.com/design/${designId}/watch?embed&autoplay=${autoPlay ? 1 : 0}`;

  const handleLoad = useCallback(() => {
    logger.info(`Local video loaded successfully: ${title}`);
    setIsLoading(false);
    setHasError(false);
  }, [title]);

  const handleError = useCallback(() => {
    logger.error(`Local video failed to load: ${title}`);
    setIsLoading(false);
    setHasError(true);
  }, [title]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    // Force reload by changing timestamp
    const iframe = document.querySelector(`iframe[data-design-id="${designId}"]`) as HTMLIFrameElement;
    if (iframe) {
      iframe.src = embedUrl + '&t=' + Date.now();
    }
  }, [embedUrl, designId]);

  const togglePlay = useCallback(() => {
    const iframe = document.querySelector(`iframe[data-design-id="${designId}"]`) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          isPlaying ? '{"event":"pause"}' : '{"event":"play"}', 
          '*'
        );
        setIsPlaying(!isPlaying);
      } catch (error) {
        // Could not control video playback
      }
    }
  }, [isPlaying, designId]);

  const toggleMute = useCallback(() => {
    const iframe = document.querySelector(`iframe[data-design-id="${designId}"]`) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          isMuted ? '{"event":"unmute"}' : '{"event":"mute"}', 
          '*'
        );
        setIsMuted(!isMuted);
      } catch (error) {
        // Could not control video audio
      }
    }
  }, [isMuted, designId]);

  return (
    <div className={cn("w-full relative group", className)}>
      <div 
        className="relative w-full overflow-hidden rounded-lg shadow-xl bg-secondary/10"
        style={{
          aspectRatio: '16/9',
          minHeight: '300px'
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted font-montserrat text-sm">Carregando demonstração...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center z-10">
            <div className="text-center text-muted p-4">
              <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm mb-3">Erro ao carregar demonstração</p>
              <button 
                onClick={handleRetry}
                className="inline-flex items-center gap-2 text-xs text-primary hover:underline bg-background/80 px-3 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Video iframe */}
        <iframe 
          data-design-id={designId}
          className={cn(
            "absolute inset-0 w-full h-full border-none transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          src={embedUrl}
          title={title}
          allowFullScreen
          allow="autoplay; fullscreen; encrypted-media"
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        />

        {/* Local controls overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="bg-background/80 backdrop-blur-sm rounded-full p-3 hover:bg-background/90 transition-colors"
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              <Play className={cn("w-6 h-6", isPlaying && "hidden")} />
              <div className={cn("w-6 h-6 border-l-2 border-r-2 border-foreground", !isPlaying && "hidden")} />
            </button>
            <button
              onClick={toggleMute}
              className="bg-background/80 backdrop-blur-sm rounded-full p-3 hover:bg-background/90 transition-colors"
              aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Local indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-foreground">
            🎬 Local Player
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalVideoPlayer;
