
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Index from "./pages/Index";

const App = () => {
  return React.createElement(ErrorBoundary, null,
    React.createElement(Index),
    React.createElement(Toaster)
  );
};

export default App;
