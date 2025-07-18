
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

  // Verify React is fully available
  if (!React || !React.useState || !React.createElement) {
    console.warn('React not fully loaded, retrying...');
    setTimeout(initializeApp, 100);
    return;
  }

  // Create React root with enhanced error handling
  try {
    const root = createRoot(rootElement);
    
    // Use JSX instead of createElement for better compatibility
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize React app:', error);
    // Fallback: try without StrictMode after a delay
    setTimeout(() => {
      try {
        const root = createRoot(rootElement);
        root.render(<App />);
      } catch (fallbackError) {
        console.error('Fallback initialization also failed:', fallbackError);
        // Last resort: show error message
        rootElement.innerHTML = '<div style="padding: 20px; text-align: center;">Loading error. Please refresh the page.</div>';
      }
    }, 200);
  }
}

// Enhanced initialization with multiple safety checks
function safeInitialize() {
  // Wait longer for external scripts to complete
  let attempts = 0;
  const maxAttempts = 10;
  
  function tryInit() {
    attempts++;
    
    // Check if React and ReactDOM are available
    if (React && createRoot && attempts < maxAttempts) {
      initializeApp();
    } else if (attempts >= maxAttempts) {
      console.error('Max initialization attempts reached');
      // Force initialization anyway
      initializeApp();
    } else {
      // Retry with longer delay
      setTimeout(tryInit, 100);
    }
  }
  
  tryInit();
}

// Wait for DOM and external scripts to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeInitialize);
} else {
  // DOM is already ready, but wait for scripts to finish
  setTimeout(safeInitialize, 150);
}
