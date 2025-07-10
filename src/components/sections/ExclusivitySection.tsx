import { Card, CardContent } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { Badge, TrendingUp, Target, ShieldCheck, Crown, Smartphone, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface ExclusivitySectionProps {
  onCTAClick: () => void;
}

const ExclusivitySection = ({ onCTAClick }: ExclusivitySectionProps) => {
  const exclusiveFeatures = [
    {
      icon: TrendingUp,
      title: "Alto Retorno",
      description: "Margem diferenciada com um produto de alta performance",
      highlight: "Rentabilidade garantida"
    },
    {
      icon: ShieldCheck,
      title: "Suporte Especializado",
      description: "BemBot™ IA + equipe técnica dedicada",
      highlight: "Assistência 24/7"
    },
    {
      icon: Target,
      title: "Território Exclusivo",
      description: "Possibilidade de exclusividade regional",
      highlight: "Mercado protegido"
    },
    {
      icon: Crown,
      title: "Marketing Premium",
      description: "Kit completo de materiais profissionais",
      highlight: "Suporte comercial"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-transparent relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4"
          >
            <Badge className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold">OPORTUNIDADE DE DISTRIBUIÇÃO</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-6 lg:mb-8">
            Distribua NIVELA
          </h2>
          
          <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed max-w-3xl mx-auto">
            Expanda sua atuação no mercado profissional com um produto de alto valor percebido, tecnologia exclusiva e demanda crescente.
          </p>
        </div>

        {/* Features Grid - Full width layout */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exclusiveFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/20 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300 h-full">
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-montserrat font-semibold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    
                    <p className="text-sm md:text-base font-montserrat text-muted leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                      {feature.highlight}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-playfair font-semibold text-foreground mb-4">
                Solicite Informações sobre Distribuição
              </h3>
              
              <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Preencha nosso formulário e nossa equipe entrará em contato para apresentar as condições especiais para distribuidores e os requisitos para parceria.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <EnhancedButton
                  variant="premium"
                  size="lg"
                  onClick={onCTAClick}
                  className="py-3 px-6 text-lg font-semibold"
                >
                  <Target className="w-5 h-5 mr-2" strokeWidth={1.5} />
                  Solicitar Informações
                </EnhancedButton>
                
                <a
                  href="https://wa.me/5511999999999?text=Olá! Tenho interesse em ser distribuidor NIVELA® e gostaria de saber mais sobre as condições de parceria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                  WhatsApp Direto
                </a>
              </div>

              <p className="text-muted text-sm mt-4 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <strong>Resposta:</strong> até 24h úteis para primeiros contatos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExclusivitySection;