
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumSkeletonProps {
  className?: string;
  variant?: 'text' | 'avatar' | 'card' | 'button' | 'video' | 'hero';
  lines?: number;
  animate?: boolean;
}

const PremiumSkeleton = ({ 
  className, 
  variant = 'text', 
  lines = 1, 
  animate = true 
}: PremiumSkeletonProps) => {
  const baseClasses = "bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-xl";
  
  const variants = {
    text: "h-4 w-full",
    avatar: "h-12 w-12 rounded-full",
    card: "h-48 w-full glass-subtle",
    button: "h-12 w-32 btn-touch-optimized",
    video: "h-64 w-full aspect-video glass-medium",
    hero: "h-96 w-full glass-strong"
  };

  const shimmerAnimation = {
    initial: { backgroundPosition: '-200% 0' },
    animate: { 
      backgroundPosition: '200% 0',
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      }
    }
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
              index === lines - 1 && "w-3/4",
              className
            )}
            style={{
              backgroundSize: '400% 100%',
              backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }}
            {...(animate ? shimmerAnimation : {})}
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
      className={cn(baseClasses, variants[variant], className)}
      style={{
        backgroundSize: '400% 100%',
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
      }}
      {...(animate ? shimmerAnimation : {})}
    />
  );
};

// Premium branded skeletons
export const BrandedHeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20">
    <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
      <PremiumSkeleton className="h-8 w-48 mx-auto glass-subtle" />
      <div className="space-y-4">
        <PremiumSkeleton variant="hero" className="mx-auto" />
        <PremiumSkeleton className="h-8 w-3/4 mx-auto" />
        <PremiumSkeleton className="h-6 w-1/2 mx-auto" />
      </div>
      <div className="flex justify-center space-x-4">
        <PremiumSkeleton variant="button" className="glass-medium" />
        <PremiumSkeleton variant="button" className="glass-subtle" />
      </div>
    </div>
  </div>
);

export const BrandedSectionSkeleton = () => (
  <div className="py-12 sm:py-16 space-y-8">
    <div className="text-center space-y-4">
      <PremiumSkeleton className="h-10 w-64 mx-auto glass-medium" />
      <PremiumSkeleton variant="text" lines={2} className="max-w-2xl mx-auto" />
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
          <PremiumSkeleton variant="card" className="hover-lift" />
          <PremiumSkeleton variant="text" lines={3} />
        </motion.div>
      ))}
    </div>
  </div>
);

export default PremiumSkeleton;
