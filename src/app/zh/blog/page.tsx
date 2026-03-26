"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useLang } from "@/components/providers/lang-provider"

export default function BlogPage() {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const b = t.blog

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{b.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{b.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {b.posts.map((post) => (
              <Link key={post.slug} href={`${prefix}/blog/${post.slug}`}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} {b.readTime}</span>
                    </div>
                    <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
