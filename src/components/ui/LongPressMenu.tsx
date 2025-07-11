import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

interface LongPressMenuProps {
  children: React.ReactNode;
  menuItems: Array<{
    label: string;
    icon?: React.ReactNode;
    action: () => void;
    destructive?: boolean;
  }>;
  className?: string;
  hapticFeedback?: boolean;
}

const LongPressMenu = ({
  children,
  menuItems,
  className = '',
  hapticFeedback = true
}: LongPressMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const { hapticImpact, hapticClick } = useHapticFeedback();

  const handleLongPress = useCallback((e?: TouchEvent) => {
    if (hapticFeedback) hapticImpact('medium');
    
    // Calculate menu position
    if (elementRef.current && e) {
      const rect = elementRef.current.getBoundingClientRect();
      const touch = e.touches[0] || e.changedTouches[0];
      setMenuPosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
    
    setShowMenu(true);
  }, [hapticFeedback, hapticImpact]);

  const handleMenuItemClick = useCallback((action: () => void) => {
    if (hapticFeedback) hapticClick();
    action();
    setShowMenu(false);
  }, [hapticFeedback, hapticClick]);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const { attachGestures } = useTouchGestures({
    onLongPress: handleLongPress,
    longPressDelay: 600,
    preventDefaults: false
  });

  const setRef = useCallback((element: HTMLDivElement | null) => {
    elementRef.current = element;
    if (element) {
      attachGestures(element);
    }
  }, [attachGestures]);

  return (
    <>
      <div
        ref={setRef}
        className={`relative touch-manipulation select-none ${className}`}
        style={{ touchAction: 'manipulation' }}
      >
        {children}

        {/* Context Menu */}
        {showMenu && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute z-50 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg overflow-hidden min-w-32"
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item.action)}
                className={`
                  w-full px-4 py-3 text-left text-sm flex items-center gap-3
                  hover:bg-muted/50 transition-colors
                  ${item.destructive ? 'text-destructive hover:bg-destructive/10' : 'text-foreground'}
                  ${index !== menuItems.length - 1 ? 'border-b border-border/30' : ''}
                `}
              >
                {item.icon && (
                  <span className="w-4 h-4 flex-shrink-0">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Backdrop to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={closeMenu}
          onTouchStart={closeMenu}
        />
      )}
    </>
  );
};

export default LongPressMenu;