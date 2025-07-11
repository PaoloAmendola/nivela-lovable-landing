import { useRef, useCallback } from 'react';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTap?: () => void;
  className?: string;
  hapticFeedback?: boolean;
}

const SwipeableCard = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onDoubleTap,
  className = '',
  hapticFeedback = true
}: SwipeableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { hapticSelect, hapticClick } = useHapticFeedback();

  const handleSwipeLeft = useCallback(() => {
    if (hapticFeedback) hapticSelect();
    onSwipeLeft?.();
  }, [onSwipeLeft, hapticFeedback, hapticSelect]);

  const handleSwipeRight = useCallback(() => {
    if (hapticFeedback) hapticSelect();
    onSwipeRight?.();
  }, [onSwipeRight, hapticFeedback, hapticSelect]);

  const handleDoubleTap = useCallback(() => {
    if (hapticFeedback) hapticClick();
    onDoubleTap?.();
  }, [onDoubleTap, hapticFeedback, hapticClick]);

  const { attachGestures } = useTouchGestures({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    onDoubleTap: handleDoubleTap,
    swipeThreshold: 80,
    preventDefaults: false
  });

  const setRef = useCallback((element: HTMLDivElement | null) => {
    cardRef.current = element;
    if (element) {
      const cleanup = attachGestures(element);
      // Store cleanup function on element for later use
      (element as any)._gestureCleanup = cleanup;
    }
  }, [attachGestures]);

  return (
    <div
      ref={setRef}
      className={`touch-manipulation select-none ${className}`}
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      {children}
    </div>
  );
};

export default SwipeableCard;