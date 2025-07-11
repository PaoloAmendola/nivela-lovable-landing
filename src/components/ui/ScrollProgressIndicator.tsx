import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 100); // Show after scrolling 100px
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary/20 to-accent/20"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent shadow-lg"
        style={{
          scaleX: scrollProgress,
          transformOrigin: '0%'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      />
    </motion.div>
  );
};

export default ScrollProgressIndicator;