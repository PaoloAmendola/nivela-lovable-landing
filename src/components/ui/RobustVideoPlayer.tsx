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
      autoPlay
      muted
      playsInline
      preload="auto"
      crossOrigin="anonymous"
      className={cn("w-full rounded-xl shadow-md", className)}
    />
  );
};

export default RobustVideoPlayer;