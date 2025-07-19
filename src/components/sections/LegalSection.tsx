
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-center md:text-left">
            {/* Canais de Atendimento */}
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl gradient-text-animated flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
                Canais de Atendimento
              </h4>
              <div className="space-y-3 md:ml-8">
                <a 
                  href="https://wa.me/552139500901" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-green-400 transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">WhatsApp: (21) 3950-0901</span>
                </a>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">(21) 3269-0484</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">comercial@bembeauty.com.br</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl gradient-text-animated flex items-center justify-center md:justify-start gap-3">
                <Globe className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
                Redes Sociais
              </h4>
              <div className="space-y-3 md:ml-8">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Globe className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">www.bembeauty.com.br</span>
                </div>
                <a 
                  href="https://www.instagram.com/bembeautyprofessional/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">@bembeautyprofessional</span>
                </a>
                <a 
                  href="https://youtu.be/lDKNZIztUMw?si=qJPZwKoXcYssVjK5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-red-400 transition-colors"
                >
                  <Video className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                  <span className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">Bem Beauty Professional</span>
                </a>
              </div>
            </div>

            {/* Endereços */}
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl gradient-text-animated flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
                Endereços
              </h4>
              <div className="space-y-4 md:ml-8">
                <div className="text-center md:text-left">
                  <p className="font-semibold text-foreground font-montserrat leading-relaxed text-base lg:text-lg">Matriz - RJ</p>
                  <p className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">Av. Cesário de Melo, nº 3006</p>
                  <p className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">Campo Grande - Rio de Janeiro - RJ</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-foreground font-montserrat leading-relaxed text-base lg:text-lg">Centro Logístico - ES</p>
                  <p className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">Rod. Gov. Mário Covas, Galpão 04</p>
                  <p className="text-contrast font-montserrat leading-relaxed text-base lg:text-lg">Guarapari - ES</p>
                </div>
              </div>
            </div>
          </div>

          
          {/* Legal Footer */}
          <Separator className="bg-accent/20 mb-8" />
          
          <div className="text-contrast space-y-4">
            <p className="text-center font-montserrat leading-relaxed text-base lg:text-lg">
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
