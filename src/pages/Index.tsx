
import React, { useState, useEffect } from "react";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";
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
import SimpleLogo from "@/components/navigation/SimpleLogo";
import PremiumContactModal from "@/components/forms/PremiumContactModal";
import EnhancedMobileCTA from "@/components/ui/EnhancedMobileCTA";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { LoadingState } from "@/components/ui/LoadingStates";
import StructuredData from "@/components/seo/StructuredData";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    // Simulate content refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset scroll position with safety check
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Show success feedback
    toast({
      title: "Página atualizada",
      description: "Conteúdo recarregado com sucesso!",
    });
  };

  if (isLoading) {
    return <LoadingState type="pulse" message="Carregando experiência..." fullScreen />;
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <StructuredData />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ScrollProgressIndicator />
        
        {/* Simplified Header with Centered Logo */}
        <SimpleLogo />
        
        {/* Hero Section */}
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

        {/* Enhanced Mobile CTA */}
        <EnhancedMobileCTA onClick={() => setShowForm(true)} />

        {/* Premium Contact Modal */}
        <PremiumContactModal 
          isOpen={showForm} 
          onClose={() => setShowForm(false)} 
        />
      </div>
    </PullToRefresh>
  );
};

export default Index;
