
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandedLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

const BrandedLoading = ({ 
  variant = 'spinner', 
  size = 'md', 
  className = '',
  message 
}: BrandedLoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderSpinner = () => (
    <motion.div
      className={cn(
        "border-3 border-accent/20 border-t-accent rounded-full",
        sizeClasses[size]
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-accent rounded-full",
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-accent to-primary rounded-full",
        sizeClasses[size]
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const renderBars = () => (
    <div className="flex space-x-1 items-end">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "bg-accent rounded-sm",
            size === 'sm' ? 'w-1' : size === 'md' ? 'w-1.5' : 'w-2'
          )}
          animate={{
            height: [
              size === 'sm' ? '8px' : size === 'md' ? '16px' : '24px',
              size === 'sm' ? '16px' : size === 'md' ? '32px' : '48px',
              size === 'sm' ? '8px' : size === 'md' ? '16px' : '24px'
            ]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      case 'bars': return renderBars();
      default: return renderSpinner();
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      {renderVariant()}
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted font-montserrat"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default BrandedLoading;
