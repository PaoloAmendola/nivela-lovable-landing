
import React from 'react';
import { motion } from 'framer-motion';
import OptimizedVideoPlayer from '@/components/ui/OptimizedVideoPlayer';
import { useSmartAutoplay } from '@/hooks/use-smart-autoplay';
import { itemVariants } from './manifesto-animations';
import VideoErrorBoundary from './VideoErrorBoundary';

const ManifestoVideo = () => {
  const { shouldAutoplay, isFirstView, markAsPlayed, isInitialized } = useSmartAutoplay();

  return (
    <VideoErrorBoundary>
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12 lg:mb-16">
        <div className="relative">
          {/* Indicador de primeira visualização */}
          {isFirstView && shouldAutoplay && (
            <div className="absolute top-4 left-4 z-10 bg-accent/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              ▶ Reprodução automática
            </div>
          )}
          
          <div className="aspect-video rounded-lg overflow-hidden">
            <OptimizedVideoPlayer
              src="https://xnexfhgtqlryfkyuvihq.supabase.co/storage/v1/object/public/videos/video-manifesto-oficial-compactado.mp4"
              className="w-full max-w-4xl mx-auto"
              smartAutoplay={shouldAutoplay}
              autoplay={shouldAutoplay}
              muted={true}
              preload="metadata"
              poster="/lovable-uploads/f7afc3f5-36a2-49c4-a947-04e9bc701f3c.png"
              onPlay={markAsPlayed}
            />
          </div>
          
          {/* Decoração ao redor do vídeo */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-accent rounded-tl-lg opacity-60" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-accent rounded-tr-lg opacity-60" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-accent rounded-bl-lg opacity-60" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-accent rounded-br-lg opacity-60" />
        </div>
      </motion.div>
    </VideoErrorBoundary>
  );
};

export default ManifestoVideo;
