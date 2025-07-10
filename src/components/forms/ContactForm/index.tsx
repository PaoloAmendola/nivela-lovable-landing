import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnhancedButton } from "@/components/ui/EnhancedButton";
import SmartLoading from "@/components/ui/SmartLoading";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Gift } from "lucide-react";
import { ContactFormProps } from "./types";
import { useContactForm } from "./useContactForm";
import { stepTitles } from "./constants";
import Step1 from "./Step1";
import Step2 from "./Step2";

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const {
    step,
    submitState,
    getFieldProps,
    setFieldValue,
    handleNextStep,
    handlePrevStep,
    handleSubmit
  } = useContactForm(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border border-accent/30 sm:max-w-lg">
        <DialogHeader>
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
              <Gift className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-medium text-sm">Acesso Profissional Exclusivo</span>
            </div>
            <DialogTitle className="text-2xl font-playfair font-bold gradient-text">
              {stepTitles[step - 1]}
            </DialogTitle>
            <p className="text-sm text-readable mt-2">
              Preços especiais + suporte dedicado para profissionais
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2].map((i) => (
              <motion.div 
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i === step ? 'bg-primary' : i < step ? 'bg-accent' : 'bg-secondary/50'
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            ))}
          </div>

          <div className="relative overflow-hidden h-96">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <Step1 
                  getFieldProps={getFieldProps}
                  setFieldValue={setFieldValue}
                />
              )}

              {step === 2 && (
                <Step2 
                  getFieldProps={getFieldProps}
                  setFieldValue={setFieldValue}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} items-center pt-4`}>
            {step > 1 && (
              <EnhancedButton 
                type="button"
                variant="outline" 
                onClick={handlePrevStep}
                disabled={submitState === 'loading'}
                className="border-accent/50 text-accent hover:bg-accent/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </EnhancedButton>
            )}
            
            <div className="flex items-center gap-4">
              <SmartLoading 
                state={submitState} 
                message={
                  submitState === 'loading' ? 'Enviando...' :
                  submitState === 'success' ? 'Enviado!' :
                  submitState === 'error' ? 'Erro ao enviar' : ''
                }
                size="sm"
              />
              
              {step < 2 ? (
                <EnhancedButton 
                  type="button"
                  onClick={handleNextStep}
                  variant="default"
                  disabled={submitState === 'loading'}
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </EnhancedButton>
              ) : (
                <EnhancedButton 
                  type="submit"
                  variant="default"
                  disabled={submitState === 'loading' || submitState === 'success'}
                  loading={submitState === 'loading'}
                >
                  {submitState === 'success' ? '✅ Enviado!' : '🎯 Solicitar Acesso Profissional'}
                </EnhancedButton>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;