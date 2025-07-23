
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';

// Ensure React is available globally before any imports
(window as any).React = React;
console.log('main.tsx - React available globally:', !!React);
console.log('main.tsx - window.React available:', !!(window as any).React);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(React.createElement(App));

// Register service worker after React is mounted
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail for service worker
    });
  });
}
