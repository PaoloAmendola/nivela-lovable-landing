import { EnhancedButton } from "@/components/ui/EnhancedButton";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
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
        <h1 className="font-wilkysta text-hero text-white leading-tight tracking-tight text-center lg:text-left mb-4 lg:mb-6">
          NIVELA
          <span className="text-hero-trademark text-[#9D4916] align-super">®</span>
        </h1>
      </div>

      {/* Subtítulo */}
      <div className="animate-sequential-in opacity-0">
        <h2 className="font-montserrat text-hero-subtitle font-bold text-white leading-tight text-center lg:text-left mb-4">
          A evolução da escova progressiva profissional
        </h2>
      </div>

      {/* Descrição */}
      <div className="animate-sequential-in opacity-0">
        <p className="font-poppins text-hero-description text-white/90 text-center lg:text-left mb-8 lg:mb-10">
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

      {/* CTA Buttons */}
      <div className="animate-sequential-in opacity-0">
        <div className="flex flex-col gap-4 justify-center lg:justify-start items-center lg:items-start mb-6">
          <EnhancedButton
            onClick={onCTAClick}
            className="bg-[#9D4916] hover:bg-[#8A3F13] text-white font-bold text-lg px-8 py-4 rounded shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
            QUERO USAR NO MEU SALÃO
          </EnhancedButton>
          
          <EnhancedButton
            onClick={onCTAClick}
            className="bg-[#9D4916] hover:bg-[#8A3F13] text-white font-bold text-lg px-8 py-4 rounded shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
            QUERO DISTRIBUIR
          </EnhancedButton>
        </div>
        
        {/* Sub-text */}
        <p className="text-sm text-white/60 text-center lg:text-left">
          💬 WhatsApp direto • Resposta em minutos • Condições especiais
        </p>
      </div>
    </div>
  );
};

export default HeroContent;