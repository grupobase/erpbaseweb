"use client"

import { useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  clinic_name: z.string().optional(),
  specialty: z.enum(["medicina", "odontologia", "psicologia", "fisioterapia", "fonoaudiologia", "nutricao"]),
  crm_number: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface CtaModalProps {
  isOpen: boolean
  onClose: () => void
  segment?: {
    name: string
    color: string
    specialty: string
  }
}

const specialtyOptions = [
  { value: "medicina", label: "Medicina" },
  { value: "odontologia", label: "Odontologia" },
  { value: "psicologia", label: "Psicologia" },
  { value: "fisioterapia", label: "Fisioterapia" },
  { value: "fonoaudiologia", label: "Fonoaudiologia" },
  { value: "nutricao", label: "Nutrição" },
]

export default function CtaModal({ isOpen, onClose, segment }: CtaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const defaultSegment = {
    name: "Profissionais da Saúde",
    color: "#1D4ED8",
    specialty: "medicina",
  }

  const currentSegment = segment || defaultSegment

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialty: currentSegment.specialty as any,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Capturar UTMs da URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ...utmData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar formulário")
      }

      setSubmitStatus("success")

      // Analytics tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "lead_submitted", {
          event_category: "engagement",
          event_label: data.specialty,
          value: 1,
          custom_parameters: {
            specialty: data.specialty,
            source: utmData.utm_source || "direct",
            campaign: utmData.utm_campaign || "none",
          },
        })
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        reset()
        setSubmitStatus("idle")
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Erro inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      reset()
      setSubmitStatus("idle")
      setErrorMessage("")
      onClose()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Solicite uma Demonstração
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Success State */}
                {submitStatus === "success" && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Solicitação Enviada!</h3>
                    <p className="text-gray-600">
                      Entraremos em contato em breve para agendar sua demonstração personalizada.
                    </p>
                  </div>
                )}

                {/* Error State */}
                {submitStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Form */}
                {submitStatus !== "success" && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nome */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Dr. João Silva"
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Profissional *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="joao@clinica.com.br"
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Telefone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone/WhatsApp
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="(11) 99999-9999"
                        disabled={isSubmitting}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>

                    {/* Especialidade */}
                    <div>
                      <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                        Especialidade *
                      </label>
                      <select
                        {...register("specialty")}
                        id="specialty"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        disabled={isSubmitting}
                      >
                        {specialtyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty.message}</p>}
                    </div>

                    {/* Nome da Clínica */}
                    <div>
                      <label htmlFor="clinic_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Clínica/Consultório
                      </label>
                      <input
                        {...register("clinic_name")}
                        type="text"
                        id="clinic_name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Clínica Exemplo"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* CRM */}
                    <div>
                      <label htmlFor="crm_number" className="block text-sm font-medium text-gray-700 mb-1">
                        Número do CRM/CRO/CRP
                      </label>
                      <input
                        {...register("crm_number")}
                        type="text"
                        id="crm_number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="123456/SP"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem (Opcional)
                      </label>
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Conte-nos sobre suas necessidades..."
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: currentSegment.color }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                          Enviando...
                        </>
                      ) : (
                        "Solicitar Demonstração"
                      )}
                    </button>

                    {/* Privacy Notice */}
                    <p className="text-xs text-gray-500 text-center">
                      Ao enviar este formulário, você concorda com nossa{" "}
                      <a href="/privacidade" className="text-blue-600 hover:underline">
                        Política de Privacidade
                      </a>{" "}
                      e autoriza o contato comercial.
                    </p>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
