import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

interface EnhancedLoadingStateProps {
  variant?: 'minimal' | 'elegant' | 'premium' | 'shimmer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

const EnhancedLoadingState = ({
  variant = 'elegant',
  size = 'md',
  message = 'Carregando...',
  showSpinner = true,
  className = ''
}: EnhancedLoadingStateProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'p-4';
      case 'md': return 'p-6';
      case 'lg': return 'p-8';
      case 'xl': return 'p-12';
      default: return 'p-6';
    }
  };

  const getSpinnerSize = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${getSizeClasses()} ${className}`}>
        {showSpinner && (
          <Loader2 className={`${getSpinnerSize()} animate-spin text-primary`} />
        )}
        {message && (
          <span className="ml-2 text-sm text-muted-foreground">{message}</span>
        )}
      </div>
    );
  }

  if (variant === 'shimmer') {
    return (
      <div className={`${getSizeClasses()} ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 rounded animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 rounded animate-shimmer w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 rounded animate-shimmer w-1/2"></div>
        </div>
      </div>
    );
  }

  if (variant === 'premium') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`
          flex flex-col items-center justify-center ${getSizeClasses()}
          bg-gradient-to-br from-background/95 to-muted/20 
          backdrop-blur-sm border border-accent/20 rounded-2xl
          shadow-lg ${className}
        `}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative mb-4"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30"></div>
          <Sparkles className={`${getSpinnerSize()} text-primary relative z-10`} />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-foreground mb-2"
        >
          {message}
        </motion.p>
        
        <div className="w-24 h-1 bg-muted/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    );
  }

  // Default elegant variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
        flex flex-col items-center justify-center ${getSizeClasses()}
        ${className}
      `}
    >
      {showSpinner && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative mb-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm"></div>
          <Loader2 className={`${getSpinnerSize()} text-primary relative z-10`} />
        </motion.div>
      )}
      
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted-foreground font-medium"
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default EnhancedLoadingState;