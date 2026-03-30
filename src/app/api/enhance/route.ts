/**
 * Local Mock API: /api/enhance
 * 模拟图片增强处理，本地开发用
 */
import { NextRequest, NextResponse } from "next/server"
import { mockStore } from "@/lib/mock-store"

export async function POST(request: NextRequest) {
  const clientId = request.headers.get("X-Client-Id") || "anonymous"
  const freeLimit = 5

  // Check quota
  const quota = mockStore.getQuota(clientId, freeLimit)
  if (!quota.allowed) {
    return NextResponse.json(
      {
        error: `Daily limit reached. You've used ${quota.used}/${freeLimit} enhancements today.`,
        remainingQuota: 0,
      },
      { status: 429 }
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get("image") as File | null
    const mode = (formData.get("mode") as string) || "enhance"
    const scale = parseInt(formData.get("scale") as string) || 2

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload JPG, PNG, or WebP." },
        { status: 400 }
      )
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds 10MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.` },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const jobId = mockStore.createJob(clientId, file.name, file.type, arrayBuffer, mode, scale)

    // Start async processing (in-memory mock)
    mockStore.processJob(jobId)

    return NextResponse.json({
      success: true,
      jobId,
      remainingQuota: quota.remaining - 1,
    })
  } catch (err) {
    console.error("Enhance error:", err)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
