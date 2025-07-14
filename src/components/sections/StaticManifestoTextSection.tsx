import React from 'react';

const StaticManifestoTextSection = () => {
  return (
    <section 
      id="manifesto-text" 
      data-section="manifesto-text"
      className="bg-[#0D181C] text-white px-5 py-12 lg:py-20 text-center transition-all duration-500"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <p className="text-base sm:text-lg lg:text-2xl font-light leading-relaxed tracking-wide">
          Acreditamos que <strong>profissionais extraordinários</strong> merecem ferramentas à altura de sua expertise.
          {' '}
          <span className="wilkysta-title text-[#D9C0AA] font-semibold">NIVELA®</span> representa uma nova era em <span className="italic">retexturização capilar</span>,
          onde <span className="font-medium">tecnologia</span>, <span className="font-medium">performance</span> e <span className="font-medium">sofisticação</span> se encontram em perfeita harmonia.
        </p>

        <div className="w-16 h-[2px] bg-[#254C5A] mx-auto mt-4" />
      </div>
    </section>
  );
};

export default StaticManifestoTextSection;