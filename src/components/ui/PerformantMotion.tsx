
import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

interface PerformantMotionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  disableAnimations?: boolean;
}

// Variantes otimizadas que usam apenas transform e opacity
const optimizedVariants = {
  hidden: { 
    opacity: 0, 
    transform: 'translateY(20px) scale(0.95)' 
  },
  visible: { 
    opacity: 1, 
    transform: 'translateY(0px) scale(1.0)' 
  },
  exit: { 
    opacity: 0, 
    transform: 'translateY(-20px) scale(0.95)' 
  }
};

const slideVariants = {
  hidden: { 
    opacity: 0, 
    transform: 'translateX(-30px)' 
  },
  visible: { 
    opacity: 1, 
    transform: 'translateX(0px)' 
  }
};

const scaleVariants = {
  hidden: { 
    opacity: 0, 
    transform: 'scale(0.8)' 
  },
  visible: { 
    opacity: 1, 
    transform: 'scale(1.0)' 
  },
  hover: { 
    transform: 'scale(1.05)' 
  }
};

// Configurações de transição otimizadas
const optimizedTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1], // Material Design easing
  layout: { duration: 0.2 }
};

const PerformantMotion = forwardRef<HTMLDivElement, PerformantMotionProps>(
  ({ children, className, disableAnimations = false, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const shouldAnimate = !shouldReduceMotion && !disableAnimations;

    if (!shouldAnimate) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={optimizedVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={optimizedTransition}
        // Performance optimizations
        style={{ willChange: 'transform, opacity' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

PerformantMotion.displayName = 'PerformantMotion';

// Componentes especializados para casos específicos
export const SlideInMotion = forwardRef<HTMLDivElement, PerformantMotionProps>(
  ({ children, className, disableAnimations = false, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    
    if (shouldReduceMotion || disableAnimations) {
      return <div ref={ref} className={className}>{children}</div>;
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        transition={optimizedTransition}
        style={{ willChange: 'transform, opacity' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

export const ScaleMotion = forwardRef<HTMLDivElement, PerformantMotionProps>(
  ({ children, className, disableAnimations = false, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    
    if (shouldReduceMotion || disableAnimations) {
      return <div ref={ref} className={className}>{children}</div>;
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={scaleVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={optimizedTransition}
        style={{ willChange: 'transform, opacity' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// Hook para animações condicionais baseadas na performance
export const usePerformantAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return {
    shouldAnimate: !shouldReduceMotion,
    variants: optimizedVariants,
    transition: optimizedTransition,
    slideVariants,
    scaleVariants
  };
};

SlideInMotion.displayName = 'SlideInMotion';
ScaleMotion.displayName = 'ScaleMotion';

export default PerformantMotion;
