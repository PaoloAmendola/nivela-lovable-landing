
import { Card, CardContent } from "@/components/ui/card";
import StyledIcon from "@/components/ui/StyledIcon";
import { Award, Star } from "lucide-react";

const ProfessionalExclusivity = () => {
  return (
    <div className="mb-16">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <StyledIcon 
              icon={Award} 
              variant="glow" 
              size="xl"
              color="primary"
              className="mx-auto"
            />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-6 gradient-text">
            ASTRO QUAT V3® é Inovação com Propósito
          </h3>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-lg text-foreground font-semibold">
              Resultados reais, cuidado profundo e alta performance profissional.
            </p>
            <p className="text-xl text-primary font-bold">
              Exclusivamente para cabeleireiros que buscam excelência.
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-2 mt-8 text-accent">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalExclusivity;
