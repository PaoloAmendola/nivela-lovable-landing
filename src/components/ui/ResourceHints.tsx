import { useEffect } from 'react';

const ResourceHints = () => {
  useEffect(() => {
    // Add resource hints for better performance
    const hints = [
      // Preload critical fonts
      { rel: 'preload', href: '/fonts/Wilkysta.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      
      // Preconnect to external domains
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://xnexfhgtqlryfkyuvihq.supabase.co' },
      
      // DNS prefetch for other resources
      { rel: 'dns-prefetch', href: 'https://unsplash.com' },
      { rel: 'dns-prefetch', href: 'https://images.unsplash.com' }
    ];

    hints.forEach(hint => {
      const existingLink = document.querySelector(`link[href="${hint.href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        Object.entries(hint).forEach(([key, value]) => {
          if (key === 'crossorigin' && value) {
            link.setAttribute(key, '');
          } else {
            link.setAttribute(key, value as string);
          }
        });
        document.head.appendChild(link);
      }
    });
  }, []);

  return null;
};

export default ResourceHints;