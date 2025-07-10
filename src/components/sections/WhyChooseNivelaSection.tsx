import React from 'react';
import { motion } from 'framer-motion';
import ConsolidatedImage from '@/components/ui/ConsolidatedImage';
import { whyChooseFeatures } from './manifesto/manifesto-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const WhyChooseNivelaSection = () => {
  return (
    <section 
      id="why-choose" 
      data-section="why-choose"
      className="relative py-12 lg:py-16 bg-gradient-to-b from-[#0D181C] via-[#0F1B20] to-[#0D181C]"
    >
      {/* Background decorativo simples */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {/* Título Centralizado */}
          <motion.div variants={itemVariants} className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text">
              Por que escolher{' '}
              <span className="gradient-text font-bold">NIVELA®?</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Imagem do Produto */}
            <motion.div variants={itemVariants} className="relative mt-8">
              <ConsolidatedImage
                src="https://xnexfhgtqlryfkyuvihq.supabase.co/storage/v1/object/public/imagens/frasco-nivela.png"
                alt="NIVELA® - Retexturizador Hidro Nutritivo"
                width={400}
                height={400}
                priority={true}
                className="w-full h-auto max-w-sm mx-auto lg:max-w-md"
                onLoad={() => {}}
                onError={() => {}}
              />
            </motion.div>

            {/* Conteúdo */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Descrição */}
              <div className="space-y-4 mb-6">
                <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed">
                  NIVELA® é um retexturizador hidro nutritivo de alta performance, uma nova geração de escova progressiva sem formol.
                </p>
                
                <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed">
                  Combinando tecnologia avançada e ativos naturais da Amazônia, NIVELA® alinha, trata e transforma os fios, em uma única aplicação.
                </p>
                
                <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed font-semibold">
                  Exclusivo para o mercado profissional.
                </p>
              </div>

              {/* Features Numeradas */}
              <div className="space-y-4 mt-8">
                {whyChooseFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.number}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                      <span className="font-montserrat font-bold text-black text-sm">{feature.number}</span>
                    </div>
                    
                    <div>
                      <h4 className="text-lg md:text-xl font-montserrat font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm md:text-base font-montserrat text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseNivelaSection;