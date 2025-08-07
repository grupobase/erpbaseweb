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
  title: "Base® POS e Tecn - Soluções Tecnológicas Avançadas",
  description:
    "PDV avançado, pagamentos integrados, relatórios e soluções tecnológicas completas para seu negócio.",
  keywords: "PDV avançado, pagamentos, soluções tecnológicas, relatórios, integração",
  openGraph: {
    title: "Base® POS e Tecn - Soluções Tecnológicas Avançadas",
    description:
      "Tecnologia avançada para negócios modernos e conectados.",
    images: ["/images/base-pos-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® POS e Tecn - Soluções Tecnológicas Avançadas",
    description: "PDV avançado e soluções tecnológicas completas.",
    images: ["/images/base-pos-og.jpg"],
  },
}

export default function BasePosPage() {
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
          <Hero specialty="pos" />
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
            name: "Base® POS e Tecn",
            description:
              "Soluções tecnológicas avançadas com PDV e pagamentos integrados.",
            url: "https://grupobase.com.br/products/base-pos",
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
              "PDV Avançado",
              "Pagamentos Integrados",
              "Relatórios Inteligentes",
              "Integração Completa",
              "Soluções Personalizadas",
              "Suporte Técnico",
            ],
          }),
        }}
      />
    </div>
  )
}
