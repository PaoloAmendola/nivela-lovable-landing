import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Target, Crown } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Alto Retorno",
    description: "Margem diferenciada com produto premium"
  },
  {
    icon: Shield,
    title: "Suporte Completo", 
    description: "Treinamento e apoio técnico especializado"
  },
  {
    icon: Target,
    title: "Território Exclusivo",
    description: "Possibilidade de exclusividade regional"
  },
  {
    icon: Crown,
    title: "Marketing Premium",
    description: "Kit completo de materiais profissionais"
  }
];

const DistributorBenefits = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-contrast mb-4">
          Por que escolher a NIVELA®?
        </h3>
        <p className="text-brand-secondary">
          Junte-se a uma rede de distribuidores que transformam negócios com produtos de qualidade superior.
        </p>
      </div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/30 hover:border-brand-primary/30 transition-colors duration-300 group"
            >
              <div className="p-2 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors duration-300 flex-shrink-0">
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-contrast mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-brand-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DistributorBenefits;