
import { useState, lazy, Suspense, useEffect } from "react";
import MinimalNavbar from "@/components/navigation/MinimalNavbar";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import ContactForm from "@/components/forms/ContactForm";
import LegalSection from "@/components/sections/LegalSection";
import EnhancedMobileCTA from "@/components/ui/EnhancedMobileCTA";
import MobileNavSticky from "@/components/ui/MobileNavSticky";
import SkipLinks from "@/components/accessibility/SkipLinks";
import SecurityHeaders from "@/components/security/SecurityHeaders";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import PWAInstallBanner from "@/components/ui/PWAInstallBanner";
import PullToRefresh from "@/components/ui/PullToRefresh";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";
import WhyChooseNivelaSection from "@/components/sections/WhyChooseNivelaSection";

// Lazy load apenas seções não-críticas
const TechnologySection = lazy(() => import("@/components/sections/TechnologySection"));
const EcosystemSection = lazy(() => import("@/components/sections/EcosystemSection"));
const ExclusivitySection = lazy(() => import("@/components/sections/ExclusivitySection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));

// Lazy load ferramentas de dev apenas quando necessário
const DevTools = lazy(() => Promise.all([
  import("@/components/ui/AuditDashboard"),
  import("@/components/ui/DeviceTestSimulator"), 
  import("@/components/ui/ValidationSummary")
]).then(([AuditDashboard, DeviceTestSimulator, ValidationSummary]) => ({
  default: () => (
    <>
      <AuditDashboard.default />
      <DeviceTestSimulator.default />
      <ValidationSummary.default />
    </>
  )
})));

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    window.location.reload();
  };

  // Toggle validation dashboard (lazy load dev tools)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setShowValidation(!showValidation);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showValidation]);

  return (
    <ErrorBoundary>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden section-gradient-final">
          <SecurityHeaders />
          <SkipLinks />
          
          {/* Dev Tools - Lazy loaded apenas quando necessário */}
          {showValidation && (
            <Suspense fallback={<div className="p-4">Carregando ferramentas...</div>}>
              <DevTools />
            </Suspense>
          )}
          
          {/* Navigation */}
          <nav id="navigation">
            <MinimalNavbar onCTAClick={() => setShowForm(true)} />
          </nav>
          
          <ScrollIndicator />
          
          {/* Seções Críticas - Carregamento Direto */}
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
          
          {/* Technology Section - Primeira lazy */}
          <section data-section="technology" id="technology" className="py-6 sm:py-8 lg:py-10">
            <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse rounded-lg m-4" />}>
              <TechnologySection />
            </Suspense>
          </section>
          
          {/* Seções Não-Críticas - Lazy Loading Simples */}
          <section data-section="ecosystem" id="ecosystem" className="py-6 sm:py-8 lg:py-10">
            <Suspense fallback={<div className="h-80 bg-muted/20 animate-pulse rounded-lg m-4" />}>
              <EcosystemSection />
            </Suspense>
          </section>
          
          <section data-section="distribution" id="distribution" className="py-6 sm:py-8 lg:py-10">
            <Suspense fallback={<div className="h-80 bg-muted/20 animate-pulse rounded-lg m-4" />}>
              <ExclusivitySection onCTAClick={() => setShowForm(true)} />
            </Suspense>
          </section>
          
          <section data-section="faq" id="faq" className="py-6 sm:py-8 lg:py-10">
            <Suspense fallback={<div className="h-80 bg-muted/20 animate-pulse rounded-lg m-4" />}>
              <FAQSection />
            </Suspense>
          </section>
          
          {/* Contact Form */}
          {showForm && (
            <div id="contact-form">
              <ContactForm isOpen={showForm} onClose={() => setShowForm(false)} />
            </div>
          )}
          
          {/* Footer */}
          <div className="py-3 sm:py-4">
            <LegalSection />
          </div>
          
          <PWAInstallBanner />
          <EnhancedMobileCTA onClick={() => setShowForm(true)} />
          <MobileNavSticky onCTAClick={() => setShowForm(true)} />

          {/* Dev Helper */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-2 right-2 text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded">
              Ctrl+Shift+V: Dev Tools
            </div>
          )}
        </div>
      </PullToRefresh>
    </ErrorBoundary>
  );
};

export default Index;
