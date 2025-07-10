
import FAQHeader from "./faq/FAQHeader";
import FAQGrid from "./faq/FAQGrid";
import FAQCTA from "./faq/FAQCTA";

const FAQSection = () => {
  const faqData = [
    {
      question: "NIVELA® é realmente livre de formol?",
      answer: "Absolutamente. NIVELA® utiliza a tecnologia patenteada ASTRO QUAT V3®, completamente livre de formol, formaldeído ou qualquer substância similar.",
      category: "formol"
    },
    {
      question: "Qual o diferencial da textura em gel?",
      answer: "A textura gel inteligente proporciona 30% mais rendimento comparado aos cremes convencionais, além de facilitar a aplicação uniforme e reduzir o desperdício, otimizando seu investimento.",
      category: "textura"
    },
    {
      question: "NIVELA® funciona em todos os tipos de cabelo?",
      answer: "Sim. A tecnologia ASTRO QUAT V3® foi desenvolvida para ser eficaz em todos os tipos de cabelo, desde os mais resistentes até os mais sensibilizados, sempre respeitando a estrutura natural dos fios.",
      category: "aplicação"
    },
    {
      question: "É necessário treinamento específico?",
      answer: "Embora NIVELA® seja de fácil aplicação, oferecemos acesso completo ao ecossistema BemTech™, incluindo treinamentos especializados, suporte técnico e materiais didáticos exclusivos.",
      category: "treinamento"
    },
    {
      question: "Como funciona o suporte técnico?",
      answer: "Você terá acesso 24/7 ao BEMBOT™, nossa IA especializada, além de suporte direto via WhatsApp e acesso ao portal exclusivo com materiais técnicos e comerciais.",
      category: "suporte"
    },
    {
      question: "NIVELA® pode ser usado com outros tratamentos?",
      answer: "Sim, NIVELA® é compatível com colorações, luzes e outros tratamentos químicos, sempre respeitando os intervalos adequados e protocolos de segurança.",
      category: "compatibilidade"
    },
    {
      question: "Como me torno um profissional autorizado?",
      answer: "O acesso a NIVELA® é exclusivo para profissionais qualificados. Complete nosso formulário de cadastro para avaliação e aprovação da sua candidatura.",
      category: "autorização"
    },
    {
      question: "Existe suporte para marketing e vendas?",
      answer: "Sim! O ecossistema BemTech™ inclui materiais prontos para redes sociais, scripts de vendas, campanhas e tudo que você precisa para potencializar seus resultados comerciais.",
      category: "marketing"
    }
  ];

  const categoryColors = {
    formol: "text-emerald-600",
    textura: "text-blue-600", 
    aplicação: "text-violet-600",
    treinamento: "text-amber-600",
    suporte: "text-orange-600",
    compatibilidade: "text-teal-600",
    autorização: "text-rose-600",
    marketing: "text-pink-600"
  };

  return (
    <section className="py-12 lg:py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FAQHeader />
        <FAQGrid faqData={faqData} categoryColors={categoryColors} />
        <FAQCTA />
      </div>
    </section>
  );
};

export default FAQSection;
