"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { EnhanceWorkbench } from "@/components/features/enhance-workbench"

export default function RemoveBackgroundPageZh() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">AI 背景去除</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              一键去除图片背景，生成透明 PNG。AI 自动识别主体，精准抠图。
            </p>
          </div>
          <EnhanceWorkbench defaultMode="enhance" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
