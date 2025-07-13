
import { Badge } from "@/components/ui/badge";
import StyledIcon from "@/components/ui/StyledIcon";
import { Dna } from "lucide-react";

const TechnologyHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 mb-4">
        <StyledIcon icon={Dna} variant="minimal" size="sm" color="accent" />
        <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
          Inovação Patenteada
        </Badge>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-6 lg:mb-8">
        ASTRO QUAT V3®
      </h2>
      
      {/* Descrição Principal */}
      <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
        <p className="text-base md:text-lg font-montserrat text-muted leading-relaxed">
          Desenvolvida através de pesquisa molecular avançada, esta inovação patenteada atua em escala nanométrica para promover o realinhamento das fibras capilares de forma segura, eficaz e duradoura.
        </p>
      </div>
    </div>
  );
};

export default TechnologyHeader;
