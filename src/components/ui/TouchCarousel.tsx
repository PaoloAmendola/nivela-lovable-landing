import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TouchCarouselProps {
  items: React.ReactNode[];
  className?: string;
  showIndicators?: boolean;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  hapticFeedback?: boolean;
}

const TouchCarousel = ({
  items,
  className = '',
  showIndicators = true,
  showArrows = false,
  autoplay = false,
  autoplayDelay = 3000,
  hapticFeedback = true
}: TouchCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { hapticSelect } = useHapticFeedback();

  const nextSlide = useCallback(() => {
    if (hapticFeedback) hapticSelect();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length, hapticFeedback, hapticSelect]);

  const prevSlide = useCallback(() => {
    if (hapticFeedback) hapticSelect();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length, hapticFeedback, hapticSelect]);

  const goToSlide = useCallback((index: number) => {
    if (hapticFeedback) hapticSelect();
    setCurrentIndex(index);
  }, [hapticFeedback, hapticSelect]);

  const { attachGestures } = useTouchGestures({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    swipeThreshold: 50,
    preventDefaults: false
  });

  const setRef = useCallback((element: HTMLDivElement | null) => {
    carouselRef.current = element;
    if (element) {
      attachGestures(element);
    }
  }, [attachGestures]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, nextSlide]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main carousel */}
      <div
        ref={setRef}
        className="relative w-full h-full touch-manipulation"
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="w-full h-full"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background transition-colors z-10"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background transition-colors z-10"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Swipe hint for first time users */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded opacity-50">
        👆 Deslize para navegar
      </div>
    </div>
  );
};

export default TouchCarousel;