
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { Sparkles, Zap, Shield, Heart } from "lucide-react";

interface TechnicalBenefitsProps {
  shouldReduceAnimations: boolean;
}

const TechnicalBenefits = ({ shouldReduceAnimations }: TechnicalBenefitsProps) => {
  const benefits = [
    {
      icon: Sparkles,
      title: "Hidratação Profunda",
      description: "Ação intensiva que penetra nas camadas mais profundas do cabelo, restaurando a umidade natural e devolvendo a vida aos fios.",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "Reparação Instantânea",
      description: "Tecnologia de ponta que reconstrói a estrutura capilar danificada, proporcionando resultados visíveis desde a primeira aplicação.",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Proteção Duradoura",
      description: "Cria uma barreira protetora que mantém os benefícios por mais tempo, protegendo contra agressões externas e químicas.",
      color: "text-green-500"
    },
    {
      icon: Heart,
      title: "Nutrição Completa",
      description: "Fórmula enriquecida com nutrientes essenciais que alimentam o cabelo de dentro para fora, garantindo saúde e vitalidade.",
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {benefits.map((benefit, index) => (
        <AnimatedWrapper
          key={benefit.title}
          variant="fadeIn"
          delay={index * 0.2}
          reducedMotion={shouldReduceAnimations}
        >
          <div className="glass-subtle rounded-xl p-6 lg:p-8 hover-lift group interactive-element">
            <div className="flex items-start gap-4">
              <div className={`${benefit.color} p-3 rounded-lg bg-white/10 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-playfair font-semibold text-xl mb-3 text-foreground">
                  {benefit.title}
                </h4>
                <p className="text-base lg:text-lg leading-relaxed text-muted-foreground font-montserrat">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      ))}
    </div>
  );
};

export default TechnicalBenefits;
