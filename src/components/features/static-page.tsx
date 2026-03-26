"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { ReactNode } from "react"

interface StaticPageProps {
  title: string
  children: ReactNode
}

export function StaticPageLayout({ title, children }: StaticPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <article className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
