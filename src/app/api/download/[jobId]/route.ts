/**
 * Local Mock API: /api/download/:jobId
 * 下载增强后的图片
 */
import { NextRequest, NextResponse } from "next/server"
import { mockStore } from "@/lib/mock-store"

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const jobId = params.jobId
  const job = mockStore.getJob(jobId)

  if (!job || job.status !== "completed" || !job.enhancedData) {
    return NextResponse.json({ error: "Enhanced image not found" }, { status: 404 })
  }

  return new NextResponse(job.enhancedData, {
    headers: {
      "Content-Type": job.fileType || "image/png",
      "Content-Disposition": `attachment; filename="enhanced-${job.fileName || "image.png"}"`,
      "Cache-Control": "public, max-age=3600",
    },
  })
}
