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
  title: "Base® Agro - Sistema de Gestão para Agronegócio",
  description:
    "Controle de safra, gestão pecuária, financeiro rural e relatórios especializados para propriedades rurais.",
  keywords: "gestão agro, controle safra, pecuária, financeiro rural, agronegócio",
  openGraph: {
    title: "Base® Agro - Sistema de Gestão para Agronegócio",
    description:
      "Tecnologia de ponta para o agronegócio moderno e sustentável.",
    images: ["/images/base-agro-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Agro - Sistema de Gestão para Agronegócio",
    description: "Gestão completa para propriedades rurais e agronegócio.",
    images: ["/images/base-agro-og.jpg"],
  },
}

export default function BaseAgroPage() {
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
          <Hero specialty="agro" />
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
            name: "Base® Agro",
            description:
              "Sistema de gestão para agronegócio com controle de safra e gestão pecuária.",
            url: "https://grupobase.com.br/products/base-agro",
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
              "Controle de Safra",
              "Gestão Pecuária",
              "Financeiro Rural",
              "Relatórios Especializados",
              "Controle de Insumos",
              "Gestão de Propriedades",
            ],
          }),
        }}
      />
    </div>
  )
}
