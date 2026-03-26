"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLang } from "@/components/providers/lang-provider"

const ZH_COMPETITORS: Record<string, { name: string; features: Array<{ feature: string; picboost: boolean | string; competitor: boolean | string }> }> = {
  "lets-enhance": {
    name: "Let's Enhance",
    features: [
      { feature: "免费额度", picboost: "每天 5 张", competitor: "5 张（一次性）" },
      { feature: "无水印", picboost: true, competitor: false },
      { feature: "无需注册", picboost: true, competitor: false },
      { feature: "4K 放大", picboost: true, competitor: true },
      { feature: "批量处理", picboost: true, competitor: true },
      { feature: "月价格", picboost: "$9.9/月", competitor: "$9/月" },
      { feature: "背景去除", picboost: true, competitor: true },
    ],
  },
  "upscale-media": {
    name: "Upscale.media",
    features: [
      { feature: "免费额度", picboost: "每天 5 张", competitor: "3 张（一次性）" },
      { feature: "无水印", picboost: true, competitor: false },
      { feature: "无需注册", picboost: true, competitor: false },
      { feature: "4K 放大", picboost: true, competitor: true },
      { feature: "批量处理", picboost: true, competitor: true },
      { feature: "月价格", picboost: "$9.9/月", competitor: "$0.17/张" },
      { feature: "背景去除", picboost: true, competitor: true },
    ],
  },
  "cutout-pro": {
    name: "Cutout.pro",
    features: [
      { feature: "免费额度", picboost: "每天 5 张", competitor: "5 张（一次性）" },
      { feature: "无水印", picboost: true, competitor: false },
      { feature: "无需注册", picboost: true, competitor: false },
      { feature: "4K 放大", picboost: true, competitor: true },
      { feature: "批量处理", picboost: true, competitor: true },
      { feature: "月价格", picboost: "$9.9/月", competitor: "$5/月" },
      { feature: "背景去除", picboost: true, competitor: true },
    ],
  },
}

export default function CompetitorPageZh({ params }: { params: { competitor: string } }) {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const v = t.vs

  const competitor = ZH_COMPETITORS[params.competitor]
  if (!competitor) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{v.picboost} vs {competitor.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{v.subtitle} {competitor.name}？</p>
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
