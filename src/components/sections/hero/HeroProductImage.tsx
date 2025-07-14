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
        {/* Floating effect with glow */}
        <motion.div
          animate={shouldReduceAnimations ? {} : {
            y: [-5, 5, -5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative flex items-center justify-center"
        >
          {/* Soft glow behind product for floating effect */}
          <motion.div
            animate={shouldReduceAnimations ? {} : {
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent blur-2xl scale-125"
          />
          
          <UnifiedImage
            src="/lovable-uploads/a7abdd1a-341f-47f5-ac11-9963fecf6f84.png"
            alt="NIVELA® Retexturizador Hidro Nutritivo - Frasco 1kg BEM BEAUTY Professional"
            className="relative w-full h-auto object-contain drop-shadow-2xl max-w-[300px] md:max-w-[400px] lg:max-w-[500px] filter drop-shadow-[0_25px_35px_rgba(157,73,22,0.15)]"
            width={500}
            height={750}
            priority={true}
            quality={90}
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Floating shadow effect */}
        <motion.div 
          animate={shouldReduceAnimations ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gradient-to-r from-transparent via-muted/30 to-transparent blur-lg rounded-full" 
        />
      </div>
    </AnimatedWrapper>
  );
};

export default HeroProductImage;