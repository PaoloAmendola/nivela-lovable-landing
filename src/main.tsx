
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
        // Service worker registered successfully
      })
      .catch(() => {
        // Service worker registration failed
      });
  });
}

// GTM-safe initialization with proper timing controls
function initializeApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Ensure React is fully available before rendering
  if (!React || typeof React.createElement !== 'function') {
    // Fallback: try again after a short delay
    setTimeout(initializeApp, 100);
    return;
  }

  // Create React root and render using createElement for more reliable rendering
  try {
    const root = createRoot(rootElement);
    root.render(
      React.createElement(StrictMode, null,
        React.createElement(App, null)
      )
    );
  } catch (error) {
    // Fallback initialization without StrictMode if needed
    try {
      const root = createRoot(rootElement);
      root.render(React.createElement(App, null));
    } catch (fallbackError) {
      // Final fallback: show error message
      rootElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #333;">Erro ao carregar. Atualize a página.</div>';
    }
  }
}

// Wait for external scripts (GTM) to complete loading before initializing React
function waitForScriptsAndInitialize() {
  // Add 50ms delay for GTM script completion as documented in troubleshooting
  setTimeout(() => {
    initializeApp();
  }, 50);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForScriptsAndInitialize);
} else {
  waitForScriptsAndInitialize();
}
