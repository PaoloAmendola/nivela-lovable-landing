
import React from 'react';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/use-responsive';

interface PerformanceControlsProps {
  isMonitoring: boolean;
  onStartMonitoring: () => void;
  onStopMonitoring: () => void;
  onClearCache: () => void;
  onRefresh: () => void;
}

const PerformanceControls = ({
  isMonitoring,
  onStartMonitoring,
  onStopMonitoring,
  onClearCache,
  onRefresh
}: PerformanceControlsProps) => {
  const { isMobile } = useResponsive();

  return (
    <>
      <div className="flex space-x-2">
        <Button
          onClick={isMonitoring ? onStopMonitoring : onStartMonitoring}
          size={isMobile ? "default" : "sm"}
          variant={isMonitoring ? "destructive" : "default"}
        >
          {isMonitoring ? 'Stop' : 'Start'}
        </Button>
      </div>

      {isMonitoring && (
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'} pt-3 border-t border-accent/20`}>
          <Button
            onClick={onClearCache}
            size={isMobile ? "default" : "sm"}
            variant="outline"
            className="flex-1"
          >
            Clear Cache
          </Button>
          <Button
            onClick={onRefresh}
            size={isMobile ? "default" : "sm"}
            variant="outline"
            className="flex-1"
          >
            Refresh
          </Button>
        </div>
      )}
    </>
  );
};

export default PerformanceControls;
