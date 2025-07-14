import React from "react";
import StaticHeroContent from "./hero/StaticHeroContent";

interface StaticHeroSectionProps {
  onCTAClick: () => void;
}

const StaticHeroSection: React.FC<StaticHeroSectionProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 overflow-hidden">
      {/* Background Image - Static */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      
      {/* Content */}
      <StaticHeroContent onCTAClick={onCTAClick} />
    </section>
  );
};

export default StaticHeroSection;