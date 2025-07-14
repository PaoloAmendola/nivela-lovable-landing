
import TechnologyHeader from "./technology/TechnologyHeader";
import TechnicalBenefits from "./technology/TechnicalBenefits";
import AmazonianActives from "./technology/AmazonianActives";
import RobustVideoPlayer from "@/components/ui/RobustVideoPlayer";

const TechnologySection = () => {
  return (
    <section className="py-12 lg:py-16 bg-transparent relative overflow-hidden">
      {/* Enhanced Background with Tech-Nature Connection */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-primary blur-[50px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-accent blur-[50px] sm:blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-secondary blur-[60px] opacity-30"></div>
      </div>

      {/* Connecting Lines Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M200,100 Q600,50 1000,150" stroke="currentColor" strokeWidth="1" className="text-accent/20"/>
          <path d="M100,300 Q500,250 900,350" stroke="currentColor" strokeWidth="1" className="text-primary/20"/>
          <path d="M300,500 Q700,450 1100,550" stroke="currentColor" strokeWidth="1" className="text-secondary/20"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <TechnologyHeader />

        {/* Main Layout - Redesigned for Better Visual Hierarchy */}
        <div className="space-y-8 lg:space-y-12">
          
          {/* Desktop: 3-Column Layout | Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Technical Benefits - Left Column */}
            <div className="order-2 lg:order-1 lg:col-span-4">
              <TechnicalBenefits />
            </div>

            {/* Video Demo - Center Column (Highlighted & Centralized) */}
            <div className="order-1 lg:order-2 lg:col-span-4">
              <div className="relative w-full">
                {/* Video glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
                
                <div className="relative">
                  <div className="aspect-[4/3] lg:aspect-[4/3] rounded-xl overflow-hidden">
                    <RobustVideoPlayer
                      src="https://xnexfhgtqlryfkyuvihq.supabase.co/storage/v1/object/public/videos/tecnologia-oficial-compactado.mp4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amazonian Actives - Right Column */}
            <div className="order-3 lg:col-span-4">
              <AmazonianActives />
            </div>
          </div>

          {/* Tech-Nature Synergy Section - Simplified */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-3xl"></div>
            <div className="relative bg-background/40 backdrop-blur-sm border border-accent/20 rounded-3xl p-6 lg:p-8">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold gradient-text-animated mb-4">
                  A Sinergia perfeita entre Ciência e Natureza
                </h3>
                
                <p className="text-contrast font-montserrat leading-relaxed">
                  Nossa tecnologia ASTRO QUAT V3® potencializa os benefícios únicos dos ativos amazônicos, 
                  criando uma fórmula que une o melhor da ciência molecular com a sabedoria da natureza brasileira.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
