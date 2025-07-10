
import React from 'react';
import { useSEO } from '@/hooks/use-seo';

const SEOWrapper = ({ children }: { children: React.ReactNode }) => {
  // Configure SEO for the main page
  useSEO({
    title: "NIVELA® - Bem Beauty Professional | Tecnologia ASTRO QUAT V3",
    description: "O tratamento capilar que está revolucionando os salões. Tecnologia exclusiva ASTRO QUAT V3. Sem formol, sem fumaça, 100% performance.",
    keywords: "tratamento capilar, ASTRO QUAT V3, salão de beleza, sem formol, progressiva, bem beauty",
    ogTitle: "NIVELA® - Bem Beauty Professional | Tecnologia ASTRO QUAT V3",
    ogDescription: "O tratamento capilar que está revolucionando os salões. Tecnologia exclusiva ASTRO QUAT V3. Sem formol, sem fumaça, 100% performance.",
    ogImage: "https://lovable.dev/opengraph-image-p98pqg.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    author: "Bem Beauty Professional",
    lang: "pt-BR",
    robots: "index,follow"
  });

  return <>{children}</>;
};

export default SEOWrapper;
