"use client"

import { useState } from "react"
import { Play, CheckCircle, Star, Users, Shield, Clock } from "lucide-react"
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

interface HeroProps {
  segment: Segment
}

export default function Hero({ segment }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleCtaClick = () => {
    // Track event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: segment.specialty,
        value: 1,
      })
    }
    setIsModalOpen(true)
  }

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
    // Track video play event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "video_play", {
        event_category: "engagement",
        event_label: "hero_video",
        value: 1,
      })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Sistema #1 para {segment.name}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">{segment.title}</h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{segment.subtitle}</p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {segment.bullets.map((bullet, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                style={{ backgroundColor: segment.color }}
              >
                {segment.cta}
              </button>

              <button
                onClick={handleVideoPlay}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <Play className="h-5 w-5 mr-2" />
                Ver Demonstração
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>+5.000 profissionais confiam</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>100% LGPD Compliance</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>

          {/* Video/Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              {!isVideoPlaying ? (
                <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <button
                    onClick={handleVideoPlay}
                    className="flex items-center justify-center w-20 h-20 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
                  >
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </button>
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Veja o Base Clínicas em ação</h3>
                    <p className="text-sm opacity-90">Demonstração completa - 3 minutos</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Demonstração Base Clínicas"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Sistema Online</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-xs text-gray-600">Uptime</div>
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
