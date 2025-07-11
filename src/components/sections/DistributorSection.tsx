import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, Target, Crown } from "lucide-react";

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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Header Simplificado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Programa de Distribuição
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expanda seu negócio com produtos premium para profissionais qualificados.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-muted">
              <CardContent className="pt-6">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefícios Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Centralizado */}
        <div className="text-center">
          <Button 
            onClick={onCTAClick}
            size="lg" 
            className="px-8 py-3 text-lg"
          >
            <Target className="w-5 h-5 mr-2" />
            Solicitar Parceria
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Processo de aprovação em 48h • Suporte dedicado
          </p>
        </div>

      </div>
    </section>
  );
};

export default DistributorSection;