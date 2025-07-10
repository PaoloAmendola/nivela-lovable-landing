import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MobileCTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const MobileCTAButton = ({
  onClick,
  children,
  variant = 'primary',
  size = 'default',
  className,
  disabled = false,
  loading = false,
  fullWidth = false
}: MobileCTAButtonProps) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl",
    secondary: "bg-accent text-black hover:bg-accent/90 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white"
  };

  const sizes = {
    default: "px-6 py-4 text-base min-h-[56px]",
    lg: "px-8 py-5 text-lg min-h-[64px]",
    xl: "px-10 py-6 text-xl min-h-[72px]"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        // Base styles - mobile-first
        "relative font-montserrat font-semibold rounded-xl transition-all duration-300",
        "flex items-center justify-center gap-3 touch-manipulation",
        "focus:outline-none focus:ring-4 focus:ring-primary/30",
        "active:scale-95 transform",
        
        // Variant styles
        variants[variant],
        
        // Size styles
        sizes[size],
        
        // Full width
        fullWidth ? "w-full" : "min-w-[200px]",
        
        // Disabled state
        disabled && "opacity-60 cursor-not-allowed",
        
        // Loading state
        loading && "opacity-75",
        
        className
      )}
      style={{
        minHeight: 'var(--touch-target-comfort)',
        touchAction: 'manipulation'
      }}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {children}
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </span>
      
      {/* Ripple effect for touch feedback */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100" />
      </div>
    </motion.button>
  );
};

export default MobileCTAButton;