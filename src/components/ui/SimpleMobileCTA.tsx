import React from "react";

interface SimpleMobileCTAProps {
  onClick: () => void;
}

export default function SimpleMobileCTA({ onClick }: SimpleMobileCTAProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold py-4 px-6 rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        SEJA UM DISTRIBUIDOR
      </button>
    </div>
  );
}