
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';

// Basic initialization without optimization functions that might interfere
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root and render immediately - no async operations
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker after React is mounted
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail for service worker
    });
  });
}
