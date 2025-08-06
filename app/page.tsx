import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Base - Sistema de Gestão
        </h1>
        <p className="text-xl text-gray-600">
          Plataforma completa para gestão de clínicas e consultórios
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products/base-clinicas">
            <Button size="lg">
              Ver Produto
            </Button>
          </Link>
          <Link href="/admin/webhook-config">
            <Button variant="outline" size="lg">
              Configurar Webhooks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
