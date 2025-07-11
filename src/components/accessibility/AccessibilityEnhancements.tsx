import { useEffect } from 'react';

export const useAccessibilityEnhancements = () => {
  useEffect(() => {
    // Enhanced focus indicators for mature audience
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 3px solid hsl(29 72% 40%) !important;
        outline-offset: 2px !important;
        border-radius: 4px !important;
      }
      
      /* Skip to content link */
      .skip-to-content {
        position: absolute;
        top: -100px;
        left: 20px;
        background: hsl(29 72% 40%);
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        z-index: 1000;
        transition: top 0.3s ease;
      }
      
      .skip-to-content:focus {
        top: 20px;
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .gradient-text {
          color: hsl(29 72% 40%) !important;
          background: none !important;
          -webkit-text-fill-color: initial !important;
        }
        
        button, .btn-premium {
          border: 2px solid currentColor !important;
        }
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        .interactive-premium:hover {
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      document.head.removeChild(style);
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);
};

const AccessibilityEnhancements = () => {
  useAccessibilityEnhancements();
  return null;
};

export default AccessibilityEnhancements;