

import React from 'react';
import { motion } from 'framer-motion';
import LocalImage from '@/components/ui/LocalImage';
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text-animated">
              O que é{' '}
              <span className="wilkysta-title gradient-text-animated font-bold">NIVELA®?</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Imagem do Produto - Nova imagem 600x600 com fundo transparente */}
            <motion.div variants={itemVariants} className="relative mt-8">
              <LocalImage
                src="/lovable-uploads/f6082ed7-48d8-474a-b65c-62d74f60fe42.png"
                alt="NIVELA® 1kg - Retexturizador Hidro Nutritivo BEM BEAUTY PROFESSIONAL"
                width={600}
                height={600}
                priority={true}
                className="w-full h-auto max-w-sm mx-auto lg:max-w-md"
                onLoad={() => {/* Image loaded */}}
                onError={() => {/* Image error handled */}}
              />
            </motion.div>

            {/* Conteúdo */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Descrição */}
              <div className="space-y-4 mb-6">
                <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed">
                  NIVELA® é um retexturizador hidro nutritivo de alta performance, representando uma nova geração de escova progressiva completamente livre de formol.
                </p>
                
                <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed">
                  Combinando tecnologia avançada com ativos naturais da Amazônia, transforma e trata os fios em uma única aplicação.
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

