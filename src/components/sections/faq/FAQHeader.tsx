
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const FAQHeader = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge variant="outline" className="mb-6 border-brand-primary/30 text-brand-primary bg-brand-primary/5">
          <HelpCircle className="w-4 h-4 mr-2" />
          Dúvidas Frequentes
        </Badge>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
          Perguntas Frequentes
        </h2>
        
        <p className="text-lg text-brand-secondary leading-relaxed">
          Esclarecimentos essenciais sobre NIVELA® e nosso ecossistema
        </p>
      </motion.div>
    </div>
  );
};

export default FAQHeader;
