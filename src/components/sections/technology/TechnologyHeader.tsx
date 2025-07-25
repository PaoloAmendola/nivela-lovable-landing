
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
      
      <h2 className="tech-main-title">
        ASTRO QUAT V3®
      </h2>
      
      {/* Descrição Principal com hierarquia melhorada */}
      <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
        <p className="tech-main-description">
          Desenvolvida ao longo de dois anos de pesquisa molecular avançada, ela atua em escala nanométrica para realinhar a estrutura dos fios com precisão, segurança e alta performance.
        </p>
      </div>
    </div>
  );
};

export default TechnologyHeader;
