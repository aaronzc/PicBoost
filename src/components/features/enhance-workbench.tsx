"use client"

import * as React from "react"
import { ImageUploader } from "./image-uploader"
import { ComparisonSlider } from "./comparison-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  enhanceImage,
  pollJobStatus,
  getQuota,
  downloadEnhancedImage,
  type JobStatus,
} from "@/lib/api"
import { cn } from "@/lib/utils"
import { useLang } from "@/components/providers/lang-provider"
import {
  Sparkles,
  Download,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Lock,
} from "lucide-react"

type EnhanceMode = "enhance" | "upscale" | "unblur"
type Scale = 2 | 4

interface EnhanceWorkbenchProps {
  defaultMode?: EnhanceMode
  className?: string
}

type Step = "upload" | "processing" | "result"

export function EnhanceWorkbench({
  defaultMode = "enhance",
  className,
}: EnhanceWorkbenchProps) {
  const { lang, t } = useLang()
  const [step, setStep] = React.useState<Step>("upload")
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = React.useState<string | null>(null)
  const [enhancedUrl, setEnhancedUrl] = React.useState<string | null>(null)
  const [originalApiUrl, setOriginalApiUrl] = React.useState<string | null>(null)
  const [currentJobId, setCurrentJobId] = React.useState<string | null>(null)
  const [mode, setMode] = React.useState<EnhanceMode>(defaultMode)
  const [scale, setScale] = React.useState<Scale>(2)
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [quota, setQuota] = React.useState({ used: 0, limit: 5, remaining: 5 })

  const MODE_LABELS: Record<EnhanceMode, { icon: string; action: string }> = {
    enhance: { icon: "✨", action: t.workbench.enhanceButton },
    upscale: { icon: "📐", action: t.workbench.upscale },
    unblur: { icon: "🔍", action: t.workbench.unblur },
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let cid = localStorage.getItem("picboost_client_id")
      if (!cid) {
        cid = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        localStorage.setItem("picboost_client_id", cid)
      }
    }
    getQuota()
      .then((q) => setQuota({ used: q.used, limit: q.limit, remaining: q.remaining }))
      .catch(() => {})
  }, [])

  const handleFileSelect = React.useCallback((file: File) => {
    setSelectedFile(file)
    setOriginalPreview(URL.createObjectURL(file))
    setError(null)
  }, [])

  const handleEnhance = React.useCallback(async () => {
    if (!selectedFile) return
    setStep("processing")
    setError(null)
    setProgress(0)
    try {
      const response = await enhanceImage(selectedFile, mode, scale)
      if (!response.success || !response.jobId) throw new Error(response.error || "Enhancement failed")
      setCurrentJobId(response.jobId)
      const result = await pollJobStatus(response.jobId, (status) => {
        if (status.progress) setProgress(status.progress)
      })
      if (result.status === "completed" && result.enhancedUrl) {
        setEnhancedUrl(result.enhancedUrl)
        setOriginalApiUrl(result.originalUrl || null)
        setStep("result")
        if (response.remainingQuota !== undefined) {
          setQuota((prev) => ({ ...prev, remaining: response.remainingQuota!, used: prev.limit - response.remainingQuota! }))
        }
      } else {
        throw new Error(result.error || "Enhancement failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStep("upload")
    }
  }, [selectedFile, mode, scale])

  const handleDownload = React.useCallback(async () => {
    if (!currentJobId) return
    setIsDownloading(true)
    try {
      const filename = selectedFile?.name ? `enhanced-${selectedFile.name}` : "enhanced-image.png"
      await downloadEnhancedImage(currentJobId, filename)
    } catch {
      if (enhancedUrl) window.open(enhancedUrl, "_blank")
    } finally {
      setIsDownloading(false)
    }
  }, [currentJobId, selectedFile, enhancedUrl])

  const handleReset = React.useCallback(() => {
    setStep("upload")
    setSelectedFile(null)
    setOriginalPreview(null)
    setEnhancedUrl(null)
    setOriginalApiUrl(null)
    setCurrentJobId(null)
    setProgress(0)
    setError(null)
  }, [])

  const isFreeLimit = quota.remaining <= 0
  const w = t.workbench

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Quota indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          <span>
            <strong>{quota.remaining}</strong> / {quota.limit} {w.quotaText}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {quota.remaining <= 2 && quota.remaining > 0 && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{w.runningLow}</span>
          )}
          {isFreeLimit && (
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full flex items-center gap-1">
              <Lock className="h-3 w-3" />
              {w.limitReached}
            </span>
          )}
        </div>
      </div>

      {/* Mode selector */}
      {step === "upload" && (
        <div className="flex gap-2 mb-4">
          {(["enhance", "upscale", "unblur"] as EnhanceMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {MODE_LABELS[m].icon} {w[m as keyof typeof w] as string}
            </button>
          ))}
        </div>
      )}

      {/* Scale selector */}
      {step === "upload" && mode === "upscale" && (
        <div className="flex gap-2 mb-4">
          {([2, 4] as Scale[]).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                scale === s ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground hover:border-primary/50"
              )}
            >
              {s}x {s === 4 && "(4K)"}
            </button>
          ))}
        </div>
      )}

      {/* Step: Upload */}
      {step === "upload" && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <ImageUploader onFileSelect={handleFileSelect} disabled={isFreeLimit} />
            {selectedFile && !isFreeLimit && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {w.readyToEnhance} • {(selectedFile.size / 1024 / 1024).toFixed(1)} {w.readySize}
                </p>
                <Button onClick={handleEnhance} size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  {MODE_LABELS[mode].action}
                </Button>
              </div>
            )}
            {isFreeLimit && (
              <div className="mt-4 p-4 rounded-lg bg-muted text-center">
                <p className="text-sm text-muted-foreground">
                  {w.limitMessage}
                  <br />
                  <a href={`${lang === "zh" ? "/zh" : ""}/pricing`} className="text-primary hover:underline">
                    {w.limitMessageCta}
                  </a>
                </p>
              </div>
            )}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step: Processing */}
      {step === "processing" && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <Sparkles className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{w.enhancing}</h3>
                <p className="text-muted-foreground text-sm">{w.enhancingDesc}</p>
              </div>
              <div className="w-full max-w-md">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${Math.max(progress, 10)}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {progress > 0 ? `${progress}% ${w.progressLabel}` : w.processing}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step: Result */}
      {step === "result" && originalPreview && enhancedUrl && (
        <div className="space-y-6">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <ComparisonSlider
                beforeSrc={originalApiUrl || originalPreview}
                afterSrc={enhancedUrl}
                beforeLabel={lang === "zh" ? "原图" : "Original"}
                afterLabel={lang === "zh" ? "增强后" : "Enhanced"}
                className="w-full"
              />
            </CardContent>
          </Card>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              {w.complete}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                {w.newImage}
              </Button>
              <Button onClick={handleDownload} disabled={isDownloading} className="gap-2">
                <Download className="h-4 w-4" />
                {isDownloading ? w.downloading : w.download}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
