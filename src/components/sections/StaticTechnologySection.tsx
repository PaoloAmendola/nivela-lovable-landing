import React from 'react';
import TechnologyHeader from "./technology/TechnologyHeader";
import TechnicalBenefits from "./technology/TechnicalBenefits";
import AmazonianActives from "./technology/AmazonianActives";

const StaticTechnologySection = () => {
  return (
    <section className="py-12 lg:py-16 bg-transparent relative overflow-hidden">
      {/* Enhanced Background with Tech-Nature Connection */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-primary blur-[50px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-accent blur-[50px] sm:blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TechnologyHeader />
        
        <div className="space-y-12 lg:space-y-16">
          <TechnicalBenefits />
          <AmazonianActives />
          
          {/* Video Demo Section - Simplified */}
          <div className="text-center">
            <h3 className="text-section-subtitle mb-8">
              Veja o NIVELA® em Ação
            </h3>
            <div className="max-w-4xl mx-auto aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-white">Demonstração em Vídeo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticTechnologySection;