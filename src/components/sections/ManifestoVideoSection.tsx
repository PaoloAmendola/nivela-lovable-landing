import React from 'react';
import { motion } from 'framer-motion';
import ManifestoVideo from './manifesto/ManifestoVideo';

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

const ManifestoVideoSection = () => {
  return (
    <section 
      id="manifesto-video" 
      data-section="manifesto-video"
      className="relative py-4 sm:py-6 lg:py-8 bg-gradient-to-b from-[#0D181C] via-[#0F1B20] to-[#0D181C]"
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
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <ManifestoVideo />
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoVideoSection;