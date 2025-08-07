import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getLeadById, updateLead, addLeadActivity, getLeadActivities } from "@/lib/database"

const updateLeadSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
  assigned_to: z.string().optional(),
  notes: z.string().optional(),
})

const activitySchema = z.object({
  activity_type: z.enum(["call", "email", "meeting", "note", "status_change"]),
  description: z.string().min(1, "Descrição é obrigatória"),
  metadata: z.record(z.any()).optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const lead = await getLeadById(params.id)

    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 })
    }

    const activities = await getLeadActivities(params.id)

    return NextResponse.json({
      lead,
      activities,
    })
  } catch (error) {
    console.error("Erro ao buscar lead:", error)
    return NextResponse.json({ error: "Erro ao buscar lead" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)

    const existingLead = await getLeadById(params.id)
    if (!existingLead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 })
    }

    const updatedLead = await updateLead(params.id, validatedData)

    // Se o status mudou, adicionar atividade
    if (validatedData.status && validatedData.status !== existingLead.status) {
      await addLeadActivity(
        params.id,
        "status_change",
        `Status alterado de "${existingLead.status}" para "${validatedData.status}"`,
        validatedData.assigned_to,
        {
          old_status: existingLead.status,
          new_status: validatedData.status,
          notes: validatedData.notes,
        },
      )
    }

    // Se foi atribuído a alguém, adicionar atividade
    if (validatedData.assigned_to && validatedData.assigned_to !== existingLead.assigned_to) {
      await addLeadActivity(
        params.id,
        "note",
        `Lead atribuído para usuário ${validatedData.assigned_to}`,
        validatedData.assigned_to,
        {
          old_assigned_to: existingLead.assigned_to,
          new_assigned_to: validatedData.assigned_to,
        },
      )
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    })
  } catch (error) {
    console.error("Erro ao atualizar lead:", error)

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

    return NextResponse.json({ error: "Erro ao atualizar lead" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = activitySchema.parse(body)

    const lead = await getLeadById(params.id)
    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 })
    }

    const activity = await addLeadActivity(
      params.id,
      validatedData.activity_type,
      validatedData.description,
      undefined, // user_id seria obtido da sessão em um sistema real
      validatedData.metadata || {},
    )

    return NextResponse.json({
      success: true,
      activity,
    })
  } catch (error) {
    console.error("Erro ao adicionar atividade:", error)

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

    return NextResponse.json({ error: "Erro ao adicionar atividade" }, { status: 500 })
  }
}
