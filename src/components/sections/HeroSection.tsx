
import { useFastMobile } from "@/hooks/use-fast-mobile";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroProductImage from "./hero/HeroProductImage";
import ExclusivityRibbon from "./hero/ExclusivityRibbon";
import { Crown } from "lucide-react";

interface HeroSectionProps {
  onCTAClick: () => void;
}

const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  // HeroSection rendering
  
  // Usar hook otimizado
  const { shouldReduceAnimations } = useFastMobile();

  const scrollToNext = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="main-content" 
      className="relative min-h-screen flex items-center overflow-hidden pt-12" 
      role="banner" 
      aria-label="NIVELA® - Retexturizador Hidro Nutritivo Premium"
      style={{ 
        backgroundColor: '#0D181C',
        background: 'linear-gradient(135deg, #0D181C 0%, #1a1a1a 50%, #0D181C 100%)'
      }}
    >

      {/* Badge Ribbon Flutuante */}
      <ExclusivityRibbon />
      
      {/* Background sofisticado */}
      <HeroBackground />

      {/* Layout Principal */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-screen py-6 sm:py-8">
          
          {/* Layout Responsivo: Mobile (coluna única) / Desktop (duas colunas) */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Conteúdo Textual - Esquerda no Desktop */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <HeroContent 
                  onCTAClick={onCTAClick} 
                  shouldReduceAnimations={shouldReduceAnimations} 
                />
              </div>

              {/* Imagem do Produto - Direita no Desktop, Acima no Mobile */}
              <div className="order-1 lg:order-2">
                <HeroProductImage 
                  shouldReduceAnimations={shouldReduceAnimations}
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator discreto */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60">
        <button 
          onClick={scrollToNext}
          className="animate-bounce text-accent/60 hover:text-accent transition-colors"
          aria-label="Rolar para próxima seção"
        >
          <div className="w-1 h-8 bg-current rounded-full" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
