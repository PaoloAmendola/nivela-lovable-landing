
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from './EnhancedButton';
import { usePerformanceAudit } from '@/hooks/use-performance-audit';
import { useAccessibilityAudit } from '@/hooks/use-accessibility-audit';
import { usePWAAudit } from '@/hooks/use-pwa-audit';
import { Activity, Shield, Smartphone, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-react';

const AuditDashboard = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'accessibility' | 'pwa'>('performance');
  
  const { audit: perfAudit, isAuditing: perfAuditing, runAudit: runPerfAudit } = usePerformanceAudit();
  const { audit: a11yAudit, isAuditing: a11yAuditing, runAudit: runA11yAudit } = useAccessibilityAudit();
  const { audit: pwaAudit, isAuditing: pwaAuditing, runAudit: runPWAAudit } = usePWAAudit();

  const runAllAudits = async () => {
    await Promise.all([
      runPerfAudit(),
      runA11yAudit(),
      runPWAAudit()
    ]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-96 glass-strong rounded-xl p-6 border border-accent/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold gradient-text">Audit Dashboard</h3>
          <EnhancedButton
            onClick={runAllAudits}
            size="sm"
            variant="premium"
            loading={perfAuditing || a11yAuditing || pwaAuditing}
          >
            Executar Audits
          </EnhancedButton>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
          {[
            { key: 'performance', label: 'Performance', icon: Activity },
            { key: 'accessibility', label: 'A11y', icon: Shield },
            { key: 'pwa', label: 'PWA', icon: Smartphone }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                activeTab === tab.key
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'performance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {perfAudit ? (
                <>
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${getScoreGradient(perfAudit.score)} bg-clip-text text-transparent`}>
                      {perfAudit.score}
                    </div>
                    <p className="text-sm text-muted-foreground">Performance Score</p>
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(perfAudit).filter(([key]) => key !== 'score' && key !== 'suggestions').map(([metric, data]) => (
                      <div key={metric} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{metric}</span>
                        <span className={`font-medium ${getScoreColor(data.value)}`}>
                          {metric === 'cls' ? data.value.toFixed(3) : `${Math.round(data.value)}ms`}
                        </span>
                      </div>
                    ))}
                  </div>

                  {perfAudit.suggestions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Sugestões:</p>
                      {perfAudit.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-accent" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center">Execute o audit para ver os resultados</p>
              )}
            </motion.div>
          )}

          {activeTab === 'accessibility' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {a11yAudit ? (
                <>
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${getScoreGradient(a11yAudit.score)} bg-clip-text text-transparent`}>
                      {a11yAudit.score}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {a11yAudit.passedTests}/{a11yAudit.totalTests} testes aprovados
                    </p>
                  </div>

                  {a11yAudit.issues.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {a11yAudit.issues.map((issue, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs p-2 rounded bg-muted/20">
                          {issue.type === 'error' && <AlertCircle className="w-3 h-3 mt-0.5 text-red-500" />}
                          {issue.type === 'warning' && <AlertCircle className="w-3 h-3 mt-0.5 text-yellow-500" />}
                          {issue.type === 'info' && <Info className="w-3 h-3 mt-0.5 text-blue-500" />}
                          <div>
                            <p className="font-medium">{issue.element}</p>
                            <p className="text-muted-foreground">{issue.description}</p>
                            <span className="text-xs bg-accent/20 px-1 rounded">WCAG {issue.wcagLevel}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center">Execute o audit para ver os resultados</p>
              )}
            </motion.div>
          )}

          {activeTab === 'pwa' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {pwaAudit ? (
                <>
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${getScoreGradient(pwaAudit.score)} bg-clip-text text-transparent`}>
                      {pwaAudit.score}
                    </div>
                    <p className="text-sm text-muted-foreground">PWA Score</p>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(pwaAudit.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                        {enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>

                  {pwaAudit.suggestions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Sugestões:</p>
                      {pwaAudit.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-accent" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center">Execute o audit para ver os resultados</p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuditDashboard;
