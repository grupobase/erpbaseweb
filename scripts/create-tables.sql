-- Criar schema para a aplicação se não existir
CREATE SCHEMA IF NOT EXISTS public;

-- Tabela de leads
CREATE TABLE IF NOT EXISTS public.leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    specialty VARCHAR(100),
    clinic_name VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    utm_term VARCHAR(100),
    page_url TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45),
    status VARCHAR(20) DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
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

-- Tabela de eventos de tracking
CREATE TABLE IF NOT EXISTS public.lead_events (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES public.leads(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
CREATE INDEX IF NOT EXISTS idx_leads_specialty ON public.leads(specialty);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id ON public.lead_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_events_type ON public.lead_events(event_type);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
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

-- Inserir dados de exemplo para teste
INSERT INTO public.leads (name, email, phone, specialty, clinic_name, city, state, utm_source, utm_medium, utm_campaign, status) VALUES
('Dr. João Silva', 'joao@clinicaexemplo.com.br', '(11) 99999-9999', 'medicina', 'Clínica Exemplo', 'São Paulo', 'SP', 'google', 'cpc', 'medicina-sp', 'new'),
('Dra. Maria Santos', 'maria@odontologia.com.br', '(21) 88888-8888', 'odontologia', 'Odonto Santos', 'Rio de Janeiro', 'RJ', 'facebook', 'social', 'odonto-rj', 'contacted'),
('Dr. Pedro Costa', 'pedro@psicologia.com.br', '(31) 77777-7777', 'psicologia', 'Consultório Costa', 'Belo Horizonte', 'MG', 'direct', 'website', 'psicologia-mg', 'qualified')
ON CONFLICT DO NOTHING;
