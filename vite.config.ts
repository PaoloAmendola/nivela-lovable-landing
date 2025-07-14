import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.warn'] : [],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
          motion: ['framer-motion'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // Asset optimizations
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 4KB
    cssCodeSplit: true,
    sourcemap: mode !== 'production',
    reportCompressedSize: false, // Faster builds
    chunkSizeWarningLimit: 1000, // 1MB warning limit
  },
  // CSS optimization
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
  // Dependencies optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      'lucide-react'
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
}));
