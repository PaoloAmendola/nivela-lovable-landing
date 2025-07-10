import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface VideoErrorStateProps {
  title: string;
  onRetry: () => void;
}

const VideoErrorState = ({ title, onRetry }: VideoErrorStateProps) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-secondary/20 backdrop-blur-sm">
      <div className="text-center space-y-3">
        <AlertTriangle className="w-8 h-8 @md:w-12 @md:h-12 text-destructive mx-auto" />
        <p className="text-sm @md:text-base text-muted font-montserrat">Erro ao carregar vídeo</p>
        <button
          onClick={onRetry}
          className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 @md:px-6 @md:py-3 rounded-lg text-sm @md:text-base transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
};

export default VideoErrorState;