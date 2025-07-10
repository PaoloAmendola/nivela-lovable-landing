import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import { Play, RefreshCw } from 'lucide-react';

interface VideoDemoProps {
  className?: string;
  title?: string;
}

const VideoDemo = ({ className, title = "Demonstração ASTRO QUAT V3" }: VideoDemoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // URL atualizada para o novo vídeo da tecnologia
  const embedUrl = "https://www.canva.com/design/DAGrGoE5UVQ/watch?embed";

  const handleLoad = () => {
    logger.info("VideoDemo loaded successfully");
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    logger.error("VideoDemo failed to load");
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    // Force reload by changing src
    const iframe = document.querySelector('iframe[title="' + title + '"]') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = embedUrl + '&t=' + Date.now();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className="relative w-full overflow-hidden rounded-lg shadow-xl bg-secondary/10"
        style={{
          aspectRatio: '16/9',
          minHeight: '300px'
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center z-10">
            <div className="text-center p-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted font-montserrat text-sm">Carregando demonstração...</p>
            </div>
          </div>
        )}

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

        <iframe 
          className={cn(
            "absolute inset-0 w-full h-full border-none transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          src={embedUrl}
          allowFullScreen 
          allow="autoplay; fullscreen"
          title={title}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />

        {/* Performance indicator */}
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-foreground">
            🎬 Demo
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDemo;
