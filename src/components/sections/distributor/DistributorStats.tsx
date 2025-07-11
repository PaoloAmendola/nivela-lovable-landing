import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Award } from "lucide-react";

const stats = [
  { 
    icon: Users, 
    number: "300+", 
    label: "Distribuidores Ativos",
    description: "Rede nacional consolidada"
  },
  { 
    icon: TrendingUp, 
    number: "87%", 
    label: "Taxa de Renovação",
    description: "Satisfação comprovada"
  },
  { 
    icon: Award, 
    number: "45%", 
    label: "Margem Média",
    description: "Retorno diferenciado"
  }
];

const DistributorStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-brand-primary/30 transition-colors duration-300 text-center">
              <CardContent className="p-6">
                <div className="inline-flex p-3 rounded-full bg-brand-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="text-2xl font-bold text-contrast mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-contrast mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-brand-secondary">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DistributorStats;