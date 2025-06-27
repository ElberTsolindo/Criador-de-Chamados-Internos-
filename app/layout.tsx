import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chamados Internos - Prefeitura de São Francisco do Conde",
  description: "Sistema de chamados internos da Prefeitura de São Francisco do Conde - A joia do recôncavo",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chamados Internos",
    startupImage: [
      {
        url: "/icon-192x192.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Chamados Internos",
    title: "Chamados Internos - Prefeitura de São Francisco do Conde",
    description: "Sistema de chamados internos da Prefeitura de São Francisco do Conde",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Chamados Internos",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Chamados Internos - Prefeitura de São Francisco do Conde",
    description: "Sistema de chamados internos da Prefeitura de São Francisco do Conde",
    images: ["/icon-512x512.png"],
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1e40af" />

        {/* Apple PWA */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chamados Internos" />

        {/* Microsoft PWA */}
        <meta name="msapplication-TileImage" content="/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://saofranciscodoconde.ba.gov.br/wp-content/uploads/2021/02/brasao-300x300.jpg"
          as="image"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//saofranciscodoconde.ba.gov.br" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
