
import * as React from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { usePremiumInteractions } from "@/hooks/use-premium-interactions";
import BrandedLoading from "./BrandedLoading";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-montserrat ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden btn-touch-optimized",
  {
    variants: {
      variant: {
        default: "btn-premium-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-dramatic hover:shadow-glow",
        outline: "btn-premium-ghost",
        secondary: "btn-premium-secondary",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground glass-subtle",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "btn-premium-primary hover-glow"
      },
      size: {
        default: "px-6 py-3 rounded-xl",
        sm: "px-4 py-2 text-sm rounded-lg min-h-[44px]",
        lg: "px-8 py-4 text-lg rounded-xl min-h-[48px]",
        icon: "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  ripple?: boolean;
  hapticFeedback?: boolean;
  loadingMessage?: string;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false, 
    ripple = true,
    hapticFeedback = true,
    loadingMessage,
    children, 
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
    const { handlePremiumClick } = usePremiumInteractions({ hapticEnabled: hapticFeedback });

    const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      // Premium interaction with haptic feedback
      handlePremiumClick(() => onClick?.(e));

      // Handle ripple effect
      if (ripple && e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
    }, [onClick, ripple, handlePremiumClick]);

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }), "interactive-premium")}
        ref={ref}
        onClick={handleClick}
        disabled={loading || props.disabled}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.2
        }}
        aria-label={loading ? loadingMessage || "Carregando..." : props['aria-label']}
        style={props.style}
        type={props.type}
        form={props.form}
        name={props.name}
        value={props.value}
      >
        {/* Premium ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        ))}
        
        {/* Loading state */}
        {loading ? (
          <BrandedLoading 
            variant="spinner" 
            size="sm" 
            message={loadingMessage}
          />
        ) : (
          <span className="flex items-center gap-2">
            {children}
          </span>
        )}
      </motion.button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton, buttonVariants };
