
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EnhancedButton } from "@/components/ui/EnhancedButton";

interface HamburgerMenuProps {
  onCTAClick: () => void;
}

const HamburgerMenu = ({ onCTAClick }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Tecnologia", href: "#technology" },
    { label: "Resultados", href: "#proof" },
    { label: "Exclusividade", href: "#exclusivity" },
    { label: "Parceria", href: "#distributor" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) || 
                   document.querySelector(`[data-section="${href.slice(1)}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="relative z-50 p-3 bg-background/10 backdrop-blur-sm border border-accent/20 rounded-xl hover:bg-background/20 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        aria-label="Menu de navegação"
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-6 flex flex-col justify-center items-center"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 }
            }}
            className="w-6 h-0.5 bg-accent block mb-1.5 origin-center transition-all"
          />
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            className="w-6 h-0.5 bg-accent block mb-1.5 transition-all"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 }
            }}
            className="w-6 h-0.5 bg-accent block origin-center transition-all"
          />
        </motion.div>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-accent/20 z-40 shadow-2xl"
            >
              <div className="flex flex-col h-full p-8">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-xl font-playfair font-bold gradient-text">
                    <span className="font-wilkysta">NIVELA</span><sup className="text-sm">®</sup>
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-accent" />
                  </button>
                </div>

                <nav className="flex-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left py-4 text-lg font-medium text-muted hover:text-foreground transition-colors border-b border-accent/10 last:border-b-0"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="pt-8 border-t border-accent/20">
                  <EnhancedButton
                    onClick={() => {
                      onCTAClick();
                      setIsOpen(false);
                    }}
                    variant="premium"
                    className="w-full py-4 text-lg"
                  >
                    Acesso Exclusivo
                  </EnhancedButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
