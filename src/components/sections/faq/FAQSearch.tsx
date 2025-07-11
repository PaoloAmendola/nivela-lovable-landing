import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface FAQSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const FAQSearch = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories 
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

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategoryChange("")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === ""
              ? "bg-brand-primary text-white"
              : "bg-background/50 text-brand-secondary border border-border/50 hover:border-brand-primary/30"
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
              selectedCategory === category
                ? "bg-brand-primary text-white"
                : "bg-background/50 text-brand-secondary border border-border/50 hover:border-brand-primary/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQSearch;