
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
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
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="bg-background/80 backdrop-blur-sm border border-accent/30 hover:border-accent/50 transition-all duration-300 h-full shadow-lg">
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger className="w-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="text-left flex-1">
                  <div className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${categoryColors[category]} bg-current/10 shadow-sm mb-3`}>
                    {category}
                  </div>
                  <h3 className="font-poppins font-semibold text-lg md:text-xl leading-tight text-foreground pr-4">
                    {question}
                  </h3>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <ChevronDown 
                    className={`w-5 h-5 text-accent transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 px-6 pb-6">
              <div className="border-t border-accent/20 pt-6 mt-2">
                <p className="text-foreground/90 font-montserrat leading-relaxed text-base md:text-lg">
                  {answer}
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};

export default FAQItem;
