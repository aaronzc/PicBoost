"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { EnhanceWorkbench } from "@/components/features/enhance-workbench"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useLang } from "@/components/providers/lang-provider"

export default function HomePage() {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const h = t.home

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-7xl relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                {h.badge}
              </div>
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {h.h1}
                </h1>
                <h2
                  className="text-3xl md:text-5xl font-bold tracking-tight mt-4 gradient-text"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7, #6366f1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {h.h1Highlight}
                </h2>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto md:whitespace-nowrap">{h.subtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={`${prefix}/enhance`}>
                  <Button size="xl" className="gap-2 shadow-lg shadow-primary/25">
                    <Sparkles className="h-5 w-5" />
                    {h.ctaPrimary}
                  </Button>
                </Link>
                <Link href={`${prefix}/pricing`}>
                  <Button variant="outline" size="xl" className="gap-2">{h.ctaSecondary}</Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-4">✨ {h.dailyFree}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <EnhanceWorkbench />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{h.featuresTitle}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{h.featuresSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {h.features.map((feature, i) => {
                const icons = [Sparkles, Sparkles, Sparkles, Sparkles]
                const Icon = icons[i] || Sparkles
                return (
                  <Card key={feature.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{h.howTitle}</h2>
              <p className="text-muted-foreground text-lg">{h.howSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {h.howSteps.map((item, i) => (
                <div key={item.title} className="text-center relative">
                  {i < h.howSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20" />
                  )}
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{h.socialTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {h.testimonials.map((t) => (
                <Card key={t.name} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{h.ctaTitle}</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">{h.ctaDesc}</p>
              <Link href={`${prefix}/enhance`}>
                <Button size="xl" variant="secondary" className="gap-2">
                  {h.ctaButton}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
