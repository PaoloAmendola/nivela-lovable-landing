import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import DistributorBenefits from "./distributor/DistributorBenefits";
import DistributorForm from "./distributor/DistributorForm";
import { useToast } from "@/hooks/use-toast";

interface DistributorSectionProps {
  onCTAClick: () => void;
}

const DistributorSection = ({ onCTAClick }: DistributorSectionProps) => {
  const { toast } = useToast();

  const handleFormSubmit = (data: any) => {
    // Esta função agora é opcional, pois o DistributorForm
    // já integra diretamente com Supabase
    console.log('Dados do distribuidor para analytics:', data);
    
    // Removido onCTAClick() para manter formulários independentes
    // onCTAClick();
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header Minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-6 border-brand-primary/30 text-brand-primary bg-brand-primary/5">
            <Crown className="w-4 h-4 mr-2" />
            Programa Exclusivo
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-animated mb-6">
            Seja um Distribuidor NIVELA®
          </h2>
          <p className="text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Transforme seu negócio com produtos premium. 
            <span className="text-contrast font-medium"> Oportunidade limitada para profissionais qualificados.</span>
          </p>
        </motion.div>

        {/* Layout Principal: Benefícios + Formulário */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Benefícios */}
          <DistributorBenefits />
          
          {/* Formulário */}
          <DistributorForm onSubmit={handleFormSubmit} />
          
        </div>

      </div>
    </section>
  );
};

export default DistributorSection;