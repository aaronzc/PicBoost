import { NextRequest, NextResponse } from "next/server"

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "picboost",
    timestamp: new Date().toISOString(),
  })
}
