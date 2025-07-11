import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import DistributorStats from "./distributor/DistributorStats";
import DistributorBenefits from "./distributor/DistributorBenefits";
import DistributorCTA from "./distributor/DistributorCTA";

interface DistributorSectionProps {
  onCTAClick: () => void;
}

const DistributorSection = ({ onCTAClick }: DistributorSectionProps) => {
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Seja um Distribuidor NIVELA®
          </h2>
          <p className="text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Transforme seu negócio com produtos premium. 
            <span className="text-contrast font-medium"> Oportunidade limitada para profissionais qualificados.</span>
          </p>
        </motion.div>

        {/* Stats */}
        <DistributorStats />

        {/* Benefícios */}
        <DistributorBenefits />

        {/* CTA */}
        <DistributorCTA onCTAClick={onCTAClick} />

      </div>
    </section>
  );
};

export default DistributorSection;