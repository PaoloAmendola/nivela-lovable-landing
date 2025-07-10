
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  reducedMotion?: boolean;
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

// Reduced animations for low-end devices or when user prefers reduced motion
const reducedVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideLeft: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideRight: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  scale: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

const AnimatedWrapper = ({ 
  children, 
  variant = 'fadeIn', 
  delay = 0, 
  duration = 0.6,
  reducedMotion = false,
  ...props 
}: AnimatedWrapperProps) => {
  // Check for user's motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const shouldReduceMotion = reducedMotion || prefersReducedMotion;
  
  // Use reduced animations when appropriate
  const activeVariants = shouldReduceMotion ? reducedVariants : variants;
  const activeDuration = shouldReduceMotion ? duration * 0.3 : duration;
  const activeDelay = shouldReduceMotion ? delay * 0.3 : delay;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={activeVariants[variant]}
      transition={{
        duration: activeDuration,
        delay: activeDelay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
