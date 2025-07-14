
import React from "react";

interface NuvemshopButtonProps {
  productId: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const NuvemshopButton: React.FC<NuvemshopButtonProps> = ({ 
  productId, 
  children, 
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props 
}) => {
  const handleClick = () => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click_loja', {
        event_category: 'navegacao',
        event_label: 'Botão para a loja Nuvemshop'
      });
    }
    
    // Redirect to store with safety check
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.bembeauty.com.br/?utm_source=landing&utm_medium=botao&utm_campaign=checkout_nivela';
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default NuvemshopButton;
