
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import StyledIcon from "@/components/ui/StyledIcon";
import { Zap, Award, TrendingUp, Shield, Users, Star } from "lucide-react";

interface HeroFeaturesProps {
  shouldReduceAnimations: boolean;
}

const HeroFeatures = ({ shouldReduceAnimations }: HeroFeaturesProps) => {
  const features = [
    {
      icon: Zap,
      title: "+350% Resultados",
      description: "Comprovado por 487 profissionais",
      color: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Aprovado ANVISA + ISO 9001",
      color: "text-green-400"
    },
    {
      icon: Award,
      title: "Exclusividade",
      description: "Território protegido garantido",
      color: "text-purple-400"
    },
    {
      icon: TrendingUp,
      title: "ROI Garantido",
      description: "Retorno em até 30 dias",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Suporte Vitalício",
      description: "Equipe técnica dedicada 24/7",
      color: "text-orange-400"
    },
    {
      icon: Star,
      title: "5 Estrelas",
      description: "Avaliação média dos parceiros",
      color: "text-pink-400"
    }
  ];

  return (
    <AnimatedWrapper variant="slideUp" delay={0.9} reducedMotion={shouldReduceAnimations}>
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <AnimatedWrapper 
              key={index}
              variant="fadeIn" 
              delay={1.0 + (index * 0.1)} 
              reducedMotion={shouldReduceAnimations}
            >
              <div className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-xl p-3 sm:p-4 text-center hover:bg-background/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
                <StyledIcon 
                  icon={feature.icon} 
                  variant="contained" 
                  size="md" 
                  className={`mx-auto mb-2 ${feature.color}`}
                />
                <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted leading-tight">
                  {feature.description}
                </p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default HeroFeatures;
