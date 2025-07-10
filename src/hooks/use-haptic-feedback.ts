
import { useCallback } from 'react';
import { logger } from '@/lib/logger';

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

interface HapticFeedbackOptions {
  pattern?: HapticPattern;
  enabled?: boolean;
}

export const useHapticFeedback = (options: HapticFeedbackOptions = {}) => {
  const { pattern = 'light', enabled = true } = options;

  const triggerHaptic = useCallback((customPattern?: HapticPattern) => {
    if (!enabled || typeof navigator === 'undefined' || !('vibrate' in navigator)) {
      return;
    }

    const patternToUse = customPattern || pattern;
    
    // Vibration patterns in milliseconds
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      warning: [20, 100, 20],
      error: [50, 100, 50, 100, 50]
    };

    try {
      navigator.vibrate(patterns[patternToUse]);
    } catch (error) {
      logger.warn('Haptic feedback not supported:', error);
    }
  }, [pattern, enabled]);

  const triggerLightHaptic = useCallback(() => triggerHaptic('light'), [triggerHaptic]);
  const triggerMediumHaptic = useCallback(() => triggerHaptic('medium'), [triggerHaptic]);
  const triggerHeavyHaptic = useCallback(() => triggerHaptic('heavy'), [triggerHaptic]);
  const triggerSuccessHaptic = useCallback(() => triggerHaptic('success'), [triggerHaptic]);
  const triggerWarningHaptic = useCallback(() => triggerHaptic('warning'), [triggerHaptic]);
  const triggerErrorHaptic = useCallback(() => triggerHaptic('error'), [triggerHaptic]);

  return {
    triggerHaptic,
    triggerLightHaptic,
    triggerMediumHaptic,
    triggerHeavyHaptic,
    triggerSuccessHaptic,
    triggerWarningHaptic,
    triggerErrorHaptic
  };
};
