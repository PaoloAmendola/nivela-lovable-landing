
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { CheckCircle, Sparkles, Zap } from "lucide-react";

interface PremiumBulletsProps {
  shouldReduceAnimations: boolean;
}

const PremiumBullets = ({ shouldReduceAnimations }: PremiumBulletsProps) => {
  const bullets = [
    {
      icon: CheckCircle,
      text: "Livre de formol e derivados",
      highlight: "100% Seguro"
    },
    {
      icon: Sparkles,
      text: "Textura em Gel inovadora",
      highlight: "Tecnologia Única"
    },
    {
      icon: Zap,
      text: "Tecnologia ASTRO QUAT V3",
      highlight: "Patenteada"
    }
  ];

  return (
    <AnimatedWrapper variant="slideUp" delay={1.2} reducedMotion={shouldReduceAnimations}>
      <div className="space-y-4 max-w-md mx-auto lg:mx-0">
        {bullets.map((bullet, index) => (
          <AnimatedWrapper
            key={index}
            variant="fadeIn"
            delay={1.3 + (index * 0.1)}
            reducedMotion={shouldReduceAnimations}
          >
            <div className="flex items-center gap-4 bg-background/10 backdrop-blur-sm border border-accent/20 rounded-xl p-4 hover:bg-background/20 hover:border-accent/40 transition-all duration-300">
              <div className="flex-shrink-0">
                <bullet.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium">{bullet.text}</p>
                <span className="text-xs text-accent font-bold uppercase tracking-wide">
                  {bullet.highlight}
                </span>
              </div>
            </div>
          </AnimatedWrapper>
        ))}
      </div>
    </AnimatedWrapper>
  );
};

export default PremiumBullets;
