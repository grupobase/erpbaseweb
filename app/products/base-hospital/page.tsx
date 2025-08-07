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
  title: "Base® Hospital - Gestão Hospitalar Completa",
  description:
    "Sistema completo para gestão hospitalar com prontuário eletrônico, gestão de leitos, centro cirúrgico e faturamento integrado.",
  keywords: "gestão hospitalar, prontuário eletrônico, leitos, centro cirúrgico, farmácia hospitalar, faturamento",
  openGraph: {
    title: "Base® Hospital - Gestão Hospitalar Completa",
    description:
      "Transforme a gestão do seu hospital com tecnologia de ponta e integração completa.",
    images: ["/images/base-hospital-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Hospital - Gestão Hospitalar Completa",
    description: "Sistema completo para gestão hospitalar moderna.",
    images: ["/images/base-hospital-og.jpg"],
  },
}

export default function BaseHospitalPage() {
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
          <Hero specialty="hospital" />
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
            name: "Base® Hospital",
            description:
              "Sistema completo para gestão hospitalar com prontuário eletrônico integrado.",
            url: "https://grupobase.com.br/products/base-hospital",
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
              name: "Grupo Base®",
              url: "https://grupobase.com.br",
            },
            featureList: [
              "Gestão de Leitos",
              "Centro Cirúrgico",
              "Farmácia Hospitalar",
              "Faturamento",
              "Prontuário Eletrônico",
              "Relatórios Gerenciais",
            ],
          }),
        }}
      />
    </div>
  )
}
