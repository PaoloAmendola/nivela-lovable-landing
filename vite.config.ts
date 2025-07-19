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
    // Tree shaking and optimization
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-accordion', '@radix-ui/react-toast'],
          'utils': ['framer-motion', 'lucide-react'],
          'sections': [
            './src/components/sections/TechnologySection',
            './src/components/sections/ExclusivitySection',
            './src/components/sections/TrustSection'
          ],
          'forms': [
            './src/components/forms/ContactForm',
            './src/components/forms/PremiumContactModal'
          ]
        }
      }
    },
    // Generate source maps for production debugging
    sourcemap: true,
    // Use esbuild for faster builds instead of terser
    minify: 'esbuild'
  }
}));
