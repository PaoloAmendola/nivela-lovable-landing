import React, { useState } from "react";
import SimpleLogo from "@/components/navigation/SimpleLogo";
import StaticHeroSection from "@/components/sections/StaticHeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import TechnologySection from "@/components/sections/TechnologySection";
import DistributorSection from "@/components/sections/DistributorSection";
import FAQSection from "@/components/sections/FAQSection";
import LegalSection from "@/components/sections/LegalSection";
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
          <div className="text-center py-16">
            <h2 className="text-section-title mb-8">A Nova Era dos Tratamentos Estéticos</h2>
            <p className="text-body-large max-w-4xl mx-auto px-6">
              O NIVELA® representa uma revolução no tratamento de manchas e despigmentação. 
              Com tecnologia brasileira e ativos amazônicos únicos, oferecemos resultados 
              que superam as expectativas de profissionais e clientes em todo o Brasil.
            </p>
          </div>
        </section>

        {/* Technology Section */}
        <section data-section="tecnologia" id="tecnologia" className="section-spacing bg-gradient-to-b from-background to-secondary/20">
          <TechnologySection />
        </section>

        {/* Distributor Section */}
        <section data-section="distributor" id="distributor" className="section-spacing">
          <DistributorSection onCTAClick={() => setShowForm(true)} />
        </section>

        {/* FAQ Section */}
        <section data-section="faq" id="faq" className="section-spacing">
          <FAQSection />
        </section>

        {/* Legal Section */}
        <section data-section="legal" id="legal" className="section-spacing">
          <LegalSection />
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