import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap } from "lucide-react";

interface DistributorCTAProps {
  onCTAClick: () => void;
}

const benefits = [
  "Aprovação em 48h",
  "Suporte técnico dedicado", 
  "Material de vendas profissional",
  "Treinamento especializado",
  "Portal exclusivo do distribuidor"
];

const DistributorCTA = ({ onCTAClick }: DistributorCTAProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto text-center"
    >
      <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="inline-flex p-4 rounded-full bg-brand-primary/10 mb-4">
              <CheckCircle className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-2xl font-bold text-contrast mb-3">
              Torne-se um Distribuidor
            </h3>
            <p className="text-brand-secondary mb-6">
              Processo simplificado para profissionais qualificados
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold text-contrast mb-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-primary" />
              Incluso no Programa
            </h4>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-sm text-brand-secondary">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={onCTAClick}
            size="lg" 
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold mb-6"
          >
            Solicitar Parceria
          </Button>

          <Badge variant="outline" className="border-brand-primary/30 text-brand-primary bg-brand-primary/5">
            <Zap className="w-3 h-3 mr-1" />
            Vagas limitadas • Apenas 50 novos distribuidores em 2024
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DistributorCTA;