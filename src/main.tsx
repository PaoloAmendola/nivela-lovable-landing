
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

// Declare window.dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Function to load GTM asynchronously after React is ready
const loadGTM = () => {
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // GTM script injection
  const gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KZW3RTWD';
  
  // GTM initialization
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  
  document.head.appendChild(gtmScript);
  
  // Add noscript fallback
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-KZW3RTWD';
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
};

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

// Simple and robust React initialization
const initializeApp = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  // Ensure React is available globally
  if (!React || typeof React.createElement !== 'function') {
    console.error('React is not properly loaded');
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
    
    // Load GTM after React is successfully initialized
    setTimeout(loadGTM, 50);
    
  } catch (error) {
    console.error('Failed to render with StrictMode, trying fallback...', error);
    
    // Fallback without StrictMode
    try {
      const root = createRoot(rootElement);
      root.render(<App />);
      console.log('App rendered with fallback');
      
      // Load GTM after fallback render
      setTimeout(loadGTM, 50);
      
    } catch (fallbackError) {
      console.error('Complete render failure:', fallbackError);
      
      // Final fallback: show error message
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
            Ocorreu um erro ao carregar a aplicação. Isso pode ser causado por:
          </p>
          <ul style="text-align: left; margin-bottom: 20px;">
            <li>Conexão lenta com a internet</li>
            <li>Scripts externos interferindo com o carregamento</li>
            <li>Cache do navegador desatualizado</li>
          </ul>
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
  }
};

// Initialize when DOM is ready - simplified approach
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded, start immediately
  initializeApp();
}
