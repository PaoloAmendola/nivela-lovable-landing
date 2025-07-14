
import { useEffect } from 'react';
import { logger } from '@/lib/logger';

const SecurityHeaders = () => {
  useEffect(() => {
    // Aplicar políticas de segurança via JavaScript quando não há acesso ao servidor
    
    // Remover a verificação de iframe que causava o erro SecurityError
    // A verificação de iframe embedding deve ser feita no servidor via X-Frame-Options
    
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

    // Configurar Content Security Policy via meta tag se não existir
    // Mas apenas em produção para não interferir no ambiente de desenvolvimento
    if (process.env.NODE_ENV === 'production') {
      const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (!existingCSP) {
        const cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        cspMeta.content = [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https: blob:",
          "media-src 'self' data: blob:",
          "connect-src 'self' https:",
          "frame-src 'none'",
          "object-src 'none'",
          "base-uri 'self'"
        ].join('; ');
        document.head.appendChild(cspMeta);
      }
    }

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
