
import { Card, CardContent } from "@/components/ui/card";
import StyledIcon from "@/components/ui/StyledIcon";
import { Beaker, CheckCircle, Zap, Leaf, Shield, DollarSign, Settings } from "lucide-react";

const TechnicalBenefits = () => {
  const technicalBenefits = [
    {
      title: "Reestruturação Molecular",
      description: "Atua na estrutura interna do fio, reorganizando as fibras capilares em escala nanométrica.",
      icon: Zap,
      gradient: "from-primary/10 to-accent/10"
    },
    {
      title: "Tratamento + Nivelamento",
      description: "Alinha, nutre e hidrata simultaneamente com aminoácidos e bioativos hidratantes.",
      icon: Shield,
      gradient: "from-accent/10 to-secondary/10"
    },
    {
      title: "Compatibilidade",
      description: "Compatível com todos os tipos de cabelo",
      icon: Leaf,
      gradient: "from-secondary/10 to-primary/10"
    }
  ];


  return (
    <div className="space-y-6">
      {/* Header for Benefits Section */}
      <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-playfair font-bold gradient-text-animated mb-3">
          Benefícios Técnicos
        </h3>
        <p className="text-muted font-montserrat text-sm lg:text-base">
          Inovação científica para resultados superiores
        </p>
      </div>

      {/* Technical Benefits Cards - Vertical Stack for Column Layout */}
      <div className="space-y-4">
        {technicalBenefits.map((benefit, index) => (
          <Card key={index} className="group bg-background/30 backdrop-blur-sm border border-accent/20 overflow-hidden hover:border-accent/40 hover:bg-background/40 transition-all duration-300">
            <CardContent className="p-4 lg:p-5">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${benefit.gradient} group-hover:scale-110 transition-transform duration-300`}>
                  <StyledIcon 
                    icon={benefit.icon} 
                    variant="minimal" 
                    size="sm"
                    color="accent"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base lg:text-lg font-montserrat font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-xs lg:text-sm font-montserrat text-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default TechnicalBenefits;
