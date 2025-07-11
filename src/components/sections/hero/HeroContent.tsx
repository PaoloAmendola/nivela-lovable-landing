import { EnhancedButton } from "@/components/ui/EnhancedButton";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { ArrowRight, Sparkles, Crown, Trophy } from "lucide-react";
import ExclusivityBadge from "./ExclusivityBadge";
import PremiumBullets from "./PremiumBullets";
import { useCallback, useMemo } from "react";

interface HeroContentProps {
  onCTAClick: () => void;
  shouldReduceAnimations: boolean;
}

const HeroContent = ({ onCTAClick, shouldReduceAnimations }: HeroContentProps) => {
  const scrollToTechnology = useCallback(() => {
    const techSection = document.querySelector('[data-section="technology"]');
    techSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Memoize static content that doesn't change
  const staticContent = useMemo(() => ({
    mainTitle: "NIVELA",
    subtitle: "A evolução da escova progressiva profissional",
    mainCopy: "Desenvolvido com tecnologia patenteada e ativos da Amazônia. Rendimento até 30% superior."
  }), []);

  return (
    <div className="max-w-none pt-6 lg:pt-10 lg:pr-8">

      {/* Título Principal */}
      <AnimatedWrapper variant="fadeIn" delay={0.2} reducedMotion={shouldReduceAnimations}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold gradient-text mb-4 lg:mb-6 leading-tight text-center lg:text-left">
          NIVELA®
        </h1>
      </AnimatedWrapper>

      {/* Subtítulo */}
      <AnimatedWrapper variant="slideUp" delay={0.3} reducedMotion={shouldReduceAnimations}>
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-playfair font-medium text-foreground leading-relaxed text-center lg:text-left">
            A evolução da escova progressiva profissional
          </h2>
          <p className="text-base md:text-lg text-foreground/80 mt-3 leading-relaxed text-center lg:text-left">
            Desenvolvido com tecnologia patenteada e ativos da Amazônia. Rendimento até 30% superior.
          </p>
        </div>
      </AnimatedWrapper>

      {/* Badges Horizontais */}
      <AnimatedWrapper variant="slideUp" delay={0.4} reducedMotion={shouldReduceAnimations}>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4 mb-8 lg:mb-10 flex-wrap">
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-foreground/20 rounded-full px-4 py-2">
            <span className="text-foreground font-medium text-sm">Livre de formol e derivados</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-foreground/20 rounded-full px-4 py-2">
            <span className="text-foreground font-medium text-sm">Textura em Gel inovadora</span>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-foreground/20 rounded-full px-4 py-2">
            <span className="text-foreground font-medium text-sm">Tecnologia ASTRO QUAT V3</span>
          </div>
        </div>
      </AnimatedWrapper>

      {/* CTAs com cor laranja/bronze */}
      <AnimatedWrapper variant="slideUp" delay={0.6} reducedMotion={shouldReduceAnimations}>
        <div className="flex flex-col gap-4 justify-center lg:justify-start items-center lg:items-start">
          <EnhancedButton
            onClick={onCTAClick}
            variant="premium"
            size="lg"
            className="w-full max-w-sm px-8 py-4 text-base font-bold shadow-xl transition-all duration-300 bg-[#B8764A] text-white hover:bg-[#A6693D] hover:scale-105"
          >
            QUERO USAR NO MEU SALÃO
            <ArrowRight className="w-5 h-5 ml-2" />
          </EnhancedButton>
          
          <EnhancedButton
            variant="outline"
            size="lg"
            onClick={onCTAClick}
            className="w-full max-w-sm px-8 py-4 text-base font-bold border-2 border-[#B8764A] text-[#B8764A] hover:bg-[#B8764A] hover:text-white transition-all duration-300"
          >
            QUERO DISTRIBUIR
            <ArrowRight className="w-5 h-5 ml-2" />
          </EnhancedButton>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default HeroContent;