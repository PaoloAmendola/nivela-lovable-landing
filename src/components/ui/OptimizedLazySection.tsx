
import { Suspense, ReactNode, memo, CSSProperties, useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionSkeleton } from "./SkeletonLoader";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";

interface OptimizedLazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  id?: string;
  'data-section'?: string;
  preload?: boolean;
  style?: CSSProperties;
  priority?: 'high' | 'medium' | 'low';
}

const OptimizedLazySection = memo(({ 
  children, 
  fallback = <SectionSkeleton />, 
  className = "",
  id,
  'data-section': dataSection,
  preload = false,
  style,
  priority = 'medium'
}: OptimizedLazySectionProps) => {
  const [hasRendered, setHasRendered] = useState(preload);
  
  // Configuração mais agressiva baseada na prioridade
  const rootMargin = priority === 'high' ? '400px' : priority === 'medium' ? '200px' : '50px';
  const threshold = priority === 'high' ? 0.01 : 0.1;
  
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true // Performance: para de observar após ser visível
  });

  const shouldRender = hasIntersected || preload;

  // Delay para renderização baseado na prioridade
  useEffect(() => {
    if (shouldRender && !hasRendered) {
      const delay = priority === 'high' ? 0 : priority === 'medium' ? 50 : 100;
      const timer = setTimeout(() => setHasRendered(true), delay);
      return () => clearTimeout(timer);
    }
  }, [shouldRender, hasRendered, priority]);

  return (
    <motion.section
      ref={ref}
      id={id}
      data-section={dataSection}
      className={className}
      style={{
        ...style,
        contentVisibility: hasRendered ? 'visible' : 'auto',
        containIntrinsicSize: hasRendered ? 'none' : '100vw 400px'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: hasRendered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <ErrorBoundary>
        <Suspense fallback={fallback}>
          {hasRendered ? children : fallback}
        </Suspense>
      </ErrorBoundary>
    </motion.section>
  );
});

OptimizedLazySection.displayName = 'OptimizedLazySection';

export default OptimizedLazySection;
