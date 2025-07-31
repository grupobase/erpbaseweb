"use client"

import { Star, Quote } from "lucide-react"
import Image from "next/image"

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

export default function Testimonials({ segment }: TestimonialsProps) {
  const getTestimonialsBySpecialty = (specialty: string) => {
    const testimonials = {
      medicina: [
        {
          name: "Dr. Carlos Silva",
          specialty: "Cardiologista",
          location: "São Paulo, SP",
          rating: 5,
          text: "O Base Clínicas revolucionou minha prática médica. A integração com TISS e a facilidade do prontuário eletrônico me poupam horas diariamente.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dra. Ana Rodrigues",
          specialty: "Pediatra",
          location: "Rio de Janeiro, RJ",
          rating: 5,
          text: "Excelente sistema! Os pais adoram o agendamento online e eu consigo ter muito mais controle sobre minha agenda e financeiro.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dr. Roberto Santos",
          specialty: "Ortopedista",
          location: "Belo Horizonte, MG",
          rating: 5,
          text: "Migrei de outro sistema e a diferença é impressionante. O suporte é excepcional e as funcionalidades são muito completas.",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      odontologia: [
        {
          name: "Dr. Paulo Mendes",
          specialty: "Cirurgião-Dentista",
          location: "Curitiba, PR",
          rating: 5,
          text: "O odontograma digital é fantástico! Consigo mostrar para o paciente todo o histórico de tratamentos de forma visual e profissional.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dra. Mariana Costa",
          specialty: "Ortodontista",
          location: "Porto Alegre, RS",
          rating: 5,
          text: "A agenda especializada para odontologia é perfeita. Consigo bloquear horários para procedimentos longos e otimizar minha produtividade.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dr. Fernando Lima",
          specialty: "Implantodontista",
          location: "Brasília, DF",
          rating: 5,
          text: "Sistema muito intuitivo e completo. O controle financeiro me ajuda muito no planejamento de tratamentos e investimentos na clínica.",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      psicologia: [
        {
          name: "Dra. Juliana Oliveira",
          specialty: "Psicóloga Clínica",
          location: "São Paulo, SP",
          rating: 5,
          text: "A segurança dos dados é fundamental na psicologia. O Base Clínicas oferece toda proteção necessária para meus pacientes.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dr. Ricardo Alves",
          specialty: "Psicólogo Organizacional",
          location: "Florianópolis, SC",
          rating: 5,
          text: "O controle de sessões e a evolução terapêutica me ajudam muito no acompanhamento dos pacientes. Sistema muito bem pensado.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dra. Camila Ferreira",
          specialty: "Neuropsicóloga",
          location: "Salvador, BA",
          rating: 5,
          text: "Excelente para organizar relatórios e laudos. A interface é limpa e facilita muito meu trabalho diário com os pacientes.",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      fisioterapia: [
        {
          name: "Dr. Marcos Pereira",
          specialty: "Fisioterapeuta Esportivo",
          location: "Recife, PE",
          rating: 5,
          text: "O acompanhamento da evolução dos pacientes é impressionante. Consigo mostrar graficamente o progresso de cada tratamento.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dra. Luciana Barbosa",
          specialty: "Fisioterapeuta Respiratória",
          location: "Fortaleza, CE",
          rating: 5,
          text: "O app do paciente é um diferencial incrível. Meus pacientes conseguem fazer os exercícios em casa e eu acompanho tudo.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dr. André Souza",
          specialty: "Fisioterapeuta Neurológico",
          location: "Goiânia, GO",
          rating: 5,
          text: "Sistema muito completo para fisioterapia. As fichas de evolução são detalhadas e me ajudam muito no planejamento terapêutico.",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      fonoaudiologia: [
        {
          name: "Dra. Patricia Gomes",
          specialty: "Fonoaudióloga Clínica",
          location: "Campinas, SP",
          rating: 5,
          text: "Os protocolos de avaliação são muito bem estruturados. Facilita muito meu trabalho com crianças e adultos.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dra. Renata Cardoso",
          specialty: "Fonoaudióloga Educacional",
          location: "Vitória, ES",
          rating: 5,
          text: "Excelente para criar planos terapêuticos personalizados. Os relatórios são muito profissionais e detalhados.",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Dra. Gabriela Moura",
          specialty: "Fonoaudióloga Hospitalar",
          location: "Manaus, AM",
          rating: 5,
          text: "Sistema muito intuitivo e completo. O acompanhamento familiar é um recurso que faz toda diferença no tratamento.",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    }

    return testimonials[specialty as keyof typeof testimonials] || testimonials.medicina
  }

  const testimonials = getTestimonialsBySpecialty(segment.specialty)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que {segment.name} falam sobre o Base Clínicas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 5.000 profissionais da saúde já transformaram suas práticas com nossa solução
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="h-8 w-8 opacity-20" style={{ color: segment.color }} />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.specialty}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: segment.color }}>
              5.000+
            </div>
            <div className="text-gray-600">Profissionais Ativos</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: segment.color }}>
              99.9%
            </div>
            <div className="text-gray-600">Uptime Garantido</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: segment.color }}>
              4.9/5
            </div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2" style={{ color: segment.color }}>
              24/7
            </div>
            <div className="text-gray-600">Suporte Disponível</div>
          </div>
        </div>
      </div>
    </section>
  )
}
