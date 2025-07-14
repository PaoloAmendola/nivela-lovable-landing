import React from 'react';
import { motion } from 'framer-motion';
import ConsolidatedImage from '@/components/ui/ConsolidatedImage';
import { whyChooseFeatures } from './manifesto-data';
import { containerVariants, itemVariants } from './manifesto-animations';

const WhyChooseSection = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-7xl mx-auto mt-20 lg:mt-32"
    >
      {/* Título Centralizado - Desktop */}
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text-animated">
          Por que escolher{' '}
          <span className="text-gradient-primary font-bold">NIVELA®?</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Imagem do Produto */}
        <motion.div variants={itemVariants} className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 p-4">
            <ConsolidatedImage
              src="/lovable-uploads/fb01bf6c-423a-4a80-9a4a-5a4ccf948269.png"
              alt="NIVELA® - Retexturizador Hidro Nutritivo"
              width={600}
              height={600}
              priority={true}
              className="w-full h-auto rounded-xl"
              onLoad={() => {}}
              onError={() => {}}
            />
          </div>
        </motion.div>

        {/* Conteúdo */}
        <motion.div variants={itemVariants} className="space-y-6">

          {/* Descrição */}
          <div className="space-y-4">
            <p className="font-montserrat text-base lg:text-lg text-gray-200 leading-relaxed">
              NIVELA® é um retexturizador hidro nutritivo de alta performance, uma nova geração de escova progressiva sem formol.
            </p>
            
            <p className="font-montserrat text-base lg:text-lg text-gray-200 leading-relaxed">
              Combinando tecnologia avançada e ativos naturais da Amazônia, NIVELA® alinha, trata e transforma os fios, em uma única aplicação.
            </p>
            
            <p className="font-montserrat text-base lg:text-lg text-gray-200 leading-relaxed font-semibold">
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
                  <h4 className="font-montserrat font-semibold text-white text-base mb-1">
                    {feature.title}
                  </h4>
                  <p className="font-montserrat text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhyChooseSection;