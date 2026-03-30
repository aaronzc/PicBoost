/**
 * Local Mock API: /api/jobs/:id
 * 查询任务状态
 */
import { NextRequest, NextResponse } from "next/server"
import { mockStore } from "@/lib/mock-store"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id
  const job = mockStore.getJob(jobId)

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: job.id,
    status: job.status,
    mode: job.mode,
    scale: job.scale,
    fileName: job.fileName,
    progress: job.progress,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
    error: job.error,
    enhancedUrl: job.status === "completed" ? `/api/download/${jobId}` : undefined,
    originalUrl: job.status === "completed" ? `/api/original/${jobId}` : undefined,
  })
}
