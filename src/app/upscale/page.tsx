"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { EnhanceWorkbench } from "@/components/features/enhance-workbench"
import { useLang } from "@/components/providers/lang-provider"

export default function UpscalePage() {
  const { t } = useLang()
  const u = t.upscale

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{u.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{u.subtitle}</p>
          </div>
          <EnhanceWorkbench defaultMode="upscale" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
