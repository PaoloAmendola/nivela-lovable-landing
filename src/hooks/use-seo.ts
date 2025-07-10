
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  author?: string;
  lang?: string;
}

interface AlternateLanguage {
  lang: string;
  href: string;
}

export const useSEO = (seoData: SEOData, alternateLanguages?: AlternateLanguage[]) => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = window.location.origin + location.pathname;

    // Update title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      if (!content) return;

      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;

      if (metaTag) {
        metaTag.content = content;
      } else {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.content = content;
        document.head.appendChild(metaTag);
      }
    };

    // Helper function to update link tags
    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      
      let linkTag = document.querySelector(selector) as HTMLLinkElement;

      if (linkTag) {
        linkTag.href = href;
      } else {
        linkTag = document.createElement('link');
        linkTag.rel = rel;
        linkTag.href = href;
        if (hreflang) {
          linkTag.hreflang = hreflang;
        }
        document.head.appendChild(linkTag);
      }
    };

    // Basic SEO tags
    updateMetaTag('description', seoData.description || '');
    updateMetaTag('keywords', seoData.keywords || '');
    updateMetaTag('robots', seoData.robots || 'index,follow');
    updateMetaTag('author', seoData.author || '');

    // Language
    if (seoData.lang) {
      document.documentElement.lang = seoData.lang;
    }

    // Canonical URL
    updateLinkTag('canonical', seoData.canonical || currentUrl);

    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle || seoData.title || '', true);
    updateMetaTag('og:description', seoData.ogDescription || seoData.description || '', true);
    updateMetaTag('og:image', seoData.ogImage || '', true);
    updateMetaTag('og:type', seoData.ogType || 'website', true);
    updateMetaTag('og:url', currentUrl, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', seoData.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', seoData.twitterTitle || seoData.ogTitle || seoData.title || '');
    updateMetaTag('twitter:description', seoData.twitterDescription || seoData.ogDescription || seoData.description || '');
    updateMetaTag('twitter:image', seoData.twitterImage || seoData.ogImage || '');

    // Alternate language links
    if (alternateLanguages) {
      // Remove existing alternate links
      const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingAlternates.forEach(link => link.remove());

      // Add new alternate links
      alternateLanguages.forEach(alt => {
        updateLinkTag('alternate', alt.href, alt.lang);
      });
    }

    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewportMeta);
    }

  }, [seoData, location, alternateLanguages]);

  // Function to generate sitemap data
  const generateSitemapData = () => {
    return {
      loc: window.location.origin + location.pathname,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: location.pathname === '/' ? '1.0' : '0.8'
    };
  };

  return {
    generateSitemapData
  };
};
