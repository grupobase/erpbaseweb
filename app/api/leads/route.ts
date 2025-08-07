import { type NextRequest, NextResponse } from "next/server"
import { getLeads, getLeadStats } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Se solicitar estatísticas
    if (searchParams.get("stats") === "true") {
      const startDate = searchParams.get("start")
      const endDate = searchParams.get("end")

      const stats = await getLeadStats(startDate || undefined, endDate || undefined)

      return NextResponse.json(stats)
    }

    // Filtros para busca de leads
    const filters = {
      status: searchParams.get("status") || undefined,
      specialty: searchParams.get("specialty") || undefined,
      source: searchParams.get("source") || undefined,
      utm_source: searchParams.get("utm_source") || undefined,
      start_date: searchParams.get("start_date") || undefined,
      end_date: searchParams.get("end_date") || undefined,
      assigned_to: searchParams.get("assigned_to") || undefined,
      limit: Number.parseInt(searchParams.get("limit") || "50"),
      offset: Number.parseInt(searchParams.get("offset") || "0"),
    }

    const leads = await getLeads(filters)

    return NextResponse.json({
      leads,
      pagination: {
        limit: filters.limit,
        offset: filters.offset,
        total: leads.length,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar leads:", error)
    return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 })
  }
}
