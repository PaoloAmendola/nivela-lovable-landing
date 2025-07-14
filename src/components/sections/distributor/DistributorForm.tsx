import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DistributorFormProps {
  onSubmit?: (data: any) => void;
}

const validationRules = {
  name: { required: true, minLength: 2 },
  email: { 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  whatsapp: { 
    required: true, 
    pattern: /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/
  },
  city: { required: true, minLength: 2 },
  experience: { required: true }
};

const DistributorForm = ({ onSubmit }: DistributorFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    getFieldProps,
    validateAll,
    isValid,
    resetForm
  } = useFormValidation(
    {
      name: "",
      email: "",
      whatsapp: "",
      city: "",
      experience: "",
      referral: "",
      notes: ""
    },
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submission attempt:", {
      isValid,
      fields: Object.keys(validationRules).map(key => ({
        key,
        value: getFieldProps(key).value,
        error: getFieldProps(key).error,
        required: validationRules[key as keyof typeof validationRules]?.required
      }))
    });
    
    if (!validateAll()) {
      console.log("Validation failed");
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = {
        name: getFieldProps("name").value,
        email: getFieldProps("email").value,
        whatsapp: getFieldProps("whatsapp").value,
        city: getFieldProps("city").value,
        experience: getFieldProps("experience").value,
        referral: getFieldProps("referral").value || null,
        notes: getFieldProps("notes").value || null
      };
      
      console.log("Sending form data:", formData);
      
      // Salvar diretamente no Supabase
      const { error } = await supabase
        .from('distributor_requests')
        .insert(formData);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Form submitted successfully");

      // Sucesso
      toast({
        title: "Solicitação Enviada!",
        description: "Entraremos em contato em até 48h úteis.",
      });

      // Callback opcional para outras ações (ex: analytics)
      if (onSubmit) {
        onSubmit(formData);
      }

      // Reset form
      resetForm();
      
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao Enviar",
        description: `Erro: ${errorMessage}. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <Label htmlFor="name" className="text-contrast font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                {...getFieldProps("name")}
                className="mt-1"
                placeholder="Seu nome completo"
              />
              {getFieldProps("name").error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldProps("name").error}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-contrast font-medium">
                Email Corporativo *
              </Label>
              <Input
                id="email"
                type="email"
                {...getFieldProps("email")}
                className="mt-1"
                placeholder="seu.email@empresa.com"
              />
              {getFieldProps("email").error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldProps("email").error}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="whatsapp" className="text-contrast font-medium">
                WhatsApp *
              </Label>
              <Input
                id="whatsapp"
                {...getFieldProps("whatsapp")}
                onChange={(e) => {
                  const formatted = formatWhatsApp(e.target.value);
                  getFieldProps("whatsapp").onChange({ target: { value: formatted } } as any);
                }}
                className="mt-1"
                placeholder="(11) 99999-9999"
              />
              {getFieldProps("whatsapp").error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldProps("whatsapp").error}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="city" className="text-contrast font-medium">
                Cidade/Estado *
              </Label>
              <Input
                id="city"
                {...getFieldProps("city")}
                className="mt-1"
                placeholder="São Paulo/SP"
              />
              {getFieldProps("city").error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldProps("city").error}
                </p>
              )}
            </div>

            <div>
              <Label className="text-contrast font-medium">
                Experiência no Setor *
              </Label>
              <Select 
                value={getFieldProps("experience").value} 
                onValueChange={(value) => getFieldProps("experience").onChange({ target: { value } } as any)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione sua experiência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novato">Iniciante no setor</SelectItem>
                  <SelectItem value="1-3">1 a 3 anos</SelectItem>
                  <SelectItem value="3-5">3 a 5 anos</SelectItem>
                  <SelectItem value="5+">Mais de 5 anos</SelectItem>
                </SelectContent>
              </Select>
              {getFieldProps("experience").error && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldProps("experience").error}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="referral" className="text-contrast font-medium">
                Como nos conheceu?
              </Label>
              <Input
                id="referral"
                {...getFieldProps("referral")}
                className="mt-1"
                placeholder="Google, indicação, evento..."
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-contrast font-medium">
                Observações
              </Label>
              <Textarea
                id="notes"
                value={getFieldProps("notes").value}
                onChange={(e) => getFieldProps("notes").onChange(e as any)}
                onBlur={getFieldProps("notes").onBlur}
                className="mt-1 min-h-[80px]"
                placeholder="Conte-nos mais sobre seu interesse..."
              />
            </div>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full mt-6"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Solicitar Parceria
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DistributorForm;