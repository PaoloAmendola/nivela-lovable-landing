/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag: (command: string, action: string, parameters?: any) => void;
  }
}
