import React, { createContext, useContext, ReactNode } from 'react';
import useAnalytics from '@/hooks/use-analytics';
import { useMetaPixel } from '@/hooks/use-meta-pixel';
import { useCoreWebVitals } from '@/hooks/use-core-web-vitals';

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
