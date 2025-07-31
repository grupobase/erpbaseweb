"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo Grupo Base.png"
                alt="Grupo Base"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products/base-clinicas"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Base Clínicas
            </Link>
            <Link href="/products/base-erp" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Base ERP
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contato
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>(11) 3456-7890</span>
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
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <Link
                href="/products/base-clinicas"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Base Clínicas
              </Link>
              <Link
                href="/products/base-erp"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Base ERP
              </Link>
              <Link
                href="/sobre"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="px-3 py-2 border-t border-gray-100 mt-2">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>(11) 3456-7890</span>
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
