
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import EnhancedButton from "@/components/ui/EnhancedButton";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Headphones, 
  Package, 
  Target,
  Zap,
  Shield
} from "lucide-react";

interface DistributorBenefitsProps {
  shouldReduceAnimations: boolean;
}

const DistributorBenefits = ({ shouldReduceAnimations }: DistributorBenefitsProps) => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Alto Potencial de Lucro",
      description: "Margem de lucro competitiva com produto de alta demanda no mercado profissional de beleza.",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "Suporte Exclusivo",
      description: "Equipe dedicada para apoiar seu crescimento com treinamentos e materiais de marketing.",
      color: "text-blue-500"
    },
    {
      icon: Award,
      title: "Marca Consolidada",
      description: "Produto com reconhecimento nacional e alta aceitação entre profissionais.",
      color: "text-yellow-500"
    },
    {
      icon: Headphones,
      title: "Atendimento Personalizado",
      description: "Consultoria técnica e comercial para maximizar suas vendas e satisfação dos clientes.",
      color: "text-purple-500"
    },
    {
      icon: Package,
      title: "Logística Otimizada",
      description: "Sistema de distribuição eficiente com entregas rápidas e seguras em todo o país.",
      color: "text-orange-500"
    },
    {
      icon: Target,
      title: "Território Protegido",
      description: "Exclusividade territorial garantindo proteção de sua área de atuação.",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Lançamentos Prioritários",
      description: "Acesso antecipado a novos produtos e tendências do mercado de beleza.",
      color: "text-cyan-500"
    },
    {
      icon: Shield,
      title: "Garantia Total",
      description: "Política de troca e garantia que protege seu investimento e confiança dos clientes.",
      color: "text-teal-500"
    }
  ];

  return (
    <div className="space-y-12">
      <AnimatedWrapper variant="fadeIn" delay={0.2} reducedMotion={shouldReduceAnimations}>
        <div className="text-center mb-12">
          <h3 className="text-section-subtitle font-playfair mb-4 gradient-text-animated">
            Vantagens Exclusivas para Distribuidores
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground font-montserrat max-w-3xl mx-auto leading-relaxed">
            Junte-se à nossa rede de parceiros e descubra por que somos a escolha número 1 
            de distribuidores em todo o Brasil.
          </p>
        </div>
      </AnimatedWrapper>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <AnimatedWrapper
            key={benefit.title}
            variant="slideUp"
            delay={0.4 + index * 0.1}
            reducedMotion={shouldReduceAnimations}
          >
            <div className="glass-subtle rounded-xl p-6 hover-lift group text-center interactive-element min-h-[280px] flex flex-col">
              <div className={`${benefit.color} mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className="font-playfair font-semibold text-lg mb-3 text-foreground">
                {benefit.title}
              </h4>
              <p className="text-base lg:text-lg text-muted-foreground font-montserrat leading-relaxed flex-1">
                {benefit.description}
              </p>
            </div>
          </AnimatedWrapper>
        ))}
      </div>

      <AnimatedWrapper variant="fadeIn" delay={1.2} reducedMotion={shouldReduceAnimations}>
        <div className="text-center mt-12">
          <EnhancedButton
            variant="primary"
            size="lg"
            className="btn-premium hover-glow"
            onClick={() => {
              const element = document.getElementById('distributor-form');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Solicitar informações sobre distribuição"
          >
            Quero Ser Distribuidor
          </EnhancedButton>
        </div>
      </AnimatedWrapper>
    </div>
  );
};

export default DistributorBenefits;
