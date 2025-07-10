export interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  title?: string;
  priority?: boolean;
  variant?: 'default' | 'technology' | 'results';
  customPoster?: string;
  enableFullscreen?: boolean;
  touchOptimized?: boolean;
}

export interface VideoPlayerState {
  isLoading: boolean;
  hasError: boolean;
  isInView: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  showControls: boolean;
  isFullscreen: boolean;
}

export interface VideoVariantStyles {
  container: string;
  gradient: string;
  video: string;
}