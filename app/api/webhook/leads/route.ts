import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the received webhook data
    console.log("=== WEBHOOK RECEIVED ===")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Event:", body.event)
    console.log("Lead Data:", JSON.stringify(body.lead, null, 2))
    console.log("UTM Data:", JSON.stringify(body.utm, null, 2))
    console.log("========================")

    // Here you can add your custom logic:
    // - Send email notifications
    // - Update CRM systems
    // - Trigger automation workflows
    // - Send to external services like Zapier, Make, etc.

    // Example: Send to external webhook if configured
    if (process.env.EXTERNAL_WEBHOOK_URL) {
      try {
        await fetch(process.env.EXTERNAL_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.EXTERNAL_WEBHOOK_TOKEN ? `Bearer ${process.env.EXTERNAL_WEBHOOK_TOKEN}` : undefined,
          }.filter(Boolean),
          body: JSON.stringify({
            ...body,
            source: "Base Clínicas Landing Page",
            timestamp: new Date().toISOString(),
          }),
        })
        console.log("Successfully forwarded to external webhook")
      } catch (externalError) {
        console.error("Failed to forward to external webhook:", externalError)
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
      received_at: new Date().toISOString(),
      event: body.event,
      lead_id: body.lead?.id,
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    
    return NextResponse.json(
      {
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint is active",
    endpoint: "/api/webhook/leads",
    methods: ["POST"],
    timestamp: new Date().toISOString(),
  })
}
