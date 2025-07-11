import { Search, Filter } from "lucide-react";
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
      className="max-w-2xl mx-auto mb-12"
    >
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-secondary" />
        <input
          type="text"
          placeholder="Buscar nas perguntas frequentes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-brand-primary/20 bg-background/80 backdrop-blur-sm focus:border-brand-primary focus:outline-none transition-all duration-300 font-montserrat"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === ""
              ? "bg-brand-primary text-white shadow-lg"
              : "bg-background/60 text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/10"
          }`}
        >
          Todas
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
              selectedCategory === category
                ? "bg-brand-primary text-white shadow-lg"
                : "bg-background/60 text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/10"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQSearch;