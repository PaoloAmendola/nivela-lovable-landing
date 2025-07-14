import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from './manifesto-animations';

const ManifestoHeader = () => {
  return (
    <>
      {/* Título Principal */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="font-playfair text-center leading-tight">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Você não é apenas mais um profissional.
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-animated">
            Você é a referência que define tendências.
          </div>
        </h2>
      </motion.div>

      {/* Parágrafo do Manifesto */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <p className="font-montserrat text-lg lg:text-xl text-muted max-w-4xl mx-auto leading-relaxed">
          Acreditamos que profissionais extraordinários merecem ferramentas à altura de sua expertise. 
          NIVELA® representa uma nova era em retexturização capilar, onde tecnologia, performance e 
          sofisticação se encontram em perfeita harmonia.
        </p>
      </motion.div>
    </>
  );
};

export default ManifestoHeader;