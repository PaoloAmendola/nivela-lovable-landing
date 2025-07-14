import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
}

export const AccessibilityEnhancer = ({ children }: AccessibilityEnhancerProps) => {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    // Detectar preferências do sistema
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setHighContrast(contrastQuery.matches);
    setReducedMotion(motionQuery.matches);

    // Listeners para mudanças
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    contrastQuery.addEventListener('change', handleContrastChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      contrastQuery.removeEventListener('change', handleContrastChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    // Aplicar classes ao body
    const body = document.body;
    
    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }

    body.style.fontSize = `${fontSize}rem`;

    // Melhorar foco visual
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };

    const handleMousedown = () => {
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [highContrast, reducedMotion, fontSize]);

  useEffect(() => {
    // Adicionar skip links dinâmicos
    const existingSkipLinks = document.querySelector('.skip-links');
    if (!existingSkipLinks) {
      const skipLinks = document.createElement('div');
      skipLinks.className = 'skip-links';
      skipLinks.setAttribute('aria-label', 'Links de navegação rápida');
      
      skipLinks.innerHTML = `
        <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
        <a href="#navigation" class="skip-link">Pular para navegação</a>
        <a href="#footer" class="skip-link">Pular para rodapé</a>
      `;
      
      document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    // Melhorar headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });

    // Melhorar links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (!link.getAttribute('aria-label') && !link.textContent?.trim()) {
        const href = link.getAttribute('href');
        if (href) {
          link.setAttribute('aria-label', `Link para ${href}`);
        }
      }
    });

    // Melhorar imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        img.setAttribute('aria-hidden', 'true');
      }
    });

  }, []);

  return (
    <div 
      className={cn(
        "accessibility-enhancer",
        focusVisible && "focus-visible",
        highContrast && "high-contrast-mode",
        reducedMotion && "reduced-motion-mode"
      )}
    >
      {/* Barra de acessibilidade */}
      <div className="accessibility-toolbar sr-only focus-within:not-sr-only fixed top-0 left-0 right-0 z-50 bg-background border-b p-2 flex gap-2 flex-wrap">
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
          aria-pressed={highContrast}
        >
          {highContrast ? 'Desativar' : 'Ativar'} alto contraste
        </button>
        
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
          aria-pressed={reducedMotion}
        >
          {reducedMotion ? 'Ativar' : 'Reduzir'} animações
        </button>
        
        <button
          onClick={() => setFontSize(Math.min(fontSize + 0.2, 2))}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
          disabled={fontSize >= 2}
        >
          Aumentar texto
        </button>
        
        <button
          onClick={() => setFontSize(Math.max(fontSize - 0.2, 0.8))}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
          disabled={fontSize <= 0.8}
        >
          Diminuir texto
        </button>
      </div>

      {children}
    </div>
  );
};