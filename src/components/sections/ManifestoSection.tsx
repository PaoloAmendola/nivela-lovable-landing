
import React from 'react';
import { motion } from 'framer-motion';
import ManifestoHeader from './manifesto/ManifestoHeader';
import ManifestoVideo from './manifesto/ManifestoVideo';
import WhyChooseSection from './manifesto/WhyChooseSection';
import { containerVariants } from './manifesto/manifesto-animations';

interface ManifestoSectionProps {
  onCTAClick?: () => void;
}

const ManifestoSection = ({ onCTAClick }: ManifestoSectionProps) => {
  return (
    <section 
      id="manifesto" 
      data-section="manifesto"
      className="relative py-12 lg:py-20 bg-gradient-to-b from-[#0D181C] via-[#0F1B20] to-[#0D181C]"
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
          <ManifestoHeader />
          <WhyChooseSection />
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
