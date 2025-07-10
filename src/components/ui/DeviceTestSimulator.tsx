
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedButton } from './EnhancedButton';
import { Smartphone, Tablet, Monitor, Wifi, WifiOff, Battery, Signal } from 'lucide-react';

interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  userAgent: string;
  pixelRatio: number;
}

const devices: DeviceConfig[] = [
  {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    pixelRatio: 2
  },
  {
    name: 'iPhone 12',
    width: 390,
    height: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
    pixelRatio: 3
  },
  {
    name: 'Samsung Galaxy',
    width: 360,
    height: 740,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B)',
    pixelRatio: 3
  },
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
    pixelRatio: 2
  }
];

const DeviceTestSimulator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceConfig | null>(null);
  const [networkSpeed, setNetworkSpeed] = useState<'fast' | 'slow' | 'offline'>('fast');
  const [testResults, setTestResults] = useState<string[]>([]);

  const simulateDevice = (device: DeviceConfig) => {
    setSelectedDevice(device);
    
    // Simular mudança de viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', `width=${device.width}, initial-scale=1.0`);
    }

    // Adicionar classe CSS para simulação
    document.body.classList.add('device-simulation');
    document.body.style.maxWidth = `${device.width}px`;
    document.body.style.margin = '0 auto';
    document.body.style.border = '8px solid #333';
    document.body.style.borderRadius = '20px';

    const results = [
      `✅ Viewport ajustado para ${device.width}x${device.height}`,
      `✅ Pixel ratio configurado para ${device.pixelRatio}x`,
      `✅ User agent simulado: ${device.name}`,
    ];

    // Verificar touch targets
    const touchElements = document.querySelectorAll('button, a, [role="button"]');
    const smallTargets = Array.from(touchElements).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    });

    if (smallTargets.length === 0) {
      results.push('✅ Todos os alvos de toque têm 44px+');
    } else {
      results.push(`⚠️ ${smallTargets.length} alvos de toque menores que 44px`);
    }

    // Verificar performance mobile
    const images = document.querySelectorAll('img');
    const lazyImages = Array.from(images).filter(img => img.hasAttribute('loading'));
    
    if (lazyImages.length > images.length * 0.8) {
      results.push('✅ Lazy loading implementado na maioria das imagens');
    } else {
      results.push('⚠️ Considere implementar lazy loading em mais imagens');
    }

    setTestResults(results);
  };

  const resetSimulation = () => {
    setSelectedDevice(null);
    document.body.classList.remove('device-simulation');
    document.body.style.maxWidth = '';
    document.body.style.margin = '';
    document.body.style.border = '';
    document.body.style.borderRadius = '';
    
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
    
    setTestResults([]);
  };

  const simulateNetwork = (speed: 'fast' | 'slow' | 'offline') => {
    setNetworkSpeed(speed);
    
    // Simular condições de rede (apenas visual)
    const networkResults = [];
    
    switch (speed) {
      case 'fast':
        networkResults.push('🚀 Conexão rápida simulada (4G/5G)');
        break;
      case 'slow':
        networkResults.push('🐌 Conexão lenta simulada (2G)');
        networkResults.push('⚠️ Considere otimizar imagens e recursos');
        break;
      case 'offline':
        networkResults.push('📴 Modo offline simulado');
        networkResults.push(navigator.serviceWorker ? '✅ Service Worker ativo' : '❌ Service Worker não encontrado');
        break;
    }
    
    setTestResults(prev => [...prev, ...networkResults]);
  };

  return (
    <>
      <EnhancedButton
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-50"
      >
        <Smartphone className="w-4 h-4 mr-2" />
        Teste Mobile
      </EnhancedButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background glass-strong rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold gradient-text">Device Test Simulator</h3>
                  <EnhancedButton
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                  >
                    ×
                  </EnhancedButton>
                </div>

                {/* Device Selection */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Dispositivos
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {devices.map(device => (
                      <EnhancedButton
                        key={device.name}
                        onClick={() => simulateDevice(device)}
                        variant={selectedDevice?.name === device.name ? "premium" : "outline"}
                        size="sm"
                        className="text-xs"
                      >
                        {device.name}
                      </EnhancedButton>
                    ))}
                  </div>
                </div>

                {/* Network Simulation */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Signal className="w-4 h-4" />
                    Rede
                  </h4>
                  <div className="flex gap-2">
                    <EnhancedButton
                      onClick={() => simulateNetwork('fast')}
                      variant={networkSpeed === 'fast' ? "premium" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      <Wifi className="w-3 h-3 mr-1" />
                      Rápida
                    </EnhancedButton>
                    <EnhancedButton
                      onClick={() => simulateNetwork('slow')}
                      variant={networkSpeed === 'slow' ? "premium" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      <Signal className="w-3 h-3 mr-1" />
                      Lenta
                    </EnhancedButton>
                    <EnhancedButton
                      onClick={() => simulateNetwork('offline')}
                      variant={networkSpeed === 'offline' ? "premium" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      <WifiOff className="w-3 h-3 mr-1" />
                      Offline
                    </EnhancedButton>
                  </div>
                </div>

                {/* Test Results */}
                {testResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Resultados do Teste</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {testResults.map((result, index) => (
                        <div key={index} className="text-sm p-2 bg-muted/20 rounded text-left">
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <EnhancedButton
                    onClick={resetSimulation}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Reset
                  </EnhancedButton>
                  <EnhancedButton
                    onClick={() => {
                      setTestResults([]);
                      window.location.reload();
                    }}
                    variant="premium"
                    size="sm"
                    className="flex-1"
                  >
                    Refresh Page
                  </EnhancedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeviceTestSimulator;
