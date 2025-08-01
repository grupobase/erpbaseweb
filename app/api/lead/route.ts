import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createLead, createLeadEvent, testConnection } from "@/lib/database"

const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  specialty: z.string().optional(),
  clinic_name: z.string().optional(),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado é obrigatório"),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  page_url: z.string().optional(),
  user_agent: z.string().optional(),
})

// Rate limiting simple implementation
const rateLimitMap = new Map()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  const limit = rateLimitMap.get(ip)

  if (now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (limit.count >= maxRequests) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // Rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Muitas tentativas. Tente novamente em 1 minuto." }, { status: 429 })
    }

    const body = await request.json()

    // Validate input
    const validatedData = leadSchema.parse(body)

    // Create lead in database
    const lead = await createLead({
      ...validatedData,
      ip_address: ip,
      status: "new",
    })

    // Create lead event
    await createLeadEvent(lead.id, "lead_created", {
      source: "landing_page",
      specialty: validatedData.specialty,
      utm_data: {
        source: validatedData.utm_source,
        medium: validatedData.utm_medium,
        campaign: validatedData.utm_campaign,
        content: validatedData.utm_content,
        term: validatedData.utm_term,
      },
    })

    // Send webhook if configured
    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        // Validate webhook URL before using it
        const webhookUrl = process.env.LEAD_WEBHOOK_URL.trim()
        if (!webhookUrl) {
          console.warn("LEAD_WEBHOOK_URL is empty")
        } else {
          // Test if URL is valid
          new URL(webhookUrl)

          await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event: "new_lead",
              lead: {
                id: lead.id,
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                specialty: lead.specialty,
                clinic_name: lead.clinic_name,
                city: lead.city,
                state: lead.state,
                created_at: lead.created_at,
              },
              utm: {
                source: validatedData.utm_source,
                medium: validatedData.utm_medium,
                campaign: validatedData.utm_campaign,
                content: validatedData.utm_content,
                term: validatedData.utm_term,
              },
            }),
          })
        }
      } catch (webhookError) {
        console.error("Webhook error:", webhookError)
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead criado com sucesso",
      leadId: lead.id,
    })
  } catch (error) {
    console.error("Lead creation error:", error)

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

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const connectionTest = await testConnection()

    if (connectionTest.success) {
      return NextResponse.json({
        message: "Lead API is working",
        database: "Connected successfully",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: connectionTest.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "API connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
