import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { SimpleButton } from "@/components/ui/SimpleButton";

interface StaticContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaticContactModal: React.FC<StaticContactModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple form submission logic here
    alert("Formulário enviado! Em breve entraremos em contato.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background border border-accent/20">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </button>
          
          <DialogTitle className="text-2xl font-bold text-center text-primary mb-2">
            SOLICITAR ACESSO PROFISSIONAL
          </DialogTitle>
          
          <p className="text-center text-muted-foreground">
            Preencha seus dados para receber informações exclusivas sobre o NIVELA®
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-background/50 focus:border-primary focus:outline-none transition-colors"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Telefone/WhatsApp *</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-background/50 focus:border-primary focus:outline-none transition-colors"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Salão *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-background/50 focus:border-primary focus:outline-none transition-colors"
                placeholder="Nome do seu salão"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cidade *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-background/50 focus:border-primary focus:outline-none transition-colors"
                placeholder="Sua cidade"
              />
            </div>
          </div>

          <div className="mt-8">
            <SimpleButton 
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg font-bold min-h-[60px] shadow-lg"
            >
              🎯 SOLICITAR ACESSO PROFISSIONAL
            </SimpleButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaticContactModal;