import { motion } from 'framer-motion';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

const FormProgress = ({ currentStep, totalSteps, stepTitles }: FormProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <motion.div
                key={stepNumber}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium
                  -translate-y-2 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground shadow-md' 
                    : isCurrent 
                    ? 'bg-background border-primary text-primary shadow-lg scale-110' 
                    : 'bg-muted border-muted text-muted-foreground'
                  }
                `}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isCurrent ? 1.1 : 1,
                  rotate: isCompleted ? 360 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? '✓' : stepNumber}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Step titles */}
      {stepTitles && (
        <div className="flex justify-between text-sm">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <span
                key={title}
                className={`
                  transition-colors duration-300
                  ${isCompleted 
                    ? 'text-primary font-medium' 
                    : isCurrent 
                    ? 'text-foreground font-semibold' 
                    : 'text-muted-foreground'
                  }
                `}
              >
                {title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormProgress;