
import { useEffect } from 'react';

interface Organization {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage: string;
  };
  sameAs?: string[];
}

interface Product {
  name: string;
  description: string;
  brand: string;
  category: string;
  url: string;
  image?: string[];
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

interface WebSite {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

interface StructuredDataProps {
  organization?: Organization;
  product?: Product;
  website?: WebSite;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const StructuredData = ({
  organization,
  product,
  website,
  breadcrumbs
}: StructuredDataProps) => {

  useEffect(() => {
    const structuredDataScripts: HTMLScriptElement[] = [];

    // Organization Schema
    if (organization) {
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": organization.name,
        "url": organization.url,
        "logo": organization.logo,
        "description": organization.description,
        "contactPoint": organization.contactPoint,
        "sameAs": organization.sameAs
      };

      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.text = JSON.stringify(orgSchema);
      document.head.appendChild(orgScript);
      structuredDataScripts.push(orgScript);
    }

    // Product Schema
    if (product) {
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "category": product.category,
        "url": product.url,
        "image": product.image,
        "offers": product.offers ? {
          "@type": "Offer",
          "price": product.offers.price,
          "priceCurrency": product.offers.priceCurrency || "BRL",
          "availability": product.offers.availability || "https://schema.org/InStock",
          "url": product.offers.url || product.url
        } : undefined,
        "aggregateRating": product.aggregateRating ? {
          "@type": "AggregateRating",
          "ratingValue": product.aggregateRating.ratingValue,
          "ratingCount": product.aggregateRating.ratingCount,
          "bestRating": product.aggregateRating.bestRating || 5,
          "worstRating": product.aggregateRating.worstRating || 1
        } : undefined
      };

      const productScript = document.createElement('script');
      productScript.type = 'application/ld+json';
      productScript.text = JSON.stringify(productSchema);
      document.head.appendChild(productScript);
      structuredDataScripts.push(productScript);
    }

    // Website Schema
    if (website) {
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": website.name,
        "url": website.url,
        "description": website.description,
        "potentialAction": website.potentialAction ? {
          "@type": "SearchAction",
          "target": website.potentialAction.target,
          "query-input": website.potentialAction.queryInput
        } : undefined
      };

      const websiteScript = document.createElement('script');
      websiteScript.type = 'application/ld+json';
      websiteScript.text = JSON.stringify(websiteSchema);
      document.head.appendChild(websiteScript);
      structuredDataScripts.push(websiteScript);
    }

    // Breadcrumbs Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbScript);
      structuredDataScripts.push(breadcrumbScript);
    }

    // Cleanup function
    return () => {
      structuredDataScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [organization, product, website, breadcrumbs]);

  return null; // This component doesn't render anything
};

export default StructuredData;
