
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { EnhancedButton } from './EnhancedButton';
import { usePWA } from '@/hooks/use-pwa';
import { useIsMobile } from '@/hooks/use-mobile';

const PWAInstallBanner = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const isMobile = useIsMobile();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner after 5 seconds if installable and not dismissed
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled && !isDismissed) {
        setShowBanner(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, isDismissed]);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  if (!showBanner || isInstalled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
      >
        <div className="bg-background/95 backdrop-blur-sm border border-accent/30 rounded-xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Instalar NIVELA®
              </h3>
              <p className="text-sm text-muted mb-3">
                {isMobile 
                  ? 'Adicione à tela inicial para acesso rápido' 
                  : 'Instale para uma experiência nativa'
                }
              </p>
              
              <div className="flex gap-2">
                <EnhancedButton
                  onClick={handleInstall}
                  size="sm"
                  variant="premium"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Instalar
                </EnhancedButton>
                
                <button
                  onClick={handleDismiss}
                  className="p-2 text-muted hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
