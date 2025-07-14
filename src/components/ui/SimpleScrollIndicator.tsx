import React, { useState, useEffect } from "react";

const SimpleScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / documentHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/20">
      <div 
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};

export default SimpleScrollIndicator;