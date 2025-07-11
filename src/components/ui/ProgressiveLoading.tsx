import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProgressiveLoadingProps {
  stage: 'idle' | 'loading' | 'processing' | 'success' | 'error';
  message?: string;
  progress?: number;
}

const ProgressiveLoading = ({ stage, message, progress = 0 }: ProgressiveLoadingProps) => {
  const getStageConfig = () => {
    switch (stage) {
      case 'loading':
        return {
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/20',
          message: message || 'Carregando...'
        };
      case 'processing':
        return {
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          message: message || 'Processando...'
        };
      case 'success':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          message: message || 'Concluído!'
        };
      case 'error':
        return {
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          message: message || 'Erro'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          message: ''
        };
    }
  };

  const config = getStageConfig();

  if (stage === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-sm
        ${config.bgColor} ${config.borderColor}
      `}
    >
      <div className="flex items-center gap-3">
        {stage !== 'success' && stage !== 'error' && (
          <Loader2 className={`w-5 h-5 animate-spin ${config.color}`} />
        )}
        
        <div>
          <p className={`text-sm font-medium ${config.color}`}>
            {config.message}
          </p>
          
          {progress > 0 && progress < 100 && (
            <div className="mt-2 w-48 h-1 bg-muted/20 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-current ${config.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressiveLoading;