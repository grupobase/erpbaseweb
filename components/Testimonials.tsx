"use client"

import { useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react"
import CtaModal from "./CtaModal"

export default function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      specialty: "Cardiologista",
      clinic: "Clínica CardioVida - São Paulo/SP",
      image: "/placeholder.svg?height=80&width=80&text=CM",
      rating: 5,
      text: "O Base Clínicas revolucionou minha prática médica. A integração entre prontuário eletrônico e agendamento é perfeita. Economizo 3 horas por dia em tarefas administrativas.",
      results: "Aumento de 40% na produtividade",
      videoUrl: "#",
    },
    {
      name: "Dra. Ana Paula Santos",
      specialty: "Pediatra",
      clinic: "Consultório Pediátrico - Rio de Janeiro/RJ",
      image: "/placeholder.svg?height=80&width=80&text=AS",
      rating: 5,
      text: "Como pediatra, preciso de agilidade no atendimento. O sistema é intuitivo e os pais adoram receber lembretes automáticos. Reduzi as faltas em 60%.",
      results: "Redução de 60% nas faltas",
      videoUrl: "#",
    },
    {
      name: "Dr. Roberto Silva",
      specialty: "Ortopedista",
      clinic: "Clínica OrthoMed - Belo Horizonte/MG",
      image: "/placeholder.svg?height=80&width=80&text=RS",
      rating: 5,
      text: "A telemedicina integrada foi um diferencial durante a pandemia. Consegui manter 80% dos atendimentos online sem perder qualidade no diagnóstico.",
      results: "80% dos atendimentos mantidos",
      videoUrl: "#",
    },
    {
      name: "Dra. Mariana Costa",
      specialty: "Dermatologista",
      clinic: "Derma Clinic - Porto Alegre/RS",
      image: "/placeholder.svg?height=80&width=80&text=MC",
      rating: 5,
      text: "O módulo de imagens é excepcional para dermatologia. Posso comparar fotos de diferentes consultas e acompanhar a evolução dos tratamentos com precisão.",
      results: "Melhoria na precisão diagnóstica",
      videoUrl: "#",
    },
    {
      name: "Dr. Fernando Oliveira",
      specialty: "Psiquiatra",
      clinic: "Consultório Mente Sã - Brasília/DF",
      image: "/placeholder.svg?height=80&width=80&text=FO",
      rating: 5,
      text: "A segurança e confidencialidade são fundamentais na psiquiatria. O Base Clínicas atende todos os requisitos de privacidade e ainda oferece relatórios detalhados.",
      results: "100% de conformidade LGPD",
      videoUrl: "#",
    },
    {
      name: "Dra. Juliana Pereira",
      specialty: "Ginecologista",
      clinic: "Clínica Feminina - Salvador/BA",
      image: "/placeholder.svg?height=80&width=80&text=JP",
      rating: 5,
      text: "O suporte é excepcional. Sempre que preciso, a equipe está disponível. A migração dos dados foi feita sem perder nenhuma informação importante.",
      results: "Migração 100% segura",
      videoUrl: "#",
    },
  ]

  const stats = [
    { number: "5000+", label: "Médicos Ativos", description: "Profissionais de saúde confiam em nossa plataforma" },
    { number: "98%", label: "Satisfação", description: "Índice de satisfação dos nossos clientes" },
    { number: "99.9%", label: "Uptime", description: "Disponibilidade garantida do sistema" },
    { number: "24/7", label: "Suporte", description: "Atendimento especializado sempre disponível" },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 5.000 profissionais de saúde já transformaram suas práticas com o Base Clínicas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="text-center">
              <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />

              <blockquote className="text-2xl text-gray-900 font-medium mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-blue-600 font-medium">{testimonials[currentTestimonial].specialty}</div>
                  <div className="text-gray-600 text-sm">{testimonials[currentTestimonial].clinic}</div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block text-sm font-medium mb-6">
                {testimonials[currentTestimonial].results}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center mx-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="h-5 w-5 mr-2" />
                Ver Depoimento em Vídeo
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm">{testimonial.specialty}</div>
                </div>
              </div>

              <div className="flex items-center mb-3">{renderStars(testimonial.rating)}</div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{testimonial.text}</p>

              <div className="text-xs text-gray-500 mb-3">{testimonial.clinic}</div>

              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium inline-block">
                {testimonial.results}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Junte-se a mais de 5.000 profissionais satisfeitos</h3>
          <p className="text-xl text-blue-100 mb-8">Transforme sua prática médica hoje mesmo com o Base Clínicas</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Solicitar Demonstração Gratuita
          </button>
        </div>
      </div>

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
