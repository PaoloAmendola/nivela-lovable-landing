import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
// Haptic feedback removed for compatibility
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { SimpleButton } from "@/components/ui/SimpleButton";

interface HamburgerMenuProps {
  onCTAClick: () => void;
}

const HamburgerMenu = ({ onCTAClick }: HamburgerMenuProps) => {
  // Haptic feedback functionality removed for compatibility
  const { scrollToElement } = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId, { offset: 80, duration: 1000, easing: 'ease-in-out' });
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: "Tecnologia", target: "technology" },
    { label: "Resultados", target: "proof" },
    { label: "Exclusividade", target: "exclusivity" },
    { label: "Parceria", target: "distributor" }
  ];

  return (
    <>
      {/* Enhanced Hamburger Button */}
      <motion.button
        className="relative z-50 p-3 bg-background/15 backdrop-blur-md border border-brand-primary/30 rounded-xl hover:bg-background/25 transition-all duration-300 shadow-lg hover:shadow-xl lg:hidden"
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Menu de navegação"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-6 flex flex-col justify-center items-center"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0, opacity: 1 },
              open: { rotate: 45, y: 6, opacity: 1 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-6 h-0.5 bg-brand-primary block mb-1.5 origin-center"
          />
          <motion.span
            variants={{
              closed: { opacity: 1, scale: 1 },
              open: { opacity: 0, scale: 0 }
            }}
            transition={{ duration: 0.2 }}
            className="w-6 h-0.5 bg-brand-primary block mb-1.5"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0, opacity: 1 },
              open: { rotate: -45, y: -6, opacity: 1 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-6 h-0.5 bg-brand-primary block origin-center"
          />
        </motion.div>
      </motion.button>

      {/* Enhanced Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with enhanced blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/98 backdrop-blur-xl z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Side Menu with improved animations */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.4 
              }}
              className="fixed top-0 right-0 h-full w-80 bg-background/98 backdrop-blur-2xl border-l border-brand-primary/30 z-40 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-8">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-12">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-playfair font-bold gradient-text"
                  >
                    <span className="font-wilkysta">NIVELA</span><sup className="text-sm">®</sup>
                  </motion.span>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-brand-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-brand-primary" />
                  </motion.button>
                </div>

                {/* Enhanced Navigation */}
                <nav className="flex-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      onClick={() => handleNavClick(item.target)}
                      className="w-full text-left py-4 px-4 text-lg font-medium text-contrast hover:text-brand-secondary transition-all duration-300 border-b border-brand-primary/20 last:border-b-0 rounded-lg hover:bg-brand-primary/5"
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Enhanced CTA */}
                <motion.div 
                  className="pt-8 border-t border-brand-primary/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <SimpleButton
                    onClick={() => {
                      onCTAClick();
                      setIsOpen(false);
                    }}
                    variant="primary"
                    className="w-full py-4 text-lg shadow-lg"
                  >
                    Acesso Exclusivo
                  </SimpleButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;