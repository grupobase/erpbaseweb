import type { Metadata } from "next"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Resources from "@/components/Resources"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Base Clínicas - Sistema Completo para Gestão de Clínicas e Consultórios",
  description:
    "Prontuário eletrônico, agenda online, controle financeiro e muito mais. Sistema especializado para médicos, dentistas, psicólogos, fisioterapeutas e fonoaudiólogos.",
  keywords: "sistema clínica, prontuário eletrônico, agenda médica, software médico, gestão clínica, LGPD, TISS",
  openGraph: {
    title: "Base Clínicas - Sistema Completo para Profissionais da Saúde",
    description:
      "Transforme a gestão da sua clínica com o sistema mais completo do mercado. Prontuário eletrônico, agenda online e controle financeiro.",
    images: ["/images/base-clinicas-og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base Clínicas - Sistema Completo para Profissionais da Saúde",
    description: "Transforme a gestão da sua clínica com o sistema mais completo do mercado.",
    images: ["/images/base-clinicas-og.jpg"],
  },
}

// Segmentos por especialidade
const segments = {
  medicina: {
    name: "Médicos",
    color: "#1D4ED8",
    specialty: "medicina",
    title: "Sistema Médico Completo para sua Clínica",
    subtitle:
      "Prontuário eletrônico, prescrições digitais, auditoria TISS e controle financeiro. Tudo integrado para médicos.",
    bullets: [
      "Prontuário Eletrônico LGPD",
      "Prescrições Digitais",
      "Auditoria TISS Automática",
      "Controle de Convênios",
    ],
    cta: "Solicitar Demonstração Médica",
  },
  odontologia: {
    name: "Dentistas",
    color: "#DC2626",
    specialty: "odontologia",
    title: "Software Odontológico Completo",
    subtitle:
      "Odontograma digital, agenda especializada, controle de tratamentos e financeiro integrado para dentistas.",
    bullets: [
      "Odontograma Digital Completo",
      "Agenda Especializada",
      "Controle de Tratamentos",
      "Gestão Financeira Integrada",
    ],
    cta: "Solicitar Demonstração Odontológica",
  },
  psicologia: {
    name: "Psicólogos",
    color: "#7C3AED",
    specialty: "psicologia",
    title: "Sistema Psicológico Especializado",
    subtitle: "Prontuário seguro, agenda flexível, controle de sessões e relatórios especializados para psicólogos.",
    bullets: ["Prontuário Psicológico Seguro", "Agenda Flexível", "Controle de Sessões", "Relatórios Especializados"],
    cta: "Solicitar Demonstração Psicológica",
  },
  fisioterapia: {
    name: "Fisioterapeutas",
    color: "#059669",
    specialty: "fisioterapia",
    title: "Software para Fisioterapeutas",
    subtitle:
      "Evolução de tratamentos, exercícios personalizados, agenda otimizada e controle completo para fisioterapeutas.",
    bullets: ["Evolução de Tratamentos", "Exercícios Personalizados", "Agenda Otimizada", "Controle de Evolução"],
    cta: "Solicitar Demonstração Fisioterápica",
  },
  fonoaudiologia: {
    name: "Fonoaudiólogos",
    color: "#F97316",
    specialty: "fonoaudiologia",
    title: "Sistema para Fonoaudiólogos",
    subtitle: "Avaliações especializadas, planos terapêuticos, agenda personalizada e relatórios detalhados.",
    bullets: ["Avaliações Especializadas", "Planos Terapêuticos", "Agenda Personalizada", "Relatórios Detalhados"],
    cta: "Solicitar Demonstração Fonoaudiológica",
  },
}

export default function BaseClinicasPage({
  searchParams,
}: {
  searchParams: { specialty?: string; utm_campaign?: string }
}) {
  // Detectar segmento baseado em parâmetros
  const detectSegment = () => {
    const { specialty, utm_campaign } = searchParams

    if (specialty && segments[specialty as keyof typeof segments]) {
      return segments[specialty as keyof typeof segments]
    }

    if (utm_campaign) {
      const campaignSegment = Object.values(segments).find((segment) => utm_campaign.includes(segment.specialty))
      if (campaignSegment) return campaignSegment
    }

    return segments.medicina // Default
  }

  const currentSegment = detectSegment()

  return (
    <main className="min-h-screen bg-white">
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

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero segment={currentSegment} />

      {/* Resources Section */}
      <Resources segment={currentSegment} />

      {/* Testimonials Section */}
      <Testimonials segment={currentSegment} />

      {/* Footer */}
      <Footer />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Base Clínicas",
            description:
              "Sistema completo para gestão de clínicas e consultórios médicos, odontológicos, psicológicos, fisioterápicos e fonoaudiológicos.",
            url: "https://grupobase.com.br/products/base-clinicas",
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
              name: "Grupo Base",
              url: "https://grupobase.com.br",
            },
            featureList: [
              "Prontuário Eletrônico",
              "Agenda Online",
              "Controle Financeiro",
              "Auditoria TISS",
              "Prescrições Digitais",
              "Relatórios Gerenciais",
            ],
          }),
        }}
      />
    </main>
  )
}
