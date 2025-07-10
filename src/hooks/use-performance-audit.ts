
import { useState, useEffect, useCallback } from 'react';
import { usePerformance } from './use-performance';

interface PerformanceAudit {
  lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  fcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  score: number;
  suggestions: string[];
}

export const usePerformanceAudit = () => {
  const [audit, setAudit] = useState<PerformanceAudit | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const { metrics } = usePerformance();

  const getRating = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'good';
    if (value <= thresholds[1]) return 'needs-improvement';
    return 'poor';
  };

  const generateSuggestions = (audit: PerformanceAudit) => {
    const suggestions: string[] = [];
    
    if (audit.lcp.rating !== 'good') {
      suggestions.push('Otimizar LCP: Preload imagens críticas e reduzir bloqueios de renderização');
    }
    if (audit.fid.rating !== 'good') {
      suggestions.push('Melhorar FID: Quebrar tarefas longas e otimizar JavaScript');
    }
    if (audit.cls.rating !== 'good') {
      suggestions.push('Reduzir CLS: Definir dimensões para imagens e reservar espaço para conteúdo dinâmico');
    }
    if (audit.fcp.rating !== 'good') {
      suggestions.push('Acelerar FCP: Otimizar CSS crítico e reduzir recursos bloqueantes');
    }
    if (audit.ttfb.rating !== 'good') {
      suggestions.push('Melhorar TTFB: Otimizar servidor e usar CDN');
    }

    return suggestions;
  };

  const runAudit = useCallback(async () => {
    setIsAuditing(true);
    
    try {
      // Aguardar métricas serem coletadas
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const lcpValue = metrics.renderTime || 2500;
      const fidValue = 100; // Simulado
      const clsValue = 0.1; // Simulado
      const fcpValue = metrics.loadTime || 1800;
      const ttfbValue = 600; // Simulado

      const auditResult: PerformanceAudit = {
        lcp: { value: lcpValue, rating: getRating(lcpValue, [2500, 4000]) },
        fid: { value: fidValue, rating: getRating(fidValue, [100, 300]) },
        cls: { value: clsValue, rating: getRating(clsValue, [0.1, 0.25]) },
        fcp: { value: fcpValue, rating: getRating(fcpValue, [1800, 3000]) },
        ttfb: { value: ttfbValue, rating: getRating(ttfbValue, [800, 1800]) },
        score: 0,
        suggestions: []
      };

      // Calcular score geral
      const ratings = [auditResult.lcp, auditResult.fid, auditResult.cls, auditResult.fcp, auditResult.ttfb];
      const goodCount = ratings.filter(r => r.rating === 'good').length;
      auditResult.score = Math.round((goodCount / ratings.length) * 100);
      
      auditResult.suggestions = generateSuggestions(auditResult);
      
      setAudit(auditResult);
    } finally {
      setIsAuditing(false);
    }
  }, [metrics]);

  return {
    audit,
    isAuditing,
    runAudit
  };
};
