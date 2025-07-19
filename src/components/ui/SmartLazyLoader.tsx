import React, { lazy, Suspense, ComponentType, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import EnhancedSkeletonLoader from './EnhancedSkeletonLoader';
import ErrorBoundary from './ErrorBoundary';

interface SmartLazyLoaderProps {
  componentPath: string;
  fallback?: ReactElement;
  skeleton?: 'hero' | 'section' | 'card' | 'list' | 'form';
  threshold?: number;
  rootMargin?: string;
  preload?: boolean;
  errorFallback?: ReactElement;
  className?: string;
  [key: string]: any;
}

// Enhanced component cache with preloading capabilities
class ComponentCache {
  private cache = new Map<string, ComponentType<any>>();
  private loadingPromises = new Map<string, Promise<ComponentType<any>>>();

  async loadComponent(path: string): Promise<ComponentType<any>> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!;
    }

    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path)!;
    }

    const loadingPromise = this.createLazyComponent(path);
    this.loadingPromises.set(path, loadingPromise);

    try {
      const component = await loadingPromise;
      this.cache.set(path, component);
      this.loadingPromises.delete(path);
      return component;
    } catch (error) {
      this.loadingPromises.delete(path);
      throw error;
    }
  }

  private createLazyComponent(path: string): Promise<ComponentType<any>> {
    return new Promise((resolve, reject) => {
      const LazyComponent = lazy(() => 
        import(/* @vite-ignore */ path)
          .then(module => ({ default: module.default || module }))
          .catch(error => {
            reject(new Error(`Failed to load component: ${path}`));
            return { default: () => null };
          })
      );
      resolve(LazyComponent);
    });
  }

  preloadComponent(path: string): void {
    if (!this.cache.has(path) && !this.loadingPromises.has(path)) {
      this.loadComponent(path).catch(() => {
        // Silent fail for preloading
      });
    }
  }
}

const componentCache = new ComponentCache();

// Critical components for immediate preloading
const CRITICAL_COMPONENTS = [
  '../sections/HeroSection',
  '../sections/TechnologySection'
];

// Preload critical components on first load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    CRITICAL_COMPONENTS.forEach(path => {
      componentCache.preloadComponent(path);
    });
  });
}

const SmartLazyLoader: React.FC<SmartLazyLoaderProps> = ({
  componentPath,
  fallback,
  skeleton = 'card',
  threshold = 0.1,
  rootMargin = '50px',
  preload = false,
  errorFallback,
  className,
  ...props
}) => {
  const [Component, setComponent] = React.useState<ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin
  });

  // Preload component if requested
  React.useEffect(() => {
    if (preload) {
      componentCache.preloadComponent(componentPath);
    }
  }, [componentPath, preload]);

  // Load component when intersecting
  React.useEffect(() => {
    if (isIntersecting && !Component && !isLoading) {
      setIsLoading(true);
      setHasError(false);

      componentCache.loadComponent(componentPath)
        .then(LoadedComponent => {
          setComponent(() => LoadedComponent);
          setIsLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoading(false);
        });
    }
  }, [isIntersecting, Component, componentPath, isLoading]);

  const defaultErrorFallback = (
    <div className="p-8 text-center text-muted border border-border rounded-lg">
      <p>Erro ao carregar componente</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-primary hover:underline"
      >
        Recarregar página
      </button>
    </div>
  );

  const loadingFallback = fallback || (
    <EnhancedSkeletonLoader variant={skeleton} className={className} />
  );

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {errorFallback || defaultErrorFallback}
          </motion.div>
        ) : !Component ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {loadingFallback}
          </motion.div>
        ) : (
          <motion.div
            key="component"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ErrorBoundary fallback={errorFallback || defaultErrorFallback}>
              <Suspense fallback={loadingFallback}>
                <Component {...props} />
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartLazyLoader;