"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Upload, ImagePlus, Loader2 } from "lucide-react"
import { validateImageFile, formatFileSize } from "@/lib/utils"

interface ImageUploaderProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
  className?: string
}

export function ImageUploader({
  onFileSelect,
  disabled = false,
  className,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFile = React.useCallback(
    (file: File) => {
      setError(null)
      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error!)
        return
      }

      // Create preview
      const url = URL.createObjectURL(file)
      setPreview(url)
      onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [disabled, handleFile]
  )

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    },
    [disabled]
  )

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleClick = React.useCallback(() => {
    if (!disabled) fileInputRef.current?.click()
  }, [disabled])

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <div className={cn("w-full", className)}>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200",
          "min-h-[280px] cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5 upload-area-active"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          disabled && "cursor-not-allowed opacity-50",
          preview && "border-solid border-primary/30"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-[240px] max-w-full rounded-lg object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 rounded-b-lg">
              <p className="text-white text-sm text-center">
                Click or drag to replace
              </p>
            </div>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "mb-4 rounded-full p-4 transition-colors",
                isDragging ? "bg-primary/10" : "bg-muted"
              )}
            >
              {isDragging ? (
                <ImagePlus className="h-8 w-8 text-primary" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <p className="mb-2 text-lg font-medium">
              {isDragging ? "Drop your image here" : "Drag & drop your image"}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              or click to browse files
            </p>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1">JPG</span>
              <span className="rounded-full bg-muted px-3 py-1">PNG</span>
              <span className="rounded-full bg-muted px-3 py-1">WebP</span>
              <span className="rounded-full bg-muted px-3 py-1">Max 10MB</span>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
