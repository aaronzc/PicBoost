import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { EnhanceWorkbench } from "@/components/features/enhance-workbench"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI 图片放大器 - 免费放大到 4K | PicBoost",
  description: "使用 AI 超分辨率技术将图片放大最多 4 倍。从低分辨率获得清晰的 4K 图片。免费、无水印。",
  keywords: ["ai 图片放大", "图片放大到 4k", "免费图片放大", "在线图片放大", "提高图片分辨率"],
  alternates: { canonical: "https://picboost.com/zh/upscale" },
}

export default function UpscalePageZh() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">AI 图片放大器</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              使用 AI 超分辨率技术将图片放大最多 4 倍。从低分辨率原图获得清晰的 4K 图片。
            </p>
          </div>
          <EnhanceWorkbench defaultMode="upscale" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
