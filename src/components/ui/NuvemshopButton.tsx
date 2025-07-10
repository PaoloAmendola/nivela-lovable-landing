
import React from "react";

interface NuvemshopButtonProps {
  productId: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const NuvemshopButton = ({ 
  productId, 
  children, 
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props 
}: NuvemshopButtonProps) => {
  return (
    <a 
      href={`https://sualoja.nuvemshop.com.br/cart?add=${productId}`} 
      target={target}
      rel={rel}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default NuvemshopButton;
