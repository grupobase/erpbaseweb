import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Resources from "@/components/Resources"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import TestForm from "@/components/TestForm"

export const metadata: Metadata = {
  title: "Base® Serviços - Gestão para Prestadoras de Serviços",
  description:
    "Ordem de serviço, agendamento, contratos e financeiro em uma plataforma especializada para empresas de serviços.",
  keywords: "gestão serviços, ordem serviço, agendamento, contratos, empresas serviços",
  openGraph: {
    title: "Base® Serviços - Gestão para Prestadoras de Serviços",
    description:
      "Otimize sua empresa de serviços com gestão completa e integrada.",
    images: ["/images/base-servicos-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Serviços - Gestão para Prestadoras de Serviços",
    description: "Gestão completa para empresas prestadoras de serviços.",
    images: ["/images/base-servicos-og.jpg"],
  },
}

export default function BaseServicosPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `,
        }}
      />

      <Header />

      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <Hero specialty="servicos" />
        </Suspense>

        <Resources />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {process.env.NODE_ENV === "development" && <TestForm />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Base® Serviços",
            description:
              "Gestão completa para empresas prestadoras de serviços com ordem de serviço e agendamento.",
            url: "https://grupobase.com.br/products/base-servicos",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
              description: "Demonstração gratuita disponível",
            },
            provider: {
              "@type": "Organization",
              name: "Grupo Base®",
              url: "https://grupobase.com.br",
            },
            featureList: [
              "Ordem de Serviço",
              "Agendamento Inteligente",
              "Gestão de Contratos",
              "Controle Financeiro",
              "Relatórios Gerenciais",
              "CRM Integrado",
            ],
          }),
        }}
      />
    </div>
  )
}
