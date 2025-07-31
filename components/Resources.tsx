"use client"

import { useState } from "react"
import {
  FileText,
  Calendar,
  CreditCard,
  Users,
  BarChart3,
  Shield,
  Smartphone,
  Cloud,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import CtaModal from "./CtaModal"

interface Segment {
  name: string
  color: string
  specialty: string
  title: string
  subtitle: string
  bullets: string[]
  cta: string
}

interface ResourcesProps {
  segment: Segment
}

const features = [
  {
    icon: FileText,
    title: "Prontuário Eletrônico",
    description: "Prontuário digital completo com histórico médico, exames, prescrições e evolução do paciente.",
    benefits: ["Conforme LGPD", "Backup automático", "Acesso rápido", "Histórico completo"],
  },
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description: "Sistema de agendamento online com confirmação automática, lembretes e controle de horários.",
    benefits: ["Agendamento online", "Lembretes SMS/WhatsApp", "Controle de faltas", "Agenda compartilhada"],
  },
  {
    icon: CreditCard,
    title: "Gestão Financeira",
    description: "Controle completo de receitas, despesas, convênios e relatórios financeiros detalhados.",
    benefits: ["Controle de convênios", "Relatórios detalhados", "Fluxo de caixa", "Cobrança automática"],
  },
  {
    icon: Users,
    title: "Gestão de Pacientes",
    description: "Cadastro completo de pacientes com histórico, documentos, fotos e comunicação integrada.",
    benefits: ["Cadastro completo", "Histórico detalhado", "Documentos digitais", "Comunicação integrada"],
  },
  {
    icon: BarChart3,
    title: "Relatórios Gerenciais",
    description: "Dashboards e relatórios completos para acompanhar o desempenho da sua clínica.",
    benefits: ["Dashboards em tempo real", "Relatórios customizados", "Análise de performance", "Métricas importantes"],
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Máxima segurança dos dados com criptografia, backup automático e conformidade LGPD.",
    benefits: ["Criptografia avançada", "Backup automático", "Conformidade LGPD", "Auditoria completa"],
  },
  {
    icon: Smartphone,
    title: "App Mobile",
    description: "Aplicativo móvel para médicos e pacientes com todas as funcionalidades principais.",
    benefits: ["App para médicos", "App para pacientes", "Sincronização automática", "Offline disponível"],
  },
  {
    icon: Cloud,
    title: "Sistema em Nuvem",
    description: "Acesse de qualquer lugar, a qualquer hora, com sincronização automática e backup seguro.",
    benefits: ["Acesso em qualquer lugar", "Sincronização automática", "Backup seguro", "Atualizações automáticas"],
  },
]

export default function Resources({ segment }: ResourcesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(0)

  return (
    <section id="recursos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Completos para {segment.name}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para modernizar e otimizar a gestão da sua clínica ou consultório
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedFeature === index
                    ? "bg-white shadow-lg border-2 border-blue-200"
                    : "bg-white hover:shadow-md border border-gray-200"
                }`}
                onClick={() => setSelectedFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${segment.color}20` }}>
                    <feature.icon className="h-6 w-6" style={{ color: segment.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Feature Header */}
              <div className="p-6 text-white" style={{ backgroundColor: segment.color }}>
                <div className="flex items-center space-x-3 mb-4">
                  {(() => {
                    const FeatureIcon = features[selectedFeature].icon
                    return <FeatureIcon className="h-8 w-8" />
                  })()}
                  <h3 className="text-2xl font-bold">{features[selectedFeature].title}</h3>
                </div>
                <p className="text-blue-100">{features[selectedFeature].description}</p>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Principais Benefícios:</h4>
                <div className="space-y-3 mb-6">
                  {features[selectedFeature].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  style={{ backgroundColor: segment.color }}
                >
                  Ver Este Recurso em Ação
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para Transformar sua Clínica?</h3>
            <p className="text-gray-600 mb-6">
              Agende uma demonstração personalizada e veja como o Base Clínicas pode revolucionar sua prática médica
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              style={{ backgroundColor: segment.color }}
            >
              Agendar Demonstração Gratuita
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} segment={segment} />
    </section>
  )
}
