import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Smartphone, Phone, Mail, MapPin, Globe, Instagram, Video } from "lucide-react";

const StaticLegalSection = () => {
  return (
    <section className="py-16 section-gradient-final relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-accent blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-primary blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* NIVELA® Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 wilkysta-title text-primary">NIVELA®</h3>
              <p className="text-body leading-relaxed">
                Tecnologia brasileira em tratamentos capilares. Desenvolvido por especialistas 
                para profissionais que buscam excelência e resultados extraordinários.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Bem Beauty Professional</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>São Paulo, SP - Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>contato@bembeauty.com.br</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Acesso Rápido</h4>
              <div className="space-y-2">
                <a href="#hero" className="block text-body hover:text-primary transition-colors">
                  Início
                </a>
                <a href="#manifesto" className="block text-body hover:text-primary transition-colors">
                  Sobre NIVELA®
                </a>
                <a href="#tecnologia" className="block text-body hover:text-primary transition-colors">
                  Tecnologia
                </a>
                <a href="#distributor" className="block text-body hover:text-primary transition-colors">
                  Seja Distribuidor
                </a>
                <a href="#faq" className="block text-body hover:text-primary transition-colors">
                  FAQ
                </a>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Conecte-se</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Instagram className="w-5 h-5 text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Video className="w-5 h-5 text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Globe className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Informações Legais</h4>
              <div className="space-y-2 text-sm">
                <p>CNPJ: 00.000.000/0001-00</p>
                <p>Registro ANVISA: 123456789</p>
                <p>Todos os direitos reservados</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © 2024 NIVELA® - Bem Beauty Professional. Todos os direitos reservados.
            <br />
            Desenvolvido com tecnologia brasileira para profissionais brasileiros.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StaticLegalSection;