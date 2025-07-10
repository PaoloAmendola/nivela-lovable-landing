
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface SmartLoadingProps {
  state: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const SmartLoading = ({ 
  state, 
  message, 
  size = 'md', 
  showIcon = true 
}: SmartLoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const renderIcon = () => {
    if (!showIcon) return null;

    switch (state) {
      case 'loading':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className={`${sizeClasses[size]} text-primary`} />
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <CheckCircle className={`${sizeClasses[size]} text-green-500`} />
          </motion.div>
        );
      case 'error':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <AlertCircle className={`${sizeClasses[size]} text-red-500`} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (state === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2"
    >
      {renderIcon()}
      {message && (
        <span className={`${textSizes[size]} font-medium`}>
          {message}
        </span>
      )}
    </motion.div>
  );
};

export default SmartLoading;
