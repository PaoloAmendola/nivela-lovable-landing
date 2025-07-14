
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SimpleButton } from "@/components/ui/SimpleButton";
import { useScroll } from "@/hooks/use-scroll";
import NavLogo from "./NavLogo";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  onCTAClick: () => void;
}

const Navbar = ({ onCTAClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY, isScrolled } = useScroll(50);

  const navItems = [
    { id: "hero", label: "Início", href: "#hero" },
    { id: "proof", label: "Resultados", href: "#proof" },
    { id: "technology", label: "Tecnologia", href: "#technology" },
    { id: "technology-detail", label: "ASTRO QUAT V3", href: "#technology-detail" },
    { id: "ecosystem", label: "Ecossistema", href: "#ecosystem" },
    { id: "distributor", label: "Seja Distribuidor", href: "#distributor" }
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.querySelector(`[data-section="${item.id}"]`) || 
                 document.querySelector(`#${item.id}`) ||
                 document.querySelector(`section:nth-of-type(${navItems.findIndex(nav => nav.id === item.id) + 1})`)
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
                   document.querySelector(`#${sectionId}`) ||
                   document.querySelector(`section:nth-of-type(${navItems.findIndex(nav => nav.id === sectionId) + 1})`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-accent/20 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <NavLogo onLogoClick={() => scrollToSection('hero')} />

            {/* Desktop Navigation */}
            <DesktopNavigation
              navItems={navItems}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <SimpleButton
                onClick={onCTAClick}
                variant="primary"
                size="sm"
                className="px-6 py-2"
              >
                Quero conhecer
              </SimpleButton>
            </div>

            {/* Mobile Menu Button */}
            <MobileMenuButton
              isMenuOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onClose={() => setIsMenuOpen(false)}
        onCTAClick={onCTAClick}
      />
    </>
  );
};

export default Navbar;
