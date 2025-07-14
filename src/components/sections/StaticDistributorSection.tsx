import React from "react";
import { Crown } from "lucide-react";
import { SimpleButton } from "@/components/ui/SimpleButton";

interface StaticDistributorSectionProps {
  onCTAClick: () => void;
}

const StaticDistributorSection = ({ onCTAClick }: StaticDistributorSectionProps) => {
  return (
    <section className="section-spacing bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-6 py-3 mb-8">
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">PROGRAMA DE DISTRIBUIÇÃO</span>
          </div>
          
          <h2 className="text-section-title mb-6">
            Seja um <span className="gradient-text">Distribuidor NIVELA®</span>
          </h2>
          
          <p className="text-body-large max-w-4xl mx-auto mb-12">
            Junte-se a uma rede exclusiva de distribuidores e transforme sua região no epicentro 
            da inovação em tratamentos capilares. Oferecemos suporte completo, treinamento 
            especializado e margens atrativas para profissionais visionários.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits */}
          <div className="space-y-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Exclusividade Territorial</h3>
              <p className="text-body">Proteja seu investimento com territórios demarcados e vendas exclusivas em sua região.</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Suporte Técnico 24/7</h3>
              <p className="text-body">Equipe especializada para treinamento, dúvidas técnicas e suporte aos seus clientes.</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Marketing Profissional</h3>
              <p className="text-body">Materiais promocionais, campanhas digitais e estratégias de vendas desenvolvidas pela nossa equipe.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center lg:text-left">
            <div className="bg-card/30 backdrop-blur-sm border border-primary/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Pronto para Crescer?</h3>
              <p className="text-body mb-8">
                Preencha nosso formulário e nossa equipe comercial entrará em contato 
                para apresentar as oportunidades disponíveis em sua região.
              </p>
              
              <SimpleButton
                onClick={onCTAClick}
                className="btn-premium w-full text-lg py-4"
              >
                💼 QUERO SER DISTRIBUIDOR
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticDistributorSection;