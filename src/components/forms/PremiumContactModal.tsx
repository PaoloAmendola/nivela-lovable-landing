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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salon: "",
    city: "",
    experience: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        salon: "",
        city: "",
        experience: ""
      });
    }, 3000);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const canProceed = step === 1 
    ? formData.name && formData.email && formData.phone
    : formData.salon && formData.city && formData.experience;

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
              className="text-3xl lg:text-4xl font-playfair font-bold gradient-text mb-4"
            >
              {step === 1 ? "Seus Dados Profissionais" : "Informações do Salão"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-readable font-montserrat"
            >
              Preços especiais + suporte técnico dedicado
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

          {/* Progress */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2].map((i) => (
              <motion.div 
                key={i}
                className={`flex items-center gap-2 ${i < 2 ? 'flex-1' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  i === step 
                    ? 'bg-primary border-primary text-white' 
                    : i < step 
                      ? 'bg-primary/20 border-primary text-primary' 
                      : 'border-primary/30 text-primary/50'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i}
                </div>
                {i < 2 && (
                  <div className={`h-0.5 flex-1 transition-all ${
                    i < step ? 'bg-primary' : 'bg-primary/20'
                  }`} />
                )}
              </motion.div>
            ))}
          </div>

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative overflow-hidden h-80">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium font-montserrat text-readable mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors font-montserrat"
                          placeholder="Seu nome profissional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium font-montserrat text-readable mb-2">
                          E-mail Profissional *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors font-montserrat"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium font-montserrat text-readable mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors font-montserrat"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium font-montserrat text-readable mb-2">
                          Nome do Salão *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.salon}
                          onChange={(e) => setFormData({...formData, salon: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors font-montserrat"
                          placeholder="Nome do seu salão"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium font-montserrat text-readable mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors font-montserrat"
                          placeholder="Sua cidade"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium font-montserrat text-readable mb-2">
                        Experiência Profissional *
                      </label>
                      <select
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none transition-colors font-montserrat"
                      >
                        <option value="">Selecione sua experiência</option>
                        <option value="1-3">1-3 anos</option>
                        <option value="4-7">4-7 anos</option>
                        <option value="8-15">8-15 anos</option>
                        <option value="15+">Mais de 15 anos</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} items-center pt-6`}>
              {step > 1 && (
                <EnhancedButton 
                  type="button"
                  variant="outline" 
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </EnhancedButton>
              )}
              
              {step < 2 ? (
                <EnhancedButton 
                  type="button"
                  onClick={nextStep}
                  variant="premium"
                  disabled={!canProceed}
                  className="shadow-elegant hover:shadow-glow"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </EnhancedButton>
              ) : (
                <EnhancedButton 
                  type="submit"
                  variant="premium"
                  disabled={!canProceed || isSubmitting}
                  loading={isSubmitting}
                  loadingMessage="Enviando solicitação..."
                  className="shadow-elegant hover:shadow-glow"
                >
                  🎯 Solicitar Acesso Profissional
                </EnhancedButton>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumContactModal;