"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/Logo Grupo Base.png"
                alt="Grupo Base"
                width={150}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Soluções tecnológicas inovadoras para profissionais da saúde e empresas que buscam excelência operacional.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/grupobase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/grupobase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/company/grupobase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/grupobase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Produtos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products/base-clinicas" className="text-gray-300 hover:text-white transition-colors">
                  Base Clínicas
                </Link>
              </li>
              <li>
                <Link href="/products/base-erp" className="text-gray-300 hover:text-white transition-colors">
                  Base ERP
                </Link>
              </li>
              <li>
                <Link href="/products/base-mobile" className="text-gray-300 hover:text-white transition-colors">
                  Base Mobile
                </Link>
              </li>
              <li>
                <Link href="/products/integracoes" className="text-gray-300 hover:text-white transition-colors">
                  Integrações
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Suporte</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/suporte/central-ajuda" className="text-gray-300 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/suporte/documentacao" className="text-gray-300 hover:text-white transition-colors">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/suporte/treinamentos" className="text-gray-300 hover:text-white transition-colors">
                  Treinamentos
                </Link>
              </li>
              <li>
                <Link href="/suporte/status" className="text-gray-300 hover:text-white transition-colors">
                  Status do Sistema
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">(11) 3456-7890</p>
                  <p className="text-sm text-gray-400">Segunda a Sexta, 8h às 18h</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">contato@grupobase.com.br</p>
                  <p className="text-sm text-gray-400">Resposta em até 2h úteis</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">São Paulo, SP</p>
                  <p className="text-sm text-gray-400">Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 Grupo Base. Todos os direitos reservados.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link href="/lgpd" className="text-gray-400 hover:text-white transition-colors">
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
