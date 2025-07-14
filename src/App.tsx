
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import StaticIndex from "./pages/StaticIndex";

function App() {
  return (
    <ErrorBoundary>
      <StaticIndex />
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
