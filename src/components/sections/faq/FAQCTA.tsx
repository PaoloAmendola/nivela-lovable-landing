
const FAQCTA = () => {
  return (
    <div className="text-center mt-20">
      <div className="bg-background/20 backdrop-blur-sm border border-accent/20 rounded-2xl card-spacing max-w-3xl mx-auto">
        <h3 className="text-mobile-2xl md:text-2xl font-playfair font-bold mb-6 gradient-text">
          Ainda tem dúvidas?
        </h3>
        <p className="text-readable mb-8 text-mobile-base md:text-base leading-relaxed">
          Nossa equipe especializada está pronta para esclarecer qualquer questão sobre o NIVELA® e nosso ecossistema BemTech™.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="https://wa.me/5511999999999?text=Olá! Tenho dúvidas sobre o NIVELA® e gostaria de conversar com um especialista."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-mobile-base md:text-base min-h-[var(--touch-target-min)]"
          >
            📱 WhatsApp Direto
          </a>
          <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors text-mobile-base md:text-base min-h-[var(--touch-target-min)]">
            📞 Agendar Consultoria
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQCTA;
