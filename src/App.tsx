
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Index from "./pages/Index";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Index />
      <Toaster />
    </ErrorBoundary>
  );
};

export default App;
