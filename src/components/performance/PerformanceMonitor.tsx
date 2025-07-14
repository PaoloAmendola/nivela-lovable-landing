import { useEffect, useState } from 'react';
import { useWebVitals } from '@/hooks/use-web-vitals';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface PerformanceData {
  metrics: PerformanceMetric[];
  resources: PerformanceEntry[];
  navigation: PerformanceNavigationTiming | null;
  memory?: any;
}

export const PerformanceMonitor = ({ enableReporting = true }: { enableReporting?: boolean }) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    metrics: [],
    resources: [],
    navigation: null
  });

  const webVitals = useWebVitals();

  useEffect(() => {
    // Coletar métricas de navegação
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    // Coletar recursos
    const resources = performance.getEntriesByType('resource');
    
    // Memória (se disponível)
    const memory = (performance as any).memory;

    setPerformanceData(prev => ({
      ...prev,
      navigation,
      resources,
      memory
    }));

    // Monitorar mudanças de performance
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach(entry => {
        if (entry.entryType === 'measure' || entry.entryType === 'mark') {
          const metric: PerformanceMetric = {
            name: entry.name,
            value: entry.duration || entry.startTime,
            rating: entry.duration < 100 ? 'good' : entry.duration < 300 ? 'needs-improvement' : 'poor',
            timestamp: Date.now()
          };
          
          setPerformanceData(prev => ({
            ...prev,
            metrics: [...prev.metrics, metric]
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'mark', 'resource', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Enviar dados para analytics se habilitado
    if (enableReporting && webVitals) {
      const reportData = {
        ...webVitals,
        customMetrics: performanceData.metrics,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection,
        memory: performanceData.memory
      };

      // Simular envio para analytics
      if (process.env.NODE_ENV === 'production') {
        console.log('Performance data:', reportData);
        
        // Aqui você pode integrar com serviços como:
        // - Google Analytics
        // - Vercel Analytics
        // - Custom analytics endpoint
        
        // Exemplo: fetch('/api/analytics/performance', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(reportData)
        // });
      }
    }
  }, [webVitals, performanceData, enableReporting]);

  // Função para marcar eventos customizados
  const markEvent = (name: string) => {
    performance.mark(name);
  };

  // Função para medir duração
  const measureDuration = (name: string, startMark: string, endMark?: string) => {
    if (endMark) {
      performance.measure(name, startMark, endMark);
    } else {
      performance.measure(name, startMark);
    }
  };

  // Analisar performance de recursos
  const analyzeResources = () => {
    const slowResources = performanceData.resources.filter(
      resource => resource.duration > 1000
    );
    
    const resourcesByType = performanceData.resources.reduce((acc, resource) => {
      const type = resource.name.split('.').pop() || 'other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      slowResources,
      resourcesByType,
      totalResources: performanceData.resources.length
    };
  };

  // Detectar problemas de performance
  const detectPerformanceIssues = () => {
    const issues = [];
    
    // Detectar problemas com base em métricas simuladas
    const navigation = performanceData.navigation;
    if (navigation && navigation.loadEventEnd - navigation.fetchStart > 2500) {
      issues.push('Tempo de carregamento alto - considere otimizar recursos críticos');
    }
    
    const slowResources = performanceData.resources.filter(r => r.duration > 1000);
    if (slowResources.length > 0) {
      issues.push(`${slowResources.length} recursos carregando lentamente`);
    }
    
    return issues;
  };

  // Exposar funções para uso em outros componentes
  useEffect(() => {
    (window as any).performanceMonitor = {
      markEvent,
      measureDuration,
      analyzeResources,
      detectPerformanceIssues,
      getData: () => performanceData,
      getWebVitals: () => webVitals
    };
  }, [performanceData, webVitals]);

  // Componente não renderiza nada visualmente
  return null;
};