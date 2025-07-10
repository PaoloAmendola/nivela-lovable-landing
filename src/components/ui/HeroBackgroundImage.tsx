
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useFastMobile } from '@/hooks/use-fast-mobile';

interface HeroBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
}

const HeroBackgroundImage = ({ src, alt, className = '' }: HeroBackgroundImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Usar hook otimizado
  const { shouldUseLowQuality } = useFastMobile();

  // Memoize optimized image source
  const imageSrc = useMemo(() => {
    return shouldUseLowQuality 
      ? src.replace('&q=80', '&q=60').replace('w=1920', 'w=1280')
      : src;
  }, [src, shouldUseLowQuality]);

  useEffect(() => {
    // Delay loading slightly to prioritize other critical resources
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 20); // Reduzido para 20ms para máxima velocidade

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Memoize fallback gradient
  const fallbackGradient = useMemo(() => (
    <div className={`absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 ${className}`}>
      <div className="absolute inset-0 hero-overlay"></div>
    </div>
  ), [className]);

  if (!shouldLoad) {
    return fallbackGradient;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div 
        className={`w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url('${imageSrc}')`
        }}
      />
      {/* Fallback gradient while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40" />
      )}
      <div className="absolute inset-0 hero-overlay"></div>
      {/* Preload the image */}
      <img 
        src={imageSrc} 
        alt={alt}
        className="hidden"
        onLoad={handleLoad}
        loading="eager"
      />
    </div>
  );
};

export default HeroBackgroundImage;
