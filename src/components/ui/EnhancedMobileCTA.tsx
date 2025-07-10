
import { motion, AnimatePresence } from "framer-motion";
import { EnhancedButton } from "./EnhancedButton";
import { useScroll } from "@/hooks/use-scroll";
import StyledIcon from "./StyledIcon";
import { Target, Clock, Crown } from "lucide-react";

interface EnhancedMobileCTAProps {
  onClick: () => void;
}

const EnhancedMobileCTA = ({ onClick }: EnhancedMobileCTAProps) => {
  const { scrollDirection, isScrolled } = useScroll(100);
  
  const shouldShow = !isScrolled || scrollDirection === 'up';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-background via-background/98 to-transparent backdrop-blur-sm border-t border-accent/20 md:hidden"
        >
          {/* Banner de urgência mais elegante */}
          <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border border-accent/30 rounded-lg p-2 mb-3 flex items-center justify-center gap-2">
            <StyledIcon icon={Crown} variant="minimal" size="sm" color="accent" />
            <span className="text-xs text-accent font-semibold">
              🎯 VAGAS LIMITADAS - Exclusivo para Profissionais
            </span>
            <StyledIcon icon={Clock} variant="minimal" size="sm" color="accent" />
          </div>
          
          <EnhancedButton
            onClick={onClick}
            variant="premium"
            className="w-full py-4 text-base font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
            aria-label="Abrir formulário de contato"
          >
            <Target className="w-5 h-5 mr-2" />
            SOLICITAR DEMONSTRAÇÃO
          </EnhancedButton>
          
          {/* Benefício discreto */}
          <div className="text-center mt-2">
            <p className="text-xs text-muted">
              ✓ Suporte vitalício • ✓ Treinamento incluso • ✓ ROI garantido
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedMobileCTA;
