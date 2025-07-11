
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { ChevronDown } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

interface HeroScrollIndicatorProps {
  shouldReduceAnimations: boolean;
}

const HeroScrollIndicator = ({ shouldReduceAnimations }: HeroScrollIndicatorProps) => {
  const { scrollToElement } = useSmoothScroll();
  
  const handleScrollDown = () => {
    scrollToElement('manifesto', { offset: 100, duration: 1200, easing: 'ease-in-out' });
  };

  return (
    <AnimatedWrapper 
      variant="fadeIn" 
      delay={1.2} 
      reducedMotion={shouldReduceAnimations} 
      className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-2"
    >
      <p className="text-xs text-muted opacity-75 hidden sm:block">Deslize para cima ou toque</p>
      <button 
        onClick={handleScrollDown} 
        className="p-3 rounded-full bg-background/20 backdrop-blur-sm border border-accent/30 hover:bg-background/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background min-h-[48px] min-w-[48px] touch-manipulation hover:scale-110" 
        aria-label="Rolar para a próxima seção"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-accent animate-bounce" />
      </button>
    </AnimatedWrapper>
  );
};

export default HeroScrollIndicator;
