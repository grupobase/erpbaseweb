"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { z } from "zod"

interface CtaModalProps {
  isOpen: boolean
  onClose: () => void
  specialty?: string
}

const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  specialty: z.string().min(1, "Especialidade é obrigatória"),
  clinic_name: z.string().optional(),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado é obrigatório"),
})

type FormData = z.infer<typeof leadSchema>

export default function CtaModal({ isOpen, onClose, specialty = "medicina" }: CtaModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    specialty: specialty,
    clinic_name: "",
    city: "",
    state: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const specialties = [
    { value: "medicina", label: "Medicina" },
    { value: "odontologia", label: "Odontologia" },
    { value: "psicologia", label: "Psicologia" },
    { value: "fisioterapia", label: "Fisioterapia" },
    { value: "fonoaudiologia", label: "Fonoaudiologia" },
    { value: "nutricao", label: "Nutrição" },
  ]

  const brazilianStates = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus("idle")

    try {
      // Validate form data
      const validatedData = leadSchema.parse(formData)

      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      }

      // Submit to API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validatedData,
          ...utmData,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage("Obrigado! Entraremos em contato em breve.")

        // Track conversion
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "conversion", {
            event_category: "lead",
            event_label: validatedData.specialty,
            value: 1,
          })
        }

        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            specialty: specialty,
            clinic_name: "",
            city: "",
            state: "",
          })
          setSubmitStatus("idle")
          onClose()
        }, 2000)
      } else {
        setSubmitStatus("error")
        setSubmitMessage(result.error || "Erro ao enviar formulário")

        if (result.details) {
          const fieldErrors: Partial<Record<keyof FormData, string>> = {}
          result.details.forEach((detail: any) => {
            fieldErrors[detail.field as keyof FormData] = detail.message
          })
          setErrors(fieldErrors)
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormData
          fieldErrors[field] = err.message
        })
        setErrors(fieldErrors)
        setSubmitStatus("error")
        setSubmitMessage("Por favor, corrija os erros no formulário")
      } else {
        setSubmitStatus("error")
        setSubmitMessage("Erro de conexão. Tente novamente.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Solicitar Demonstração</h2>
            <p className="text-gray-600 mt-1">Preencha seus dados e entraremos em contato</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Dr. João Silva"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Profissional *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="joao@clinica.com.br"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone/WhatsApp *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade *
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.specialty ? "border-red-500" : "border-gray-300"
              }`}
            >
              {specialties.map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.label}
                </option>
              ))}
            </select>
            {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
          </div>

          {/* Clinic Name */}
          <div>
            <label htmlFor="clinic_name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Clínica/Consultório
            </label>
            <input
              type="text"
              id="clinic_name"
              name="clinic_name"
              value={formData.clinic_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Clínica Exemplo"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="São Paulo"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione</option>
                {brazilianStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* Submit Status */}
          {submitStatus !== "idle" && (
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                submitStatus === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {submitStatus === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-sm">{submitMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Enviando...
              </div>
            ) : (
              "Solicitar Demonstração"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Ao enviar, você concorda com nossa política de privacidade e aceita receber comunicações comerciais.
          </p>
        </form>
      </div>
    </div>
  )
}
