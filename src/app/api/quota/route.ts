/**
 * Local Mock API: /api/quota
 * 查询当日配额
 */
import { NextRequest, NextResponse } from "next/server"
import { mockStore } from "@/lib/mock-store"

export async function GET(request: NextRequest) {
  const clientId = request.headers.get("X-Client-Id") || "anonymous"
  const quota = mockStore.getQuota(clientId, 5)
  return NextResponse.json(quota)
}
