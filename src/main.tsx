
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';
import { initializeOptimizations, removeProductionLogs } from './utils/deploy-optimization';

// Remove production logs immediately
removeProductionLogs();

// Initialize performance optimizations
initializeOptimizations();


// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        console.log('Service worker registered');
      })
      .catch(() => {
        console.log('Service worker registration failed');
      });
  });
}

// Simple React initialization
const initializeApp = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('App rendered successfully');
    
  } catch (error) {
    console.error('React initialization failed:', error);
    
    // Show error message
    rootElement.innerHTML = `
      <div style="
        padding: 40px 20px; 
        text-align: center; 
        color: #333; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        max-width: 500px;
        margin: 50px auto;
        border-radius: 8px;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
      ">
        <h3 style="margin-bottom: 16px; color: #495057;">Erro de Carregamento</h3>
        <p style="margin-bottom: 20px; line-height: 1.5;">
          Erro ao carregar a aplicação. Tente recarregar a página.
        </p>
        <button 
          onclick="location.reload()" 
          style="
            background: #007bff; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 4px; 
            cursor: pointer;
            font-size: 14px;
          "
        >
          Recarregar Página
        </button>
      </div>
    `;
  }
};

// Initialize when DOM is ready - simplified approach
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded, start immediately
  initializeApp();
}
