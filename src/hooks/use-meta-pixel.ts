
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: {
      (...args: any[]): void;
      callMethod?: {
        apply: (context: any, args: any[]) => void;
      };
      queue: any[];
      push: any;
      loaded: boolean;
      version: string;
    };
    _fbq: any;
  }
}

export interface MetaEvent {
  event: string;
  parameters?: Record<string, any>;
}

export const useMetaPixel = (pixelId?: string) => {
  const location = useLocation();

  // Initialize Meta Pixel
  useEffect(() => {
    if (!pixelId) return;

    // Initialize fbq
    window.fbq = window.fbq || function(...args: any[]) {
      (window.fbq.callMethod ? 
        window.fbq.callMethod.apply(window.fbq, args) : 
        window.fbq.queue.push(args));
    } as any;

    if (!window._fbq) window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = window.fbq.queue || [];

    // Load pixel script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    // Initialize pixel
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="fbevents.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [pixelId]);

  // Track page views on route change
  useEffect(() => {
    if (!pixelId || !window.fbq) return;

    window.fbq('track', 'PageView');
  }, [location, pixelId]);

  // Track custom events
  const trackEvent = useCallback((event: MetaEvent) => {
    if (!window.fbq) return;

    window.fbq('track', event.event, event.parameters);
  }, []);

  // Track lead events
  const trackLead = useCallback((value?: number) => {
    trackEvent({
      event: 'Lead',
      parameters: value ? { value, currency: 'BRL' } : undefined
    });
  }, [trackEvent]);

  // Track contact events
  const trackContact = useCallback(() => {
    trackEvent({
      event: 'Contact'
    });
  }, [trackEvent]);

  // Track content views
  const trackViewContent = useCallback((contentName: string, contentId?: string) => {
    trackEvent({
      event: 'ViewContent',
      parameters: {
        content_name: contentName,
        content_ids: contentId ? [contentId] : undefined
      }
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLead,
    trackContact,
    trackViewContent
  };
};
