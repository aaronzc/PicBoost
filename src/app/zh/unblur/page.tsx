import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { EnhanceWorkbench } from "@/components/features/enhance-workbench"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "在线照片去模糊 - 修复模糊图片 | PicBoost",
  description: "使用 AI 即时修复模糊照片。去除模糊、锐化细节、恢复图片清晰度。免费在线工具，无水印。",
  keywords: ["照片去模糊", "修复模糊照片", "在线去模糊", "ai 去模糊", "锐化模糊照片"],
  alternates: { canonical: "https://picboost.com/zh/unblur" },
}

export default function UnblurPageZh() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">AI 照片去模糊</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              将模糊的照片变成清晰锐利的图像。我们的 AI 能检测并修复运动模糊、对焦模糊和整体模糊。
            </p>
          </div>
          <EnhanceWorkbench defaultMode="unblur" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
