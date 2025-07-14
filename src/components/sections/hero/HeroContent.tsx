import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface HeroContentProps {
  onCTAClick: () => void;
  shouldReduceAnimations: boolean;
}

const HeroContent = ({ onCTAClick, shouldReduceAnimations }: HeroContentProps) => {
  console.log('HeroContent rendering...');

  const scrollToManifesto = () => {
    const manifestoSection = document.getElementById('manifesto-text');
    manifestoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-none pt-6 lg:pt-10 lg:pr-8">

      {/* Título Principal - NIVELA® */}
      <div>
        <h1 className="text-6xl font-bold text-center lg:text-left mb-4 lg:mb-6 text-white">
          <span className="text-primary">NIVELA</span>
          <sup className="text-2xl">®</sup>
        </h1>
      </div>

      {/* Subtítulo */}
      <div>
        <h2 className="text-2xl font-semibold text-center lg:text-left mb-4 text-white">
          A evolução da<br />escova progressiva
        </h2>
      </div>

      {/* Descrição */}
      <div>
        <p className="text-lg text-center lg:text-left mb-6 lg:mb-8 text-gray-300">
          Desenvolvido com tecnologia patenteada e ativos da Amazônia.
        </p>
        
        {/* Destaque do Rendimento */}
        <div className="text-center lg:text-left mb-8 lg:mb-10">
          <span className="inline-block text-2xl lg:text-3xl font-bold text-primary">
            30% + rendimento
          </span>
        </div>
      </div>

      {/* Creative Pills */}
      <div>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4 mb-8 lg:mb-10 flex-wrap">
          {/* Badge 1 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-white font-medium text-base lg:text-lg">Livre de formol e derivados</span>
          </div>

          {/* Badge 2 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className="text-white font-medium text-base lg:text-lg">Textura em Gel inovadora</span>
          </div>
          
          {/* Badge 3 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-white font-medium text-base lg:text-lg">Tecnologia ASTRO QUAT V3</span>
          </div>
        </div>
      </div>

        {/* CTA Buttons */}
        <div>
          <div className="flex flex-col gap-5 justify-center lg:justify-start items-center lg:items-start">
            <Button
              onClick={onCTAClick}
              size="lg"
              className="text-lg font-bold px-10 py-5 min-h-[68px] w-full max-w-sm"
            >
              <MessageSquare className="w-7 h-7" strokeWidth={2} />
              QUERO USAR NO MEU SALÃO
            </Button>
            
            <Button
              onClick={scrollToManifesto}
              variant="outline"
              size="lg"
              className="text-lg font-bold px-10 py-5 min-h-[68px] w-full max-w-sm"
            >
              SAIBA MAIS
            </Button>
          </div>
        </div>
    </div>
  );
};

export default HeroContent;