'use client'

import { useState, useCallback } from 'react'
import { Upload, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { formatFileSize } from '@/lib/utils'
import { MAX_FILE_SIZE_BYTES, ACCEPTED_FILE_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface UploadFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

interface DocumentUploaderProps {
  loanId: string
  category: string
  label: string
  onUploadComplete?: (fileUrl: string) => void
  className?: string
}

export function DocumentUploader({
  loanId,
  category,
  label,
  onUploadComplete,
  className,
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles)
    const validFiles = arr.filter((f) => {
      if (f.size > MAX_FILE_SIZE_BYTES) return false
      if (!ACCEPTED_FILE_TYPES.includes(f.type)) return false
      return true
    })

    const uploadFiles: UploadFile[] = validFiles.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      progress: 0,
      status: 'pending',
    }))

    setFiles((prev) => [...prev, ...uploadFiles])
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      addFiles(e.dataTransfer.files)
    },
    [addFiles]
  )

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer',
          isDragging
            ? 'border-icecap-gold bg-icecap-gold/5'
            : 'border-icecap-steel hover:border-icecap-gold/40 hover:bg-icecap-slate/30'
        )}
      >
        <input
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(',')}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors',
          isDragging ? 'border-icecap-gold bg-icecap-gold/10' : 'border-icecap-steel'
        )}>
          <Upload className={cn('h-5 w-5', isDragging ? 'text-icecap-gold' : 'text-icecap-muted')} />
        </div>
        <div className="text-center">
          <p className="text-icecap-white text-sm font-medium">
            Drop files here or <span className="text-icecap-gold underline">browse</span>
          </p>
          <p className="text-icecap-muted text-xs mt-1">
            PDF, JPG, PNG, DOC — max 50 MB each
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-icecap-steel bg-icecap-slate"
            >
              <div className="shrink-0">
                {f.status === 'done' ? (
                  <CheckCircle2 className="h-5 w-5 text-icecap-success" />
                ) : f.status === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-icecap-danger" />
                ) : (
                  <FileText className="h-5 w-5 text-icecap-muted" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-icecap-white text-sm truncate">{f.file.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-icecap-muted text-xs">{formatFileSize(f.file.size)}</span>
                  {f.status === 'uploading' && (
                    <Progress value={f.progress} className="flex-1 h-1" />
                  )}
                  {f.status === 'error' && f.error && (
                    <span className="text-icecap-danger text-xs">{f.error}</span>
                  )}
                </div>
              </div>

              {f.status !== 'uploading' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-icecap-muted hover:text-icecap-danger"
                  onClick={() => removeFile(f.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
