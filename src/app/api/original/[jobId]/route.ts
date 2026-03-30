/**
 * Local Mock API: /api/original/:jobId
 * 获取原始图片
 */
import { NextRequest, NextResponse } from "next/server"
import { mockStore } from "@/lib/mock-store"

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const jobId = params.jobId
  const job = mockStore.getJob(jobId)

  if (!job || !job.originalData) {
    return NextResponse.json({ error: "Original image not found" }, { status: 404 })
  }

  return new NextResponse(job.originalData, {
    headers: {
      "Content-Type": job.fileType || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
