
import React, { useState } from "react";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";
import SmartLazyLoader from "@/components/ui/SmartLazyLoader";
import WhyChooseNivelaSection from "@/components/sections/WhyChooseNivelaSection";
import LegalSection from "@/components/sections/LegalSection";
import SimpleLogo from "@/components/navigation/SimpleLogo";
import PremiumContactModal from "@/components/forms/PremiumContactModal";
import AccessibilityEnhancements from "@/components/accessibility/AccessibilityEnhancements";
import OptimizedLazySection from "@/components/ui/OptimizedLazySection";
import EnhancedMobileCTA from "@/components/ui/EnhancedMobileCTA";
import PullToRefresh from "@/components/ui/PullToRefresh";
import SystemHealthCheck from "@/components/ui/SystemHealthCheck";
import ContrastOptimizer from "@/components/ui/ContrastOptimizer";
// import { usePerformanceOptimization } from "@/hooks/use-performance-optimization";
// import { useLoadingOptimization } from "@/hooks/use-loading-optimization";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  // Initialize performance optimizations - temporarily disabled
  // usePerformanceOptimization();
  // const { isOptimized, performanceGrade } = useLoadingOptimization();

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
          <SmartLazyLoader
            componentPath="../components/sections/TechnologySection"
            skeleton="section"
            preload={true}
            threshold={0.2}
            rootMargin="100px"
          />
        </section>
        
        <section data-section="ecosystem" id="ecosystem">
          <SmartLazyLoader
            componentPath="../components/sections/EcosystemSection"
            skeleton="section"
            threshold={0.2}
          />
        </section>
        
        <section data-section="distributor" id="distributor">
          <SmartLazyLoader
            componentPath="../components/sections/DistributorSection"
            skeleton="section"
            onCTAClick={() => setShowForm(true)}
            threshold={0.2}
          />
        </section>
        
        <section data-section="faq" id="faq">
          <SmartLazyLoader
            componentPath="../components/sections/FAQSection"
            skeleton="section"
            threshold={0.2}
          />
        </section>
        
        <section data-section="store" id="store">
          <SmartLazyLoader
            componentPath="../components/sections/StoreSection"
            skeleton="section"
            threshold={0.2}
          />
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
