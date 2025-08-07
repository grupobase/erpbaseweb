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
  title: "Base® Barbearia - Gestão para Barbearias Modernas",
  description:
    "Agendamento, produtos, comissões e marketing especializado para barbearias modernas.",
  keywords: "gestão barbearia, agendamento barbearia, produtos masculinos, comissões",
  openGraph: {
    title: "Base® Barbearia - Gestão para Barbearias Modernas",
    description:
      "Estilo e gestão moderna para barbearias de sucesso.",
    images: ["/images/base-barbearia-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Barbearia - Gestão para Barbearias Modernas",
    description: "Gestão especializada para barbearias modernas.",
    images: ["/images/base-barbearia-og.jpg"],
  },
}

export default function BaseBarbeariaPage() {
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
          <Hero specialty="barbearia" />
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
            name: "Base® Barbearia",
            description:
              "Sistema de gestão especializado para barbearias modernas com agendamento e marketing.",
            url: "https://grupobase.com.br/products/base-barbearia",
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
              "Agendamento Especializado",
              "Gestão de Produtos",
              "Controle de Comissões",
              "Marketing Digital",
              "Controle Financeiro",
              "Fidelização de Clientes",
            ],
          }),
        }}
      />
    </div>
  )
}
