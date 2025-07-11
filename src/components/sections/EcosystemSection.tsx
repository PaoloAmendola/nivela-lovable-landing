
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { Smartphone, Users, Brain, Bot, ChevronRight } from "lucide-react";

const EcosystemSection = () => {
  const features = [
    {
      title: "BemHUB™",
      subtitle: "Portal do Distribuidor",
      description: "Painel completo: pedidos, financeiro e base de clientes. Campanhas e materiais prontos para ativar salões. Treinamento sob demanda exclusivo.",
      benefit: "Distribuidores: autonomia, organização e autoridade na palma da mão.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "BemEDUCA™",
      subtitle: "Formação Consultiva de Alta Performance",
      description: "Módulos curtos focados no que realmente funciona. Scripts de venda e quebra de objeções. Conteúdo sempre atualizado com resultados reais.",
      benefit: "Equipes mais seguras e clientes mais fiéis.",
      icon: <Brain className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "BemPRO™",
      subtitle: "Consultor Digital do Cabeleireiro Moderno",
      description: "Guia técnico interativo. Ficha de anamnese digital com fotos e histórico dos clientes, biblioteca técnica com artigos, tricologia e tendências, scripts de venda consultiva",
      benefit: "Atendimento premium, segurança técnica e fidelização na rotina do salão.",
      icon: <Users className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "BemBOT™",
      subtitle: "Agente IA que trabalha por você",
      description: "Resposta técnica instantânea via WhatsApp, Hub ou Academy. Envio automático de vídeos, PDFs e argumentos. Aprendizado contínuo que se adapta à sua rotina.",
      benefit: "Menos dúvidas, decisões mais rápidas, tempo para focar no que importa.",
      icon: <Bot className="w-8 h-8" />,
      color: "text-accent",
      bgColor: "bg-accent/10"
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
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-6 lg:mb-8">
            BemTECH™
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-playfair font-semibold gradient-text mb-4">
            O primeiro ecossistema digital do setor de Beleza
          </h3>
          <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed max-w-4xl mx-auto">
            Uma infraestrutura completa de apoio ao cabeleireiro e ao distribuidor. Um conjunto de apps inteligentes que falam entre si e colocam treinamento, operação e suporte literalmente na palma da sua mão.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
