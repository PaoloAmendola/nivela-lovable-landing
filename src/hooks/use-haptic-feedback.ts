import { useCallback } from 'react';

interface HapticFeedbackOptions {
  type?: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';
  pattern?: number[];
  intensity?: 'weak' | 'medium' | 'strong';
}

export const useHapticFeedback = () => {
  const isHapticSupported = useCallback(() => {
    // Check for native haptic feedback support
    return !!(
      'vibrate' in navigator || 
      ('hapticFeedback' in window) ||
      ('DeviceMotionEvent' in window && 'requestPermission' in (window as any).DeviceMotionEvent)
    );
  }, []);

  const triggerHaptic = useCallback((options: HapticFeedbackOptions = {}) => {
    const { type = 'light', pattern, intensity = 'medium' } = options;

    // Try native iOS haptic feedback first
    if ('hapticFeedback' in window) {
      try {
        const hapticType = {
          'light': 'impactLight',
          'medium': 'impactMedium', 
          'heavy': 'impactHeavy',
          'selection': 'selectionChanged',
          'success': 'notificationSuccess',
          'warning': 'notificationWarning',
          'error': 'notificationError'
        }[type];

        (window as any).hapticFeedback?.[hapticType]?.();
        return;
      } catch (error) {
        // Native haptic feedback not available
      }
    }

    // Fallback to vibration API
    if ('vibrate' in navigator) {
      try {
        let vibrationPattern: number | number[];

        if (pattern) {
          vibrationPattern = pattern;
        } else {
          // Define vibration patterns based on type and intensity
          const patterns = {
            light: { weak: [10], medium: [15], strong: [20] },
            medium: { weak: [25], medium: [40], strong: [60] },
            heavy: { weak: [50], medium: [80], strong: [120] },
            selection: { weak: [5], medium: [8], strong: [12] },
            success: { weak: [10, 50, 10], medium: [15, 70, 15], strong: [25, 100, 25] },
            warning: { weak: [30, 30, 30], medium: [50, 50, 50], strong: [80, 80, 80] },
            error: { weak: [100], medium: [150], strong: [200] }
          };

          vibrationPattern = patterns[type][intensity];
        }

        navigator.vibrate(vibrationPattern);
      } catch (error) {
        // Vibration API not available
      }
    }
  }, []);

  const hapticClick = useCallback(() => {
    triggerHaptic({ type: 'light', intensity: 'weak' });
  }, [triggerHaptic]);

  const hapticSelect = useCallback(() => {
    triggerHaptic({ type: 'selection', intensity: 'medium' });
  }, [triggerHaptic]);

  const hapticSuccess = useCallback(() => {
    triggerHaptic({ type: 'success', intensity: 'medium' });
  }, [triggerHaptic]);

  const hapticError = useCallback(() => {
    triggerHaptic({ type: 'error', intensity: 'strong' });
  }, [triggerHaptic]);

  const hapticImpact = useCallback((intensity: 'weak' | 'medium' | 'strong' = 'medium') => {
    triggerHaptic({ type: 'medium', intensity });
  }, [triggerHaptic]);

  return {
    isHapticSupported: isHapticSupported(),
    triggerHaptic,
    hapticClick,
    hapticSelect,
    hapticSuccess,
    hapticError,
    hapticImpact
  };
};