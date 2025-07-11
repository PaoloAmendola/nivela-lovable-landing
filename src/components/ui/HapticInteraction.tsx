import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HapticInteractionProps {
  children: ReactNode;
  hapticType?: 'click' | 'select' | 'success' | 'error' | 'impact';
  hapticIntensity?: 'weak' | 'medium' | 'strong';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const HapticInteraction = ({
  children,
  hapticType = 'click',
  hapticIntensity = 'medium',
  className = '',
  onClick,
  disabled = false
}: HapticInteractionProps) => {
  const { 
    hapticClick, 
    hapticSelect, 
    hapticSuccess, 
    hapticError, 
    hapticImpact 
  } = useHapticFeedback();

  const handleClick = () => {
    if (disabled) return;

    // Trigger appropriate haptic feedback
    switch (hapticType) {
      case 'select':
        hapticSelect();
        break;
      case 'success':
        hapticSuccess();
        break;
      case 'error':
        hapticError();
        break;
      case 'impact':
        hapticImpact(hapticIntensity);
        break;
      default:
        hapticClick();
    }

    onClick?.();
  };

  return (
    <motion.div
      className={`cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      whileTap={disabled ? {} : { scale: 0.98 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
};

export default HapticInteraction;