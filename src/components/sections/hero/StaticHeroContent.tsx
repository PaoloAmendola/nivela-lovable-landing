import React from "react";

interface StaticHeroContentProps {
  onCTAClick: () => void;
}

const StaticHeroContent: React.FC<StaticHeroContentProps> = ({ onCTAClick }) => {
  const scrollToDistributor = () => {
    const element = document.getElementById('distributor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative z-10 text-center lg:text-left pt-20 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Premium Badge - Static */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            EXCLUSIVO PARA PROFISSIONAIS
          </div>
        </div>

        {/* Main Headline - Static */}
        <div className="mb-8">
          <h1 className="text-hero mb-6">
            <span className="wilkysta-title text-primary">NIVELA®</span>
            <br />
            A Revolução da
            <br />
            <span className="gradient-text">Despigmentação</span>
          </h1>
          
          <h2 className="text-hero-subtitle mb-8">
            Sistema Profissional de Tratamento Avançado
            <br />
            <span className="text-accent font-playfair italic">Para Resultados Excepcionais</span>
          </h2>
          
          <p className="text-hero-description max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            Tecnologia exclusiva com ativos amazônicos para despigmentação segura e eficaz. 
            Resultados visíveis em poucas sessões, aprovado por milhares de profissionais.
          </p>
        </div>

        {/* CTA Buttons - Static */}
        <div className="flex flex-col gap-5 justify-center lg:justify-start items-center lg:items-start">
          <button
            onClick={onCTAClick}
            className="btn-premium text-lg font-bold px-10 py-5 min-h-[68px] w-full max-w-sm relative z-20 shadow-lg"
          >
            🎯 QUERO USAR NO MEU SALÃO
          </button>
          
          <button
            onClick={scrollToDistributor}
            className="inline-flex items-center justify-center text-lg font-bold px-10 py-5 min-h-[68px] w-full max-w-sm relative z-20 border-2 border-accent/60 text-accent hover:border-accent bg-transparent hover:bg-accent/15 rounded-xl transition-colors duration-200"
          >
            💼 QUERO DISTRIBUIR
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaticHeroContent;