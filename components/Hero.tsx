"use client"

import { useState } from "react"
import { ArrowRight, Play, CheckCircle, Users, Calendar, BarChart3 } from "lucide-react"
import CtaModal from "./CtaModal"

interface HeroProps {
  specialty?: string
}

export default function Hero({ specialty }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getSpecialtyContent = () => {
    switch (specialty) {
      case "odontologia":
        return {
          title: "Sistema de Gestão Completo para Consultórios Odontológicos",
          subtitle:
            "Organize sua clínica odontológica, gerencie pacientes e aumente sua produtividade com nossa plataforma especializada.",
          features: ["Prontuário Odontológico Digital", "Controle de Tratamentos", "Gestão Financeira Especializada"],
        }
      case "psicologia":
        return {
          title: "Plataforma Especializada para Clínicas de Psicologia",
          subtitle: "Gerencie consultas, prontuários e evolução dos pacientes com total segurança e privacidade.",
          features: ["Prontuário Psicológico Seguro", "Controle de Sessões", "Relatórios de Evolução"],
        }
      case "fisioterapia":
        return {
          title: "Sistema Completo para Clínicas de Fisioterapia",
          subtitle: "Controle tratamentos, evolução dos pacientes e gestão completa da sua clínica de fisioterapia.",
          features: ["Controle de Tratamentos", "Evolução do Paciente", "Gestão de Equipamentos"],
        }
      default:
        return {
          title: "Sistema de Gestão Completo para Clínicas e Consultórios",
          subtitle:
            "Simplifique sua rotina médica, organize seus pacientes e aumente sua produtividade com nossa plataforma completa.",
          features: ["Agenda Inteligente", "Prontuário Eletrônico", "Gestão Financeira"],
        }
    }
  }

  const content = getSpecialtyContent()

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mais de 10.000 profissionais confiam em nós
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{content.subtitle}</p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Teste Grátis por 30 Dias
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">10k+</span>
                </div>
                <p className="text-sm text-gray-600">Profissionais</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">1M+</span>
                </div>
                <p className="text-sm text-gray-600">Consultas</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">99.9%</span>
                </div>
                <p className="text-sm text-gray-600">Uptime</p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-blue-600" />
              </div>

              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">Consultas Hoje</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">R$ 3.2k</div>
                    <div className="text-sm text-gray-600">Faturamento</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-200 rounded-full mr-3"></div>
                      <div>
                        <div className="font-medium text-sm">Maria Silva</div>
                        <div className="text-xs text-gray-500">14:30 - Consulta</div>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-200 rounded-full mr-3"></div>
                      <div>
                        <div className="font-medium text-sm">João Santos</div>
                        <div className="text-xs text-gray-500">15:00 - Retorno</div>
                      </div>
                    </div>
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>

            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} specialty={specialty} />
    </section>
  )
}
