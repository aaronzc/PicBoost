"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLang } from "@/components/providers/lang-provider"

const ZH_BLOG_CONTENT: Record<string, { title: string; content: string; date: string; readTime: string }> = {
  "best-ai-image-enhancers-2026": {
    title: "2026 年最佳免费 AI 图片增强工具对比",
    date: "2026-03-20",
    readTime: "8",
    content: `
# 2026 年最佳免费 AI 图片增强工具

AI 图片增强已经取得了长足的进步。在这篇全面对比中，我们来看看目前最好的免费工具。

## 选择标准

选择 AI 图片增强器时，考虑以下因素：

1. **免费额度** — 免费能处理多少张图片？
2. **水印政策** — 免费版会加水印吗？
3. **注册要求** — 不注册能用吗？
4. **输出质量** — 增强效果如何？
5. **速度** — 处理速度如何？

## 推荐工具

### 1. PicBoost
- ✅ 每天 5 张免费（每日重置）
- ✅ 永远无水印
- ✅ 无需注册
- ✅ 2x-4x 放大
- ✅ 增强、放大、去模糊模式

### 2. Let's Enhance
- ⚠️ 5 张免费（一次性）
- ❌ 免费版有水印
- ❌ 需要注册
- ✅ 质量不错

### 3. Upscale.media
- ⚠️ 免费额度有限
- ❌ 免费版有水印
- ❌ 需要注册
- ✅ 处理速度快

## 结论

对于偶尔需要图片增强的用户，**PicBoost** 提供了最好的免费体验——无水印、无需注册。
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const bp = t.blogPost

  // Try Chinese content first, then English blog data
  const zhPost = ZH_BLOG_CONTENT[params.slug]
  const enPost = t.blog.posts.find((p) => p.slug === params.slug)

  const post = zhPost || (enPost ? { ...enPost, content: "" } : null)

  if (!post) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <article className="container mx-auto max-w-3xl">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href={`${prefix}/blog`} className="hover:text-foreground">{bp.backToBlog}</Link>
              <span>/</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} {t.blog.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          </header>
          {post.content && (
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n").map((line, i) => {
                if (line.startsWith("# ")) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.replace("# ", "")}</h1>
                if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.replace("## ", "")}</h2>
                if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-4 mb-2">{line.replace("### ", "")}</h3>
                if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{line.replace("- ", "")}</li>
                if (line.trim()) return <p key={i} className="mb-4 text-muted-foreground">{line}</p>
                return null
              })}
            </div>
          )}
          <div className="mt-12 p-6 bg-muted rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">{bp.ctaTitle}</h3>
            <p className="text-muted-foreground mb-4">{bp.ctaDesc}</p>
            <Link href={`${prefix}/enhance`}>
              <Button size="lg">{bp.ctaButton}</Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
