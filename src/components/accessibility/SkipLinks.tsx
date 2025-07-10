
import React from 'react';

const SkipLinks = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-[9999] bg-primary text-primary-foreground px-4 py-2 font-medium transition-transform -translate-y-full focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Pular para conteúdo principal
      </a>
      <a
        href="#navigation"
        className="absolute top-0 left-32 z-[9999] bg-primary text-primary-foreground px-4 py-2 font-medium transition-transform -translate-y-full focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Pular para navegação
      </a>
      <a
        href="#contact-form"
        className="absolute top-0 left-64 z-[9999] bg-primary text-primary-foreground px-4 py-2 font-medium transition-transform -translate-y-full focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Pular para contato
      </a>
    </div>
  );
};

export default SkipLinks;
