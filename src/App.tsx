
import * as React from 'react';
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";

const App: React.FC = () => {
  return (
    <>
      <Index />
      <Toaster />
    </>
  );
};

export default App;
