
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
    subtitle: "Retexturizador Hidro Nutritivo",
    mainCopy: "A evolução da escova progressiva profissional"
  }), []);

  return (
    <div className="max-w-none pt-6 lg:pt-10 lg:pr-8">

      {/* Título Principal */}
      <AnimatedWrapper variant="fadeIn" delay={0.2} reducedMotion={shouldReduceAnimations}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-4 lg:mb-6 leading-snug text-center lg:text-left">
          NIVELA<br />
          A nova geração<br />
          da escova progressiva
        </h1>
      </AnimatedWrapper>

      {/* Subtítulo */}
      <AnimatedWrapper variant="slideUp" delay={0.3} reducedMotion={shouldReduceAnimations}>
        <div className="mb-6 lg:mb-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-playfair font-medium text-foreground leading-relaxed text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
            Desenvolvido com <span className="font-bold text-accent">tecnologia<br />
            patenteada</span> e ativos da Amazônia.
          </h3>
        </div>
      </AnimatedWrapper>

      {/* Badges - Nova Copy */}
      <AnimatedWrapper variant="slideUp" delay={0.4} reducedMotion={shouldReduceAnimations}>
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-3 sm:gap-4 max-w-4xl lg:max-w-none mx-auto lg:mx-0 mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-3 hover:bg-background/20 hover:border-accent/40 transition-all duration-300">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-foreground font-semibold text-sm sm:text-base">Textura em Gel inovadora</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-3 hover:bg-background/20 hover:border-accent/40 transition-all duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-foreground font-semibold text-sm sm:text-base">Livre de formol e derivados</span>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-3 hover:bg-background/20 hover:border-primary/40 transition-all duration-300">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-foreground font-semibold text-sm sm:text-base">Rendimento até 30% superior</span>
          </div>
        </div>
      </AnimatedWrapper>

      {/* CTAs - Destaque com cor #9D4916 */}
      <AnimatedWrapper variant="slideUp" delay={0.6} reducedMotion={shouldReduceAnimations}>
        <div className="flex flex-col gap-4 justify-center lg:justify-start items-center lg:items-start">
          <EnhancedButton
            onClick={onCTAClick}
            variant="premium"
            size="lg"
            className="w-full max-w-sm px-8 py-4 text-base font-bold shadow-2xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-400 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            SOLICITAR DEMONSTRAÇÃO
            <ArrowRight className="w-5 h-5 ml-2" />
          </EnhancedButton>
          
          <EnhancedButton
            variant="outline"
            size="lg"
            onClick={onCTAClick}
            className="w-full max-w-sm px-8 py-4 text-base border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-400"
          >
            QUERO SER DISTRIBUIDOR
            <ArrowRight className="w-5 h-5 ml-2" />
          </EnhancedButton>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default HeroContent;
