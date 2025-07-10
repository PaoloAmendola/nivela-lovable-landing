
import { MessageCircle } from "lucide-react";

const FAQHeader = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-8">
        <MessageCircle className="w-5 h-5 text-accent" />
        <span className="text-accent font-medium text-sm">Dúvidas Frequentes</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-6 lg:mb-8">
        Perguntas Frequentes
      </h2>
      
      <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed max-w-3xl mx-auto">
        Esclarecimentos para decisões seguras
      </p>
    </div>
  );
};

export default FAQHeader;
