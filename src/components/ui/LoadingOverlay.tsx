import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  className?: string;
  variant?: 'blur' | 'opacity' | 'scale';
}

const LoadingOverlay = ({
  isLoading,
  children,
  loadingComponent,
  className = '',
  variant = 'blur'
}: LoadingOverlayProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'opacity':
        return {
          initial: { opacity: 1 },
          animate: { opacity: isLoading ? 0.3 : 1 },
          transition: { duration: 0.3 }
        };
      case 'scale':
        return {
          initial: { scale: 1, opacity: 1 },
          animate: { 
            scale: isLoading ? 0.95 : 1, 
            opacity: isLoading ? 0.5 : 1 
          },
          transition: { duration: 0.3 }
        };
      default: // blur
        return {
          initial: { filter: 'blur(0px)', opacity: 1 },
          animate: { 
            filter: isLoading ? 'blur(4px)' : 'blur(0px)',
            opacity: isLoading ? 0.7 : 1
          },
          transition: { duration: 0.3 }
        };
    }
  };

  const DefaultLoadingComponent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10"
    >
      <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-xl border border-border/50 shadow-lg">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-primary/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          Carregando...
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className={`relative ${className}`}>
      <motion.div {...getVariantStyles()}>
        {children}
      </motion.div>
      
      <AnimatePresence>
        {isLoading && (
          loadingComponent || <DefaultLoadingComponent />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingOverlay;