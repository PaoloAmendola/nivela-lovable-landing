
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'avatar' | 'card' | 'button' | 'video' | 'image';
  lines?: number;
  animate?: boolean;
}

const Skeleton = ({ 
  className, 
  variant = 'text', 
  lines = 1, 
  animate = true 
}: SkeletonProps) => {
  const baseClasses = "bg-muted/30 rounded";
  const animationClasses = animate ? "animate-pulse" : "";
  
  const variants = {
    text: "h-4 w-full",
    avatar: "h-12 w-12 rounded-full",
    card: "h-48 w-full",
    button: "h-10 w-24",
    video: "h-64 w-full aspect-video",
    image: "h-40 w-full"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            initial={animate ? { opacity: 0, x: -20 } : false}
            animate={animate ? { opacity: 1, x: 0 } : false}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={cn(
              baseClasses,
              variants[variant],
              animationClasses,
              index === lines - 1 && "w-3/4",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.95 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.3 }}
      className={cn(baseClasses, variants[variant], animationClasses, className)}
    />
  );
};

// Skeleton específico para Hero Section
export const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/10 to-muted/20">
    <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
      <Skeleton className="h-6 w-32 mx-auto" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-5/6 mx-auto" />
        <Skeleton className="h-12 w-4/6 mx-auto" />
      </div>
      <div className="flex justify-center space-x-4">
        <Skeleton variant="button" className="w-40 h-12" />
        <Skeleton variant="button" className="w-32 h-12" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            className="space-y-3"
          >
            <Skeleton className="h-8 w-8 mx-auto rounded-full" />
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-4 w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Skeleton para seções gerais
export const SectionSkeleton = () => (
  <div className="py-12 sm:py-16 space-y-8">
    <div className="text-center space-y-4">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton variant="text" lines={2} className="max-w-2xl mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-4"
        >
          <Skeleton variant="card" />
          <Skeleton variant="text" lines={3} />
        </motion.div>
      ))}
    </div>
  </div>
);

// Skeleton para vídeo com play button
export const VideoSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative aspect-video"
  >
    <Skeleton variant="video" className="w-full" />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center"
      >
        <div className="w-0 h-0 border-l-8 border-l-accent border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
      </motion.div>
    </div>
  </motion.div>
);

// Skeleton para cards de conteúdo
export const ContentCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-background/20 backdrop-blur-sm border border-muted/20 rounded-lg p-6 space-y-4"
  >
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton variant="text" lines={3} />
  </motion.div>
);

export default Skeleton;
