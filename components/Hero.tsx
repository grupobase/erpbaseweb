"use client"

import { useState } from "react"
import { Play, CheckCircle, Users, Clock, Shield } from "lucide-react"
import CtaModal from "./CtaModal"

interface HeroProps {
  specialty?: string
}

export default function Hero({ specialty = "medicina" }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const specialtyContent = {
    medicina: {
      title: "Sistema de Gestão Médica Completo",
      subtitle: "Transforme sua clínica com tecnologia de ponta",
      description:
        "Gerencie consultas, prontuários eletrônicos, faturamento e muito mais em uma única plataforma segura e intuitiva.",
      benefits: [
        "Prontuário Eletrônico Certificado",
        "Agendamento Online Inteligente",
        "Faturamento Automatizado",
        "Telemedicina Integrada",
      ],
    },
    odontologia: {
      title: "Software Odontológico Especializado",
      subtitle: "Gestão completa para consultórios odontológicos",
      description:
        "Odontograma digital, controle de tratamentos, agendamento e financeiro em uma solução pensada para dentistas.",
      benefits: [
        "Odontograma Digital Avançado",
        "Controle de Tratamentos",
        "Gestão Financeira Especializada",
        "Imagens e Radiografias",
      ],
    },
    psicologia: {
      title: "Plataforma para Psicólogos",
      subtitle: "Gestão segura e confidencial",
      description:
        "Prontuários seguros, agendamento flexível e ferramentas especializadas para profissionais de saúde mental.",
      benefits: [
        "Prontuários Seguros e Confidenciais",
        "Agendamento Flexível",
        "Controle de Sessões",
        "Relatórios Especializados",
      ],
    },
  }

  const content = specialtyContent[specialty as keyof typeof specialtyContent] || specialtyContent.medicina

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%234F46E5' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Certificado pelo CFM e SBIS
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">{content.title}</h1>

            <p className="text-xl text-blue-600 font-semibold mb-4">{content.subtitle}</p>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl">{content.description}</p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-left">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Solicitar Demonstração
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                <Play className="h-5 w-5 mr-2" />
                Ver Como Funciona
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">5000+</span>
                </div>
                <p className="text-sm text-gray-600">Profissionais Ativos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">99.9%</span>
                </div>
                <p className="text-sm text-gray-600">Uptime Garantido</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">100%</span>
                </div>
                <p className="text-sm text-gray-600">Seguro e Certificado</p>
              </div>
            </div>
          </div>

          {/* Image/Video */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl transform -rotate-6"></div>
              <div className="relative bg-white rounded-xl p-6">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Dashboard+Base+Clínicas"
                  alt="Dashboard Base Clínicas"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  >
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Sistema Online</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} specialty={specialty} />
    </section>
  )
}
