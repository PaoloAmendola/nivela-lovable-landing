import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import EnhancedLoadingState from "./EnhancedLoadingState";
import PremiumSkeletonLoader from "./PremiumSkeletonLoader";

interface OptimizedLazySectionProps {
  children: React.ReactNode;
  skeleton?: "hero" | "card" | "text" | "image";
  skeletonLines?: number;
  threshold?: number;
  className?: string;
  delay?: number;
}

const OptimizedLazySection = ({
  children,
  skeleton = "card",
  skeletonLines = 3,
  threshold = 0.1,
  className = "",
  delay = 0
}: OptimizedLazySectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin: "50px"
  });

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        // Pequeno delay para transição suave
        setTimeout(() => setShowContent(true), 100);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, isLoaded, delay]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px] flex items-center justify-center"
          >
            <EnhancedLoadingState 
              variant="elegant"
              size="lg"
              message="Carregando seção..."
              className="w-full max-w-sm"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedLazySection;