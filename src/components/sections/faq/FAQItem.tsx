
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle, 
  index
}: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.4
      }}
      viewport={{ once: true }}
    >
      <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-lg text-foreground leading-snug">
                    {question}
                  </h3>
                </div>
                <motion.div 
                  className="flex-shrink-0 text-primary"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </CardContent>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 px-6 pb-6">
              <div className="border-t border-border/30 pt-4">
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
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
