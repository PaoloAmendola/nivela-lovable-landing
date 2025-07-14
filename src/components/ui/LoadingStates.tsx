import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton' | 'pulse' | 'dots';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingStateProps> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
};

const LoadingSkeleton: React.FC<LoadingStateProps> = ({ size = 'md' }) => {
  const heights = {
    sm: 'h-20',
    md: 'h-32',
    lg: 'h-48'
  };

  return (
    <div className="space-y-4 animate-pulse">
      <div className={`${heights[size]} bg-white/10 rounded-lg`} />
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
};

const LoadingDots: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
};

const LoadingPulse: React.FC<LoadingStateProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} bg-gradient-to-br from-primary/20 to-primary/40 rounded-full mx-auto`}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'spinner', 
  fullScreen = false, 
  ...props 
}) => {
  const renderLoading = () => {
    switch (type) {
      case 'skeleton':
        return <LoadingSkeleton {...props} />;
      case 'pulse':
        return <LoadingPulse {...props} />;
      case 'dots':
        return <LoadingDots {...props} />;
      default:
        return <LoadingSpinner {...props} />;
    }
  };

  if (fullScreen) {
    return (
      <motion.div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {renderLoading()}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      {renderLoading()}
    </div>
  );
};

interface NetworkStatusProps {
  isOnline?: boolean;
  showStatus?: boolean;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  isOnline = true, 
  showStatus = true 
}) => {
  if (!showStatus) return null;

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
        isOnline 
          ? 'bg-green-500/20 text-green-300' 
          : 'bg-red-500/20 text-red-300'
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {isOnline ? (
        <Wifi className="h-3 w-3" />
      ) : (
        <WifiOff className="h-3 w-3" />
      )}
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </motion.div>
  );
};

export default LoadingState;