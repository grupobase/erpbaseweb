"use client"

import { useState } from "react"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Base Clínicas</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Recursos
            </a>
            <a href="#depoimentos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Depoimentos
            </a>
            <a href="#contato" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contato
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>(11) 3000-0000</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-1" />
              <span>contato@grupobase.com.br</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a
                href="#recursos"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Recursos
              </a>
              <a
                href="#depoimentos"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Depoimentos
              </a>
              <a
                href="#contato"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <div className="px-3 py-2 border-t border-gray-100 mt-2">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>(11) 3000-0000</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contato@grupobase.com.br</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
