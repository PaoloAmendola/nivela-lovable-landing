import { useEffect, useState } from 'react';
import { useCoreWebVitals } from './use-core-web-vitals';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  ttfb: number | null;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  isOptimal: boolean;
}

export const usePerformanceMonitor = () => {
  const { metrics, isMonitoring } = useCoreWebVitals();
  const [performanceGrade, setPerformanceGrade] = useState<'A' | 'B' | 'C' | 'D' | 'F'>('C');

  const calculateGrade = (metrics: any): 'A' | 'B' | 'C' | 'D' | 'F' => {
    const { fcp, lcp, cls, inp, ttfb } = metrics;
    
    let score = 0;
    let count = 0;

    // FCP scoring (target: < 1800ms)
    if (fcp !== null) {
      if (fcp < 1800) score += 100;
      else if (fcp < 3000) score += 75;
      else if (fcp < 4200) score += 50;
      else score += 25;
      count++;
    }

    // LCP scoring (target: < 2500ms)  
    if (lcp !== null) {
      if (lcp < 2500) score += 100;
      else if (lcp < 4000) score += 75;
      else if (lcp < 5500) score += 50;
      else score += 25;
      count++;
    }

    // CLS scoring (target: < 0.1)
    if (cls !== null) {
      if (cls < 0.1) score += 100;
      else if (cls < 0.25) score += 75;
      else if (cls < 0.4) score += 50;
      else score += 25;
      count++;
    }

    // INP scoring (target: < 200ms)
    if (inp !== null) {
      if (inp < 200) score += 100;
      else if (inp < 500) score += 75;
      else if (inp < 800) score += 50;
      else score += 25;
      count++;
    }

    // TTFB scoring (target: < 800ms)
    if (ttfb !== null) {
      if (ttfb < 800) score += 100;
      else if (ttfb < 1800) score += 75;
      else if (ttfb < 2500) score += 50;
      else score += 25;
      count++;
    }

    if (count === 0) return 'F';
    
    const average = score / count;
    
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  };

  useEffect(() => {
    if (isMonitoring && Object.values(metrics).some(v => v !== null)) {
      const grade = calculateGrade(metrics);
      setPerformanceGrade(grade);
    }
  }, [metrics, isMonitoring]);

  const performanceMetrics: PerformanceMetrics = {
    ...metrics,
    grade: performanceGrade,
    isOptimal: performanceGrade === 'A' || performanceGrade === 'B'
  };

  return {
    metrics: performanceMetrics,
    isMonitoring
  };
};