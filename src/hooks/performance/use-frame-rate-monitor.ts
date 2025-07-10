
import { useRef, useCallback, useState } from 'react';

export const useFrameRateMonitor = () => {
  const [frameRate, setFrameRate] = useState(60);
  const frameCountRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>();

  const monitorFrameRate = useCallback(() => {
    const countFrame = () => {
      frameCountRef.current++;
      rafRef.current = requestAnimationFrame(countFrame);
    };

    const updateFrameRate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const fps = frameCountRef.current / elapsed;
      
      setFrameRate(Math.round(fps));

      frameCountRef.current = 0;
      startTimeRef.current = Date.now();
    };

    rafRef.current = requestAnimationFrame(countFrame);
    const interval = setInterval(updateFrameRate, 1000);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearInterval(interval);
    };
  }, []);

  return {
    frameRate,
    monitorFrameRate
  };
};
