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
  title: "Base® Shop - E-commerce Completo",
  description:
    "Loja virtual, marketplace, pagamentos integrados e logística para seu e-commerce de sucesso.",
  keywords: "e-commerce, loja virtual, marketplace, pagamentos, logística",
  openGraph: {
    title: "Base® Shop - E-commerce Completo",
    description:
      "Venda online sem limites com nossa plataforma completa.",
    images: ["/images/base-shop-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Shop - E-commerce Completo",
    description: "Plataforma completa para e-commerce de sucesso.",
    images: ["/images/base-shop-og.jpg"],
  },
}

export default function BaseShopPage() {
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
          <Hero specialty="shop" />
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
            name: "Base® Shop",
            description:
              "Plataforma de e-commerce completa com loja virtual e marketplace integrado.",
            url: "https://grupobase.com.br/products/base-shop",
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
              "Loja Virtual",
              "Marketplace",
              "Pagamentos Integrados",
              "Gestão de Logística",
              "Controle de Estoque",
              "Analytics Avançado",
            ],
          }),
        }}
      />
    </div>
  )
}
