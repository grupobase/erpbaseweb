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
  title: "Base® Pet - Gestão Veterinária e Pet Shops",
  description:
    "Prontuário animal, controle de vacinas, cirurgias e gestão completa para clínicas veterinárias e pet shops.",
  keywords: "gestão veterinária, prontuário animal, vacinas, cirurgias, pet shop",
  openGraph: {
    title: "Base® Pet - Gestão Veterinária e Pet Shops",
    description:
      "Cuidando dos nossos amigos com tecnologia e carinho.",
    images: ["/images/base-pet-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base® Pet - Gestão Veterinária e Pet Shops",
    description: "Gestão completa para clínicas veterinárias e pet shops.",
    images: ["/images/base-pet-og.jpg"],
  },
}

export default function BasePetPage() {
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
          <Hero specialty="pet" />
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
            name: "Base® Pet",
            description:
              "Sistema de gestão veterinária com prontuário animal e controle de vacinas.",
            url: "https://grupobase.com.br/products/base-pet",
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
              "Prontuário Animal",
              "Controle de Vacinas",
              "Gestão de Cirurgias",
              "Pet Shop Integrado",
              "Agendamento",
              "Controle Financeiro",
            ],
          }),
        }}
      />
    </div>
  )
}
