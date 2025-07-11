import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { MessageSquare } from "lucide-react";
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

      {/* Título Principal - NIVELA® */}
      <div className="animate-sequential-in opacity-0">
        <h1 className="text-hero text-center lg:text-left mb-4 lg:mb-6">
          <span className="gradient-text">NIVELA</span>
          <sup className="text-2xl sm:text-3xl lg:text-4xl text-primary/80 font-light">®</sup>
        </h1>
      </div>

      {/* Subtítulo */}
      <div className="animate-sequential-in opacity-0">
        <h2 className="text-hero-subtitle text-center lg:text-left mb-4">
          A evolução da escova progressiva profissional
        </h2>
      </div>

      {/* Descrição */}
      <div className="animate-sequential-in opacity-0">
        <p className="text-hero-description text-center lg:text-left mb-8 lg:mb-10">
          Desenvolvido com tecnologia patenteada e ativos da Amazônia. Rendimento até 30% superior.
        </p>
      </div>

      {/* Creative Pills */}
      <div className="animate-sequential-in opacity-0">
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4 mb-8 lg:mb-10 flex-wrap">
          {/* Badge 1 - Accent Color */}
          <div className="creative-pill bg-gradient-to-r from-[#9D4916]/20 to-[#9D4916]/10 border-[#9D4916]/30">
            <div className="creative-pill-dot bg-[#9D4916]"></div>
            <span className="text-white font-medium text-base lg:text-lg">Livre de formol e derivados</span>
          </div>

          {/* Badge 2 - Teal Color */}
          <div className="creative-pill bg-gradient-to-r from-[#254C5A]/20 to-[#254C5A]/10 border-[#254C5A]/30">
            <div className="creative-pill-dot bg-[#254C5A]"></div>
            <span className="text-white font-medium text-base lg:text-lg">Textura em Gel inovadora</span>
          </div>
          
          {/* Badge 3 - Secondary Color */}
          <div className="creative-pill bg-gradient-to-r from-[#D9C0AA]/20 to-[#D9C0AA]/10 border-[#D9C0AA]/30">
            <div className="creative-pill-dot bg-[#D9C0AA]"></div>
            <span className="text-white font-medium text-base lg:text-lg">Tecnologia ASTRO QUAT V3</span>
          </div>
        </div>
      </div>

        {/* CTA Buttons - Enhanced for Maximum Visibility */}
        <div className="animate-sequential-in opacity-0">
          <div className="flex flex-col gap-5 justify-center lg:justify-start items-center lg:items-start">
            <EnhancedButton
              onClick={onCTAClick}
              variant="premium"
              size="lg"
              className="text-lg font-bold px-10 py-5 min-h-[68px] w-full max-w-sm relative z-20 shadow-[0_12px_40px_-4px_rgba(157,73,22,0.8)] hover:shadow-[0_20px_60px_-4px_rgba(157,73,22,0.9)] bg-gradient-to-r from-[#9D4916] via-[#9D4916] to-[#B8551A] bg-size-200 hover:bg-position-100 border-2 border-[#9D4916]/20 hover:border-[#9D4916]/40"
            >
              <MessageSquare className="w-7 h-7" strokeWidth={2} />
              QUERO USAR NO MEU SALÃO
            </EnhancedButton>
            
            <EnhancedButton
              onClick={onCTAClick}
              variant="outline"
              size="lg"
              className="text-lg font-bold px-10 py-5 min-h-[68px] w-full max-w-sm relative z-20 border-3 border-accent/60 text-accent hover:border-accent bg-transparent hover:bg-accent/15 shadow-[0_8px_30px_-4px_rgba(37,76,90,0.6)] hover:shadow-[0_12px_40px_-4px_rgba(37,76,90,0.8)] backdrop-blur-sm"
            >
              <MessageSquare className="w-7 h-7" strokeWidth={2} />
              QUERO DISTRIBUIR
            </EnhancedButton>
          </div>
        </div>
    </div>
  );
};

export default HeroContent;