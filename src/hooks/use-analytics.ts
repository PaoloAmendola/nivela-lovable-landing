
import { useEffect } from 'react';

// Declaração global para o gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const useAnalytics = (googleAnalyticsId?: string) => {
  useEffect(() => {
    // Configurar Google Analytics se disponível
    if (typeof window !== 'undefined' && window.gtag && googleAnalyticsId) {
      window.gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [googleAnalyticsId]);

  const trackEvent = (eventName: string, parameters?: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackConversion = (conversionId: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId
      });
    }
  };

  const trackFormSubmission = (formName: string, success: boolean = true) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        form_name: formName,
        success: success
      });
    }
  };

  const trackCTAClick = (ctaName: string, location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        cta_name: ctaName,
        location: location
      });
    }
  };

  return {
    trackEvent,
    trackConversion,
    trackFormSubmission,
    trackCTAClick
  };
};

export default useAnalytics;
