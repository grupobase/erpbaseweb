"use client"

import { useState } from "react"
import { Star, Quote, ArrowLeft, ArrowRight, Play } from "lucide-react"
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

interface TestimonialsProps {
  segment: Segment
}

const testimonials = {
  medicina: [
    {
      name: "Dr. Carlos Mendes",
      specialty: "Cardiologista",
      clinic: "Clínica CardioVida - São Paulo/SP",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "O Base Clínicas revolucionou minha prática. O prontuário eletrônico é intuitivo e a integração com TISS economiza horas do meu dia. Recomendo para todos os colegas médicos.",
      results: "Reduziu 70% do tempo administrativo",
    },
    {
      name: "Dra. Ana Beatriz",
      specialty: "Pediatra",
      clinic: "Consultório Pediátrico - Rio de Janeiro/RJ",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "A agenda online facilitou muito a vida dos pais dos meus pacientes. As consultas ficaram mais organizadas e o controle financeiro me dá uma visão clara do consultório.",
      results: "Aumentou 40% na eficiência dos agendamentos",
    },
    {
      name: "Dr. Roberto Silva",
      specialty: "Ortopedista",
      clinic: "Clínica OrthoSaúde - Belo Horizonte/MG",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Sistema completo e seguro. A conformidade com LGPD me dá tranquilidade total. O suporte é excepcional, sempre prontos para ajudar.",
      results: "100% de conformidade LGPD alcançada",
    },
  ],
  odontologia: [
    {
      name: "Dr. Marcos Oliveira",
      specialty: "Cirurgião-Dentista",
      clinic: "Odonto Excellence - São Paulo/SP",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "O odontograma digital é fantástico! Consigo mostrar o plano de tratamento visualmente para os pacientes. O controle financeiro me ajuda a gerenciar melhor a clínica.",
      results: "Aumentou 60% na aceitação de tratamentos",
    },
    {
      name: "Dra. Fernanda Costa",
      specialty: "Ortodontista",
      clinic: "Sorriso Perfeito - Curitiba/PR",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "A agenda especializada para ortodontia é perfeita. Consigo controlar todos os retornos e o sistema me lembra automaticamente dos próximos passos do tratamento.",
      results: "Organizou 100% dos tratamentos ortodônticos",
    },
    {
      name: "Dr. Paulo Henrique",
      specialty: "Implantodontista",
      clinic: "Clínica Implante Fácil - Salvador/BA",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Para implantes, preciso de um controle rigoroso. O Base Clínicas me oferece isso e muito mais. Os relatórios me ajudam a tomar decisões estratégicas.",
      results: "Melhorou 80% no controle de tratamentos",
    },
  ],
  psicologia: [
    {
      name: "Dra. Juliana Martins",
      specialty: "Psicóloga Clínica",
      clinic: "Espaço Terapêutico - Porto Alegre/RS",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "A segurança dos dados é fundamental na psicologia. O Base Clínicas oferece total privacidade e o prontuário psicológico atende perfeitamente minhas necessidades.",
      results: "Garantiu 100% da privacidade dos pacientes",
    },
    {
      name: "Dr. André Luiz",
      specialty: "Psicólogo Organizacional",
      clinic: "Consultório Mente Sã - Brasília/DF",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "O controle de sessões e a agenda flexível são ideais para minha prática. Consigo adaptar os horários conforme a necessidade de cada paciente.",
      results: "Flexibilizou 100% dos agendamentos",
    },
    {
      name: "Dra. Camila Santos",
      specialty: "Neuropsicóloga",
      clinic: "Centro de Neuropsicologia - Recife/PE",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Os relatórios especializados me ajudam muito nas avaliações neuropsicológicas. O sistema é intuitivo e se adapta perfeitamente ao meu fluxo de trabalho.",
      results: "Otimizou 90% das avaliações neuropsicológicas",
    },
  ],
  fisioterapia: [
    {
      name: "Dr. Ricardo Almeida",
      specialty: "Fisioterapeuta",
      clinic: "FisioVida - Fortaleza/CE",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "O controle de evolução dos pacientes é excepcional. Consigo acompanhar cada progresso e ajustar os exercícios conforme necessário. Revolucionou minha clínica!",
      results: "Melhorou 85% no acompanhamento de evolução",
    },
    {
      name: "Dra. Patrícia Lima",
      specialty: "Fisioterapeuta Respiratória",
      clinic: "Respirar Bem - Manaus/AM",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Os exercícios personalizados e o banco de protocolos me economizam muito tempo. Posso focar mais no atendimento e menos na parte administrativa.",
      results: "Economizou 50% do tempo administrativo",
    },
    {
      name: "Dr. Fernando Rocha",
      specialty: "Fisioterapeuta Esportivo",
      clinic: "Performance Fisio - Goiânia/GO",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Para atletas, preciso de precisão nos dados. O sistema me oferece relatórios detalhados que ajudam no planejamento dos tratamentos esportivos.",
      results: "Aumentou 70% na precisão dos tratamentos",
    },
  ],
  fonoaudiologia: [
    {
      name: "Dra. Luciana Ferreira",
      specialty: "Fonoaudióloga",
      clinic: "Fono Especializada - Vitória/ES",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As avaliações especializadas são perfeitas para fonoaudiologia. Consigo documentar todo o progresso dos pacientes de forma organizada e profissional.",
      results: "Organizou 100% das avaliações fonoaudiológicas",
    },
    {
      name: "Dr. Gabriel Souza",
      specialty: "Fonoaudiólogo Clínico",
      clinic: "Som & Fala - Florianópolis/SC",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Os planos terapêuticos personalizados facilitaram muito meu trabalho. O sistema entende as especificidades da fonoaudiologia.",
      results: "Personalizou 100% dos planos terapêuticos",
    },
    {
      name: "Dra. Mariana Dias",
      specialty: "Fonoaudióloga Educacional",
      clinic: "Fono Educação - Campo Grande/MS",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Os relatórios detalhados são essenciais para o trabalho educacional. Consigo acompanhar cada criança individualmente e reportar o progresso aos pais.",
      results: "Melhorou 90% na comunicação com pais",
    },
  ],
}

export default function Testimonials({ segment }: TestimonialsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const currentTestimonials = testimonials[segment.specialty as keyof typeof testimonials] || testimonials.medicina

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % currentTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length)
  }

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que {segment.name} falam sobre o Base Clínicas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 5.000 profissionais já transformaram suas clínicas com nossa solução
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 lg:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="h-24 w-24 text-gray-400" />
            </div>

            <div className="relative">
              {/* Stars */}
              <div className="flex items-center mb-6">
                {[...Array(currentTestimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                "{currentTestimonials[currentTestimonial].text}"
              </blockquote>

              {/* Results */}
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-white font-semibold mb-8"
                style={{ backgroundColor: segment.color }}
              >
                <span className="text-sm">{currentTestimonials[currentTestimonial].results}</span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentTestimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={currentTestimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{currentTestimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{currentTestimonials[currentTestimonial].specialty}</div>
                    <div className="text-sm text-gray-500">{currentTestimonials[currentTestimonial].clinic}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ArrowRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                index === currentTestimonial ? "ring-2 ring-blue-200 shadow-xl" : "hover:shadow-xl"
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-4 line-clamp-3">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.specialty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Veja Mais Depoimentos em Vídeo</h3>
                <p className="text-gray-600">
                  Assista aos depoimentos completos dos nossos clientes e veja como o Base Clínicas transformou suas
                  práticas
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-white transition-all duration-200">
                  <Play className="h-5 w-5 mr-2" />
                  Ver Vídeos
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  style={{ backgroundColor: segment.color }}
                >
                  Solicitar Demonstração
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} segment={segment} />
    </section>
  )
}
