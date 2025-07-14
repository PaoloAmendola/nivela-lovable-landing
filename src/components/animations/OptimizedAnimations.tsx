import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimationContextValue {
  shouldReduceMotion: boolean;
  performanceMode: 'low' | 'medium' | 'high';
  enableAnimations: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  shouldReduceMotion: false,
  performanceMode: 'high',
  enableAnimations: true
});

export const useAnimationContext = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const [performanceMode, setPerformanceMode] = useState<'low' | 'medium' | 'high'>('high');
  const [enableAnimations, setEnableAnimations] = useState(true);
  const shouldReduceMotion = useReducedMotion() || false;

  useEffect(() => {
    // Detectar performance do dispositivo
    const detectPerformance = () => {
      const connection = (navigator as any).connection;
      const memory = (performance as any).memory;
      
      let score = 0;
      
      // Baseado na conexão
      if (connection) {
        if (connection.effectiveType === '4g') score += 2;
        else if (connection.effectiveType === '3g') score += 1;
      } else {
        score += 2; // Assumir boa conexão se não detectar
      }
      
      // Baseado na memória
      if (memory) {
        if (memory.jsHeapSizeLimit > 1000000000) score += 2; // >1GB
        else if (memory.jsHeapSizeLimit > 500000000) score += 1; // >500MB
      } else {
        score += 1; // Assumir médio se não detectar
      }
      
      // Baseado no hardware
      if (navigator.hardwareConcurrency > 4) score += 2;
      else if (navigator.hardwareConcurrency > 2) score += 1;
      
      // Definir modo baseado no score
      if (score >= 5) setPerformanceMode('high');
      else if (score >= 3) setPerformanceMode('medium');
      else setPerformanceMode('low');
    };

    detectPerformance();
    
    // Monitorar performance durante uso
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Reduzir qualidade se FPS baixo
        if (fps < 30 && performanceMode !== 'low') {
          console.log('Performance baixa detectada, reduzindo animações');
          setPerformanceMode('low');
        }
      }
      
      requestAnimationFrame(checkFrameRate);
    };
    
    requestAnimationFrame(checkFrameRate);
  }, [performanceMode]);

  const value = {
    shouldReduceMotion,
    performanceMode,
    enableAnimations: enableAnimations && !shouldReduceMotion
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

// Componente de animação otimizada
interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  priority?: 'low' | 'medium' | 'high';
}

export const OptimizedMotion = ({ 
  children, 
  className, 
  fallback, 
  priority = 'medium',
  ...motionProps 
}: OptimizedMotionProps) => {
  const { shouldReduceMotion, performanceMode, enableAnimations } = useAnimationContext();

  // Não animar se motion reduzido ou performance baixa
  if (shouldReduceMotion || !enableAnimations) {
    return (
      <div className={className}>
        {fallback || children}
      </div>
    );
  }

  // Ajustar animações baseado na performance
  const optimizedProps = { ...motionProps };
  
  if (performanceMode === 'low') {
    // Remover animações complexas
    delete optimizedProps.animate;
    delete optimizedProps.transition;
    optimizedProps.initial = false;
  } else if (performanceMode === 'medium') {
    // Simplificar transições
    if (optimizedProps.transition) {
      optimizedProps.transition = {
        ...optimizedProps.transition,
        type: 'tween',
        ease: 'easeOut',
        duration: 0.2
      };
    }
  }

  // Priorizar animações importantes
  if (priority === 'low' && performanceMode !== 'high') {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      {...optimizedProps}
      style={{
        willChange: 'transform',
        ...optimizedProps.style
      }}
    >
      {children}
    </motion.div>
  );
};

// Animações pré-configuradas e otimizadas
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hook para controlar animações
export const useOptimizedAnimation = (animationProps: any) => {
  const { shouldReduceMotion, performanceMode } = useAnimationContext();
  
  if (shouldReduceMotion || performanceMode === 'low') {
    return {};
  }
  
  if (performanceMode === 'medium') {
    return {
      ...animationProps,
      transition: {
        ...animationProps.transition,
        duration: Math.min(animationProps.transition?.duration || 0.3, 0.2)
      }
    };
  }
  
  return animationProps;
};