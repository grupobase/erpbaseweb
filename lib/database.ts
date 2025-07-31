import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

export interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  specialty?: string
  clinic_name?: string
  city?: string
  state?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  page_url?: string
  user_agent?: string
  ip_address?: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  notes?: string
  created_at: string
  updated_at: string
}

export interface LeadEvent {
  id: number
  lead_id: number
  event_type: string
  event_data?: Record<string, any>
  created_at: string
}

// Função para verificar se as tabelas existem e criá-las se necessário
export async function ensureTablesExist() {
  try {
    // Criar tabela de leads se não existir
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
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
        
        CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
      )
    `

    // Criar tabela de eventos se não existir
    await sql`
      CREATE TABLE IF NOT EXISTS lead_events (
        id SERIAL PRIMARY KEY,
        lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
        event_type VARCHAR(100) NOT NULL,
        event_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Criar índices se não existirem
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_specialty ON leads(specialty)`
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id ON lead_events(lead_id)`

    return true
  } catch (error) {
    console.error("Error ensuring tables exist:", error)
    return false
  }
}

// Função para criar um novo lead
export async function createLead(leadData: Omit<Lead, "id" | "created_at" | "updated_at">) {
  // Garantir que as tabelas existem
  await ensureTablesExist()

  const result = await sql`
    INSERT INTO leads (
      name, email, phone, specialty, clinic_name, city, state,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      page_url, user_agent, ip_address, status, notes
    ) VALUES (
      ${leadData.name}, ${leadData.email}, ${leadData.phone}, ${leadData.specialty},
      ${leadData.clinic_name}, ${leadData.city}, ${leadData.state},
      ${leadData.utm_source}, ${leadData.utm_medium}, ${leadData.utm_campaign},
      ${leadData.utm_content}, ${leadData.utm_term}, ${leadData.page_url},
      ${leadData.user_agent}, ${leadData.ip_address}, ${leadData.status}, ${leadData.notes}
    )
    RETURNING *
  `
  return result[0] as Lead
}

// Função para buscar leads
export async function getLeads(limit = 50, offset = 0) {
  await ensureTablesExist()

  const result = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `
  return result as Lead[]
}

// Função para buscar lead por ID
export async function getLeadById(id: number) {
  await ensureTablesExist()

  const result = await sql`
    SELECT * FROM leads WHERE id = ${id}
  `
  return result[0] as Lead | undefined
}

// Função para criar evento de lead
export async function createLeadEvent(leadId: number, eventType: string, eventData?: Record<string, any>) {
  await ensureTablesExist()

  const result = await sql`
    INSERT INTO lead_events (lead_id, event_type, event_data)
    VALUES (${leadId}, ${eventType}, ${JSON.stringify(eventData || {})})
    RETURNING *
  `
  return result[0] as LeadEvent
}

// Função para testar conexão
export async function testConnection() {
  try {
    const result = await sql`SELECT 1 as test`
    return { success: true, message: "Conexão com banco OK", data: result }
  } catch (error) {
    return {
      success: false,
      message: "Erro na conexão",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
