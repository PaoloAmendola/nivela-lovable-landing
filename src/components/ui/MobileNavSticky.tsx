import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Phone, MessageCircle, Star } from 'lucide-react';
import MobileCTAButton from './MobileCTAButton';

interface MobileNavStickyProps {
  onCTAClick: () => void;
}

const MobileNavSticky = ({ onCTAClick }: MobileNavStickyProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar após 200px de scroll
      setIsVisible(window.scrollY > 200);
      
      // Detectar seção ativa
      const sections = ['hero', 'manifesto', 'technology', 'proof', 'exclusivity'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'hero', label: 'Início', icon: Star },
    { id: 'manifesto', label: 'Manifesto', icon: MessageCircle },
    { id: 'technology', label: 'Tecnologia', icon: Star },
    { id: 'proof', label: 'Resultados', icon: Star }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          {/* Barra de navegação sticky */}
          <div className="bg-background/95 backdrop-blur-lg border-t border-border shadow-lg">
            <div className="container mx-auto px-4">
              
              {/* Indicador de progresso */}
              <div className="flex items-center gap-1 py-2">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={cn(
                      "flex-1 h-1 rounded-full transition-colors duration-300",
                      activeSection === section.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
              
              {/* Navegação e CTA */}
              <div className="flex items-center gap-3 py-3">
                
                {/* Botão voltar ao topo */}
                <button
                  onClick={scrollToTop}
                  className="p-3 bg-muted/50 rounded-full touch-target"
                  aria-label="Voltar ao topo"
                >
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                </button>
                
                {/* CTA Principal */}
                <div className="flex-1">
                  <MobileCTAButton
                    onClick={onCTAClick}
                    variant="primary"
                    size="default"
                    fullWidth
                    className="shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    Solicitar Orçamento
                  </MobileCTAButton>
                </div>
                
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavSticky;