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
  title: "Base® Salões - Sistema para Salões de Beleza",
  description:
    "Agendamento online, controle de serviços, comissões e programa de fidelidade para salões de beleza.",
  keywords: "gestão salão, agendamento online, comissões, fidelidade, salão beleza",
  openGraph: {
    title: "Base® Salões - Sistema para Salões de Beleza",
    description:
      "Beleza e gestão em harmonia para o sucesso do seu salão.",
    images: ["/images/base-saloes-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Salões - Sistema para Salões de Beleza",
    description: "Gestão completa para salões de beleza modernos.",
    images: ["/images/base-saloes-og.jpg"],
  },
}

export default function BaseSaloesPage() {
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
          <Hero specialty="saloes" />
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
            name: "Base® Salões",
            description:
              "Sistema de gestão para salões de beleza com agendamento online e controle de comissões.",
            url: "https://grupobase.com.br/products/base-saloes",
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
              "Agendamento Online",
              "Controle de Serviços",
              "Gestão de Comissões",
              "Programa de Fidelidade",
              "Controle de Estoque",
              "Relatórios Financeiros",
            ],
          }),
        }}
      />
    </div>
  )
}
