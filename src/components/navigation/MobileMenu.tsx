
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  navItems: NavItem[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onClose: () => void;
  onCTAClick: () => void;
}

const MobileMenu = ({ 
  isMenuOpen, 
  navItems, 
  activeSection, 
  onSectionClick, 
  onClose, 
  onCTAClick 
}: MobileMenuProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 bg-background border-l border-accent/20 z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-accent/20">
                {!imageError ? (
                  <img 
                    src="/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png" 
                    alt="Bem Beauty Professional Logo"
                    className="h-8 w-auto object-contain"
                    onError={handleImageError}
                    onLoad={() => {}}
                  />
                ) : (
                  <span className="text-lg font-playfair font-bold gradient-text">
                    Bem Beauty Professional
                  </span>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <X className="w-5 h-5 text-accent" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 py-6 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSectionClick(item.id)}
                    className={`w-full px-6 py-4 text-left text-lg font-medium transition-all ${
                      activeSection === item.id
                        ? 'text-accent bg-accent/10 border-r-2 border-accent'
                        : 'text-muted hover:text-foreground hover:bg-accent/5'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-accent/20">
                <EnhancedButton
                  onClick={() => {
                    onCTAClick();
                    onClose();
                  }}
                  variant="premium"
                  className="w-full py-4 text-lg"
                >
                  Quero conhecer o NIVELA®
                </EnhancedButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
