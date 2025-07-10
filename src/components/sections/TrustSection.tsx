
import { motion } from "framer-motion";
import { Users, TrendingUp, Star, Trophy, Shield, Target } from "lucide-react";

const TrustSection = () => {
  const socialProof = [
    {
      number: "487+",
      label: "Profissionais Parceiros",
      icon: Users,
      color: "text-blue-400"
    },
    {
      number: "+350%",
      label: "Aumento Médio de Faturamento",
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      number: "4.9/5",
      label: "Satisfação dos Parceiros",
      icon: Star,
      color: "text-yellow-400"
    },
    {
      number: "97%",
      label: "Renovam Parceria Anualmente",
      icon: Trophy,
      color: "text-purple-400"
    },
    {
      number: "100%",
      label: "Aprovação ANVISA",
      icon: Shield,
      color: "text-green-500"
    },
    {
      number: "30 dias",
      label: "ROI Médio Garantido",
      icon: Target,
      color: "text-orange-400"
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header mais profissional */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4"
          >
            Números que Comprovam nossa Excelência
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-muted max-w-2xl mx-auto"
          >
            Resultados reais de profissionais que escolheram NIVELA® para transformar seus negócios
          </motion.p>
        </div>

        {/* Grid de números - Mais elegante */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {socialProof.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="bg-background/20 backdrop-blur-sm border border-accent/20 rounded-xl p-4 sm:p-6 text-center hover:border-accent/40 hover:bg-background/30 transition-all duration-300 hover:scale-105"
            >
              <item.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 ${item.color}`} />
              <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${item.color} mb-2`}>
                {item.number}
              </div>
              <div className="text-xs sm:text-sm text-muted font-medium leading-tight">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-action discreto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-sm sm:text-base text-muted">
            <span className="text-accent font-semibold">Junte-se aos profissionais de sucesso</span> que já descobriram o poder do NIVELA®
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
