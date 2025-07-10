
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
}

interface UseFormValidationReturn {
  fields: Record<string, FormField>;
  errors: Record<string, string | null>;
  isValid: boolean;
  validateField: (name: string, value: string) => void;
  validateAll: () => boolean;
  setFieldValue: (name: string, value: string) => void;
  setFieldTouched: (name: string) => void;
  resetForm: () => void;
  getFieldProps: (name: string) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error: string | null;
    touched: boolean;
  };
}

export const useFormValidation = (
  initialValues: Record<string, string>,
  validationRules: Record<string, ValidationRule>
): UseFormValidationReturn => {
  const [fields, setFields] = useState<Record<string, FormField>>(() => {
    const initialFields: Record<string, FormField> = {};
    Object.keys(initialValues).forEach(key => {
      initialFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false
      };
    });
    return initialFields;
  });

  const validateField = useCallback((name: string, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return 'Este campo é obrigatório';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Máximo ${rules.maxLength} caracteres`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      switch (name) {
        case 'email':
          return 'Email inválido';
        case 'whatsapp':
          return 'WhatsApp deve estar no formato (00) 00000-0000';
        case 'cnpj':
          return 'CNPJ deve estar no formato 00.000.000/0000-00';
        default:
          return 'Formato inválido';
      }
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationRules]);

  const setFieldValue = useCallback((name: string, value: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validateField(name, value)
      }
    }));
  }, [validateField]);

  const setFieldTouched = useCallback((name: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true
      }
    }));
  }, []);

  const validateAllFields = useCallback(() => {
    let isFormValid = true;
    const newFields = { ...fields };

    Object.keys(fields).forEach(name => {
      const error = validateField(name, fields[name].value);
      newFields[name] = {
        ...newFields[name],
        error,
        touched: true
      };
      if (error) isFormValid = false;
    });

    setFields(newFields);
    return isFormValid;
  }, [fields, validateField]);

  const resetForm = useCallback(() => {
    const resetFields: Record<string, FormField> = {};
    Object.keys(initialValues).forEach(key => {
      resetFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false
      };
    });
    setFields(resetFields);
  }, [initialValues]);

  const getFieldProps = useCallback((name: string) => ({
    value: fields[name]?.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(name, e.target.value);
    },
    onBlur: () => {
      setFieldTouched(name);
    },
    error: fields[name]?.touched ? fields[name]?.error : null,
    touched: fields[name]?.touched || false
  }), [fields, setFieldValue, setFieldTouched]);

  const errors = Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].error;
    return acc;
  }, {} as Record<string, string | null>);

  const isValid = Object.values(fields).every(field => !field.error);

  return {
    fields,
    errors,
    isValid,
    validateField: (name: string, value: string) => {
      setFieldValue(name, value);
    },
    validateAll: validateAllFields,
    setFieldValue,
    setFieldTouched,
    resetForm,
    getFieldProps
  };
};
