import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAEnhancer = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);

  // Detectar instalação
  useEffect(() => {
  const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebApp = 'standalone' in window.navigator && (window.navigator as any).standalone;
      setIsInstalled(isStandalone || Boolean(isInWebApp));
    };

    checkIfInstalled();

    // Listener para mudanças no display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkIfInstalled);

    return () => mediaQuery.removeEventListener('change', checkIfInstalled);
  }, []);

  // Gerenciar evento de instalação
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Mostrar prompt após 30 segundos se não estiver instalado
      if (!isInstalled) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 30000);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  // Gerenciar status online/offline
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotice(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotice(true);
      
      // Esconder aviso após 5 segundos
      setTimeout(() => {
        setShowOfflineNotice(false);
      }, 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Instalar PWA
  const installPWA = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
    }
  }, [deferredPrompt]);

  // Registrar service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registrado:', registration);
          
          // Verificar atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  if (confirm('Nova versão disponível. Atualizar?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }, []);

  return (
    <>
      {/* Prompt de instalação */}
      {showInstallPrompt && !isInstalled && deferredPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                  Instalar NIVELA®
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Acesse rapidamente e receba notificações das novidades
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={installPWA}
                    className="text-xs"
                  >
                    Instalar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowInstallPrompt(false)}
                    className="text-xs"
                  >
                    Depois
                  </Button>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowInstallPrompt(false)}
                className="p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Indicador de status offline */}
      {showOfflineNotice && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
          <div className="bg-destructive text-destructive-foreground rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">
                Você está offline
              </span>
            </div>
            <p className="text-xs opacity-90 mt-1">
              Algumas funcionalidades podem estar limitadas
            </p>
          </div>
        </div>
      )}

      {/* Indicador de status online (aparece brevemente quando volta online) */}
      {isOnline && showOfflineNotice && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
          <div className="bg-green-600 text-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">
                Conectado novamente
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Status indicator persistente */}
      <div className={cn(
        "fixed bottom-4 left-4 w-3 h-3 rounded-full transition-colors duration-300 z-40",
        isOnline ? "bg-green-500" : "bg-red-500"
      )} />
    </>
  );
};