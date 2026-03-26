import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "@/styles/globals.css"
import { LangProvider } from "@/components/providers/lang-provider"
import { headers } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://picboost.com"),
  title: {
    default: "PicBoost - Free AI Image Enhancer | No Watermark, No Sign Up",
    template: "%s | PicBoost",
  },
  description:
    "Enhance your images with AI for free. No watermark, no sign-up required. Upscale to 4K, remove blur, and improve photo quality in seconds.",
  keywords: [
    "ai image enhancer",
    "ai photo enhancer",
    "free image enhancer",
    "image upscaler",
    "photo enhancer online",
    "ai image upscaler",
    "enhance photo quality",
    "remove image blur",
    "free image enhancer no watermark",
    "ai image enhancer no sign up",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://picboost.com",
    siteName: "PicBoost",
    title: "PicBoost - Free AI Image Enhancer",
    description: "Enhance your images with AI. Free, no watermark, no sign-up. Upscale to 4K in seconds.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PicBoost - Free AI Image Enhancer",
    description: "Enhance your images with AI. Free, no watermark, no sign-up.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://picboost.com",
    languages: {
      en: "https://picboost.com",
      zh: "https://picboost.com/zh",
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "PicBoost",
      url: "https://picboost.com",
      description: "Free AI image enhancement tool. Enhance, upscale, and unblur images online with no watermark and no sign-up.",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "19.9",
        offerCount: "3",
      },
      featureList: ["AI image enhancement", "Image upscaling to 4K", "Photo deblurring", "No watermark", "No sign-up required"],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const langHeader = headers().get("x-lang") || "en"
  const lang = langHeader === "zh" ? "zh" : "en"

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <LangProvider initialLang={lang}>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
