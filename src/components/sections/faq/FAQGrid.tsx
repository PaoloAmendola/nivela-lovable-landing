
import { useState } from "react";
import FAQItem from "./FAQItem";

interface FAQData {
  question: string;
  answer: string;
  category: string;
}

interface FAQGridProps {
  faqData: FAQData[];
  categoryColors: Record<string, string>;
}

const FAQGrid = ({ faqData, categoryColors }: FAQGridProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            category={faq.category}
            isOpen={openItems.includes(index)}
            onToggle={() => toggleItem(index)}
            index={index}
            categoryColors={categoryColors}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQGrid;
