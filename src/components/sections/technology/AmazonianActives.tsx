
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { Leaf, Droplets, TreePine, Flower2 } from "lucide-react";

interface AmazonianActivesProps {
  shouldReduceAnimations: boolean;
}

const AmazonianActives = ({ shouldReduceAnimations }: AmazonianActivesProps) => {
  const actives = [
    {
      icon: Leaf,
      name: "Açaí Amazônico",
      benefit: "Rico em antioxidantes naturais",
      description: "Combate os radicais livres e protege o cabelo do envelhecimento precoce."
    },
    {
      icon: Droplets,
      name: "Óleo de Buriti",
      benefit: "Hidratação intensiva",
      description: "Restaura a umidade natural dos fios, deixando-os macios e sedosos."
    },
    {
      icon: TreePine,
      name: "Andiroba",
      benefit: "Reparação celular",
      description: "Acelera a regeneração capilar e fortalece a estrutura dos fios."
    },
    {
      icon: Flower2,
      name: "Cupuaçu",
      benefit: "Nutrição profunda",
      description: "Fornece vitaminas essenciais para a saúde e vitalidade capilar."
    }
  ];

  return (
    <div className="space-y-6">
      <AnimatedWrapper variant="fadeIn" delay={0.2} reducedMotion={shouldReduceAnimations}>
        <h3 className="text-section-subtitle font-playfair text-center mb-8 gradient-text-animated">
          Ativos Amazônicos Exclusivos
        </h3>
      </AnimatedWrapper>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actives.map((active, index) => (
          <AnimatedWrapper
            key={active.name}
            variant="slideUp"
            delay={0.4 + index * 0.15}
            reducedMotion={shouldReduceAnimations}
          >
            <div className="text-center glass-subtle rounded-xl p-6 hover-lift group interactive-element">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <active.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <h4 className="font-playfair font-semibold text-lg mb-2 text-foreground">
                {active.name}
              </h4>
              <p className="text-primary font-montserrat font-medium text-sm mb-3">
                {active.benefit}
              </p>
              <p className="text-base lg:text-lg text-muted-foreground font-montserrat leading-relaxed">
                {active.description}
              </p>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </div>
  );
};

export default AmazonianActives;
