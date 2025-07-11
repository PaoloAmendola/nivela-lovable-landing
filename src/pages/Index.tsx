import { useState, lazy, Suspense, useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoTextSection from "@/components/sections/ManifestoTextSection";
import ManifestoVideoSection from "@/components/sections/ManifestoVideoSection";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  
  console.log("Index component rendering with state");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Seções Críticas */}
      <section data-section="hero" id="hero">
        <HeroSection onCTAClick={() => setShowForm(true)} />
      </section>
      
      <section data-section="manifesto-text" id="manifesto-text">
        <ManifestoTextSection />
      </section>
      
      <section data-section="manifesto-video" id="manifesto-video">
        <ManifestoVideoSection />
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2>Contact Form</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;