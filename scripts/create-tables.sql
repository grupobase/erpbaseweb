-- Criar schema para a aplicação se não existir
CREATE SCHEMA IF NOT EXISTS public;

-- Tabela de leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Dados pessoais
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Dados profissionais
    clinic_name TEXT,
    specialty TEXT NOT NULL DEFAULT 'medicina',
    crm_number TEXT,
    
    -- Dados da captura
    message TEXT,
    source TEXT DEFAULT 'website',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    
    -- Status e atribuição
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    assigned_to TEXT REFERENCES neon_auth.users_sync(id),
    
    -- Metadados
    ip_address INET,
    user_agent TEXT,
    page_url TEXT,
    referrer TEXT,
    
    -- Índices para busca
    CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Tabela de atividades dos leads
CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES neon_auth.users_sync(id),
    
    activity_type TEXT NOT NULL CHECK (activity_type IN ('call', 'email', 'meeting', 'note', 'status_change')),
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_specialty ON public.leads(specialty);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads(utm_source);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON public.lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON public.lead_activities(created_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON public.leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at 
    BEFORE UPDATE ON public.system_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir configurações padrão
INSERT INTO public.system_settings (key, value, description) VALUES
('lead_notification_email', '"leads@grupobase.com.br"', 'Email para notificações de novos leads'),
('webhook_url', '""', 'URL do webhook para integração com CRM'),
('analytics_enabled', 'true', 'Habilitar tracking de analytics'),
('auto_assign_leads', 'false', 'Atribuir leads automaticamente')
ON CONFLICT (key) DO NOTHING;

-- Dados de exemplo para desenvolvimento
INSERT INTO public.leads (name, email, phone, clinic_name, specialty, message, source, utm_source, utm_campaign) VALUES
('Dr. João Silva', 'joao.silva@clinicaexemplo.com.br', '(11) 99999-9999', 'Clínica Exemplo', 'medicina', 'Gostaria de conhecer melhor o sistema Base Clínicas', 'website', 'google', 'medicos_google'),
('Dra. Maria Santos', 'maria.santos@odontologia.com.br', '(11) 88888-8888', 'Odontologia Santos', 'odontologia', 'Preciso de um sistema para minha clínica odontológica', 'website', 'facebook', 'dentistas_facebook'),
('Dr. Carlos Oliveira', 'carlos@psicologia.com.br', '(11) 77777-7777', 'Consultório Psicológico', 'psicologia', 'Interessado no módulo de prontuário eletrônico', 'website', 'instagram', 'psicologos_instagram')
ON CONFLICT DO NOTHING;
