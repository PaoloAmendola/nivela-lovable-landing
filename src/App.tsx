
import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SectionSkeleton } from "@/components/ui/SkeletonLoader";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

// Lazy load the main page to fix React hook issues
const Index = React.lazy(() => import("./pages/Index"));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SectionSkeleton />}>
        <Index />
      </Suspense>
      <Toaster />
    </ErrorBoundary>
  );
};

export default App;
