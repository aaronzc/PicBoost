/**
 * PicBoost API Client
 * Handles all communication with the Cloudflare Workers API
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface EnhanceResponse {
  success: boolean
  jobId?: string
  error?: string
  remainingQuota?: number
}

export interface JobStatus {
  id: string
  status: "pending" | "processing" | "completed" | "failed"
  mode: string
  scale: number
  fileName?: string
  originalUrl?: string
  enhancedUrl?: string
  error?: string
  progress?: number
  createdAt: string
  completedAt?: string
}

export interface QuotaInfo {
  used: number
  limit: number
  remaining: number
  allowed: boolean
}

/**
 * Ensure client ID exists in localStorage
 */
function getClientId(): string {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("picboost_client_id")
  if (!id) {
    id =
      crypto.randomUUID?.() ||
      Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    localStorage.setItem("picboost_client_id", id)
  }
  return id
}

/**
 * Upload image for enhancement
 */
export async function enhanceImage(
  file: File,
  mode: "enhance" | "upscale" | "unblur" = "enhance",
  scale: 2 | 4 = 2
): Promise<EnhanceResponse> {
  const formData = new FormData()
  formData.append("image", file)
  formData.append("mode", mode)
  formData.append("scale", String(scale))

  const response = await fetch(`${API_BASE}/enhance`, {
    method: "POST",
    headers: {
      "X-Client-Id": getClientId(),
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Upload failed" }))
    throw new Error(error.error || "Failed to enhance image")
  }

  return response.json()
}

/**
 * Check job status
 */
export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const response = await fetch(`${API_BASE}/jobs/${jobId}`)

  if (!response.ok) {
    throw new Error("Failed to get job status")
  }

  return response.json()
}

/**
 * Poll job status until completion
 */
export async function pollJobStatus(
  jobId: string,
  onProgress?: (status: JobStatus) => void,
  intervalMs: number = 2000,
  maxAttempts: number = 60
): Promise<JobStatus> {
  let attempts = 0

  while (attempts < maxAttempts) {
    const status = await getJobStatus(jobId)

    if (onProgress) {
      onProgress(status)
    }

    if (status.status === "completed" || status.status === "failed") {
      return status
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs))
    attempts++
  }

  throw new Error("Job timed out — please try again")
}

/**
 * Get remaining quota for current user
 */
export async function getQuota(): Promise<QuotaInfo> {
  try {
    const response = await fetch(`${API_BASE}/quota`, {
      headers: {
        "X-Client-Id": getClientId(),
      },
    })

    if (!response.ok) {
      return { used: 0, limit: 5, remaining: 5, allowed: true }
    }

    return response.json()
  } catch {
    return { used: 0, limit: 5, remaining: 5, allowed: true }
  }
}

/**
 * Build download URL for enhanced image
 */
export function getDownloadUrl(jobId: string): string {
  return `${API_BASE}/download/${jobId}`
}

/**
 * Build original image URL
 */
export function getOriginalUrl(jobId: string): string {
  return `${API_BASE}/original/${jobId}`
}

/**
 * Download enhanced image by fetching and triggering browser download
 */
export async function downloadEnhancedImage(jobId: string, filename: string): Promise<void> {
  const url = getDownloadUrl(jobId)
  const response = await fetch(url)
  if (!response.ok) throw new Error("Download failed")
  const blob = await response.blob()
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
