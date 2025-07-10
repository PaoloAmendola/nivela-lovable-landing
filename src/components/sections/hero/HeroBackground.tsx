
import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Gradient sofisticado de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />
      
      {/* Efeitos de luz sutil */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          opacity: [0.05, 0.2, 0.05],
          scale: [1.1, 1, 1.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-radial from-primary/15 to-transparent rounded-full blur-3xl"
      />

      {/* Textura sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-transparent" />
      </div>
      
      {/* Overlay final */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
    </div>
  );
};

export default HeroBackground;
