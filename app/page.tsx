"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Building2, Stethoscope, Globe, Wheat, UtensilsCrossed, Scissors, Heart, ShoppingBag, Home, ArrowRight, Users, TrendingUp, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const products = [
    {
      id: "base-clinicas",
      name: "Base Clínicas",
      description: "Sistema completo para gestão de clínicas e consultórios médicos",
      icon: Stethoscope,
      route: "/products/base-clinicas",
      color: "from-blue-500 to-blue-600",
      features: ["Prontuário Eletrônico", "Agenda Online", "Telemedicina", "Faturamento TISS"],
      stats: "5000+ profissionais"
    },
    {
      id: "base-web",
      name: "Base Web",
      description: "Plataforma de desenvolvimento web e soluções digitais",
      icon: Globe,
      route: "/products/base-web",
      color: "from-purple-500 to-purple-600",
      features: ["Sites Responsivos", "E-commerce", "SEO Otimizado", "Analytics"],
      stats: "1000+ sites criados"
    },
    {
      id: "base-agro",
      name: "Base Agro",
      description: "Sistema de gestão para agronegócio e propriedades rurais",
      icon: Wheat,
      route: "/products/base-agro",
      color: "from-green-500 to-green-600",
      features: ["Controle de Safra", "Gestão Pecuária", "Financeiro Rural", "Relatórios"],
      stats: "500+ propriedades"
    },
    {
      id: "base-food",
      name: "Base Food",
      description: "Gestão completa para restaurantes e estabelecimentos alimentícios",
      icon: UtensilsCrossed,
      route: "/products/base-food",
      color: "from-orange-500 to-orange-600",
      features: ["Cardápio Digital", "Delivery", "Controle de Estoque", "PDV"],
      stats: "800+ restaurantes"
    },
    {
      id: "base-saloes",
      name: "Base Salões e Barbearias",
      description: "Sistema especializado para salões de beleza e barbearias",
      icon: Scissors,
      route: "/products/base-saloes",
      color: "from-pink-500 to-pink-600",
      features: ["Agendamento Online", "Controle de Serviços", "Comissões", "Fidelidade"],
      stats: "1200+ salões"
    },
    {
      id: "base-pet",
      name: "Base Pet",
      description: "Gestão veterinária e pet shops com prontuário animal",
      icon: Heart,
      route: "/products/base-pet",
      color: "from-teal-500 to-teal-600",
      features: ["Prontuário Animal", "Vacinas", "Cirurgias", "Pet Shop"],
      stats: "300+ clínicas vet"
    },
    {
      id: "base-shop",
      name: "Base Shop",
      description: "E-commerce completo com gestão de vendas e estoque",
      icon: ShoppingBag,
      route: "/products/base-shop",
      color: "from-indigo-500 to-indigo-600",
      features: ["Loja Virtual", "Marketplace", "Pagamentos", "Logística"],
      stats: "600+ lojas online"
    },
    {
      id: "base-incorporacao",
      name: "Base Incorporação e Construção",
      description: "Gestão de projetos imobiliários e construção civil",
      icon: Home,
      route: "/products/base-incorporacao",
      color: "from-gray-500 to-gray-600",
      features: ["Gestão de Obras", "Vendas", "Financeiro", "Documentos"],
      stats: "150+ projetos"
    }
  ]

  const stats = [
    { icon: Users, label: "Clientes Ativos", value: "10.000+" },
    { icon: TrendingUp, label: "Crescimento Anual", value: "150%" },
    { icon: Shield, label: "Uptime", value: "99.9%" },
    { icon: Zap, label: "Produtos", value: "8" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/Logo Grupo Base.png"
                alt="Grupo Base"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#produtos" className="text-gray-600 hover:text-blue-600 transition-colors">
                Produtos
              </Link>
              <Link href="#sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre
              </Link>
              <Link href="#contato" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Grupo <span className="text-blue-600">Base</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Soluções tecnológicas completas para transformar seu negócio. 
            Sistemas especializados para cada segmento, com a qualidade e inovação que você precisa.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Produtos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções especializadas para cada segmento de mercado, desenvolvidas com tecnologia de ponta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={product.route}
                className="group block"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${product.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="relative z-10">
                      <product.icon className="h-12 w-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm opacity-90">{product.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-3">{product.stats}</div>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-blue-600 font-semibold">Ver Produto</span>
                      <ArrowRight className={`h-5 w-5 text-blue-600 transition-transform ${
                        hoveredProduct === product.id ? 'translate-x-1' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Escolha a solução ideal para seu segmento e comece a crescer hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/base-clinicas"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Começar Agora
            </Link>
            <Link
              href="#contato"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Falar com Especialista
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/Logo Grupo Base.png"
                alt="Grupo Base"
                width={120}
                height={32}
                className="h-8 w-auto mb-4 filter brightness-0 invert"
              />
              <p className="text-gray-400">
                Transformando negócios através da tecnologia
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products/base-clinicas" className="hover:text-white">Base Clínicas</Link></li>
                <li><Link href="/products/base-web" className="hover:text-white">Base Web</Link></li>
                <li><Link href="/products/base-agro" className="hover:text-white">Base Agro</Link></li>
                <li><Link href="/products/base-food" className="hover:text-white">Base Food</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Mais Produtos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products/base-saloes" className="hover:text-white">Base Salões</Link></li>
                <li><Link href="/products/base-pet" className="hover:text-white">Base Pet</Link></li>
                <li><Link href="/products/base-shop" className="hover:text-white">Base Shop</Link></li>
                <li><Link href="/products/base-incorporacao" className="hover:text-white">Base Incorporação</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contato@grupobase.com.br</li>
                <li>(11) 3000-0000</li>
                <li>São Paulo - SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Grupo Base. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
