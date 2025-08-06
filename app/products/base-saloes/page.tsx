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
  title: "Base Salões e Barbearias - Sistema de Gestão para Beleza",
  description:
    "Agendamento online, controle de serviços, comissões e fidelidade. Sistema especializado para salões.",
  keywords: "salão beleza, barbearia, agendamento online, comissões, fidelidade, gestão beleza",
}

export default function BaseSaloesPage() {
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
          <Hero specialty="saloes" />
        </Suspense>

        <Resources />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {process.env.NODE_ENV === "development" && <TestForm />}
    </div>
  )
}
