
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface DesktopNavigationProps {
  navItems: NavItem[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const DesktopNavigation = ({ navItems, activeSection, onSectionClick }: DesktopNavigationProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-6">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionClick(item.id)}
          className={`relative px-3 py-2 text-sm font-medium transition-colors ${
            activeSection === item.id
              ? 'text-accent'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {item.label}
          {activeSection === item.id && (
            <motion.div
              layoutId="activeSection"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default DesktopNavigation;
