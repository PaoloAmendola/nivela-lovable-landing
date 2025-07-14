import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
}

const SimpleButton = React.forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ className, variant = 'primary', size = 'default', loading, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
    
    const variants = {
      primary: 'bg-gradient-to-r from-[#9D4916] to-[#B8551A] text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
    };

    const sizes = {
      default: 'px-6 py-3 text-base min-h-[44px]',
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      lg: 'px-8 py-4 text-lg min-h-[52px]'
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Carregando...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

SimpleButton.displayName = "SimpleButton";

export { SimpleButton };