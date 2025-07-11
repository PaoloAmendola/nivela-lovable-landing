import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumSkeletonProps {
  variant?: "text" | "card" | "hero" | "image" | "button";
  className?: string;
  lines?: number;
}

const PremiumSkeletonLoader = ({ 
  variant = "text", 
  className,
  lines = 3 
}: PremiumSkeletonProps) => {
  const shimmerAnimation = {
    initial: { backgroundPosition: "-200% 0" },
    animate: { backgroundPosition: "200% 0" },
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  const baseClasses = "bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 bg-[length:200%_100%] animate-pulse rounded-lg";

  if (variant === "hero") {
    return (
      <div className={cn("space-y-6", className)}>
        <motion.div 
          {...shimmerAnimation}
          className={cn(baseClasses, "h-16 w-3/4")} 
        />
        <motion.div 
          {...shimmerAnimation}
          className={cn(baseClasses, "h-12 w-1/2")} 
        />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              {...shimmerAnimation}
              className={cn(baseClasses, "h-4 w-full")}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <motion.div 
            {...shimmerAnimation}
            className={cn(baseClasses, "h-12 w-32")} 
          />
          <motion.div 
            {...shimmerAnimation}
            className={cn(baseClasses, "h-12 w-24")} 
          />
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("card-premium p-6 space-y-4", className)}>
        <motion.div 
          {...shimmerAnimation}
          className={cn(baseClasses, "h-6 w-2/3")} 
        />
        <div className="space-y-2">
          {[...Array(lines)].map((_, i) => (
            <motion.div
              key={i}
              {...shimmerAnimation}
              className={cn(baseClasses, "h-4", i === lines - 1 ? "w-1/2" : "w-full")}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <motion.div 
          {...shimmerAnimation}
          className={cn(baseClasses, "h-10 w-24")} 
        />
      </div>
    );
  }

  if (variant === "image") {
    return (
      <motion.div 
        {...shimmerAnimation}
        className={cn(baseClasses, "aspect-video w-full", className)} 
      />
    );
  }

  if (variant === "button") {
    return (
      <motion.div 
        {...shimmerAnimation}
        className={cn(baseClasses, "h-12 w-32", className)} 
      />
    );
  }

  // Text variant (default)
  return (
    <div className={cn("space-y-2", className)}>
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          {...shimmerAnimation}
          className={cn(baseClasses, "h-4", i === lines - 1 ? "w-2/3" : "w-full")}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
};

export default PremiumSkeletonLoader;