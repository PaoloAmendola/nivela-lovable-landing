import { useState } from "react";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import UnifiedImage from "@/components/ui/UnifiedImage";
import { motion } from "framer-motion";

interface HeroProductImageProps {
  shouldReduceAnimations: boolean;
}

const HeroProductImage = ({ shouldReduceAnimations }: HeroProductImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AnimatedWrapper 
      variant="slideLeft" 
      delay={0.8} 
      reducedMotion={shouldReduceAnimations}
      className="relative"
    >
      <div className="relative max-w-sm mx-auto lg:max-w-none flex items-center justify-center">
        {/* Glow effect behind product */}
        <motion.div
          animate={shouldReduceAnimations ? {} : {
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-radial from-accent/30 to-transparent blur-xl scale-110"
        />
        
        {/* Product image container */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: imageLoaded ? 1 : 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center"
        >
          <UnifiedImage
            src="/lovable-uploads/a7abdd1a-341f-47f5-ac11-9963fecf6f84.png"
            alt="NIVELA® Retexturizador Hidro Nutritivo - Frasco 1kg BEM BEAUTY Professional"
            className="w-full h-auto object-contain drop-shadow-2xl max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
            width={500}
            height={750}
            priority={true}
            quality={90}
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay sutil para realçar o produto */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-lg" />
        </motion.div>


        {/* Premium reflection effect */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-md rounded-full" />
      </div>
    </AnimatedWrapper>
  );
};

export default HeroProductImage;