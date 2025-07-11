import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { useScroll } from "@/hooks/use-scroll";
import { Menu, X } from "lucide-react";

interface PremiumNavbarProps {
  onCTAClick: () => void;
}

const PremiumNavbar = ({ onCTAClick }: PremiumNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY, isScrolled } = useScroll(50);

  const navItems = [
    { id: "hero", label: "Início", href: "#hero" },
    { id: "manifesto-text", label: "Manifesto", href: "#manifesto-text" },
    { id: "technology", label: "Tecnologia", href: "#technology" },
    { id: "ecosystem", label: "Ecossistema", href: "#ecosystem" },
    { id: "distributor", label: "Parceria", href: "#distributor" }
  ];

  // Enhanced scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.querySelector(`[data-section="${item.id}"]`) || 
                 document.querySelector(`#${item.id}`)
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`) || 
                   document.querySelector(`#${sectionId}`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-elegant' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Premium Logo */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img 
                src="/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png" 
                alt="Bem Beauty Professional Logo"
                className="h-10 lg:h-12 w-auto object-contain"
                loading="eager"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium font-montserrat transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'text-readable hover:text-primary'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <EnhancedButton
                onClick={onCTAClick}
                variant="premium"
                size="sm"
                className="px-6 py-2 shadow-elegant hover:shadow-glow"
              >
                Acesso Profissional
              </EnhancedButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 bg-background/10 backdrop-blur-sm border border-primary/20 rounded-xl hover:bg-background/20 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu de navegação"
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
                    <X className="w-6 h-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-background/98 backdrop-blur-xl border-l border-primary/20 z-40 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                  <span className="text-xl font-playfair font-bold gradient-text">
                    NIVELA<sup className="text-sm">®</sup>
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-primary" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full px-6 py-4 text-left text-lg font-medium font-montserrat transition-all rounded-xl ${
                        activeSection === item.id
                          ? 'text-primary bg-primary/10 border-r-2 border-primary'
                          : 'text-readable hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="pt-8 border-t border-primary/20">
                  <EnhancedButton
                    onClick={() => {
                      onCTAClick();
                      setIsMenuOpen(false);
                    }}
                    variant="premium"
                    className="w-full py-4 text-lg shadow-elegant"
                  >
                    Acesso Profissional
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

export default PremiumNavbar;