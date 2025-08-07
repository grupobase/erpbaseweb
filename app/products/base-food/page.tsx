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
  title: "Base® Food - Gestão para Restaurantes",
  description:
    "Cardápio digital, delivery, controle de estoque e PDV integrado para estabelecimentos alimentícios.",
  keywords: "gestão restaurante, cardápio digital, delivery, controle estoque, PDV food",
  openGraph: {
    title: "Base® Food - Gestão para Restaurantes",
    description:
      "Sabor e tecnologia unidos para o sucesso do seu estabelecimento alimentício.",
    images: ["/images/base-food-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Food - Gestão para Restaurantes",
    description: "Gestão completa para restaurantes e estabelecimentos alimentícios.",
    images: ["/images/base-food-og.jpg"],
  },
}

export default function BaseFoodPage() {
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
          <Hero specialty="food" />
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
            name: "Base® Food",
            description:
              "Sistema de gestão para restaurantes com cardápio digital e delivery integrado.",
            url: "https://grupobase.com.br/products/base-food",
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
              "Cardápio Digital",
              "Sistema de Delivery",
              "Controle de Estoque",
              "PDV Integrado",
              "Gestão de Mesas",
              "Relatórios de Vendas",
            ],
          }),
        }}
      />
    </div>
  )
}
