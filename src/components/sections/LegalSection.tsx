
import { Separator } from "@/components/ui/separator";
import { Smartphone, Phone, Mail, MapPin, Globe, Instagram, Video } from "lucide-react";

const LegalSection = () => {

  return (
    <section className="py-16 section-gradient-final relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-accent blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-primary blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:text-left text-left">
            {/* Canais de Atendimento */}
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl gradient-text-animated flex items-center gap-3">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                Canais de Atendimento
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/552139500901" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-green-400 transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 items-start" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed">WhatsApp: (21) 3950-0901</span>
                </a>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5 items-start" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed">(21) 3269-0484</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5 items-start" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed">comercial@bembeauty.com.br</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl gradient-text-animated flex items-center gap-3">
                <Globe className="w-5 h-5" strokeWidth={1.5} />
                Redes Sociais
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5 items-start" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed">www.bembeauty.com.br</span>
                </div>
                <a 
                  href="https://www.instagram.com/bembeautyprofessional/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5 items-start" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed">@bembeautyprofessional</span>
                </a>
                <a 
                  href="https://youtu.be/lDKNZIztUMw?si=qJPZwKoXcYssVjK5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-red-400 transition-colors"
                >
                  <Video className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5 items-start" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed">Bem Beauty Professional</span>
                </a>
              </div>
            </div>

            {/* Endereços */}
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl gradient-text-animated flex items-center gap-3">
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
                Endereços
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground font-montserrat leading-relaxed">Matriz - RJ</p>
                  <p className="text-contrast font-montserrat leading-relaxed">Av. Cesário de Melo, nº 3006</p>
                  <p className="text-contrast font-montserrat leading-relaxed">Campo Grande - Rio de Janeiro - RJ</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground font-montserrat leading-relaxed">Centro Logístico - ES</p>
                  <p className="text-contrast font-montserrat leading-relaxed">Rod. Gov. Mário Covas, Galpão 04</p>
                  <p className="text-contrast font-montserrat leading-relaxed">Guarapari - ES</p>
                </div>
              </div>
            </div>
          </div>

          
          {/* Legal Footer */}
          <Separator className="bg-accent/20 mb-8" />
          
            <div className="text-contrast space-y-4">
              <p className="text-center font-montserrat leading-relaxed">
                NIVELA® é uma marca registrada da Bem Beauty Professional. Todos os direitos reservados.
                CNPJ: 51.635.148/0001-33. © 2025 Bem Beauty Professional.
              </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default LegalSection;
