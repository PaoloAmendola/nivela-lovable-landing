
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { Smartphone, Users, Brain, ChevronRight, Gift } from "lucide-react";

const EcosystemSection = () => {
  const features = [
    {
      title: "BemHUB™",
      subtitle: "Portal do Distribuidor",
      description: "Controle completo de pedidos, clientes, financeiro e campanhas, com materiais prontos e treinamentos sob demanda.",
      benefit: "Autonomia, organização e escala no seu ritmo.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "BemEDUCA™",
      subtitle: "Treinamento técnico e comercial interativo",
      description: "Capacitação completa com módulos sobre o NIVELA®, técnicas de aplicação, vendas, marketing e atendimento. Com quizzes, certificados personalizados e IA de suporte, tudo no celular.",
      benefit: "Equipes mais seguras e clientes mais fiéis.",
      icon: <Brain className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "BemPRO™",
      subtitle: "Consultor Digital do Cabeleireiro Moderno",
      description: "Com IA especializada, protocolos por tipo de cabelo, ficha de anamnese com fotos, biblioteca técnica e scripts consultivos, o BemPRO te conecta à Bem Beauty com suporte completo no salão ou em movimento.",
      benefit: "Conhecimento, técnica e confiança sempre ao seu lado.",
      icon: <Users className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-transparent relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-primary blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Faixa de Bônus Exclusivo */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
          <div className="bg-gradient-to-r from-[#D9C0AA]/10 via-background/20 to-[#D9C0AA]/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#D9C0AA]/30 relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D9C0AA]/5 to-transparent opacity-50"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4">
              <div className="flex-shrink-0">
                <Gift className="w-8 h-8 text-[#D9C0AA] md:w-10 md:h-10" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl lg:text-2xl font-montserrat font-bold text-foreground mb-2">
                  Bônus Exclusivo para Clientes NIVELA®
                </h3>
                <p className="text-base md:text-lg font-montserrat font-medium text-muted leading-relaxed">
                  Ao adquirir o produto, você ganha acesso completo ao ecossistema digital{' '}
                  <span className="font-bold text-[#D9C0AA]">BemTECH™</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text-animated mb-6 lg:mb-8">
            BemTECH™
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-playfair font-semibold gradient-text-animated mb-4">
            O primeiro ecossistema digital do setor de Beleza
          </h3>
          <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed max-w-4xl mx-auto">
            Uma infraestrutura completa de apoio ao cabeleireiro e ao distribuidor. Um conjunto de apps inteligentes que falam entre si e colocam treinamento, operação e suporte literalmente na palma da sua mão.
          </p>
        </div>

        {/* Features Grid - Updated to show 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-background/20 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105 hover:bg-background/30 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${feature.bgColor} p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-montserrat font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-base font-montserrat font-medium text-brand-secondary mb-2">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm md:text-base font-montserrat text-muted leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="bg-accent/5 rounded-lg p-3 border-l-4 border-accent">
                  <p className="text-foreground font-medium flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    {feature.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Statement */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-background/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-accent/20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-playfair font-semibold text-foreground">
              Tudo Conectado. Tudo BemTECH™
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
