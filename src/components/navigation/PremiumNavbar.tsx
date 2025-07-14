import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SimpleButton } from "@/components/ui/SimpleButton";
import { useScroll } from "@/hooks/use-scroll";
import HamburgerMenu from "./HamburgerMenu";

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
              <SimpleButton
                onClick={onCTAClick}
                variant="primary"
                size="sm"
                className="px-6 py-2 shadow-lg"
              >
                Acesso Profissional
              </SimpleButton>
            </div>

            {/* Enhanced Mobile Menu */}
            <HamburgerMenu onCTAClick={onCTAClick} />
          </div>
        </div>
      </motion.nav>

    </>
  );
};

export default PremiumNavbar;