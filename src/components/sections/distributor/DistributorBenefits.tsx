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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-contrast mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-brand-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DistributorBenefits;