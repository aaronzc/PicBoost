"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLang } from "@/components/providers/lang-provider"

const EN_COMPETITORS: Record<string, { name: string; features: Array<{ feature: string; picboost: boolean | string; competitor: boolean | string }> }> = {
  "lets-enhance": {
    name: "Let's Enhance",
    features: [
      { feature: "Free tier", picboost: "5 images/day", competitor: "5 images (one-time)" },
      { feature: "No watermark", picboost: true, competitor: false },
      { feature: "No sign-up required", picboost: true, competitor: false },
      { feature: "4K upscaling", picboost: true, competitor: true },
      { feature: "Batch processing", picboost: true, competitor: true },
      { feature: "Price (monthly)", picboost: "$9.9/mo", competitor: "$9/mo" },
      { feature: "Background removal", picboost: true, competitor: true },
    ],
  },
  "upscale-media": {
    name: "Upscale.media",
    features: [
      { feature: "Free tier", picboost: "5 images/day", competitor: "3 images (one-time)" },
      { feature: "No watermark", picboost: true, competitor: false },
      { feature: "No sign-up required", picboost: true, competitor: false },
      { feature: "4K upscaling", picboost: true, competitor: true },
      { feature: "Batch processing", picboost: true, competitor: true },
      { feature: "Price (monthly)", picboost: "$9.9/mo", competitor: "$0.17/image" },
      { feature: "Background removal", picboost: true, competitor: true },
    ],
  },
  "cutout-pro": {
    name: "Cutout.pro",
    features: [
      { feature: "Free tier", picboost: "5 images/day", competitor: "5 images (one-time)" },
      { feature: "No watermark", picboost: true, competitor: false },
      { feature: "No sign-up required", picboost: true, competitor: false },
      { feature: "4K upscaling", picboost: true, competitor: true },
      { feature: "Batch processing", picboost: true, competitor: true },
      { feature: "Price (monthly)", picboost: "$9.9/mo", competitor: "$5/mo" },
      { feature: "Background removal", picboost: true, competitor: true },
    ],
  },
}

export default function CompetitorPage({ params }: { params: { competitor: string } }) {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const v = t.vs

  const competitor = EN_COMPETITORS[params.competitor]
  if (!competitor) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{v.picboost} vs {competitor.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{v.subtitle} {competitor.name}?</p>
          </div>
          <Card className="max-w-3xl mx-auto border-0 shadow-lg">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">{v.feature}</th>
                    <th className="text-center p-4 font-semibold text-primary">{v.picboost}</th>
                    <th className="text-center p-4 font-semibold">{competitor.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {competitor.features.map((row) => (
                    <tr key={row.feature} className="border-b last:border-0">
                      <td className="p-4 text-sm">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.picboost === "boolean" ? (
                          row.picboost ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-sm font-medium text-primary">{row.picboost}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.competitor === "boolean" ? (
                          row.competitor ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-sm">{row.competitor}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold mb-4">{v.tryTitle}</h2>
            <p className="text-muted-foreground mb-6">{v.tryDesc}</p>
            <Link href={`${prefix}/enhance`}>
              <Button size="lg" className="gap-2">{v.tryButton} <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
