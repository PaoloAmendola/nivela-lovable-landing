import { motion } from 'framer-motion';

interface PulseSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangle' | 'circle' | 'avatar' | 'button';
  lines?: number;
  animated?: boolean;
}

const PulseSkeleton = ({ 
  className = '', 
  variant = 'rectangle', 
  lines = 1, 
  animated = true 
}: PulseSkeletonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'h-4 w-full rounded';
      case 'circle':
        return 'h-12 w-12 rounded-full';
      case 'avatar':
        return 'h-16 w-16 rounded-full';
      case 'button':
        return 'h-10 w-24 rounded-lg';
      default:
        return 'h-32 w-full rounded-lg';
    }
  };

  const baseClasses = `
    bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 
    ${animated ? 'animate-pulse' : ''}
    ${getVariantStyles()}
    ${className}
  `;

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: lines }, (_, index) => (
          <motion.div
            key={index}
            className={baseClasses}
            style={{ width: index === lines - 1 ? '75%' : '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default PulseSkeleton;