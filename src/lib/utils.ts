import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format file size to human readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Please upload a JPG, PNG, or WebP image.",
    }
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 10MB limit. Your file is ${formatFileSize(file.size)}.`,
    }
  }

  return { valid: true }
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get client IP or fallback to cookie-based identifier
 */
export function getClientIdentifier(): string {
  if (typeof window !== "undefined") {
    let id = localStorage.getItem("picboost_client_id")
    if (!id) {
      id = generateId()
      localStorage.setItem("picboost_client_id", id)
    }
    return id
  }
  return ""
}

/**
 * Check if usage limit is reached (client-side)
 */
export function checkUsageLimit(
  usedToday: number,
  limit: number = 5
): { allowed: boolean; remaining: number } {
  return {
    allowed: usedToday < limit,
    remaining: Math.max(0, limit - usedToday),
  }
}

/**
 * Convert File to base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Download image from URL
 */
export async function downloadImage(url: string, filename: string): Promise<void> {
  const response = await fetch(url)
  const blob = await response.blob()
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
