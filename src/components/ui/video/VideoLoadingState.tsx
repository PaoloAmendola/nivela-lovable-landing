import React from 'react';
import { Loader2 } from 'lucide-react';

interface VideoLoadingStateProps {
  title?: string;
}

const VideoLoadingState = ({ title }: VideoLoadingStateProps) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-secondary/20 backdrop-blur-sm">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 @md:w-12 @md:h-12 animate-spin text-primary mx-auto" />
        <p className="text-sm @md:text-base text-muted font-montserrat">Carregando vídeo...</p>
      </div>
    </div>
  );
};

export default VideoLoadingState;