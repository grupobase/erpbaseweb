import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createLead, checkEmailExists, addLeadActivity, getSystemSetting } from "@/lib/database"

// Schema de validação para o lead
const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  clinic_name: z.string().optional(),
  specialty: z.enum(["medicina", "odontologia", "psicologia", "fisioterapia", "fonoaudiologia", "nutricao"]),
  crm_number: z.string().optional(),
  message: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
})

// Rate limiting simples (em produção, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutos
  const maxRequests = 5

  const current = rateLimitMap.get(ip)

  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (current.count >= maxRequests) {
    return false
  }

  current.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Muitas tentativas. Tente novamente em 15 minutos." }, { status: 429 })
    }

    // Parse do body
    const body = await request.json()

    // Validação dos dados
    const validatedData = leadSchema.parse(body)

    // Verificar se email já existe
    const emailExists = await checkEmailExists(validatedData.email)
    if (emailExists) {
      return NextResponse.json({ error: "Este email já está cadastrado em nossa base." }, { status: 409 })
    }

    // Capturar dados adicionais da requisição
    const userAgent = request.headers.get("user-agent") || undefined
    const referer = request.headers.get("referer") || undefined

    // Criar o lead
    const lead = await createLead({
      ...validatedData,
      source: "website",
      ip_address: ip,
      user_agent: userAgent,
      page_url: referer,
      referrer: referer,
    })

    // Adicionar atividade inicial
    await addLeadActivity(lead.id, "note", "Lead criado através do formulário do site", undefined, {
      source: "website",
      user_agent: userAgent,
      ip_address: ip,
      form_data: validatedData,
    })

    // Enviar webhook se configurado
    try {
      const webhookUrl = await getSystemSetting("webhook_url")
      if (webhookUrl && webhookUrl !== '""') {
        const webhookData = {
          event: "lead_created",
          lead: {
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            clinic_name: lead.clinic_name,
            specialty: lead.specialty,
            message: lead.message,
            created_at: lead.created_at,
            utm_data: {
              source: lead.utm_source,
              medium: lead.utm_medium,
              campaign: lead.utm_campaign,
              content: lead.utm_content,
              term: lead.utm_term,
            },
          },
        }

        await fetch(webhookUrl.replace(/"/g, ""), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Base-Clinicas-Webhook/1.0",
          },
          body: JSON.stringify(webhookData),
        })
      }
    } catch (webhookError) {
      console.error("Erro ao enviar webhook:", webhookError)
      // Não falhar a requisição por causa do webhook
    }

    // Tracking de analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "lead_submitted", {
        event_category: "engagement",
        event_label: validatedData.specialty,
        value: 1,
        custom_parameters: {
          specialty: validatedData.specialty,
          source: validatedData.utm_source || "direct",
          campaign: validatedData.utm_campaign || "none",
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Lead cadastrado com sucesso!",
      lead_id: lead.id,
    })
  } catch (error) {
    console.error("Erro ao processar lead:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      )
    }

    return NextResponse.json({ error: "Erro interno do servidor. Tente novamente." }, { status: 500 })
  }
}

// GET para estatísticas (opcional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get("stats")

    if (stats === "true") {
      const { getLeadStats } = await import("@/lib/database")
      const startDate = searchParams.get("start")
      const endDate = searchParams.get("end")

      const statistics = await getLeadStats(startDate || undefined, endDate || undefined)

      return NextResponse.json(statistics)
    }

    return NextResponse.json({ message: "API de leads ativa" })
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 })
  }
}
