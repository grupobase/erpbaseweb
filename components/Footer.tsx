"use client"

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Base Clínicas</h3>
            <p className="text-gray-300 mb-6">
              Sistema completo para gestão de clínicas e consultórios. Transformando a prática médica com tecnologia e
              inovação.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="font-medium">(11) 3000-0000</div>
                  <div className="text-sm text-gray-400">Segunda a Sexta, 8h às 18h</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="font-medium">contato@grupobase.com.br</div>
                  <div className="text-sm text-gray-400">Suporte técnico 24/7</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 mt-1" />
                <div>
                  <div className="font-medium">São Paulo - SP</div>
                  <div className="text-sm text-gray-400">Av. Paulista, 1000 - Bela Vista</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="font-medium">Horário de Atendimento</div>
                  <div className="text-sm text-gray-400">Seg-Sex: 8h-18h | Sáb: 8h-12h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#recursos" className="text-gray-300 hover:text-white transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-gray-300 hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="/precos" className="text-gray-300 hover:text-white transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/suporte" className="text-gray-300 hover:text-white transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="/treinamentos" className="text-gray-300 hover:text-white transition-colors">
                  Treinamentos
                </a>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Especialidades</h4>
            <ul className="space-y-2">
              <li>
                <a href="?specialty=medicina" className="text-gray-300 hover:text-white transition-colors">
                  Medicina
                </a>
              </li>
              <li>
                <a href="?specialty=odontologia" className="text-gray-300 hover:text-white transition-colors">
                  Odontologia
                </a>
              </li>
              <li>
                <a href="?specialty=psicologia" className="text-gray-300 hover:text-white transition-colors">
                  Psicologia
                </a>
              </li>
              <li>
                <a href="?specialty=fisioterapia" className="text-gray-300 hover:text-white transition-colors">
                  Fisioterapia
                </a>
              </li>
              <li>
                <a href="?specialty=fonoaudiologia" className="text-gray-300 hover:text-white transition-colors">
                  Fonoaudiologia
                </a>
              </li>
              <li>
                <a href="?specialty=nutricao" className="text-gray-300 hover:text-white transition-colors">
                  Nutrição
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">© 2024 Grupo Base. Todos os direitos reservados.</div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="/lgpd" className="text-gray-400 hover:text-white transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
