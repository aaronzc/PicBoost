import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { EnhanceWorkbench } from "@/components/features/enhance-workbench"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI 图片增强器在线 - 免费、无水印 | PicBoost",
  description: "免费在线使用 AI 增强图片。自动锐化、降噪和色彩校正。无水印，无需注册。",
  keywords: ["ai 图片增强", "免费图片增强", "在线图片增强", "图片质量提升", "ai 照片增强"],
  alternates: { canonical: "https://picboost.com/zh/enhance" },
}

export default function EnhancePageZh() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">AI 图片增强器</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              上传任意图片，让 AI 自动增强锐度、降低噪点、校正色彩。免费、无水印、无需注册。
            </p>
          </div>
          <EnhanceWorkbench defaultMode="enhance" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
