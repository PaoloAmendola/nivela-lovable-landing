import React, { Suspense, lazy, ComponentType } from 'react';
import { motion } from 'framer-motion';

interface LazyLoaderProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactElement;
  delay?: number;
  children?: React.ReactNode;
}

const DefaultFallback = () => (
  <motion.div 
    className="flex items-center justify-center py-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="pulse-skeleton w-full max-w-4xl mx-auto">
      <div className="h-32 bg-white/10 rounded-lg mb-4 animate-pulse"></div>
      <div className="h-8 bg-white/10 rounded-lg mb-2 animate-pulse w-3/4"></div>
      <div className="h-8 bg-white/10 rounded-lg animate-pulse w-1/2"></div>
    </div>
  </motion.div>
);

export const LazyLoader: React.FC<LazyLoaderProps> = ({ 
  component, 
  fallback = <DefaultFallback />,
  delay = 0,
  children,
  ...props 
}) => {
  const LazyComponent = React.useMemo(() => {
    if (delay > 0) {
      return lazy(() => 
        Promise.all([
          component(),
          new Promise(resolve => setTimeout(resolve, delay))
        ]).then(([componentModule]) => componentModule)
      );
    }
    return lazy(component);
  }, [component, delay]);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props}>
        {children}
      </LazyComponent>
    </Suspense>
  );
};

// HOC para facilitar o uso
export const withLazyLoading = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactElement
) => {
  return (props: P) => (
    <LazyLoader 
      component={importFunc} 
      fallback={fallback}
      {...props}
    />
  );
};

export default LazyLoader;