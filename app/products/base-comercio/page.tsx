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
  title: "Base® Comércio - Sistema de Gestão Comercial",
  description:
    "PDV integrado, controle de estoque, vendas e relatórios para estabelecimentos comerciais modernos.",
  keywords: "sistema comercial, PDV, controle estoque, vendas, gestão comercial, relatórios",
  openGraph: {
    title: "Base® Comércio - Sistema de Gestão Comercial",
    description:
      "Transforme seu estabelecimento comercial com tecnologia de ponta e gestão inteligente.",
    images: ["/images/base-comercio-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Comércio - Sistema de Gestão Comercial",
    description: "PDV integrado e gestão completa para seu comércio.",
    images: ["/images/base-comercio-og.jpg"],
  },
}

export default function BaseComercioPage() {
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
          <Hero specialty="comercio" />
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
            name: "Base® Comércio",
            description:
              "Sistema de gestão comercial com PDV integrado e controle de estoque.",
            url: "https://grupobase.com.br/products/base-comercio",
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
              "PDV Integrado",
              "Controle de Estoque",
              "Gestão de Vendas",
              "Relatórios Avançados",
              "Controle Financeiro",
              "Gestão de Clientes",
            ],
          }),
        }}
      />
    </div>
  )
}
