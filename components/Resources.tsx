"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Users,
  BarChart3,
  Shield,
  Smartphone,
  Clock,
  HeadphonesIcon,
} from "lucide-react"
import CtaModal from "./CtaModal"

export default function Resources() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const features = [
    {
      icon: FileText,
      title: "Prontuário Eletrônico",
      description: "Prontuários digitais seguros e certificados pelo CFM, com assinatura digital e backup automático.",
      benefits: ["Certificação CFM/SBIS", "Assinatura Digital", "Backup Automático", "Acesso Remoto"],
    },
    {
      icon: Calendar,
      title: "Agendamento Online",
      description: "Sistema inteligente de agendamento com confirmação automática e lembretes por WhatsApp.",
      benefits: ["Agenda Online", "Confirmação Automática", "Lembretes WhatsApp", "Controle de Faltas"],
    },
    {
      icon: BarChart3,
      title: "Relatórios Gerenciais",
      description: "Dashboards completos com indicadores de performance, faturamento e produtividade.",
      benefits: ["Dashboard Executivo", "Indicadores KPI", "Relatórios Customizados", "Análise de Tendências"],
    },
    {
      icon: Users,
      title: "Gestão de Pacientes",
      description: "Cadastro completo de pacientes com histórico médico, documentos e comunicação integrada.",
      benefits: ["Ficha Completa", "Histórico Médico", "Documentos Digitais", "Comunicação Integrada"],
    },
    {
      icon: Shield,
      title: "Segurança e Compliance",
      description: "Máxima segurança com criptografia, backup e conformidade com LGPD e normas médicas.",
      benefits: ["Criptografia Avançada", "Conformidade LGPD", "Backup Seguro", "Auditoria Completa"],
    },
    {
      icon: Smartphone,
      title: "Telemedicina",
      description: "Plataforma integrada para consultas online com gravação, receituário digital e prontuário.",
      benefits: ["Consultas Online", "Receituário Digital", "Gravação Segura", "Integração Total"],
    },
  ]

  const resources = [
    {
      title: "Guia Completo de Prontuário Eletrônico",
      description: "Tudo que você precisa saber sobre prontuários digitais, certificação e conformidade legal.",
      type: "PDF",
      pages: "24 páginas",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      title: "Checklist: Como Escolher um Software Médico",
      description: "Lista completa com 50+ critérios essenciais para avaliar sistemas de gestão médica.",
      type: "PDF",
      pages: "12 páginas",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      title: "ROI em Tecnologia Médica",
      description: "Calculadora e guia para medir o retorno do investimento em software médico.",
      type: "Excel",
      pages: "Planilha",
      icon: BarChart3,
      downloadUrl: "#",
    },
    {
      title: "Webinar: Transformação Digital na Saúde",
      description: "Gravação completa do webinar sobre tendências e melhores práticas em tecnologia médica.",
      type: "Vídeo",
      pages: "45 min",
      icon: Eye,
      downloadUrl: "#",
    },
  ]

  const additionalFeatures = [
    {
      icon: Clock,
      title: "Suporte 24/7",
      description: "Atendimento especializado disponível 24 horas por dia, 7 dias por semana.",
    },
    {
      icon: HeadphonesIcon,
      title: "Treinamento Completo",
      description: "Capacitação da equipe com treinamento presencial e online personalizado.",
    },
    {
      icon: Smartphone,
      title: "App Mobile",
      description: "Aplicativo nativo para iOS e Android com todas as funcionalidades principais.",
    },
  ]

  return (
    <section id="recursos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Completos para sua Clínica</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para modernizar sua prática médica em uma única plataforma integrada e segura.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>

              <p className="text-gray-600 mb-4">{feature.description}</p>

              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Suporte e Recursos Adicionais</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Materiais Gratuitos</h3>
            <p className="text-xl text-blue-100">
              Baixe nossos guias exclusivos e acelere a transformação digital da sua clínica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <resource.icon className="h-8 w-8 text-blue-200 mr-3" />
                  <div>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">{resource.type}</span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold mb-2">{resource.title}</h4>
                <p className="text-blue-100 text-sm mb-4">{resource.description}</p>
                <p className="text-xs text-blue-200 mb-4">{resource.pages}</p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center text-sm bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Grátis
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Ver Demonstração Completa
            </button>
          </div>
        </div>
      </div>

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
