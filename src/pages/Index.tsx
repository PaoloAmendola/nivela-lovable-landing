
import React, { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import { Toaster } from "@/components/ui/toaster";

const Index: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  console.log('Index component rendering...');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section - Critical above the fold */}
      <HeroSection onCTAClick={() => setShowForm(true)} />
      
      {/* Manifesto Section */}
      <ManifestoTextSection />
      
      <Toaster />
    </div>
  );
};

export default Index;
