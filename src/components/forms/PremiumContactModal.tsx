import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import { X, Gift, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { useContactForm } from "./ContactForm/useContactForm";

interface PremiumContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumContactModal = ({ isOpen, onClose }: PremiumContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    salon: "",
    city: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({
        name: "",
        phone: "",
        salon: "",
        city: ""
      });
    }, 3000);
  };

  const canProceed = formData.name && formData.phone && formData.salon && formData.city;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-background via-background/95 to-primary/5 border border-primary/20 backdrop-blur-xl sm:max-w-2xl p-0 overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/5 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 px-6 py-3 rounded-full mb-6 border border-primary/30"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium text-sm font-montserrat">
                Acesso Profissional Exclusivo
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-playfair font-bold gradient-text mb-4"
            >
              Solicitar Acesso Profissional
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-readable font-montserrat"
            >
              Preencha os dados abaixo e nossa equipe entrará em contato em até 24h
            </motion.p>
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-primary/10 transition-colors z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-readable" />
          </motion.button>


          {/* Success State */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex flex-col items-center justify-center text-center z-30"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-playfair font-bold text-green-700 mb-2">
                  Solicitação Enviada!
                </h3>
                <p className="text-green-600 font-montserrat">
                  Nossa equipe entrará em contato em até 24 horas
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-semibold font-montserrat text-readable mb-3">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-5 text-lg rounded-xl border border-primary/40 bg-white/90 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors font-montserrat"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold font-montserrat text-readable mb-3">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-5 text-lg rounded-xl border border-primary/40 bg-white/90 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors font-montserrat"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-semibold font-montserrat text-readable mb-3">
                    Nome do Salão *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.salon}
                    onChange={(e) => setFormData({...formData, salon: e.target.value})}
                    className="w-full px-6 py-5 text-lg rounded-xl border border-primary/40 bg-white/90 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors font-montserrat"
                    placeholder="Nome do seu salão de beleza"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold font-montserrat text-readable mb-3">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-6 py-5 text-lg rounded-xl border border-primary/40 bg-white/90 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors font-montserrat"
                    placeholder="Sua cidade"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <EnhancedButton 
                type="submit"
                variant="premium"
                disabled={!canProceed || isSubmitting}
                loading={isSubmitting}
                loadingMessage="Enviando solicitação..."
                className="w-full max-w-md py-6 text-xl font-bold min-h-[72px] shadow-elegant hover:shadow-glow"
              >
                🎯 SOLICITAR ACESSO PROFISSIONAL
              </EnhancedButton>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumContactModal;