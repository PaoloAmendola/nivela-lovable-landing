
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FAQItem from "./FAQItem";
import FAQSearch from "./FAQSearch";

interface FAQData {
  question: string;
  answer: string;
  category: string;
}

interface FAQGridProps {
  faqData: FAQData[];
}

const FAQGrid = ({ faqData }: FAQGridProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(faqData.map(faq => faq.category)));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filter */}
      <FAQSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Results Count */}
      {(searchTerm || selectedCategory) && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-brand-secondary text-sm mb-6"
        >
          {filteredFAQs.length} pergunta{filteredFAQs.length !== 1 ? 's' : ''} encontrada{filteredFAQs.length !== 1 ? 's' : ''}
        </motion.p>
      )}

      {/* FAQ List */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${searchTerm}-${selectedCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => {
            const originalIndex = faqData.findIndex(item => 
              item.question === faq.question && item.answer === faq.answer
            );
            return (
              <FAQItem
                key={`${faq.question}-${originalIndex}`}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isOpen={openItems.includes(originalIndex)}
                onToggle={() => toggleItem(originalIndex)}
                index={index}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredFAQs.length === 0 && (searchTerm || selectedCategory) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-brand-secondary text-lg mb-4">
            Nenhuma pergunta encontrada
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
            className="text-brand-primary font-medium hover:underline transition-colors"
          >
            Limpar filtros
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FAQGrid;
