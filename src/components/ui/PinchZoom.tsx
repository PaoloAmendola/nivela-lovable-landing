import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

interface PinchZoomProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  className?: string;
  onZoomChange?: (scale: number) => void;
}

const PinchZoom = ({
  children,
  minScale = 0.5,
  maxScale = 3,
  className = '',
  onZoomChange
}: PinchZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const { hapticClick } = useHapticFeedback();

  const handlePinchIn = useCallback((newScale: number) => {
    const clampedScale = Math.max(newScale, minScale);
    setScale(clampedScale);
    onZoomChange?.(clampedScale);
    hapticClick();
  }, [minScale, onZoomChange, hapticClick]);

  const handlePinchOut = useCallback((newScale: number) => {
    const clampedScale = Math.min(newScale, maxScale);
    setScale(clampedScale);
    onZoomChange?.(clampedScale);
    hapticClick();
  }, [maxScale, onZoomChange, hapticClick]);

  const handleRotate = useCallback((angle: number) => {
    setRotation(angle);
  }, []);

  const handleDoubleTap = useCallback(() => {
    const newScale = scale > 1 ? 1 : 2;
    setScale(newScale);
    setRotation(0);
    onZoomChange?.(newScale);
    hapticClick();
  }, [scale, onZoomChange, hapticClick]);

  const { attachGestures } = useTouchGestures({
    onPinchIn: handlePinchIn,
    onPinchOut: handlePinchOut,
    onRotate: handleRotate,
    onDoubleTap: handleDoubleTap,
    preventDefaults: true
  });

  const setRef = useCallback((element: HTMLDivElement | null) => {
    containerRef.current = element;
    if (element) {
      attachGestures(element);
    }
  }, [attachGestures]);

  return (
    <div
      ref={setRef}
      className={`overflow-hidden touch-manipulation ${className}`}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        style={{
          scale,
          rotate: rotation,
          transformOrigin: 'center'
        }}
        animate={{
          scale,
          rotate: rotation
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PinchZoom;