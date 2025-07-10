
import { Suspense, lazy, ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionSkeleton } from "./SkeletonLoader";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  id?: string;
  'data-section'?: string;
}

const LazySection = ({ 
  children, 
  fallback = <SectionSkeleton />, 
  className = "",
  id,
  'data-section': dataSection 
}: LazySectionProps) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      data-section={dataSection}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: hasIntersected ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <Suspense fallback={fallback}>
        {hasIntersected ? children : fallback}
      </Suspense>
    </motion.section>
  );
};

export default LazySection;
