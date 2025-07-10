
import { useState, useEffect } from 'react';

interface UseScrollReturn {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolled: boolean;
}

export const useScroll = (threshold: number = 10): UseScrollReturn => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
      
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
        lastScrollY = currentScrollY;
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { scrollY, scrollDirection, isScrolled };
};
