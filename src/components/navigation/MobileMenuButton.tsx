
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isMenuOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <motion.button
      className="lg:hidden p-2 rounded-lg bg-background/20 backdrop-blur-sm border border-accent/30"
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle menu"
    >
      <AnimatePresence mode="wait">
        {isMenuOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6 text-accent" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="w-6 h-6 text-accent" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MobileMenuButton;
