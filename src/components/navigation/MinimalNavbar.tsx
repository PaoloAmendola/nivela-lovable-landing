
import { motion } from "framer-motion";
import { useScroll } from "@/hooks/use-scroll";
import HamburgerMenu from "./HamburgerMenu";

interface MinimalNavbarProps {
  onCTAClick: () => void;
}

const MinimalNavbar = ({ onCTAClick }: MinimalNavbarProps) => {
  const { isScrolled } = useScroll(50);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-accent/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo mais elegante */}
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center gap-2">
              <div>
                <img 
                  src="/lovable-uploads/35c523c0-e991-4c45-9e0b-08ebd975b908.png" 
                  alt="Bem Beauty Professional Logo"
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Menu Hambúrguer mais refinado */}
          <HamburgerMenu onCTAClick={onCTAClick} />
        </div>
      </div>
    </motion.nav>
  );
};

export default MinimalNavbar;
