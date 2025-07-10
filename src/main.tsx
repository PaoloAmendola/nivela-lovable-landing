
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { logger } from './lib/logger';

// Otimização crítica de inicialização
const initializeApp = async () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Criar root React uma única vez
  const root = createRoot(rootElement);
  
  // Preload APENAS recursos críticos
  const preloadCritical = () => {
    const criticalAssets = [
      '/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png'
    ];
    
    criticalAssets.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  // Service Worker simples
  const registerSW = async () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        logger.warn('SW registration failed:', error);
      }
    }
  };

  // Preload recursos críticos
  preloadCritical();
  
  // Renderizar app IMEDIATAMENTE
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  // Service Worker após render (não bloqueia)
  setTimeout(registerSW, 2000);
};

// Aguardar DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
