-- Criar tabelas para salvar dados dos formulários

-- Tabela para requests de contato profissional (Hero CTA)
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  salon TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para requests de distribuidor
CREATE TABLE public.distributor_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  city TEXT NOT NULL,
  experience TEXT NOT NULL,
  referral TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (permitir inserção pública)
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributor_requests ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir inserção pública (landing page)
CREATE POLICY "Anyone can insert contact requests" 
ON public.contact_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert distributor requests" 
ON public.distributor_requests 
FOR INSERT 
WITH CHECK (true);

-- Função para atualizar timestamps automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps automaticamente
CREATE TRIGGER update_contact_requests_updated_at
  BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_distributor_requests_updated_at
  BEFORE UPDATE ON public.distributor_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();