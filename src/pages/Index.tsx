
import React from "react";
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
import AccessibilityEnhancements from "@/components/accessibility/AccessibilityEnhancements";
import OptimizedLazySection from "@/components/ui/OptimizedLazySection";
import EnhancedMobileCTA from "@/components/ui/EnhancedMobileCTA";
import PullToRefresh from "@/components/ui/PullToRefresh";
import SystemHealthCheck from "@/components/ui/SystemHealthCheck";
import ContrastOptimizer from "@/components/ui/ContrastOptimizer";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const { toast } = useToast();

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

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ScrollProgressIndicator />
        
        {/* Accessibility Enhancements */}
        <AccessibilityEnhancements />
        
        {/* Contrast Optimizer - WCAG AA Compliance */}
        <ContrastOptimizer />
        
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
          <OptimizedLazySection skeleton="card" delay={100}>
            <WhyChooseNivelaSection />
          </OptimizedLazySection>
        </section>
        
        <section data-section="technology" id="technology">
          <OptimizedLazySection skeleton="card" delay={150}>
            <TechnologySection />
          </OptimizedLazySection>
        </section>
        
        <section data-section="ecosystem" id="ecosystem">
          <OptimizedLazySection skeleton="card" delay={200}>
            <EcosystemSection />
          </OptimizedLazySection>
        </section>
        
        <section data-section="distributor" id="distributor">
          <OptimizedLazySection skeleton="card" delay={250}>
            <DistributorSection onCTAClick={() => setShowForm(true)} />
          </OptimizedLazySection>
        </section>
        
        <section data-section="faq" id="faq">
          <OptimizedLazySection skeleton="card" delay={300}>
            <FAQSection />
          </OptimizedLazySection>
        </section>
        
        <section data-section="store" id="store">
          <OptimizedLazySection skeleton="card" delay={350}>
            <StoreSection />
          </OptimizedLazySection>
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

        {/* System Health Check - Development Mode */}
        {process.env.NODE_ENV === 'development' && <SystemHealthCheck />}
      </div>
    </PullToRefresh>
  );
};

export default Index;
