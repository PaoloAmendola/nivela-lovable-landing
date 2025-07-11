
import { MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const FAQHeader = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 px-6 py-3 rounded-full mb-8 shadow-lg"
      >
        <HelpCircle className="w-5 h-5 text-brand-primary" />
        <span className="text-brand-primary font-semibold text-sm font-montserrat">Dúvidas Frequentes</span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-6 lg:mb-8"
      >
        Perguntas Frequentes
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-base md:text-lg font-montserrat text-contrast leading-relaxed max-w-3xl mx-auto"
      >
        Esclarecimentos para decisões profissionais seguras
      </motion.p>
    </div>
  );
};

export default FAQHeader;
