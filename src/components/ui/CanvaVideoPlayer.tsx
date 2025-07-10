
import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import { Play, RefreshCw, ExternalLink } from 'lucide-react';

interface CanvaVideoPlayerProps {
  designId: string;
  className?: string;
  title?: string;
}

const CanvaVideoPlayer = ({ designId, className, title = "Vídeo" }: CanvaVideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Método específico: URL do Canva com ?embed no final
  const embedUrl = `https://www.canva.com/design/${designId}/view?embed`;
  const shareUrl = `https://www.canva.com/design/${designId}/watch`;

  const handleLoad = () => {
    logger.info(`Canva video loaded successfully: ${title}`);
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    logger.error(`Canva video failed to load: ${title}`);
    setIsLoading(false);
    setHasError(true);
  };

  const handleOpenExternal = () => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className="relative w-full overflow-hidden rounded-lg shadow-xl bg-secondary/10 aspect-video"
        style={{ minHeight: '300px' }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center z-10">
            <div className="text-center p-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted font-montserrat text-sm">Carregando vídeo...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center z-10">
            <div className="text-center text-muted p-4 space-y-4">
              <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div>
                <p className="text-base font-semibold mb-2">Vídeo do {title}</p>
                <p className="text-sm mb-4">Clique para assistir no Canva</p>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={handleOpenExternal}
                  className="inline-flex items-center gap-2 text-sm text-white bg-primary hover:bg-primary/80 px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Assistir Vídeo
                </button>
                
                <div className="pt-2">
                  <button 
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video iframe - Método específico do Canva */}
        <iframe 
          className={cn(
            "absolute inset-0 w-full h-full border-none transition-opacity duration-500",
            isLoading || hasError ? "opacity-0" : "opacity-100"
          )}
          src={embedUrl}
          title={title}
          allowFullScreen
          allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture"
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default CanvaVideoPlayer;
