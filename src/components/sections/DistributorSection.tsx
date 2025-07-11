import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Target, Crown, Users, Award, Zap, CheckCircle } from "lucide-react";

interface DistributorSectionProps {
  onCTAClick: () => void;
}

const DistributorSection = ({ onCTAClick }: DistributorSectionProps) => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Alto Retorno",
      description: "Margem diferenciada com produto premium",
      highlight: "45% média"
    },
    {
      icon: Shield,
      title: "Suporte Completo", 
      description: "Treinamento e apoio técnico especializado",
      highlight: "24/7"
    },
    {
      icon: Target,
      title: "Território Exclusivo",
      description: "Possibilidade de exclusividade regional",
      highlight: "Proteção"
    },
    {
      icon: Crown,
      title: "Marketing Premium",
      description: "Kit completo de materiais profissionais",
      highlight: "Completo"
    }
  ];

  const stats = [
    { icon: Users, number: "300+", label: "Distribuidores Ativos", color: "bg-blue-500" },
    { icon: Award, number: "87%", label: "Taxa de Renovação", color: "bg-green-500" },
    { icon: Zap, number: "45%", label: "Margem Média", color: "bg-purple-500" }
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header com impacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            <Crown className="w-4 h-4 mr-2" />
            Programa Exclusivo
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Seja um Distribuidor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforme seu negócio com produtos premium NIVELA®. 
            <span className="text-foreground font-semibold"> Oportunidade limitada para profissionais qualificados.</span>
          </p>
        </motion.div>

        {/* Stats em destaque com ícones */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`absolute top-0 left-0 w-full h-1 ${stat.color}`}></div>
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-3 rounded-full ${stat.color}/10 mb-4`}>
                    <Icon className={`w-8 h-8 text-white`} style={{color: stat.color.replace('bg-', '').replace('-500', '')}} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Layout principal em grid assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Coluna esquerda - 2 benefícios */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20 group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {benefit.highlight}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Coluna direita - CTA e benefícios extra */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* CTA Principal */}
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-primary/20 mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Inicie Sua Jornada
                </h3>
                <p className="text-muted-foreground mb-6">
                  Processo simplificado para distribuidores qualificados
                </p>
                <Button 
                  onClick={onCTAClick}
                  size="lg" 
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                >
                  Solicitar Parceria
                </Button>
              </div>
            </Card>

            {/* Lista de benefícios extras */}
            <Card className="p-6 border-0 shadow-md">
              <h4 className="font-bold text-foreground mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Incluso no Programa
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Aprovação em 48h",
                  "Suporte técnico dedicado", 
                  "Material de vendas profissional",
                  "Treinamento especializado",
                  "Portal exclusivo do distribuidor"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Footer com urgência */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center bg-accent/10 text-accent px-6 py-3 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Vagas limitadas • Apenas 50 novos distribuidores em 2024
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DistributorSection;