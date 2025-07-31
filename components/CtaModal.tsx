"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { z } from "zod"

interface Segment {
  name: string
  color: string
  specialty: string
  title: string
  subtitle: string
  bullets: string[]
  cta: string
}

interface CtaModalProps {
  isOpen: boolean
  onClose: () => void
  segment: Segment
}

const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  clinic_name: z.string().optional(),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado é obrigatório"),
})

type LeadFormData = z.infer<typeof leadSchema>

export default function CtaModal({ isOpen, onClose, segment }: CtaModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    clinic_name: "",
    city: "",
    state: "",
  })
  const [errors, setErrors] = useState<Partial<LeadFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof LeadFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = leadSchema.parse(formData)

      // Get UTM parameters and page info
      const urlParams = new URLSearchParams(window.location.search)
      const leadPayload = {
        ...validatedData,
        specialty: segment.specialty,
        utm_source: urlParams.get("utm_source") || "direct",
        utm_medium: urlParams.get("utm_medium") || "website",
        utm_campaign: urlParams.get("utm_campaign") || "base-clinicas",
        utm_content: urlParams.get("utm_content") || segment.specialty,
        utm_term: urlParams.get("utm_term") || "",
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      }

      // Submit to API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário")
      }

      const result = await response.json()

      // Track conversion
      if (window.gtag) {
        window.gtag("event", "conversion", {
          event_category: "lead",
          event_label: segment.specialty,
          value: 1,
        })
      }

      setSubmitStatus("success")

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          clinic_name: "",
          city: "",
          state: "",
        })
        setSubmitStatus("idle")
        onClose()
      }, 3000)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<LeadFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LeadFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setSubmitStatus("error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        {/* Modal */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Solicitar Demonstração</h3>
              <p className="text-sm text-gray-600 mt-1">
                Para {segment.name} - {segment.specialty}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Success State */}
          {submitStatus === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Solicitação Enviada!</h4>
              <p className="text-gray-600">
                Nossa equipe entrará em contato em até 2 horas úteis para agendar sua demonstração personalizada.
              </p>
            </div>
          )}

          {/* Error State */}
          {submitStatus === "error" && (
            <div className="text-center py-4 mb-6">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <p className="text-red-600">Erro ao enviar solicitação. Tente novamente.</p>
            </div>
          )}

          {/* Form */}
          {submitStatus === "idle" && (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Seu nome completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome da sua clínica"
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="São Paulo"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecione</option>
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                    <option value="MG">MG</option>
                    <option value="RS">RS</option>
                    <option value="PR">PR</option>
                    <option value="SC">SC</option>
                    <option value="BA">BA</option>
                    <option value="GO">GO</option>
                    <option value="PE">PE</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="AM">AM</option>
                    <option value="RN">RN</option>
                    <option value="AL">AL</option>
                    <option value="MA">MA</option>
                    <option value="PI">PI</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                    <option value="AC">AC</option>
                    <option value="AP">AP</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: segment.color }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Solicitar Demonstração Gratuita"
                )}
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Seus dados estão protegidos conforme a LGPD. Não compartilhamos informações com terceiros.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
