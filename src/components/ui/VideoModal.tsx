
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EnhancedButton } from '@/components/ui/EnhancedButton';
import { Play } from 'lucide-react';
import VideoDemo from './VideoDemo';

interface VideoModalProps {
  triggerText?: string;
  videoTitle?: string;
}

const VideoModal = ({ 
  triggerText = "🎬 Ver Tecnologia em Ação",
  videoTitle = "ASTRO QUAT V3 - Demonstração"
}: VideoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EnhancedButton
          variant="premium"
          size="lg"
          className="px-8 py-4 text-lg font-semibold"
        >
          <Play className="w-5 h-5 mr-2" />
          {triggerText}
        </EnhancedButton>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair gradient-text">
            {videoTitle}
          </DialogTitle>
        </DialogHeader>
        <VideoDemo title={videoTitle} />
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
