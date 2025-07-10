
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import ConsolidatedImage from "@/components/ui/ConsolidatedImage";
import { motion } from "framer-motion";
import { useState } from "react";

interface HeroProductShowcaseProps {
  shouldReduceAnimations: boolean;
}

const HeroProductShowcase = ({ shouldReduceAnimations }: HeroProductShowcaseProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AnimatedWrapper 
      variant="slideLeft" 
      delay={0.8} 
      reducedMotion={shouldReduceAnimations}
      className="relative"
    >
      <div className="relative">
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
        
        {/* Real product image */}
        <div className="relative max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: imageLoaded ? 1 : 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <ConsolidatedImage
              src="https://gdyjgzxemweigeyxxflq.supabase.co/storage/v1/object/public/fotos/Imagens-oficiais-landing/IMG_82162.webp"
              alt="NIVELA® Retexturizador Hidro Nutritivo - Produto Premium de 1kg"
              className="w-full h-auto object-contain drop-shadow-2xl hover-lift"
              width={400}
              height={500}
              priority={true}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay sutil para realçar o produto */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-lg" />
          </motion.div>

          {/* Badge premium floating */}
          <motion.div
            animate={shouldReduceAnimations ? {} : {
              y: [-8, 8, -8],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-dramatic backdrop-blur-sm border border-accent/20 glass-medium"
          >
            1KG PREMIUM
          </motion.div>
        </div>

        {/* Floating elements decorativos */}
        <motion.div
          animate={shouldReduceAnimations ? {} : {
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-6 -left-6 glass-subtle rounded-full p-3 shadow-soft"
        >
          <div className="w-3 h-3 bg-accent rounded-full animate-organic-float" />
        </motion.div>
        
        <motion.div
          animate={shouldReduceAnimations ? {} : {
            y: [10, -10, 10],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-8 -right-12 glass-medium rounded-full p-2 shadow-medium"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-organic-float" />
        </motion.div>

        {/* Premium reflection effect */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-md rounded-full shadow-glow" />
      </div>
    </AnimatedWrapper>
  );
};

export default HeroProductShowcase;
