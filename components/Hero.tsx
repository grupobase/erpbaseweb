"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, CheckCircle, ArrowRight, X } from "lucide-react"
import CtaModal from "./CtaModal"

interface HeroProps {
  segment?: {
    name: string
    color: string
    specialty: string
    title: string
    subtitle: string
    bullets: string[]
    cta: string
  }
}

const defaultSegment = {
  name: "Profissionais da Saúde",
  color: "#1D4ED8",
  specialty: "medicina",
  title: "Sistema Completo para Gestão da sua Clínica",
  subtitle: "Prontuário eletrônico, agenda online, controle financeiro e muito mais. Tudo em um só lugar.",
  bullets: [
    "Prontuário Eletrônico LGPD",
    "Agenda Online Inteligente",
    "Controle Financeiro Completo",
    "Auditoria TISS Automática",
  ],
  cta: "Solicitar Demonstração",
}

export default function Hero({ segment }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const currentSegment = segment || defaultSegment

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${currentSegment.color} 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: `${currentSegment.color}15`,
                color: currentSegment.color,
              }}
            >
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: currentSegment.color }} />
              Especializado para {currentSegment.name}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {currentSegment.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {currentSegment.subtitle}
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid sm:grid-cols-2 gap-3 mb-8"
            >
              {currentSegment.bullets.map((bullet, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: currentSegment.color }} />
                  <span className="text-sm font-medium">{bullet}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                style={{ backgroundColor: currentSegment.color }}
              >
                {currentSegment.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button
                onClick={() => setIsVideoPlaying(true)}
                className="inline-flex items-center px-8 py-4 border-2 text-base font-medium rounded-xl bg-white hover:bg-gray-50 transition-colors duration-200"
                style={{
                  borderColor: currentSegment.color,
                  color: currentSegment.color,
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-4">Mais de 10.000 profissionais confiam no Base</p>
              <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-60">
                <div className="text-xs font-semibold text-gray-400">LGPD</div>
                <div className="text-xs font-semibold text-gray-400">CFM</div>
                <div className="text-xs font-semibold text-gray-400">TISS</div>
                <div className="text-xs font-semibold text-gray-400">SSL</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.svg?height=600&width=800&text=Base+Clínicas+Dashboard"
                alt="Interface do Base Clínicas"
                className="w-full h-auto"
              />

              {/* Play Button Overlay */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                  >
                    <Play className="h-8 w-8 ml-1" style={{ color: currentSegment.color }} />
                  </button>
                </div>
              )}
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentSegment.color }} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Sistema Online</p>
                  <p className="text-xs text-gray-500">99.9% Uptime</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Suporte 24/7</p>
                  <p className="text-xs text-gray-500">Sempre disponível</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <video src="/placeholder.mp4" controls autoPlay className="w-full h-full">
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      )}

      {/* CTA Modal */}
      <CtaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} segment={currentSegment} />
    </section>
  )
}
