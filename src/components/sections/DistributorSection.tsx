import { motion } from "framer-motion";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import StyledIcon from "@/components/ui/StyledIcon";
import { Users, TrendingUp, Shield, Target, CheckCircle, Crown } from "lucide-react";

interface DistributorSectionProps {
  onCTAClick: () => void;
}

const DistributorSection = ({ onCTAClick }: DistributorSectionProps) => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Alto Retorno",
      description: "Margem diferenciada com produto premium"
    },
    {
      icon: Shield,
      title: "Suporte Completo",
      description: "Treinamento e apoio técnico especializado"
    },
    {
      icon: Target,
      title: "Território Exclusivo",
      description: "Possibilidade de exclusividade regional"
    },
    {
      icon: Crown,
      title: "Marketing Premium",
      description: "Kit completo de materiais profissionais"
    }
  ];

  const stats = [
    { number: "300+", label: "Distribuidores Ativos" },
    { number: "87%", label: "Taxa de Renovação" },
    { number: "45%", label: "Margem Média" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      {/* Background elegante */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header profissional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-4">
            Programa de Distribuição
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Expanda seu negócio com a linha premium NIVELA®. 
            <span className="text-accent font-semibold"> Exclusivo para profissionais qualificados.</span>
          </p>
        </motion.div>

        {/* Stats em destaque */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-muted font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Layout principal - Grid responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
          
          {/* Lado esquerdo - Benefícios */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-background/20 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold gradient-text mb-6">
                Vantagens Exclusivas
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="bg-background/30 border border-accent/10 rounded-xl p-4 hover:border-accent/30 transition-all duration-300"
                  >
                    <StyledIcon 
                      icon={benefit.icon} 
                      variant="contained" 
                      size="md" 
                      color="primary" 
                      className="mb-3"
                    />
                    <h4 className="font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <EnhancedButton
                onClick={onCTAClick}
                variant="premium"
                size="lg"
                className="px-8 py-4 text-lg font-semibold"
              >
                <Target className="w-5 h-5 mr-2" />
                Solicitar Parceria
              </EnhancedButton>
              <p className="text-sm text-muted mt-3">
                ✓ Processo de aprovação em 48h • ✓ Suporte dedicado
              </p>
            </motion.div>
          </motion.div>

          {/* Lado direito - Visual impactante */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 sm:p-8 border border-accent/20">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=450&fit=crop&auto=format&q=80"
                  alt="Distribuidor NIVELA® - Salão Premium"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl sm:text-2xl font-playfair font-bold text-foreground">
                  Seja Parte da Elite
                </h4>
                <p className="text-muted leading-relaxed">
                  Junte-se aos distribuidores que já descobriram o potencial de crescimento 
                  com produtos premium para profissionais exigentes.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {["Premium", "Exclusivo", "Lucrativo", "Profissional"].map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Badge de destaque */}
            <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <StyledIcon icon={Crown} variant="minimal" size="sm" />
                Premium
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DistributorSection;