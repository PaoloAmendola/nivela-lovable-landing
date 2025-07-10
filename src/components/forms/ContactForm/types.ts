export interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormData {
  name: string;
  whatsapp: string;
  city: string;
  state: string;
  cnpj: string;
  profile: string;
}

export type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export interface BenefitItem {
  icon: any;
  text: string;
}