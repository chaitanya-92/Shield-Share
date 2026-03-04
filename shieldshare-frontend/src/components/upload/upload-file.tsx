"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { Button } from "@/src/components/ui/button"
import { UploadCloud, Copy } from "lucide-react"
import { useAuthStore } from "@/src/store/authStore"

export default function UploadFile() {

  const token = useAuthStore((state) => state.token)

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [shareLink, setShareLink] = useState<string | null>(null)

  const onDrop = async (acceptedFiles: File[]) => {

    const file = acceptedFiles[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {

      setUploading(true)

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/documents/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },

          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            )
            setProgress(percent)
          }
        }
      )

      setShareLink(res.data.shareLink)

    } catch (error) {

      console.error("Upload failed:", error)

    } finally {

      setUploading(false)

    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  const copyLink = () => {

    if (!shareLink) return

    navigator.clipboard.writeText(shareLink)

    alert("Link copied!")

  }

  return (

    <div className="max-w-xl mx-auto space-y-6">

      {/* Upload Box */}

      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:border-primary transition"
      >

        <input {...getInputProps()} />

        <UploadCloud className="mx-auto mb-3" size={40} />

        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop file here, or click to select</p>
        )}

      </div>

      {/* Progress Bar */}

      {uploading && (

        <div className="w-full bg-muted rounded-full h-3">

          <div
            className="bg-primary h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />

        </div>

      )}

      {/* Share Link */}

      {shareLink && (

        <div className="p-4 border rounded-lg flex items-center justify-between">

          <span className="text-sm truncate">
            {shareLink}
          </span>

          <Button size="sm" onClick={copyLink}>
            <Copy size={16} />
          </Button>

        </div>

      )}

    </div>
  )
}