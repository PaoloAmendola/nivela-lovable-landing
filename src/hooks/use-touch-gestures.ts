import { useCallback, useRef, useEffect } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchIn?: (scale: number) => void;
  onPinchOut?: (scale: number) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onRotate?: (angle: number) => void;
  swipeThreshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  preventDefaults?: boolean;
}

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

export const useTouchGestures = (options: TouchGestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinchIn,
    onPinchOut,
    onDoubleTap,
    onLongPress,
    onRotate,
    swipeThreshold = 50,
    longPressDelay = 500,
    doubleTapDelay = 300,
    preventDefaults = true
  } = options;

  const touchStart = useRef<TouchPoint | null>(null);
  const lastTap = useRef<TouchPoint | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const initialDistance = useRef<number>(0);
  const initialAngle = useRef<number>(0);
  const isMultiTouch = useRef<boolean>(false);

  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const getAngle = useCallback((touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }, []);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventDefaults) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    const now = Date.now();
    
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: now
    };

    // Multi-touch detection
    if (e.touches.length === 2) {
      isMultiTouch.current = true;
      initialDistance.current = getDistance(e.touches[0], e.touches[1]);
      initialAngle.current = getAngle(e.touches[0], e.touches[1]);
      clearLongPressTimer();
    } else {
      isMultiTouch.current = false;
      
      // Long press detection
      if (onLongPress) {
        longPressTimer.current = setTimeout(() => {
          onLongPress();
        }, longPressDelay);
      }

      // Double tap detection
      if (onDoubleTap && lastTap.current) {
        const timeDiff = now - lastTap.current.timestamp;
        const distance = Math.sqrt(
          Math.pow(touch.clientX - lastTap.current.x, 2) +
          Math.pow(touch.clientY - lastTap.current.y, 2)
        );

        if (timeDiff < doubleTapDelay && distance < 30) {
          onDoubleTap();
          lastTap.current = null;
          clearLongPressTimer();
          return;
        }
      }

      lastTap.current = { x: touch.clientX, y: touch.clientY, timestamp: now };
    }
  }, [
    preventDefaults,
    onLongPress,
    onDoubleTap,
    longPressDelay,
    doubleTapDelay,
    getDistance,
    getAngle,
    clearLongPressTimer
  ]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (preventDefaults) {
      e.preventDefault();
    }

    clearLongPressTimer();

    if (isMultiTouch.current && e.touches.length === 2) {
      // Pinch gesture
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistance.current;
      
      if (scale > 1.1 && onPinchOut) {
        onPinchOut(scale);
      } else if (scale < 0.9 && onPinchIn) {
        onPinchIn(scale);
      }

      // Rotation gesture
      if (onRotate) {
        const currentAngle = getAngle(e.touches[0], e.touches[1]);
        const angleDiff = currentAngle - initialAngle.current;
        onRotate(angleDiff);
      }
    }
  }, [
    preventDefaults,
    onPinchIn,
    onPinchOut,
    onRotate,
    getDistance,
    getAngle,
    clearLongPressTimer
  ]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (preventDefaults) {
      e.preventDefault();
    }

    clearLongPressTimer();

    if (!touchStart.current || isMultiTouch.current) {
      isMultiTouch.current = false;
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Swipe detection
    if (Math.max(absDeltaX, absDeltaY) > swipeThreshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    touchStart.current = null;
  }, [
    preventDefaults,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    swipeThreshold,
    clearLongPressTimer
  ]);

  const attachGestures = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventDefaults });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefaults });
    element.addEventListener('touchend', handleTouchEnd, { passive: !preventDefaults });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      clearLongPressTimer();
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventDefaults, clearLongPressTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearLongPressTimer();
    };
  }, [clearLongPressTimer]);

  return {
    attachGestures
  };
};