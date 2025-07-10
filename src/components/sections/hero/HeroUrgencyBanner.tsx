
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import StyledIcon from "@/components/ui/StyledIcon";
import { Target, Clock, Users, TrendingUp } from "lucide-react";

interface HeroUrgencyBannerProps {
  shouldReduceAnimations: boolean;
}

const HeroUrgencyBanner = ({ shouldReduceAnimations }: HeroUrgencyBannerProps) => {
  return (
    <AnimatedWrapper variant="slideUp" delay={1.0} reducedMotion={shouldReduceAnimations}>
      <div className="max-w-4xl mx-auto mb-8 px-4">
        {/* Banner principal de urgência */}
        <div className="bg-gradient-to-r from-destructive/20 to-orange-500/20 border-2 border-destructive/40 rounded-xl p-4 sm:p-6 space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <StyledIcon icon={Target} variant="glow" size="md" color="destructive" />
            <p className="text-destructive font-bold text-lg sm:text-xl text-center">
              🔥 ÚLTIMAS 12 VAGAS DISPONÍVEIS ESTE MÊS
            </p>
            <StyledIcon icon={Clock} variant="glow" size="md" color="destructive" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold">487 profissionais</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold">+350% resultados</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Exclusividade territorial</span>
            </div>
          </div>
        </div>
        
        {/* Banner de benefícios */}
        <div className="mt-4 bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-400/30 rounded-lg p-3 sm:p-4">
          <p className="text-center text-sm sm:text-base text-foreground">
            ✅ <span className="font-semibold text-green-400">Suporte técnico vitalício</span> • 
            ✅ <span className="font-semibold text-primary"> Treinamento garantido</span> • 
            ✅ <span className="font-semibold text-accent"> ROI comprovado</span>
          </p>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default HeroUrgencyBanner;
