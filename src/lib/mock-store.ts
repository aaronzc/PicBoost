/**
 * 本地开发 Mock Store
 * 内存中存储任务和配额，模拟图片增强处理
 */

interface MockJob {
  id: string
  clientId: string
  fileName: string
  fileType: string
  mode: string
  scale: number
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  originalData: ArrayBuffer
  enhancedData?: ArrayBuffer
  error?: string
  createdAt: string
  completedAt?: string
}

const jobs = new Map<string, MockJob>()
const quotaMap = new Map<string, { date: string; count: number }>()

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function getToday(): string {
  return new Date().toISOString().split("T")[0]
}

export const mockStore = {
  getQuota(clientId: string, limit: number) {
    const today = getToday()
    const record = quotaMap.get(clientId)
    const used = record && record.date === today ? record.count : 0
    return {
      used,
      limit,
      remaining: Math.max(0, limit - used),
      allowed: used < limit,
    }
  },

  incrementQuota(clientId: string) {
    const today = getToday()
    const record = quotaMap.get(clientId)
    if (record && record.date === today) {
      record.count++
    } else {
      quotaMap.set(clientId, { date: today, count: 1 })
    }
  },

  createJob(
    clientId: string,
    fileName: string,
    fileType: string,
    originalData: ArrayBuffer,
    mode: string,
    scale: number
  ): string {
    const id = generateId()
    jobs.set(id, {
      id,
      clientId,
      fileName,
      fileType,
      mode,
      scale,
      status: "pending",
      progress: 0,
      originalData,
      createdAt: new Date().toISOString(),
    })
    this.incrementQuota(clientId)
    return id
  },

  getJob(jobId: string): MockJob | undefined {
    return jobs.get(jobId)
  },

  /**
   * 模拟异步图片处理
   * 不做真实的 AI 增强，只是把原图复制一份作为"增强"结果
   * 进度模拟：10% → 40% → 70% → 100%
   */
  processJob(jobId: string) {
    const job = jobs.get(jobId)
    if (!job) return

    // 模拟进度
    const steps = [
      { progress: 10, delay: 500 },
      { progress: 40, delay: 1000 },
      { progress: 70, delay: 1500 },
    ]

    let currentStep = 0

    job.status = "processing"

    const runStep = () => {
      if (currentStep < steps.length) {
        job.progress = steps[currentStep].progress
        currentStep++
        setTimeout(runStep, steps[currentStep - 1].delay)
      } else {
        // 完成：用原图作为 mock 增强结果
        job.enhancedData = job.originalData
        job.progress = 100
        job.status = "completed"
        job.completedAt = new Date().toISOString()
      }
    }

    // 延迟启动，给客户端时间开始轮询
    setTimeout(runStep, 300)
  },
}
