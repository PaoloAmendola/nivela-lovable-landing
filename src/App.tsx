
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Index />
      <Toaster />
    </ErrorBoundary>
  );
};

export default App;
