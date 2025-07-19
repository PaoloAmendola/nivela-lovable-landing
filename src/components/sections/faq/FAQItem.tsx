
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  shouldReduceAnimations: boolean;
}

const FAQItem = ({ question, answer, index, shouldReduceAnimations }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedWrapper
      variant="slideUp"
      delay={index * 0.1}
      reducedMotion={shouldReduceAnimations}
    >
      <div className="faq-item glass-subtle rounded-xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/5 transition-colors duration-200 min-h-[44px] interactive-element"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <h3 className="font-playfair font-semibold text-lg lg:text-xl text-foreground pr-4">
            {question}
          </h3>
          <ChevronDown 
            className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
            strokeWidth={2}
          />
        </button>
        
        <div
          id={`faq-answer-${index}`}
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6">
            <div className="w-full h-px bg-accent/20 mb-4"></div>
            <p className="text-base lg:text-lg text-muted-foreground font-montserrat leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default FAQItem;
