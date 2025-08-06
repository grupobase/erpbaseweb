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
  title: "Base Web - Desenvolvimento Web e Soluções Digitais",
  description:
    "Sites responsivos, e-commerce, SEO otimizado e analytics. Plataforma completa para sua presença digital.",
  keywords: "desenvolvimento web, sites responsivos, e-commerce, SEO, analytics, marketing digital",
  openGraph: {
    title: "Base Web - Desenvolvimento Web e Soluções Digitais",
    description:
      "Transforme sua presença digital com sites responsivos, e-commerce e estratégias de marketing.",
    images: ["/images/base-web-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base Web - Desenvolvimento Web e Soluções Digitais",
    description: "Transforme sua presença digital com nossa plataforma completa.",
    images: ["/images/base-web-og.jpg"],
  },
}

export default function BaseWebPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Google Tag Manager */}
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
          <Hero specialty="web" />
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
            name: "Base Web",
            description:
              "Plataforma completa para desenvolvimento web, e-commerce e soluções digitais.",
            url: "https://grupobase.com.br/products/base-web",
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
              description: "Demonstração gratuita disponível",
            },
            provider: {
              "@type": "Organization",
              name: "Grupo Base",
              url: "https://grupobase.com.br",
            },
            featureList: [
              "Sites Responsivos",
              "E-commerce",
              "SEO Otimizado",
              "Analytics",
              "Marketing Digital",
              "Hospedagem",
            ],
          }),
        }}
      />
    </div>
  )
}
