
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

// Test component to verify React hooks are working
function TestComponent() {
  try {
    const [test] = React.useState(true);
    return test;
  } catch (error) {
    return false;
  }
}

// Ensure React is properly loaded before initialization
function initializeApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Verify React and ReactDOM are fully available
  if (!React || !React.useState || !React.createElement || !createRoot) {
    console.warn('React not fully loaded, retrying...');
    setTimeout(initializeApp, 100);
    return;
  }

  // Test if React hooks are actually working
  try {
    const testResult = TestComponent();
    if (testResult === false) {
      console.warn('React hooks not working properly, retrying...');
      setTimeout(initializeApp, 100);
      return;
    }
  } catch (error) {
    console.warn('React hooks test failed, retrying...', error);
    setTimeout(initializeApp, 100);
    return;
  }

  // Create React root with enhanced error handling
  try {
    const root = createRoot(rootElement);
    
    // Use JSX for better compatibility
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
    }, 300);
  }
}

// Enhanced initialization with multiple safety checks
function safeInitialize() {
  // Wait longer for external scripts to complete
  let attempts = 0;
  const maxAttempts = 15;
  
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
      // Retry with exponential backoff
      const delay = Math.min(100 * attempts, 500);
      setTimeout(tryInit, delay);
    }
  }
  
  tryInit();
}

// Wait for DOM and external scripts to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Add extra delay for external scripts
    setTimeout(safeInitialize, 200);
  });
} else {
  // DOM is already ready, but wait longer for scripts to finish
  setTimeout(safeInitialize, 300);
}
