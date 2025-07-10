
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { Shield, Crown } from "lucide-react";

interface ExclusivityBadgeProps {
  shouldReduceAnimations: boolean;
}

const ExclusivityBadge = ({ shouldReduceAnimations }: ExclusivityBadgeProps) => {
  return (
    <AnimatedWrapper variant="scale" delay={0.5} reducedMotion={shouldReduceAnimations}>
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm border-2 border-accent/40 rounded-full px-6 py-3 mb-6">
        <Crown className="w-5 h-5 text-accent" />
        <span className="text-accent font-bold text-sm tracking-wide uppercase">
          Acesso Exclusivo Profissional
        </span>
        <Shield className="w-5 h-5 text-accent" />
      </div>
    </AnimatedWrapper>
  );
};

export default ExclusivityBadge;
