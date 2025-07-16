
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

// Ensure React is properly loaded before initialization
function initializeApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Create React root with error handling
  try {
    const root = createRoot(rootElement);
    
    root.render(
      React.createElement(StrictMode, null,
        React.createElement(App)
      )
    );
  } catch (error) {
    console.error('Failed to initialize React app:', error);
    // Fallback: try without StrictMode
    setTimeout(() => {
      const root = createRoot(rootElement);
      root.render(React.createElement(App));
    }, 100);
  }
}

// Wait for DOM and external scripts to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready, but wait a bit for GTM to finish
  setTimeout(initializeApp, 50);
}
