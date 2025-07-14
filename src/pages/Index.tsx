
import React, { useState } from "react";
import SimpleLogo from "@/components/navigation/SimpleLogo";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";
import TechnologySection from "@/components/sections/TechnologySection";
import WhyChooseNivelaSection from "@/components/sections/WhyChooseNivelaSection";
import DistributorSection from "@/components/sections/DistributorSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import FAQSection from "@/components/sections/FAQSection";
import StoreSection from "@/components/sections/StoreSection";
import LegalSection from "@/components/sections/LegalSection";
import PremiumContactModal from "@/components/forms/PremiumContactModal";
import SimpleMobileCTA from "@/components/ui/SimpleMobileCTA";
import SimpleScrollIndicator from "@/components/ui/SimpleScrollIndicator";
import StructuredData from "@/components/seo/StructuredData";

const Index: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <SimpleScrollIndicator />
        <SimpleLogo />
      
      <section data-section="hero" id="hero">
        <HeroSection onCTAClick={() => setShowForm(true)} />
      </section>
      
      <section data-section="manifesto-text" id="manifesto-text">
        <ManifestoTextSection />
      </section>
      
      <section data-section="manifesto-video" id="manifesto-video">
        <ManifestoVideoSection />
      </section>
      
      <section data-section="why-choose" id="why-choose">
        <WhyChooseNivelaSection />
      </section>
      
      <section data-section="technology" id="technology">
        <TechnologySection />
      </section>
      
      <section data-section="ecosystem" id="ecosystem">
        <EcosystemSection />
      </section>
      
      <section data-section="distributor" id="distributor">
        <DistributorSection onCTAClick={() => setShowForm(true)} />
      </section>
      
      <section data-section="faq" id="faq">
        <FAQSection />
      </section>
      
      <section data-section="store" id="store">
        <StoreSection />
      </section>
      
      <section data-section="footer" id="footer">
        <LegalSection />
      </section>

        <SimpleMobileCTA onClick={() => setShowForm(true)} />

        <PremiumContactModal 
          isOpen={showForm} 
          onClose={() => setShowForm(false)} 
        />
      </div>
    </>
  );
};

export default Index;
