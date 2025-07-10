
import { useCallback } from 'react';
import { useHapticFeedback } from './use-haptic-feedback';

interface PremiumInteractionOptions {
  hapticEnabled?: boolean;
  soundEnabled?: boolean;
  animationEnabled?: boolean;
}

export const usePremiumInteractions = (options: PremiumInteractionOptions = {}) => {
  const { hapticEnabled = true, soundEnabled = false, animationEnabled = true } = options;
  const { triggerLightHaptic, triggerMediumHaptic, triggerSuccessHaptic } = useHapticFeedback({ enabled: hapticEnabled });

  const handlePremiumClick = useCallback((callback?: () => void) => {
    if (hapticEnabled) {
      triggerLightHaptic();
    }
    
    if (soundEnabled && 'AudioContext' in window) {
      // Subtle click sound for premium feel
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    callback?.();
  }, [hapticEnabled, soundEnabled, triggerLightHaptic]);

  const handlePremiumHover = useCallback(() => {
    if (hapticEnabled) {
      triggerLightHaptic();
    }
  }, [hapticEnabled, triggerLightHaptic]);

  const handlePremiumSuccess = useCallback((callback?: () => void) => {
    if (hapticEnabled) {
      triggerSuccessHaptic();
    }
    callback?.();
  }, [hapticEnabled, triggerSuccessHaptic]);

  const handlePremiumFocus = useCallback(() => {
    if (hapticEnabled) {
      triggerMediumHaptic();
    }
  }, [hapticEnabled, triggerMediumHaptic]);

  return {
    handlePremiumClick,
    handlePremiumHover,
    handlePremiumSuccess,
    handlePremiumFocus
  };
};
