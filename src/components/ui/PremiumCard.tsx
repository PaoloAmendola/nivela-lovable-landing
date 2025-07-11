
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";

interface PremiumCardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'floating' | 'glass';
  interactive?: boolean;
  hapticFeedback?: boolean;
  onClick?: () => void;
}

const PremiumCard = ({ 
  className, 
  children, 
  variant = 'default',
  interactive = false,
  hapticFeedback = true,
  onClick 
}: PremiumCardProps) => {
  const { hapticClick } = useHapticFeedback();

  const handleClick = () => {
    if (hapticFeedback) {
      hapticClick();
    }
    onClick?.();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'floating':
        return 'card-floating';
      case 'glass':
        return 'glass-medium rounded-2xl p-6';
      default:
        return 'card-premium';
    }
  };

  if (interactive) {
    return (
      <motion.div
        className={cn(
          getVariantClasses(),
          'interactive-premium cursor-pointer',
          className
        )}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(getVariantClasses(), className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PremiumCard;
