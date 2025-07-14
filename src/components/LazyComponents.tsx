import { lazy } from 'react';

// Lazy load heavy components to reduce initial bundle size
export const LazyTechnologySection = lazy(() => import('@/components/sections/TechnologySection'));
export const LazyWhyChooseNivelaSection = lazy(() => import('@/components/sections/WhyChooseNivelaSection'));
export const LazyDistributorSection = lazy(() => import('@/components/sections/DistributorSection'));
export const LazyEcosystemSection = lazy(() => import('@/components/sections/EcosystemSection'));
export const LazyFAQSection = lazy(() => import('@/components/sections/FAQSection'));
export const LazyLegalSection = lazy(() => import('@/components/sections/LegalSection'));

// Lazy load form components
export const LazyPremiumContactModal = lazy(() => import('@/components/forms/PremiumContactModal'));

// Lazy load UI components that are not immediately visible
export const LazySystemHealthCheck = lazy(() => import('@/components/ui/SystemHealthCheck'));