"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function TestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const testFormSubmission = async () => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setMessage("")

    try {
      const testData = {
        name: "Dr. Teste Silva",
        email: "teste@clinicateste.com.br",
        phone: "(11) 99999-9999",
        specialty: "medicina",
        clinic_name: "Clínica Teste",
        city: "São Paulo",
        state: "SP",
        utm_source: "test",
        utm_medium: "form",
        utm_campaign: "integration-test",
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setMessage(`Lead criado com sucesso! ID: ${result.leadId}`)
      } else {
        setSubmitStatus("error")
        setMessage(result.error || "Erro desconhecido")
      }
    } catch (error) {
      setSubmitStatus("error")
      setMessage("Erro de conexão: " + (error instanceof Error ? error.message : "Erro desconhecido"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const testDatabaseConnection = async () => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setMessage("")

    try {
      const response = await fetch("/api/lead", {
        method: "GET",
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setMessage("Conexão com banco de dados OK: " + result.message)
      } else {
        setSubmitStatus("error")
        setMessage("Erro na conexão: " + result.error)
      }
    } catch (error) {
      setSubmitStatus("error")
      setMessage("Erro de conexão: " + (error instanceof Error ? error.message : "Erro desconhecido"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-sm">
      <h3 className="font-semibold text-gray-900 mb-3">Teste de Integração</h3>

      <div className="space-y-2 mb-4">
        <button
          onClick={testDatabaseConnection}
          disabled={isSubmitting}
          className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Testar Conexão DB"}
        </button>

        <button
          onClick={testFormSubmission}
          disabled={isSubmitting}
          className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Testar Envio Lead"}
        </button>
      </div>

      {submitStatus !== "idle" && (
        <div
          className={`flex items-start space-x-2 p-2 rounded text-sm ${
            submitStatus === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {submitStatus === "success" ? (
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          )}
          <span className="break-words">{message}</span>
        </div>
      )}
    </div>
  )
}
