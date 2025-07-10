import React from 'react';
import { cn } from '@/lib/utils';

interface RobustVideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
}

const RobustVideoPlayer = ({ src, className, poster }: RobustVideoPlayerProps) => {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={cn("w-full h-full object-cover rounded-lg", className)}
    />
  );
};

export default RobustVideoPlayer;