import { CheckCircle, Star, Users, Gift } from "lucide-react";
import { BenefitItem } from "./types";

export const initialValues = {
  name: "",
  whatsapp: "",
  city: "",
  state: "",
  cnpj: "",
  profile: ""
};

export const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  whatsapp: {
    required: true,
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    custom: (value: string) => {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        return 'WhatsApp deve ter 10 ou 11 dígitos';
      }
      return null;
    }
  },
  city: {
    required: true,
    minLength: 2
  },
  state: {
    required: true
  },
  cnpj: {
    required: true,
    pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    custom: (value: string) => {
      // Remove formatação
      const digits = value.replace(/\D/g, '');
      
      if (digits.length !== 14) {
        return 'CNPJ deve ter 14 dígitos';
      }
      
      // Validação básica de CNPJ
      if (!/^[0-9]{14}$/.test(digits)) {
        return 'CNPJ deve conter apenas números';
      }
      
      // Verifica se todos os dígitos são iguais (CNPJ inválido)
      if (/^(\d)\1{13}$/.test(digits)) {
        return 'CNPJ inválido';
      }
      
      // Algoritmo de validação do CNPJ
      const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const weights2 = [6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];
      
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(digits[i]) * weights1[i];
      }
      
      let remainder = sum % 11;
      const digit1 = remainder < 2 ? 0 : 11 - remainder;
      
      if (parseInt(digits[12]) !== digit1) {
        return 'CNPJ inválido';
      }
      
      sum = 0;
      for (let i = 0; i < 13; i++) {
        sum += parseInt(digits[i]) * weights2[i];
      }
      
      remainder = sum % 11;
      const digit2 = remainder < 2 ? 0 : 11 - remainder;
      
      if (parseInt(digits[13]) !== digit2) {
        return 'CNPJ inválido';
      }
      
      return null;
    }
  },
  profile: {
    required: true
  }
};

export const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const benefits: BenefitItem[] = [
  { icon: CheckCircle, text: "Acesso a preços exclusivos para profissionais" },
  { icon: Star, text: "Suporte técnico dedicado e treinamento" },
  { icon: Users, text: "Comunidade exclusiva de profissionais" },
  { icon: Gift, text: "Kit digital profissional gratuito" }
];

export const stepTitles = [
  "Dados Profissionais",
  "Localização e Empresa"
];