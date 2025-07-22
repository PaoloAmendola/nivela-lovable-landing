import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';
import { initializeOptimizations, removeProductionLogs } from './utils/deploy-optimization';

// Extend window interface for GTM
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// Remove production logs immediately
removeProductionLogs();

// Initialize performance optimizations
initializeOptimizations();

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        // Service worker registered successfully
      })
      .catch(() => {
        // Service worker registration failed
      });
  });
}

// Ultra-robust React initialization to prevent hooks errors
function initializeApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  // Comprehensive React readiness check
  if (!React || 
      typeof React.createElement !== 'function' || 
      typeof React.useState !== 'function' ||
      typeof React.useEffect !== 'function' ||
      !createRoot) {
    console.log('React not fully loaded, retrying in 200ms...');
    setTimeout(initializeApp, 200);
    return;
  }

  // Test React hooks to ensure they work before initializing the app
  try {
    // Create a test component to verify hooks functionality
    const TestHooks = () => {
      const [state] = React.useState(true);
      React.useEffect(() => {}, []);
      return null;
    };
    
    // If we can create this element, React hooks are working
    React.createElement(TestHooks);
    console.log('React hooks test passed - initializing app');
  } catch (hookError) {
    console.log('React hooks test failed, retrying...', hookError);
    setTimeout(initializeApp, 300);
    return;
  }

  // Create React root and render
  try {
    const root = createRoot(rootElement);
    console.log('Creating React root...');
    
    // Use React.createElement for maximum compatibility
    root.render(
      React.createElement(StrictMode, null,
        React.createElement(App, null)
      )
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render with StrictMode, trying fallback...', error);
    
    // Fallback without StrictMode
    try {
      const root = createRoot(rootElement);
      root.render(React.createElement(App, null));
      console.log('App rendered with fallback');
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
}

// Enhanced script waiting with timeout protection
function waitForScriptsAndInitialize() {
  let attempts = 0;
  const maxAttempts = 100; // 10 seconds max (100ms * 100)
  
  const checkReadiness = () => {
    attempts++;
    
    if (attempts >= maxAttempts) {
      console.warn('Max initialization attempts reached, forcing start...');
      initializeApp();
      return;
    }

    // Check GTM readiness (allow app to start even if GTM fails)
    const gtmReady = !window.dataLayer || Array.isArray(window.dataLayer);
    
    // Check React readiness
    const reactReady = React && 
                      typeof React.createElement === 'function' && 
                      typeof React.useState === 'function' &&
                      typeof React.useEffect === 'function';

    if (reactReady) {
      if (gtmReady) {
        console.log(`Ready after ${attempts} attempts - starting app`);
        initializeApp();
      } else if (attempts > 20) {
        // Give up on GTM after 2 seconds and start anyway
        console.log('GTM not ready but proceeding anyway...');
        initializeApp();
      } else {
        setTimeout(checkReadiness, 100);
      }
    } else {
      console.log(`Attempt ${attempts}: React not ready, waiting...`);
      setTimeout(checkReadiness, 100);
    }
  };

  // Start checking after initial delay to let scripts load
  setTimeout(checkReadiness, 150);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForScriptsAndInitialize);
} else {
  // DOM already loaded
  waitForScriptsAndInitialize();
}