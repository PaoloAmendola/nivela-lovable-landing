
import { useState, useCallback } from 'react';

interface PWAAuditResult {
  score: number;
  features: {
    serviceWorker: boolean;
    manifest: boolean;
    httpsEnabled: boolean;
    offlineSupport: boolean;
    installable: boolean;
    responsive: boolean;
    fastLoading: boolean;
  };
  suggestions: string[];
}

export const usePWAAudit = () => {
  const [audit, setAudit] = useState<PWAAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const checkPWAFeatures = useCallback(async () => {
    const features = {
      serviceWorker: 'serviceWorker' in navigator,
      manifest: false,
      httpsEnabled: location.protocol === 'https:' || location.hostname === 'localhost',
      offlineSupport: false,
      installable: false,
      responsive: false,
      fastLoading: false
    };

    const suggestions: string[] = [];

    // Verificar manifest
    try {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        features.manifest = true;
      } else {
        suggestions.push('Adicionar Web App Manifest');
      }
    } catch (error) {
      suggestions.push('Verificar configuração do manifest');
    }

    // Verificar service worker
    if (features.serviceWorker) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          features.offlineSupport = true;
        } else {
          suggestions.push('Registrar service worker para suporte offline');
        }
      } catch (error) {
        suggestions.push('Verificar implementação do service worker');
      }
    } else {
      suggestions.push('Service Worker não suportado neste navegador');
    }

    // Verificar responsividade
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      features.responsive = true;
    } else {
      suggestions.push('Adicionar meta tag viewport para responsividade');
    }

    // Verificar instalabilidade
    if ('BeforeInstallPromptEvent' in window || window.matchMedia('(display-mode: standalone)').matches) {
      features.installable = true;
    } else {
      suggestions.push('Melhorar critérios de instalabilidade');
    }

    // Verificar velocidade de carregamento (simulado)
    const performanceEntries = performance.getEntriesByType('navigation');
    if (performanceEntries.length > 0) {
      const navigation = performanceEntries[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      features.fastLoading = loadTime < 3000;
      
      if (!features.fastLoading) {
        suggestions.push('Otimizar tempo de carregamento inicial');
      }
    }

    // Calcular score
    const featureCount = Object.values(features).filter(Boolean).length;
    const score = Math.round((featureCount / Object.keys(features).length) * 100);

    return {
      score,
      features,
      suggestions
    };
  }, []);

  const runAudit = useCallback(async () => {
    setIsAuditing(true);
    
    try {
      const result = await checkPWAFeatures();
      setAudit(result);
    } finally {
      setIsAuditing(false);
    }
  }, [checkPWAFeatures]);

  return {
    audit,
    isAuditing,
    runAudit
  };
};
