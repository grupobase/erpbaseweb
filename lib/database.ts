import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

const sql = neon(process.env.DATABASE_URL)

export interface Lead {
  id: string
  created_at: string
  updated_at: string
  name: string
  email: string
  phone?: string
  clinic_name?: string
  specialty: string
  crm_number?: string
  message?: string
  source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  assigned_to?: string
  ip_address?: string
  user_agent?: string
  page_url?: string
  referrer?: string
}

export interface LeadActivity {
  id: string
  created_at: string
  lead_id: string
  user_id?: string
  activity_type: "call" | "email" | "meeting" | "note" | "status_change"
  description: string
  metadata: Record<string, any>
}

export interface CreateLeadData {
  name: string
  email: string
  phone?: string
  clinic_name?: string
  specialty: string
  crm_number?: string
  message?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  ip_address?: string
  user_agent?: string
  page_url?: string
  referrer?: string
}

export interface LeadFilters {
  status?: string
  specialty?: string
  source?: string
  utm_source?: string
  start_date?: string
  end_date?: string
  assigned_to?: string
  limit?: number
  offset?: number
}

export interface LeadStats {
  total_leads: number
  new_leads: number
  contacted_leads: number
  qualified_leads: number
  converted_leads: number
  lost_leads: number
  conversion_rate: number
  leads_by_specialty: Record<string, number>
  leads_by_source: Record<string, number>
  leads_by_month: Array<{ month: string; count: number }>
}

// Criar um novo lead
export async function createLead(data: CreateLeadData): Promise<Lead> {
  const result = await sql`
    INSERT INTO public.leads (
      name, email, phone, clinic_name, specialty, crm_number, 
      message, source, utm_source, utm_medium, utm_campaign, 
      utm_content, utm_term, ip_address, user_agent, page_url, referrer
    ) VALUES (
      ${data.name}, ${data.email}, ${data.phone}, ${data.clinic_name}, 
      ${data.specialty}, ${data.crm_number}, ${data.message}, 
      ${data.source || "website"}, ${data.utm_source}, ${data.utm_medium}, 
      ${data.utm_campaign}, ${data.utm_content}, ${data.utm_term}, 
      ${data.ip_address}, ${data.user_agent}, ${data.page_url}, ${data.referrer}
    )
    RETURNING *
  `

  return result[0] as Lead
}

// Buscar leads com filtros
export async function getLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  const { status, specialty, source, utm_source, start_date, end_date, assigned_to, limit = 50, offset = 0 } = filters

  let query = `
    SELECT * FROM public.leads 
    WHERE 1=1
  `

  const params: any[] = []
  let paramIndex = 1

  if (status) {
    query += ` AND status = $${paramIndex}`
    params.push(status)
    paramIndex++
  }

  if (specialty) {
    query += ` AND specialty = $${paramIndex}`
    params.push(specialty)
    paramIndex++
  }

  if (source) {
    query += ` AND source = $${paramIndex}`
    params.push(source)
    paramIndex++
  }

  if (utm_source) {
    query += ` AND utm_source = $${paramIndex}`
    params.push(utm_source)
    paramIndex++
  }

  if (start_date) {
    query += ` AND created_at >= $${paramIndex}`
    params.push(start_date)
    paramIndex++
  }

  if (end_date) {
    query += ` AND created_at <= $${paramIndex}`
    params.push(end_date)
    paramIndex++
  }

  if (assigned_to) {
    query += ` AND assigned_to = $${paramIndex}`
    params.push(assigned_to)
    paramIndex++
  }

  query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
  params.push(limit, offset)

  const result = await sql(query, params)
  return result as Lead[]
}

// Buscar lead por ID
export async function getLeadById(id: string): Promise<Lead | null> {
  const result = await sql`
    SELECT * FROM public.leads WHERE id = ${id}
  `

  return (result[0] as Lead) || null
}

// Atualizar lead
export async function updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
  const setClause = Object.keys(data)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(", ")

  const values = Object.values(data)

  const query = `
    UPDATE public.leads 
    SET ${setClause}
    WHERE id = $1 
    RETURNING *
  `

  const result = await sql(query, [id, ...values])
  return result[0] as Lead
}

// Adicionar atividade ao lead
export async function addLeadActivity(
  leadId: string,
  activityType: LeadActivity["activity_type"],
  description: string,
  userId?: string,
  metadata: Record<string, any> = {},
): Promise<LeadActivity> {
  const result = await sql`
    INSERT INTO public.lead_activities (lead_id, user_id, activity_type, description, metadata)
    VALUES (${leadId}, ${userId}, ${activityType}, ${description}, ${JSON.stringify(metadata)})
    RETURNING *
  `

  return result[0] as LeadActivity
}

// Buscar atividades de um lead
export async function getLeadActivities(leadId: string): Promise<LeadActivity[]> {
  const result = await sql`
    SELECT la.*, u.name as user_name, u.email as user_email
    FROM public.lead_activities la
    LEFT JOIN neon_auth.users_sync u ON la.user_id = u.id
    WHERE la.lead_id = ${leadId}
    ORDER BY la.created_at DESC
  `

  return result as LeadActivity[]
}

// Obter estatísticas dos leads
export async function getLeadStats(startDate?: string, endDate?: string): Promise<LeadStats> {
  const dateFilter = startDate && endDate ? `WHERE created_at >= '${startDate}' AND created_at <= '${endDate}'` : ""

  // Estatísticas básicas
  const basicStats = await sql`
    SELECT 
      COUNT(*) as total_leads,
      COUNT(*) FILTER (WHERE status = 'new') as new_leads,
      COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
      COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
      COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
      COUNT(*) FILTER (WHERE status = 'lost') as lost_leads
    FROM public.leads
    ${dateFilter ? sql`WHERE created_at >= ${startDate} AND created_at <= ${endDate}` : sql``}
  `

  // Leads por especialidade
  const specialtyStats = await sql`
    SELECT specialty, COUNT(*) as count
    FROM public.leads
    ${dateFilter ? sql`WHERE created_at >= ${startDate} AND created_at <= ${endDate}` : sql``}
    GROUP BY specialty
    ORDER BY count DESC
  `

  // Leads por fonte
  const sourceStats = await sql`
    SELECT utm_source, COUNT(*) as count
    FROM public.leads
    WHERE utm_source IS NOT NULL
    ${dateFilter ? sql`AND created_at >= ${startDate} AND created_at <= ${endDate}` : sql``}
    GROUP BY utm_source
    ORDER BY count DESC
  `

  // Leads por mês
  const monthlyStats = await sql`
    SELECT 
      TO_CHAR(created_at, 'YYYY-MM') as month,
      COUNT(*) as count
    FROM public.leads
    ${dateFilter ? sql`WHERE created_at >= ${startDate} AND created_at <= ${endDate}` : sql``}
    GROUP BY TO_CHAR(created_at, 'YYYY-MM')
    ORDER BY month DESC
    LIMIT 12
  `

  const stats = basicStats[0]
  const conversionRate = stats.total_leads > 0 ? (stats.converted_leads / stats.total_leads) * 100 : 0

  return {
    total_leads: Number.parseInt(stats.total_leads),
    new_leads: Number.parseInt(stats.new_leads),
    contacted_leads: Number.parseInt(stats.contacted_leads),
    qualified_leads: Number.parseInt(stats.qualified_leads),
    converted_leads: Number.parseInt(stats.converted_leads),
    lost_leads: Number.parseInt(stats.lost_leads),
    conversion_rate: Math.round(conversionRate * 100) / 100,
    leads_by_specialty: Object.fromEntries(specialtyStats.map((row) => [row.specialty, Number.parseInt(row.count)])),
    leads_by_source: Object.fromEntries(sourceStats.map((row) => [row.utm_source, Number.parseInt(row.count)])),
    leads_by_month: monthlyStats.map((row) => ({
      month: row.month,
      count: Number.parseInt(row.count),
    })),
  }
}

// Verificar se email já existe
export async function checkEmailExists(email: string): Promise<boolean> {
  const result = await sql`
    SELECT COUNT(*) as count FROM public.leads WHERE email = ${email}
  `

  return Number.parseInt(result[0].count) > 0
}

// Buscar configuração do sistema
export async function getSystemSetting(key: string): Promise<any> {
  const result = await sql`
    SELECT value FROM public.system_settings WHERE key = ${key}
  `

  return result[0]?.value || null
}

// Atualizar configuração do sistema
export async function updateSystemSetting(key: string, value: any): Promise<void> {
  await sql`
    INSERT INTO public.system_settings (key, value)
    VALUES (${key}, ${JSON.stringify(value)})
    ON CONFLICT (key) DO UPDATE SET 
      value = ${JSON.stringify(value)},
      updated_at = NOW()
  `
}
