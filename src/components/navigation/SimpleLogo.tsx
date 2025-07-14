
import React, { useState, useCallback } from "react";
import { useScroll } from "@/hooks/use-scroll";

const SimpleLogo: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isScrolled } = useScroll(50);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-accent/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-center">
          <div
            className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={scrollToTop}
          >
            {!imageError ? (
              <div className="relative">
                <img 
                  src="/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png" 
                  alt="Bem Beauty Professional Logo"
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  loading="eager"
                />
                {!imageLoaded && (
                  <div className="h-10 sm:h-12 lg:h-14 flex items-center animate-pulse">
                    <div className="w-24 h-10 lg:h-12 bg-accent/20 rounded"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-10 sm:h-12 lg:h-14 flex items-center">
                <span className="text-xl md:text-2xl font-playfair font-bold gradient-text">
                  Bem Beauty Professional
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleLogo;
