
import { useEffect } from 'react';
import { logger } from '@/lib/logger';

const SecurityHeaders = () => {
  useEffect(() => {
    // Simplified security headers - removed problematic X-Frame-Options
    
    // Adicionar event listeners para segurança apenas em produção
    const handleContextMenu = (e: MouseEvent) => {
      // Permitir context menu em desenvolvimento
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Desabilitar algumas combinações de teclas em produção
      if (process.env.NODE_ENV === 'production') {
        // F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    const handleBeforeUnload = () => {
      // Limpar dados sensíveis ao sair da página apenas em produção
      if (process.env.NODE_ENV === 'production') {
        try {
          sessionStorage.clear();
        } catch (error) {
          logger.warn('Could not clear session storage:', error);
        }
      }
    };

    // Adicionar listeners apenas em produção para evitar interferir no desenvolvimento
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Skip CSP configuration to avoid X-Frame-Options conflicts

    // Cleanup
    return () => {
      if (process.env.NODE_ENV === 'production') {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };
  }, []);

  return null; // Este componente não renderiza nada
};

export default SecurityHeaders;
