import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "NIVELA® - Localizador Profissional de Pelos",
    "image": [
      "https://www.bembeauty.com.br/nivela-hero-image.jpg",
      "https://www.bembeauty.com.br/nivela-product-showcase.jpg"
    ],
    "description": "Localizador profissional de pelos encravados com tecnologia amazônica. Solução exclusiva para salões de beleza e profissionais da estética.",
    "brand": {
      "@type": "Brand",
      "name": "NIVELA®"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Bem Beauty"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.bembeauty.com.br/?utm_source=landing&utm_medium=schema&utm_campaign=structured_data",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Bem Beauty"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "category": "Equipamento Profissional de Estética",
    "audience": {
      "@type": "Audience",
      "audienceType": "Profissionais de Estética e Salões de Beleza"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NIVELA®",
    "url": "https://nivela.com.br",
    "logo": "https://nivela.com.br/logo.png",
    "description": "Desenvolvedor do localizador profissional de pelos encravados com tecnologia amazônica exclusiva.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Atendimento ao Cliente",
      "availableLanguage": "Portuguese"
    },
    "areaServed": "BR",
    "knowsAbout": [
      "Estética Profissional",
      "Tratamento de Pelos Encravados",
      "Tecnologia Amazônica",
      "Equipamentos para Salões"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NIVELA® - Landing Page",
    "url": "https://nivela.com.br",
    "description": "Landing page oficial do NIVELA® - Localizador profissional de pelos encravados",
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.bembeauty.com.br/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
};

export default StructuredData;