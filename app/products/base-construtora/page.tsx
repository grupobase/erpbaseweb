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
  title: "Base® Construtora e Incorporações - Gestão de Projetos Imobiliários",
  description:
    "Gestão de obras, vendas, financeiro e documentos para projetos imobiliários e construção civil.",
  keywords: "gestão construtora, incorporação, obras, projetos imobiliários, construção civil",
  openGraph: {
    title: "Base® Construtora e Incorporações - Gestão de Projetos Imobiliários",
    description:
      "Construindo o futuro com gestão inteligente e integrada.",
    images: ["/images/base-construtora-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Construtora e Incorporações - Gestão de Projetos Imobiliários",
    description: "Gestão completa para construtoras e incorporadoras.",
    images: ["/images/base-construtora-og.jpg"],
  },
}

export default function BaseConstrutoraPage() {
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
          <Hero specialty="construtora" />
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
            name: "Base® Construtora e Incorporações",
            description:
              "Sistema de gestão para construtoras com controle de obras e vendas.",
            url: "https://grupobase.com.br/products/base-construtora",
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
              "Gestão de Obras",
              "Controle de Vendas",
              "Financeiro Especializado",
              "Gestão de Documentos",
              "Cronograma de Obras",
              "Relatórios Gerenciais",
            ],
          }),
        }}
      />
    </div>
  )
}
