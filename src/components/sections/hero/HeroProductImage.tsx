import { useState } from "react";

interface HeroProductImageProps {
  shouldReduceAnimations: boolean;
}

const HeroProductImage = ({ shouldReduceAnimations }: HeroProductImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative max-w-sm mx-auto lg:max-w-none flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <img
          src="/lovable-uploads/a7abdd1a-341f-47f5-ac11-9963fecf6f84.png"
          alt="NIVELA® Retexturizador Hidro Nutritivo - Frasco 1kg BEM BEAUTY Professional"
          className="relative w-full h-auto object-contain drop-shadow-2xl max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default HeroProductImage;