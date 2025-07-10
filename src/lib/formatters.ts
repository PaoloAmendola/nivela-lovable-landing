/**
 * Formatadores de campos para formulários
 */

export const formatWhatsApp = (value: string): string => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const limited = digits.slice(0, 11);
  
  // Aplica formatação
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  } else if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
};

export const formatCNPJ = (value: string): string => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '');
  
  // Limita a 14 dígitos
  const limited = digits.slice(0, 14);
  
  // Aplica formatação: XX.XXX.XXX/XXXX-XX
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)}.${limited.slice(2)}`;
  } else if (limited.length <= 8) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
  } else if (limited.length <= 12) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`;
  } else {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12)}`;
  }
};

export const formatCPF = (value: string): string => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const limited = digits.slice(0, 11);
  
  // Aplica formatação: XXX.XXX.XXX-XX
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
  }
};

export const validateCNPJ = (cnpj: string): boolean => {
  // Remove formatação
  const digits = cnpj.replace(/\D/g, '');
  
  if (digits.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(digits)) return false;
  
  // Algoritmo de validação
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * weights1[i];
  }
  
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(digits[12]) !== digit1) return false;
  
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits[i]) * weights2[i];
  }
  
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(digits[13]) === digit2;
};

export const validateCPF = (cpf: string): boolean => {
  // Remove formatação
  const digits = cpf.replace(/\D/g, '');
  
  if (digits.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(digits)) return false;
  
  // Algoritmo de validação
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(digits[9]) !== digit1) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i);
  }
  
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(digits[10]) === digit2;
};