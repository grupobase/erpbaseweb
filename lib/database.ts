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

// Função para criar um novo lead
export async function createLead(leadData: Omit<Lead, "id" | "created_at" | "updated_at">) {
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
  const result = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `
  return result as Lead[]
}

// Função para buscar lead por ID
export async function getLeadById(id: number) {
  const result = await sql`
    SELECT * FROM leads WHERE id = ${id}
  `
  return result[0] as Lead | undefined
}

// Função para atualizar lead
export async function updateLead(id: number, updates: Partial<Lead>) {
  const setClause = Object.keys(updates)
    .filter((key) => key !== "id" && key !== "created_at" && key !== "updated_at")
    .map((key) => `${key} = $${Object.keys(updates).indexOf(key) + 2}`)
    .join(", ")

  if (!setClause) return null

  const values = [
    id,
    ...Object.values(updates).filter((_, index) => {
      const key = Object.keys(updates)[index]
      return key !== "id" && key !== "created_at" && key !== "updated_at"
    }),
  ]

  const result = await sql`
    UPDATE leads 
    SET ${sql.unsafe(setClause)}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as Lead | undefined
}

// Função para criar evento de lead
export async function createLeadEvent(leadId: number, eventType: string, eventData?: Record<string, any>) {
  const result = await sql`
    INSERT INTO lead_events (lead_id, event_type, event_data)
    VALUES (${leadId}, ${eventType}, ${JSON.stringify(eventData || {})})
    RETURNING *
  `
  return result[0] as LeadEvent
}
