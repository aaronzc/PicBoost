"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { useLang } from "@/components/providers/lang-provider"

export default function PricingPage() {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const p = t.pricing

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{p.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{p.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {p.plans.map((plan) => (
              <Card key={plan.name} className={`relative border-0 shadow-lg ${plan.popular ? "ring-2 ring-primary shadow-primary/10" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {lang === "zh" ? "最受欢迎" : "Most Popular"}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`${prefix}/enhance`}>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">{plan.cta}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{p.faqTitle}</h2>
            <div className="space-y-6">
              {p.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold mb-1">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
