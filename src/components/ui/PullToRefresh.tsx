
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useTouchGestures } from '@/hooks/use-touch-gestures';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
  threshold?: number;
}

const PullToRefresh = ({ 
  onRefresh, 
  children, 
  disabled = false, 
  threshold = 80 
}: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const gestureRef = useTouchGestures({
    onSwipeDown: () => {
      if (canRefresh && !isRefreshing && !disabled) {
        handleRefresh();
      }
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 0 || isRefreshing) return;

      currentY.current = e.touches[0].clientY;
      const distance = Math.max(0, currentY.current - startY.current);
      
      if (distance > 0) {
        e.preventDefault();
        const dampedDistance = Math.min(distance * 0.5, threshold * 1.5);
        setPullDistance(dampedDistance);
        setCanRefresh(dampedDistance >= threshold);
      }
    };

    const handleTouchEnd = () => {
      if (canRefresh && !isRefreshing) {
        handleRefresh();
      } else {
        setPullDistance(0);
        setCanRefresh(false);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canRefresh, isRefreshing, threshold, disabled]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }

    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
      setCanRefresh(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              height: Math.min(pullDistance, threshold)
            }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm"
            style={{ zIndex: 10 }}
          >
            <div className="flex items-center gap-2 text-primary py-2">
              <RefreshCw 
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''} ${canRefresh ? 'text-accent' : 'text-primary'}`}
                style={{
                  transform: `rotate(${Math.min(pullDistance / threshold * 180, 180)}deg)`
                }}
              />
              <span className="text-sm font-medium">
                {isRefreshing 
                  ? 'Atualizando...' 
                  : canRefresh 
                    ? 'Solte para atualizar' 
                    : 'Puxe para atualizar'
                }
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with transform */}
      <div
        style={{
          transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
          transition: isRefreshing || pullDistance === 0 ? 'transform 0.3s ease' : 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
