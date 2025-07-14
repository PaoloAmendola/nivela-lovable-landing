import React from 'react';
import { motion } from 'framer-motion';

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

const ManifestoTextSection = () => {
  return (
    <section 
      id="manifesto-text" 
      data-section="manifesto-text"
      className="bg-[#0D181C] text-white px-5 py-12 lg:py-20 text-center transition-all duration-500"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto space-y-4"
      >
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-2xl font-light leading-relaxed tracking-wide"
        >
          Acreditamos que <strong>profissionais extraordinários</strong> merecem ferramentas à altura de sua expertise.
          {' '}
          <span className="wilkysta-title text-[#D9C0AA] font-semibold">NIVELA®</span> representa uma nova era em <span className="italic">retexturização capilar</span>,
          onde <span className="font-medium">tecnologia</span>, <span className="font-medium">performance</span> e <span className="font-medium">sofisticação</span> se encontram em perfeita harmonia.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="w-16 h-[2px] bg-[#254C5A] mx-auto mt-4"
        />
      </motion.div>
    </section>
  );
};

export default ManifestoTextSection;