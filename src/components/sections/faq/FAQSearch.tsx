import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface FAQSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const FAQSearch = ({ 
  searchTerm, 
  onSearchChange
}: FAQSearchProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mb-10"
    >
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-secondary" />
        <input
          type="text"
          placeholder="Buscar nas perguntas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:border-brand-primary focus:outline-none transition-all duration-300 text-contrast"
        />
      </div>

    </motion.div>
  );
};

export default FAQSearch;