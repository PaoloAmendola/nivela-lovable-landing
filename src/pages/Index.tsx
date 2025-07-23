
import React, { useState } from "react";
import ScrollProgressIndicator from "@/components/ui/ScrollProgressIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";
import TechnologySection from "@/components/sections/TechnologySection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import DistributorSection from "@/components/sections/DistributorSection";
import FAQSection from "@/components/sections/FAQSection";
import StoreSection from "@/components/sections/StoreSection";
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
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  console.log('Index component render - React available:', !!React);
  console.log('Index component render - useState available:', !!useState);
  
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

  return React.createElement(PullToRefresh, { onRefresh: handleRefresh },
    React.createElement('div', { 
      className: "min-h-screen bg-background text-foreground overflow-x-hidden" 
    },
      React.createElement(ScrollProgressIndicator),
      
      // Accessibility Enhancements
      React.createElement(AccessibilityEnhancements),
      
      // Contrast Optimizer - WCAG AA Compliance
      React.createElement(ContrastOptimizer),
      
      // Simplified Header with Centered Logo
      React.createElement(SimpleLogo),
      
      // Hero Section
      React.createElement('section', { 
        'data-section': 'hero', 
        id: 'hero' 
      },
        React.createElement(HeroSection, { onCTAClick: () => setShowForm(true) })
      ),
      
      React.createElement('section', { 
        'data-section': 'manifesto-text', 
        id: 'manifesto-text' 
      },
        React.createElement(ManifestoTextSection)
      ),
      
      React.createElement('section', { 
        'data-section': 'manifesto-video', 
        id: 'manifesto-video' 
      },
        React.createElement(ManifestoVideoSection)
      ),
      
      React.createElement('section', { 
        'data-section': 'why-choose', 
        id: 'why-choose' 
      },
        React.createElement(OptimizedLazySection, { skeleton: 'card', delay: 100 },
          React.createElement(WhyChooseNivelaSection)
        )
      ),
      
      React.createElement('section', { 
        'data-section': 'technology', 
        id: 'technology' 
      },
        React.createElement(OptimizedLazySection, { skeleton: 'card', delay: 150 },
          React.createElement(TechnologySection)
        )
      ),
      
      React.createElement('section', { 
        'data-section': 'ecosystem', 
        id: 'ecosystem' 
      },
        React.createElement(OptimizedLazySection, { skeleton: 'card', delay: 200 },
          React.createElement(EcosystemSection)
        )
      ),
      
      React.createElement('section', { 
        'data-section': 'distributor', 
        id: 'distributor' 
      },
        React.createElement(OptimizedLazySection, { skeleton: 'card', delay: 250 },
          React.createElement(DistributorSection, { onCTAClick: () => setShowForm(true) })
        )
      ),
      
      React.createElement('section', { 
        'data-section': 'faq', 
        id: 'faq' 
      },
        React.createElement(OptimizedLazySection, { skeleton: 'card', delay: 300 },
          React.createElement(FAQSection)
        )
      ),
      
      React.createElement('section', { 
        'data-section': 'store', 
        id: 'store' 
      },
        React.createElement(OptimizedLazySection, { skeleton: 'card', delay: 350 },
          React.createElement(StoreSection)
        )
      ),
      
      React.createElement('section', { 
        'data-section': 'footer', 
        id: 'footer' 
      },
        React.createElement(LegalSection)
      ),

      // Enhanced Mobile CTA
      React.createElement(EnhancedMobileCTA, { onClick: () => setShowForm(true) }),

      // Premium Contact Modal
      React.createElement(PremiumContactModal, { 
        isOpen: showForm, 
        onClose: () => setShowForm(false)
      }),

      // System Health Check - Development Mode
      process.env.NODE_ENV === 'development' && React.createElement(SystemHealthCheck)
    )
  );
};

export default Index;
