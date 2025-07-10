import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
  poster?: string;
  title: string;
  videoStyles: string;
}

const VideoPlaceholder = ({ poster, title, videoStyles }: VideoPlaceholderProps) => {
  if (!poster) return null;

  return (
    <div className="relative aspect-video bg-secondary/10 cursor-pointer group">
      <img
        src={poster}
        alt={`Thumbnail ${title}`}
        className={cn("w-full h-full object-cover", videoStyles)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
        <div className="bg-background/80 backdrop-blur-sm rounded-full p-4 @md:p-6 group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 @md:w-12 @md:h-12 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlaceholder;