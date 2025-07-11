import { useState } from "react";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";
import TechnologySection from "@/components/sections/TechnologySection";
import WhyChooseNivelaSection from "@/components/sections/WhyChooseNivelaSection";
import DistributorSection from "@/components/sections/DistributorSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import FAQSection from "@/components/sections/FAQSection";
import LegalSection from "@/components/sections/LegalSection";
import PremiumNavbar from "@/components/navigation/PremiumNavbar";
import PremiumContactModal from "@/components/forms/PremiumContactModal";
import AccessibilityEnhancements from "@/components/accessibility/AccessibilityEnhancements";
import OptimizedLazySection from "@/components/ui/OptimizedLazySection";
import EnhancedMobileCTA from "@/components/ui/EnhancedMobileCTA";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { usePerformanceOptimization } from "@/hooks/use-performance-optimization";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  // Initialize performance optimizations
  usePerformanceOptimization();

  const handleRefresh = async () => {
    // Simulate content refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
      
      {/* Premium Navigation */}
      <PremiumNavbar onCTAClick={() => setShowForm(true)} />
      
      {/* Seções Críticas */}
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