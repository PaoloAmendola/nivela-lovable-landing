
import { useEffect, useRef, useState } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onTap?: () => void;
  onLongPress?: () => void;
  threshold?: number;
  longPressDelay?: number;
}

export const useTouchGestures = (options: TouchGestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onTap,
    onLongPress,
    threshold = 50,
    longPressDelay = 500
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setTouchEnd(null);

      // Long press detection
      if (onLongPress) {
        const timer = setTimeout(() => {
          onLongPress();
          // Haptic feedback se disponível
          if ('vibrate' in navigator) {
            navigator.vibrate(100);
          }
        }, longPressDelay);
        setLongPressTimer(timer);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchEnd({ x: touch.clientX, y: touch.clientY });

      // Cancel long press if moving
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }

      // Pinch gesture detection
      if (e.touches.length === 2 && onPinch) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        // Calculate scale based on initial distance
        onPinch(distance / 100); // Normalize scale
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }

      if (!touchStart || !touchEnd) {
        // Simple tap
        if (onTap && !touchEnd) {
          onTap();
          if ('vibrate' in navigator) {
            navigator.vibrate(50); // Light haptic feedback
          }
        }
        return;
      }

      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine swipe direction
      if (Math.max(absDeltaX, absDeltaY) > threshold) {
        if (absDeltaX > absDeltaY) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
            if ('vibrate' in navigator) {
              navigator.vibrate(75);
            }
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
            if ('vibrate' in navigator) {
              navigator.vibrate(75);
            }
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
            if ('vibrate' in navigator) {
              navigator.vibrate(75);
            }
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
            if ('vibrate' in navigator) {
              navigator.vibrate(75);
            }
          }
        }
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [touchStart, touchEnd, threshold, longPressDelay, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, onTap, onLongPress, longPressTimer]);

  return ref;
};
