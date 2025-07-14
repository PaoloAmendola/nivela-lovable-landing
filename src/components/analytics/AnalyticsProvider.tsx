import React, { createContext, useContext, ReactNode } from 'react';
import useAnalytics from '@/hooks/use-analytics';
import { useMetaPixel } from '@/hooks/use-meta-pixel';
import { useCoreWebVitals } from '@/hooks/use-core-web-vitals';
import StructuredData from '@/components/seo/StructuredData';

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  metaPixelId?: string;
  enableWebVitals?: boolean;
  enableStructuredData?: boolean;
}

interface AnalyticsContextType {
  trackEvent: (event: any) => void;
  trackConversion: (conversion: any) => void;
  trackFormSubmission: (formName: string, success?: boolean) => void;
  trackCTAClick: (ctaName: string, location: string) => void;
  trackLead: (value?: number) => void;
  trackContact: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
  config: AnalyticsConfig;
}

export const AnalyticsProvider = ({ children, config }: AnalyticsProviderProps) => {
  const analytics = useAnalytics(config.googleAnalyticsId);
  const metaPixel = useMetaPixel(config.metaPixelId);
  
  // Initialize Core Web Vitals if enabled
  const webVitals = config.enableWebVitals ? useCoreWebVitals() : null;

  const contextValue: AnalyticsContextType = {
    trackEvent: (event) => {
      analytics.trackEvent(event);
    },
    trackConversion: (conversion) => {
      analytics.trackConversion(conversion);
    },
    trackFormSubmission: (formName, success = true) => {
      analytics.trackFormSubmission(formName, success);
      if (success) {
        metaPixel.trackLead();
      }
    },
    trackCTAClick: (ctaName, location) => {
      analytics.trackCTAClick(ctaName, location);
    },
    trackLead: (value) => {
      metaPixel.trackLead(value);
    },
    trackContact: () => {
      metaPixel.trackContact();
    }
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {config.enableStructuredData && (
        <StructuredData
          organization={{
            name: "Bem Beauty Professional",
            url: "https://bembeauty.com.br",
            description: "Produtos profissionais para salões de beleza com tecnologia avançada",
            contactPoint: {
              telephone: "+55-11-99999-9999",
              contactType: "customer service",
              availableLanguage: "Portuguese"
            },
            sameAs: [
              "https://www.instagram.com/bembeauty",
              "https://www.facebook.com/bembeauty"
            ]
          }}
          product={{
            name: "NIVELA® - Tratamento Capilar",
            description: "Tratamento capilar revolucionário com tecnologia ASTRO QUAT V3. Sem formol, sem fumaça, 100% performance.",
            brand: "Bem Beauty Professional",
            category: "Tratamento Capilar",
            url: window.location.href,
            image: [
              "https://example.com/nivela-product-1.jpg",
              "https://example.com/nivela-product-2.jpg"
            ],
            offers: {
              availability: "https://schema.org/InStock",
              priceCurrency: "BRL"
            },
            aggregateRating: {
              ratingValue: 4.8,
              ratingCount: 150,
              bestRating: 5,
              worstRating: 1
            }
          }}
          website={{
            name: "NIVELA® - Bem Beauty Professional",
            url: window.location.origin,
            description: "O tratamento capilar que está revolucionando os salões"
          }}
        />
      )}
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};
