import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/use-form-validation";
import { initialValues, validationRules } from "./constants";
import { SubmitState } from "./types";

export const useContactForm = (onClose: () => void) => {
  const [step, setStep] = useState(1);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const { toast } = useToast();

  const {
    getFieldProps,
    validateAll,
    resetForm,
    setFieldValue
  } = useFormValidation(initialValues, validationRules);

  const handleNextStep = () => {
    const stepFields = {
      1: ['name', 'whatsapp', 'profile']
    };

    const currentStepFields = stepFields[step as keyof typeof stepFields];
    if (currentStepFields) {
      const stepValid = currentStepFields.every(field => {
        const fieldProps = getFieldProps(field);
        return fieldProps.value && !fieldProps.error;
      });

      if (!stepValid) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos para continuar.",
          variant: "destructive"
        });
        return;
      }
    }

    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateAll()) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos corretamente.",
        variant: "destructive"
      });
      return;
    }

    setSubmitState('loading');

    // Simulando envio para API
    setTimeout(() => {
      const formData = {
        name: getFieldProps('name').value,
        whatsapp: getFieldProps('whatsapp').value,
        city: getFieldProps('city').value,
        state: getFieldProps('state').value,
        cnpj: getFieldProps('cnpj').value,
        profile: getFieldProps('profile').value
      };

      // Form submitted successfully
      setSubmitState('success');
      
      toast({
        title: "Acesso Solicitado com Sucesso!",
        description: "Recebemos seus dados e nossa equipe entrará em contato em até 24h.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitState('idle');
        resetForm();
        setStep(1);
        onClose();
      }, 2000);
    }, 1500);
  };

  return {
    step,
    submitState,
    getFieldProps,
    setFieldValue,
    handleNextStep,
    handlePrevStep,
    handleSubmit
  };
};