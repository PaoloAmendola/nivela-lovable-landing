
const FAQCTA = () => {
  return (
    <div className="text-center mt-16">
      <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 gradient-text-animated">
          Ainda tem dúvidas?
        </h3>
        <p className="text-brand-secondary mb-6 leading-relaxed">
          Nossa equipe está pronta para esclarecer qualquer questão sobre NIVELA®
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5511999999999?text=Olá! Tenho dúvidas sobre o NIVELA® e gostaria de conversar com um especialista."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            📱 WhatsApp Direto
          </a>
          <button className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            📞 Agendar Consultoria
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQCTA;
