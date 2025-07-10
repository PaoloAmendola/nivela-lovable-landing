
import { motion } from "framer-motion";
import { useState, memo, useCallback } from "react";

interface NavLogoProps {
  onLogoClick: () => void;
}

const NavLogo = memo(({ onLogoClick }: NavLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <motion.div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={onLogoClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {!imageError ? (
        <div className="relative">
          <img 
            src="/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png" 
            alt="Bem Beauty Professional Logo"
            className="h-8 md:h-12 lg:h-14 xl:h-16 w-auto object-contain"
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="eager"
          />
          {!imageLoaded && (
            <div className="h-8 md:h-12 lg:h-14 xl:h-16 flex items-center animate-pulse">
              <div className="w-24 h-8 lg:h-12 xl:h-14 bg-accent/20 rounded"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-8 md:h-12 lg:h-14 xl:h-16 flex items-center">
          <span className="text-xl md:text-2xl font-playfair font-bold gradient-text">
            Bem Beauty Professional
          </span>
        </div>
      )}
    </motion.div>
  );
});

NavLogo.displayName = 'NavLogo';

export default NavLogo;
