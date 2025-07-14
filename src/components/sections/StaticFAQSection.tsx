import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const StaticFAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData = [
    {
      question: "NIVELA® é realmente livre de formol?",
      answer: "Absolutamente. NIVELA® utiliza a tecnologia patenteada ASTRO QUAT V3®, completamente livre de formol, formaldeído ou qualquer substância similar.",
      category: "formol"
    },
    {
      question: "Quanto tempo dura o resultado do tratamento?",
      answer: "Os resultados do NIVELA® podem durar de 4 a 6 meses, dependendo dos cuidados pós-tratamento e do tipo de cabelo da cliente.",
      category: "resultados"
    },
    {
      question: "É necessário treinamento para aplicar NIVELA®?",
      answer: "Sim, oferecemos treinamento completo e certificação para garantir a aplicação correta e resultados excepcionais.",
      category: "treinamento"
    },
    {
      question: "NIVELA® funciona em todos os tipos de cabelo?",
      answer: "NIVELA® é eficaz em diversos tipos de cabelo, desde os mais crespos até os ondulados, sempre respeitando a estrutura capilar.",
      category: "tipos"
    },
    {
      question: "Qual é o tempo de aplicação?",
      answer: "O tempo varia conforme o comprimento e densidade do cabelo, mas geralmente fica entre 2 a 4 horas para um resultado completo.",
      category: "tempo"
    },
    {
      question: "Como adquirir NIVELA® para meu salão?",
      answer: "Entre em contato através do nosso formulário e nossa equipe comercial apresentará as melhores condições para seu estabelecimento.",
      category: "compra"
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="section-spacing bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title mb-6">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-body-large max-w-3xl mx-auto">
            Esclarecemos as principais dúvidas sobre NIVELA® para que você possa 
            tomar a melhor decisão para seu salão e suas clientes.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
            <p className="text-body mb-6">
              Nossa equipe técnica está pronta para esclarecer qualquer questão específica sobre NIVELA®.
            </p>
            <button className="btn-premium">
              💬 FALAR COM ESPECIALISTA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticFAQSection;