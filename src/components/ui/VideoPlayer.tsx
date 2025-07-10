import React from 'react';
import { cn } from '@/lib/utils';
import { VideoPlayerProps } from './video/types';
import { getVariantStyles } from './video/utils';
import { useVideoPlayer } from '@/hooks/use-video-player';
import VideoLoadingState from './video/VideoLoadingState';
import VideoErrorState from './video/VideoErrorState';
import VideoPlaceholder from './video/VideoPlaceholder';
import VideoControls from './video/VideoControls';

const VideoPlayer = ({
  src,
  poster,
  className,
  containerClassName,
  title = "Vídeo",
  priority = false,
  variant = 'default',
  customPoster,
  enableFullscreen = true,
  touchOptimized = true
}: VideoPlayerProps) => {
  const finalPoster = customPoster || poster;
  
  const {
    state,
    videoRef,
    containerRef,
    togglePlayPause,
    toggleMute,
    toggleFullscreen,
    handleLoadedData,
    handleError,
    handleRetry,
    handleVideoClick,
    handlePlay,
    handlePause,
    setShowControls
  } = useVideoPlayer({
    priority,
    touchOptimized,
    enableFullscreen,
    title
  });

  const styles = getVariantStyles(variant);

  return (
    <div ref={containerRef} className={cn(
      "relative group",
      // Container queries para responsividade aprimorada
      "@container",
      "transition-all duration-300",
      state.isFullscreen && "fixed inset-0 z-50 bg-black",
      containerClassName
    )}>
      <div className={cn(
        "relative overflow-hidden p-1",
        styles.container,
        styles.gradient,
        // Responsive sizing com container queries
        "h-auto @sm:h-[250px] @md:h-[300px] @lg:h-[400px] @xl:h-[500px]",
        state.isFullscreen && "h-screen p-0"
      )}>
        {/* Loading Skeleton */}
        {state.isLoading && !state.hasError && (
          <VideoLoadingState title={title} />
        )}

        {/* Error State */}
        {state.hasError && (
          <VideoErrorState title={title} onRetry={handleRetry} />
        )}

        {/* Video Element - Simplificado com fallback */}
        <div 
          className="relative"
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            poster={finalPoster}
            controls={true} // Always show native controls
            autoPlay={false}
            muted={true}
            loop={true}
            playsInline
            preload="metadata"
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              styles.video,
              state.isLoading ? "opacity-0" : "opacity-100",
              state.isFullscreen && "h-screen object-contain",
              className
            )}
            onLoadedData={handleLoadedData}
            onError={handleError}
            onPlay={handlePlay}
            onPause={handlePause}
            aria-label={`Vídeo: ${title}`}
          >
            {/* Primary source - WebM */}
            <source src={src} type="video/webm" />
            
            {/* Fallback sources - MP4 alternatives */}
            <source 
              src={src.replace('/formato-Webm/', '/formato-Mp4/').replace('.webm', '.mp4')} 
              type="video/mp4" 
            />
            
            {/* Local fallback if exists */}
            <source 
              src={`/videos/${src.split('/').pop()?.replace('.webm', '.mp4')}`} 
              type="video/mp4" 
            />
            
            Seu navegador não suporta reprodução de vídeo.
          </video>
        </div>

        {/* Performance Indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs @md:text-sm text-foreground">
            🎬 {variant} {touchOptimized && '📱'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;