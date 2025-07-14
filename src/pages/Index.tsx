
import React, { useState, Suspense } from "react";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";
import SimpleLogo from "@/components/navigation/SimpleLogo";
import AccessibilityEnhancements from "@/components/accessibility/AccessibilityEnhancements";
import OptimizedLazySection from "@/components/ui/OptimizedLazySection";
import EnhancedMobileCTA from "@/components/ui/EnhancedMobileCTA";
import PullToRefresh from "@/components/ui/PullToRefresh";
import ContrastOptimizer from "@/components/ui/ContrastOptimizer";
import { SectionSkeleton } from "@/components/ui/SkeletonLoader";
import CriticalCSS from "@/components/ui/CriticalCSS";
import ResourceHints from "@/components/ui/ResourceHints";
import { usePerformanceOptimization } from "@/hooks/use-performance-optimization";
import { useLoadingOptimization } from "@/hooks/use-loading-optimization";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { useToast } from "@/hooks/use-toast";

// Lazy imports for better code splitting
import { 
  LazyTechnologySection,
  LazyWhyChooseNivelaSection,
  LazyDistributorSection,
  LazyEcosystemSection,
  LazyFAQSection,
  LazyLegalSection,
  LazyPremiumContactModal,
  LazySystemHealthCheck
} from "@/components/LazyComponents";

const Index: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  // Initialize performance optimizations
  usePerformanceOptimization();
  useServiceWorker();
  const { isOptimized, performanceGrade } = useLoadingOptimization();

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
        {/* Performance optimizations */}
        <CriticalCSS />
        <ResourceHints />
        
        <ScrollProgressIndicator />
        
        {/* Accessibility Enhancements */}
        <AccessibilityEnhancements />
        
        {/* Contrast Optimizer - WCAG AA Compliance */}
        <ContrastOptimizer />
        
        {/* Simplified Header with Centered Logo */}
        <SimpleLogo />
        
        {/* Hero Section with main heading */}
        <main>
          <section data-section="hero" id="hero">
            <h1 className="sr-only">NIVELA - Tecnologia Avançada em Alisamento Capilar</h1>
            <HeroSection onCTAClick={() => setShowForm(true)} />
          </section>
        </main>
        
        <section data-section="manifesto-text" id="manifesto-text">
          <ManifestoTextSection />
        </section>
        
        <section data-section="manifesto-video" id="manifesto-video">
          <ManifestoVideoSection />
        </section>
        
        <section data-section="why-choose" id="why-choose">
          <OptimizedLazySection skeleton="card" delay={100}>
            <Suspense fallback={<SectionSkeleton />}>
              <LazyWhyChooseNivelaSection />
            </Suspense>
          </OptimizedLazySection>
        </section>
        
        <section data-section="technology" id="technology">
          <OptimizedLazySection skeleton="card" delay={150}>
            <Suspense fallback={<SectionSkeleton />}>
              <LazyTechnologySection />
            </Suspense>
          </OptimizedLazySection>
        </section>
        
        <section data-section="ecosystem" id="ecosystem">
          <OptimizedLazySection skeleton="card" delay={200}>
            <Suspense fallback={<SectionSkeleton />}>
              <LazyEcosystemSection />
            </Suspense>
          </OptimizedLazySection>
        </section>
        
        <section data-section="distributor" id="distributor">
          <OptimizedLazySection skeleton="card" delay={250}>
            <Suspense fallback={<SectionSkeleton />}>
              <LazyDistributorSection onCTAClick={() => setShowForm(true)} />
            </Suspense>
          </OptimizedLazySection>
        </section>
        
        <section data-section="faq" id="faq">
          <OptimizedLazySection skeleton="card" delay={300}>
            <Suspense fallback={<SectionSkeleton />}>
              <LazyFAQSection />
            </Suspense>
          </OptimizedLazySection>
        </section>
        
        <section data-section="footer" id="footer">
          <Suspense fallback={<SectionSkeleton />}>
            <LazyLegalSection />
          </Suspense>
        </section>

        {/* Enhanced Mobile CTA */}
        <EnhancedMobileCTA onClick={() => setShowForm(true)} />

        {/* Premium Contact Modal */}
        <Suspense fallback={null}>
          <LazyPremiumContactModal 
            isOpen={showForm} 
            onClose={() => setShowForm(false)} 
          />
        </Suspense>

        {/* System Health Check - Development Mode */}
        {process.env.NODE_ENV === 'development' && (
          <Suspense fallback={null}>
            <LazySystemHealthCheck />
          </Suspense>
        )}
      </div>
    </PullToRefresh>
  );
};

export default Index;
