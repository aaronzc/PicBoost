/**
 * Cloudflare Worker: PicBoost API
 * Handles image enhancement requests via Workers AI (Real-ESRGAN)
 */

export interface Env {
  // Bindings
  R2_BUCKET: R2Bucket
  D1_DB: D1Database
  AI: Ai
  QUEUE: Queue

  // Secrets
  CLERK_SECRET_KEY: string

  // Vars
  FREE_DAILY_LIMIT: string
  MAX_FILE_SIZE: string
}

interface EnhanceJob {
  jobId: string
  r2Key: string
  clientId: string
  mode: string
  scale: number
}

/**
 * Allowed CORS origins
 */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Client-Id, Authorization",
  "Access-Control-Max-Age": "86400",
}

/**
 * Main Worker fetch handler
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS })
    }

    try {
      // Route: POST /api/enhance — upload image & enqueue
      if (path === "/api/enhance" && request.method === "POST") {
        return await handleEnhance(request, env, CORS_HEADERS)
      }

      // Route: GET /api/jobs/:id — poll job status
      if (path.startsWith("/api/jobs/") && request.method === "GET") {
        const jobId = path.split("/api/jobs/")[1]
        return await handleGetJob(jobId, request, env, CORS_HEADERS)
      }

      // Route: GET /api/quota — check daily quota
      if (path === "/api/quota" && request.method === "GET") {
        return await handleGetQuota(request, env, CORS_HEADERS)
      }

      // Route: GET /api/download/:jobId — download enhanced image
      if (path.startsWith("/api/download/") && request.method === "GET") {
        const jobId = path.split("/api/download/")[1]
        return await handleDownload(jobId, env, CORS_HEADERS)
      }

      // Route: GET /api/original/:jobId — serve original image
      if (path.startsWith("/api/original/") && request.method === "GET") {
        const jobId = path.split("/api/original/")[1]
        return await handleOriginal(jobId, env, CORS_HEADERS)
      }

      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error("Worker error:", error)
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      })
    }
  },

  /**
   * Queue consumer for async image processing
   */
  async queue(batch: MessageBatch<EnhanceJob>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        await processEnhanceJob(message.body, env)
        message.ack()
      } catch (error) {
        console.error("Queue processing error:", error)
        message.retry()
      }
    }
  },
}

/**
 * Handle image enhancement request
 */
async function handleEnhance(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const clientId = extractClientId(request)
  const freeLimit = parseInt(env.FREE_DAILY_LIMIT || "5")

  // Check quota
  const quota = await checkQuota(clientId, env, freeLimit)
  if (!quota.allowed) {
    return jsonResponse(
      {
        error: `Daily limit reached. You've used ${quota.used}/${freeLimit} enhancements today. Come back tomorrow for more!`,
        remainingQuota: 0,
      },
      429,
      corsHeaders
    )
  }

  // Parse form data
  const formData = await request.formData()
  const file = formData.get("image") as File | null
  const mode = (formData.get("mode") as string) || "enhance"
  const scale = parseInt(formData.get("scale") as string) || 2

  if (!file) {
    return jsonResponse({ error: "No image file provided" }, 400, corsHeaders)
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
  if (!allowedTypes.includes(file.type)) {
    return jsonResponse(
      { error: "Unsupported file type. Please upload JPG, PNG, or WebP." },
      400,
      corsHeaders
    )
  }

  // Validate file size
  const maxSize = parseInt(env.MAX_FILE_SIZE || "10485760")
  if (file.size > maxSize) {
    return jsonResponse(
      { error: `File size exceeds 10MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.` },
      400,
      corsHeaders
    )
  }

  // Validate scale
  if (![2, 4].includes(scale)) {
    return jsonResponse({ error: "Invalid scale. Use 2 or 4." }, 400, corsHeaders)
  }

  // Generate job ID and upload to R2
  const jobId = generateId()
  const originalExt = getExtension(file.name, file.type)
  const r2Key = `uploads/${clientId}/${jobId}/original${originalExt}`

  const arrayBuffer = await file.arrayBuffer()
  await env.R2_BUCKET.put(r2Key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type,
    },
  })

  // Create job record in D1
  await env.D1_DB.prepare(
    `INSERT INTO jobs (id, client_id, r2_key, mode, scale, file_name, file_size, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))`
  )
    .bind(jobId, clientId, r2Key, mode, scale, file.name, file.size)
    .run()

  // Enqueue for processing
  await env.QUEUE.send({
    jobId,
    r2Key,
    clientId,
    mode,
    scale,
  })

  // Update quota
  await incrementQuota(clientId, env)

  return jsonResponse(
    {
      success: true,
      jobId,
      remainingQuota: quota.remaining - 1,
    },
    200,
    corsHeaders
  )
}

/**
 * Handle job status check
 */
async function handleGetJob(
  jobId: string,
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const job = await env.D1_DB.prepare(`SELECT * FROM jobs WHERE id = ?`).bind(jobId).first()

  if (!job) {
    return jsonResponse({ error: "Job not found" }, 404, corsHeaders)
  }

  const origin = new URL(request.url).origin

  const response: Record<string, unknown> = {
    id: job.id,
    status: job.status,
    mode: job.mode,
    scale: job.scale,
    fileName: job.file_name,
    progress: job.progress || 0,
    createdAt: job.created_at,
    completedAt: job.completed_at,
    error: job.error,
  }

  if (job.status === "completed" && job.enhanced_r2_key) {
    response.enhancedUrl = `${origin}/api/download/${jobId}`
    response.originalUrl = `${origin}/api/original/${jobId}`
  }

  return jsonResponse(response, 200, corsHeaders)
}

/**
 * Handle quota check
 */
async function handleGetQuota(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const clientId = extractClientId(request)
  const freeLimit = parseInt(env.FREE_DAILY_LIMIT || "5")
  const quota = await checkQuota(clientId, env, freeLimit)

  return jsonResponse(quota, 200, corsHeaders)
}

/**
 * Download enhanced image
 */
async function handleDownload(
  jobId: string,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const job = await env.D1_DB.prepare(
    `SELECT enhanced_r2_key, file_name FROM jobs WHERE id = ? AND status = 'completed'`
  )
    .bind(jobId)
    .first()

  if (!job || !job.enhanced_r2_key) {
    return jsonResponse({ error: "Enhanced image not found" }, 404, corsHeaders)
  }

  const object = await env.R2_BUCKET.get(job.enhanced_r2_key as string)
  if (!object) {
    return jsonResponse({ error: "File not found in storage" }, 404, corsHeaders)
  }

  const fileName = `enhanced-${job.file_name || "image.png"}`

  return new Response(object.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": object.httpMetadata?.contentType || "image/png",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(fileName)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  })
}

/**
 * Serve original image
 */
async function handleOriginal(
  jobId: string,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const job = await env.D1_DB.prepare(`SELECT r2_key FROM jobs WHERE id = ?`).bind(jobId).first()

  if (!job) {
    return jsonResponse({ error: "Job not found" }, 404, corsHeaders)
  }

  const object = await env.R2_BUCKET.get(job.r2_key as string)
  if (!object) {
    return jsonResponse({ error: "File not found in storage" }, 404, corsHeaders)
  }

  return new Response(object.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": object.httpMetadata?.contentType || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  })
}

/**
 * Enhancement prompts by mode
 */
const ENHANCE_PROMPTS: Record<string, { prompt: string; negative: string; strength: number }> = {
  enhance: {
    prompt: "enhanced, sharp, detailed, high quality, clear, vivid colors, professional photography",
    negative: "blurry, noisy, low quality, artifacts, distorted, pixelated, overexposed, underexposed",
    strength: 0.35,
  },
  upscale: {
    prompt: "ultra sharp, high resolution, detailed textures, crisp edges, professional quality, 4K",
    negative: "blurry, soft, noisy, artifacts, pixelated, low resolution, compression artifacts",
    strength: 0.4,
  },
  unblur: {
    prompt: "sharp focus, clear details, deblurred, crisp, high quality restoration",
    negative: "blurry, motion blur, out of focus, soft, gaussian blur, noisy",
    strength: 0.45,
  },
}

/**
 * Process enhancement job (called by queue consumer)
 * Uses Stable Diffusion img2img for image enhancement
 */
async function processEnhanceJob(job: EnhanceJob, env: Env): Promise<void> {
  const { jobId, r2Key, mode, scale } = job

  try {
    await updateJobStatus(jobId, "processing", 10, env)

    // Download original image from R2
    const object = await env.R2_BUCKET.get(r2Key)
    if (!object) {
      throw new Error("Image not found in storage")
    }

    const imageBuffer = await object.arrayBuffer()
    await updateJobStatus(jobId, "processing", 30, env)

    // Get enhancement prompt config
    const promptConfig = ENHANCE_PROMPTS[mode] || ENHANCE_PROMPTS.enhance

    // Run img2img enhancement
    const aiInput = {
      prompt: promptConfig.prompt,
      negative_prompt: promptConfig.negative,
      image: [...new Uint8Array(imageBuffer)],
      strength: promptConfig.strength,
      num_steps: 20,
    }

    await updateJobStatus(jobId, "processing", 50, env)

    const aiResponse = await env.AI.run(
      "@cf/runwayml/stable-diffusion-v1-5-img2img",
      aiInput
    )

    // Convert ReadableStream to ArrayBuffer
    const result = aiResponse instanceof ArrayBuffer
      ? aiResponse
      : aiResponse instanceof ReadableStream
        ? await new Response(aiResponse).arrayBuffer()
        : new ArrayBuffer(0)

    if (result.byteLength === 0) {
      throw new Error("AI model returned empty response")
    }

    await updateJobStatus(jobId, "processing", 80, env)

    // Upload enhanced image to R2
    const enhancedKey = r2Key.replace("uploads/", "enhanced/")
    await env.R2_BUCKET.put(enhancedKey, result, {
      httpMetadata: { contentType: "image/png" },
    })

    // Mark as completed
    await env.D1_DB.prepare(
      `UPDATE jobs SET status = 'completed', enhanced_r2_key = ?, progress = 100, completed_at = datetime('now') WHERE id = ?`
    )
      .bind(enhancedKey, jobId)
      .run()
  } catch (error) {
    console.error(`Enhancement failed for job ${jobId}:`, error)
    await env.D1_DB.prepare(`UPDATE jobs SET status = 'failed', error = ? WHERE id = ?`)
      .bind(error instanceof Error ? error.message : "Unknown error", jobId)
      .run()
  }
}

/**
 * Update job status and progress
 */
async function updateJobStatus(
  jobId: string,
  status: string,
  progress: number,
  env: Env
): Promise<void> {
  await env.D1_DB.prepare(`UPDATE jobs SET status = ?, progress = ? WHERE id = ?`)
    .bind(status, progress, jobId)
    .run()
}

/**
 * Check client quota
 */
async function checkQuota(
  clientId: string,
  env: Env,
  limit: number
): Promise<{ used: number; limit: number; remaining: number; allowed: boolean }> {
  const today = new Date().toISOString().split("T")[0]

  const result = await env.D1_DB.prepare(
    `SELECT count FROM usage_quota WHERE client_id = ? AND date = ?`
  )
    .bind(clientId, today)
    .first()

  const used = (result?.count as number) || 0

  return {
    used,
    limit,
    remaining: Math.max(0, limit - used),
    allowed: used < limit,
  }
}

/**
 * Increment client quota
 */
async function incrementQuota(clientId: string, env: Env): Promise<void> {
  const today = new Date().toISOString().split("T")[0]

  await env.D1_DB.prepare(
    `INSERT INTO usage_quota (client_id, date, count)
     VALUES (?, ?, 1)
     ON CONFLICT(client_id, date) DO UPDATE SET count = count + 1`
  )
    .bind(clientId, today)
    .run()
}

/**
 * Extract client ID from request headers or generate anonymous one
 */
function extractClientId(request: Request): string {
  const headerId = request.headers.get("X-Client-Id")
  if (headerId && headerId.length > 0 && headerId !== "undefined") {
    return headerId
  }
  // Fallback: use IP-based anonymous ID (less reliable but works)
  const cfConnectingIp = request.headers.get("CF-Connecting-IP") || "unknown"
  return `anon-${cfConnectingIp}`
}

/**
 * Get file extension from name or MIME type
 */
function getExtension(filename: string, mimeType: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()
  if (ext && ["jpg", "jpeg", "png", "webp"].includes(ext)) {
    return ext === "jpeg" ? ".jpg" : `.${ext}`
  }
  const mimeMap: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  }
  return mimeMap[mimeType] || ".png"
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return crypto.randomUUID().replace(/-/g, "").substring(0, 20)
}

/**
 * JSON response helper
 */
function jsonResponse(
  data: unknown,
  status: number,
  corsHeaders: Record<string, string>
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}
