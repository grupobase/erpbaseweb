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
  title: "Base® Indústria - Sistema de Gestão Industrial",
  description:
    "Controle de produção, qualidade, manutenção e custos para indústrias modernas e eficientes.",
  keywords: "gestão industrial, controle produção, qualidade, manutenção, custos industriais",
  openGraph: {
    title: "Base® Indústria - Sistema de Gestão Industrial",
    description:
      "Produção inteligente para indústrias do futuro.",
    images: ["/images/base-industria-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Indústria - Sistema de Gestão Industrial",
    description: "Gestão completa para indústrias modernas.",
    images: ["/images/base-industria-og.jpg"],
  },
}

export default function BaseIndustriaPage() {
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
          <Hero specialty="industria" />
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
            name: "Base® Indústria",
            description:
              "Sistema de gestão industrial com controle de produção e qualidade.",
            url: "https://grupobase.com.br/products/base-industria",
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
              "Controle de Produção",
              "Gestão de Qualidade",
              "Manutenção Preventiva",
              "Controle de Custos",
              "Relatórios Industriais",
              "Gestão de Recursos",
            ],
          }),
        }}
      />
    </div>
  )
}
