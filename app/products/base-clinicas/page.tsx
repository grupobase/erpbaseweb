import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Resources from "@/components/Resources"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import TestForm from "@/components/TestForm"

export const metadata: Metadata = {
  title: "Base Clínicas - Sistema Completo para Gestão de Clínicas e Consultórios",
  description:
    "Prontuário eletrônico, agenda online, controle financeiro e muito mais. Sistema especializado para médicos, dentistas, psicólogos, fisioterapeutas e fonoaudiólogos.",
  keywords: "sistema clínica, prontuário eletrônico, agenda médica, software médico, gestão clínica, LGPD, TISS",
  openGraph: {
    title: "Base Clínicas - Sistema Completo para Profissionais da Saúde",
    description:
      "Transforme a gestão da sua clínica com o sistema mais completo do mercado. Prontuário eletrônico, agenda online e controle financeiro.",
    images: ["/images/base-clinicas-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base Clínicas - Sistema Completo para Profissionais da Saúde",
    description: "Transforme a gestão da sua clínica com o sistema mais completo do mercado.",
    images: ["/images/base-clinicas-og.jpg"],
  },
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function BaseClinicasPage({ searchParams }: PageProps) {
  const specialty = typeof searchParams.specialty === "string" ? searchParams.specialty : "medicina"

  return (
    <div className="min-h-screen bg-white">
      {/* Google Tag Manager */}
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

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <Hero specialty={specialty} />
        </Suspense>

        {/* Resources Section */}
        <Resources />

        {/* Testimonials Section */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Test Component - Only in development */}
      {process.env.NODE_ENV === "development" && <TestForm />}

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Base Clínicas",
            description:
              "Sistema completo para gestão de clínicas e consultórios médicos, odontológicos, psicológicos, fisioterápicos e fonoaudiológicos.",
            url: "https://grupobase.com.br/products/base-clinicas",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
              description: "Demonstração gratuita disponível",
            },
            provider: {
              "@type": "Organization",
              name: "Grupo Base",
              url: "https://grupobase.com.br",
            },
            featureList: [
              "Prontuário Eletrônico",
              "Agenda Online",
              "Controle Financeiro",
              "Auditoria TISS",
              "Prescrições Digitais",
              "Relatórios Gerenciais",
            ],
          }),
        }}
      />
    </div>
  )
}
