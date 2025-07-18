
import React from 'react';
import { motion } from 'framer-motion';
import RobustVideoPlayer from '@/components/ui/RobustVideoPlayer';
import { itemVariants } from './manifesto-animations';

const ManifestoVideo = () => {
  return (
    <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12 lg:mb-16">
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden">
          <RobustVideoPlayer
            src="https://xnexfhgtqlryfkyuvihq.supabase.co/storage/v1/object/public/videos/video-manifesto-oficial-compactado.mp4"
            className="w-full max-w-4xl mx-auto"
          />
        </div>
        
        {/* Decoração ao redor do vídeo */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-accent rounded-tl-lg opacity-60" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-accent rounded-tr-lg opacity-60" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-accent rounded-bl-lg opacity-60" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-accent rounded-br-lg opacity-60" />
      </div>
    </motion.div>
  );
};

export default ManifestoVideo;
