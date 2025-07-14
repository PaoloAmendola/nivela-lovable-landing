import React, { useState } from "react";
import SimpleLogo from "@/components/navigation/SimpleLogo";
import StaticHeroSection from "@/components/sections/StaticHeroSection";
import StaticManifestoTextSection from "@/components/sections/StaticManifestoTextSection";
import StaticTechnologySection from "@/components/sections/StaticTechnologySection";
import StaticDistributorSection from "@/components/sections/StaticDistributorSection";
import StaticFAQSection from "@/components/sections/StaticFAQSection";
import StaticLegalSection from "@/components/sections/StaticLegalSection";
import StaticContactModal from "@/components/forms/StaticContactModal";
import StructuredData from "@/components/seo/StructuredData";

const StaticIndex: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <SimpleLogo />
      
        {/* Hero Section */}
        <section data-section="hero" id="hero">
          <StaticHeroSection onCTAClick={() => setShowForm(true)} />
        </section>

        {/* Manifesto Section */}
        <section data-section="manifesto" id="manifesto" className="section-spacing">
          <StaticManifestoTextSection />
        </section>

        {/* Technology Section */}
        <section data-section="tecnologia" id="tecnologia" className="section-spacing bg-gradient-to-b from-background to-secondary/20">
          <StaticTechnologySection />
        </section>

        {/* Distributor Section */}
        <section data-section="distributor" id="distributor" className="section-spacing">
          <StaticDistributorSection onCTAClick={() => setShowForm(true)} />
        </section>

        {/* FAQ Section */}
        <section data-section="faq" id="faq" className="section-spacing">
          <StaticFAQSection />
        </section>

        {/* Legal Section */}
        <section data-section="legal" id="legal" className="section-spacing">
          <StaticLegalSection />
        </section>

        {/* Contact Modal */}
        <StaticContactModal 
          isOpen={showForm} 
          onClose={() => setShowForm(false)} 
        />
      </div>
    </>
  );
};

export default StaticIndex;