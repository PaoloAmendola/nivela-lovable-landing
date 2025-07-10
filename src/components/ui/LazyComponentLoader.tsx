
import { lazy, Suspense, ComponentType, ReactElement } from 'react';
import { SectionSkeleton } from './SkeletonLoader';
import ErrorBoundary from './ErrorBoundary';

interface LazyLoaderProps {
  componentName: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

// Cache de componentes carregados
const componentCache = new Map<string, ComponentType<any>>();

// Preload de componentes críticos
const preloadComponents = () => {
  const criticalComponents = [
    'HeroSection',
    'TechnologySection',
    'ProofSection'
  ];
  
  criticalComponents.forEach(name => {
    if (!componentCache.has(name)) {
      loadComponent(name);
    }
  });
};

const loadComponent = (componentName: string): ComponentType<any> => {
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName)!;
  }

  let component: ComponentType<any>;
  
  switch (componentName) {
    case 'HeroSection':
      component = lazy(() => import('../sections/HeroSection'));
      break;
    case 'TechnologySection':
      component = lazy(() => import('../sections/TechnologySection'));
      break;
    case 'ExclusivitySection':
      component = lazy(() => import('../sections/ExclusivitySection'));
      break;
    case 'TrustSection':
      component = lazy(() => import('../sections/TrustSection'));
      break;
    case 'EcosystemSection':
      component = lazy(() => import('../sections/EcosystemSection'));
      break;
    case 'FAQSection':
      component = lazy(() => import('../sections/FAQSection'));
      break;
    default:
      throw new Error(`Component ${componentName} not found`);
  }
  
  componentCache.set(componentName, component);
  return component;
};

const LazyComponentLoader = ({ 
  componentName, 
  fallback = <SectionSkeleton />,
  errorFallback = <div className="p-8 text-center text-muted">Erro ao carregar seção</div>,
  ...props 
}: LazyLoaderProps & any) => {
  const Component = loadComponent(componentName);
  
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Inicializar preload
if (typeof window !== 'undefined') {
  // Preload após carregamento inicial
  window.addEventListener('load', () => {
    setTimeout(preloadComponents, 1000);
  });
}

export default LazyComponentLoader;
