
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import TechnologyHeader from "./technology/TechnologyHeader";
import TechnicalBenefits from "./technology/TechnicalBenefits";
import AmazonianActives from "./technology/AmazonianActives";
import ProfessionalExclusivity from "./technology/ProfessionalExclusivity";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";

const TechnologySection = () => {
  const { shouldReduceAnimations } = useMobileOptimizations();

  return (
    <section 
      id="tecnologia" 
      className="section-spacing section-gradient-accent-blend relative overflow-hidden"
      aria-labelledby="technology-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-accent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <TechnologyHeader />
          
          {/* Technical Benefits */}
          <AnimatedWrapper variant="fadeIn" delay={0.4} reducedMotion={shouldReduceAnimations}>
            <div className="mb-16 lg:mb-20">
              <TechnicalBenefits shouldReduceAnimations={shouldReduceAnimations} />
            </div>
          </AnimatedWrapper>
          
          {/* Amazonian Actives */}
          <AnimatedWrapper variant="fadeIn" delay={0.6} reducedMotion={shouldReduceAnimations}>
            <div className="mb-16 lg:mb-20">
              <AmazonianActives shouldReduceAnimations={shouldReduceAnimations} />
            </div>
          </AnimatedWrapper>
          
          {/* Professional Exclusivity */}
          <AnimatedWrapper variant="fadeIn" delay={0.8} reducedMotion={shouldReduceAnimations}>
            <div className="mb-12">
              <ProfessionalExclusivity />
            </div>
          </AnimatedWrapper>

          {/* Enhanced closing message */}
          <AnimatedWrapper variant="fadeIn" delay={1.0} reducedMotion={shouldReduceAnimations}>
            <div className="text-center">
              <p className="text-base lg:text-lg text-muted-foreground font-montserrat leading-relaxed max-w-3xl mx-auto">
                A tecnologia NIVELA® representa o que há de mais avançado em tratamento capilar profissional, 
                combinando ciência, natureza e resultados excepcionais para transformar completamente seus cabelos.
              </p>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
