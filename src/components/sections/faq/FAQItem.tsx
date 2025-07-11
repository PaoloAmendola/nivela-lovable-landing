
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  categoryColors: Record<string, string>;
}

const FAQItem = ({ 
  question, 
  answer, 
  category, 
  isOpen, 
  onToggle, 
  index,
  categoryColors 
}: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="bg-background/90 backdrop-blur-md border border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-500 h-full shadow-lg hover:shadow-2xl group-hover:transform group-hover:scale-[1.02]">
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger className="w-full">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="text-left flex-1">
                  <motion.div 
                    className={`inline-flex px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[category]} bg-current/15 shadow-md mb-4 border border-current/20`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {category}
                  </motion.div>
                  <h3 className="font-playfair font-bold text-lg md:text-xl lg:text-2xl leading-tight text-foreground pr-4 group-hover:text-brand-primary transition-colors duration-300">
                    {question}
                  </h3>
                </div>
                <motion.div 
                  className="flex-shrink-0 mt-2 bg-brand-primary/10 rounded-full p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-brand-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-brand-primary" />
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CardContent className="pt-0 px-6 lg:px-8 pb-6 lg:pb-8">
                <div className="border-t border-brand-primary/20 pt-6 mt-2">
                  <p className="text-contrast font-montserrat leading-relaxed text-base md:text-lg lg:text-xl">
                    {answer}
                  </p>
                </div>
              </CardContent>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};

export default FAQItem;
