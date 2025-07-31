"use client"

import { FileText, Calendar, DollarSign, BarChart3, Shield, Smartphone, Users, Clock } from "lucide-react"

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

export default function Resources({ segment }: ResourcesProps) {
  const getResourcesBySpecialty = (specialty: string) => {
    const baseResources = [
      {
        icon: FileText,
        title: "Prontuário Eletrônico",
        description: "Sistema completo de prontuário digital com segurança LGPD",
        features: ["Histórico completo", "Anexos digitais", "Assinatura digital", "Backup automático"],
      },
      {
        icon: Calendar,
        title: "Agenda Inteligente",
        description: "Agendamento online 24h com confirmação automática",
        features: ["Agendamento online", "Confirmação SMS/WhatsApp", "Lista de espera", "Reagendamento"],
      },
      {
        icon: DollarSign,
        title: "Controle Financeiro",
        description: "Gestão completa de receitas, despesas e fluxo de caixa",
        features: ["Controle de caixa", "Relatórios financeiros", "Cobrança automática", "Conciliação bancária"],
      },
      {
        icon: BarChart3,
        title: "Relatórios Gerenciais",
        description: "Dashboards e relatórios para tomada de decisão",
        features: ["Dashboard executivo", "Relatórios customizados", "Indicadores KPI", "Análise de performance"],
      },
    ]

    const specialtyResources = {
      medicina: [
        {
          icon: Shield,
          title: "Auditoria TISS",
          description: "Sistema integrado para auditoria de convênios médicos",
          features: ["Validação TISS", "Envio automático", "Controle de glosas", "Relatórios de auditoria"],
        },
        {
          icon: FileText,
          title: "Prescrições Digitais",
          description: "Prescrições médicas digitais com validade legal",
          features: ["Receituário digital", "Banco de medicamentos", "Posologia automática", "Assinatura digital"],
        },
      ],
      odontologia: [
        {
          icon: Smartphone,
          title: "Odontograma Digital",
          description: "Odontograma completo com histórico de procedimentos",
          features: ["Odontograma interativo", "Histórico de tratamentos", "Planejamento visual", "Fotos clínicas"],
        },
        {
          icon: Calendar,
          title: "Agenda Especializada",
          description: "Agenda otimizada para tratamentos odontológicos",
          features: ["Blocos de tempo", "Procedimentos múltiplos", "Sala de espera", "Confirmação automática"],
        },
      ],
      psicologia: [
        {
          icon: Shield,
          title: "Segurança Reforçada",
          description: "Proteção extra para dados sensíveis de pacientes",
          features: ["Criptografia avançada", "Acesso restrito", "Log de auditoria", "Backup seguro"],
        },
        {
          icon: Clock,
          title: "Controle de Sessões",
          description: "Gestão completa de sessões e evolução terapêutica",
          features: ["Cronômetro de sessão", "Evolução terapêutica", "Plano de tratamento", "Relatórios de progresso"],
        },
      ],
      fisioterapia: [
        {
          icon: Users,
          title: "Evolução de Tratamentos",
          description: "Acompanhamento detalhado da evolução dos pacientes",
          features: ["Fichas de evolução", "Exercícios prescritos", "Fotos comparativas", "Gráficos de progresso"],
        },
        {
          icon: Smartphone,
          title: "App do Paciente",
          description: "Aplicativo para pacientes acompanharem exercícios",
          features: ["Exercícios em vídeo", "Lembretes automáticos", "Progresso compartilhado", "Chat com terapeuta"],
        },
      ],
      fonoaudiologia: [
        {
          icon: BarChart3,
          title: "Avaliações Especializadas",
          description: "Protocolos específicos para avaliação fonoaudiológica",
          features: ["Protocolos padronizados", "Audiometria digital", "Relatórios técnicos", "Evolução terapêutica"],
        },
        {
          icon: FileText,
          title: "Planos Terapêuticos",
          description: "Criação e acompanhamento de planos de tratamento",
          features: [
            "Objetivos terapêuticos",
            "Atividades personalizadas",
            "Acompanhamento familiar",
            "Relatórios de alta",
          ],
        },
      ],
    }

    return [...baseResources, ...(specialtyResources[specialty as keyof typeof specialtyResources] || [])]
  }

  const resources = getResourcesBySpecialty(segment.specialty)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Especializados para {segment.name}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para modernizar e otimizar a gestão da sua clínica ou consultório
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${segment.color}15` }}
                >
                  <IconComponent className="h-8 w-8" style={{ color: segment.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {resource.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div
                        className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: segment.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para transformar sua clínica?</h3>
            <p className="text-gray-600 mb-6">
              Agende uma demonstração personalizada e veja como o Base Clínicas pode otimizar sua rotina
            </p>
            <button
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              style={{ backgroundColor: segment.color }}
              onClick={() => {
                // Scroll to hero section to open modal
                window.scrollTo({ top: 0, behavior: "smooth" })
                // Trigger modal open event
                setTimeout(() => {
                  const ctaButton = document.querySelector("[data-cta-button]") as HTMLButtonElement
                  if (ctaButton) ctaButton.click()
                }, 500)
              }}
            >
              Solicitar Demonstração Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
