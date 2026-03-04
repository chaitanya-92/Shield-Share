"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud } from "lucide-react"
import { motion } from "framer-motion"

import UploadSettingsModal from "./upload-settings-modal"
import { uploadDocument } from "@/src/lib/api/documentApi"
import { notify } from "@/src/lib/toast"

export default function UploadFile({ refresh }: any) {

  const [file, setFile] = useState<File | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = (files: File[]) => {

    const selected = files[0]
    if (!selected) return

    setFile(selected)
    setSettingsOpen(true)

  }

  const handleUpload = async (maxViews: number, expiryHours: number) => {

    if (!file) return

    try {

      setUploading(true)
      setProgress(0)

      await uploadDocument(file, {
        maxViews,
        expiryHours,
        onProgress: setProgress
      })

      notify.success("File uploaded successfully")

      refresh()

      setSettingsOpen(false)
      setFile(null)

    } catch {

      notify.error("Upload failed")

    } finally {

      setUploading(false)

    }

  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false)
  })

  return (
    <>
    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        <div
          {...getRootProps()}
          className={`
            relative border border-dashed p-16 flex flex-col items-center gap-5
            transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg
            ${isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-surface"
            }
          `}
        >

          <input {...getInputProps()} />

          {/* Animated corners */}

          {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos,i)=>(
            <span
              key={i}
              className={`
                absolute ${pos} w-3 h-3 border-primary opacity-0
                group-hover:opacity-100 transition-opacity duration-300
                ${i===0?"border-t-2 border-l-2":""}
                ${i===1?"border-t-2 border-r-2":""}
                ${i===2?"border-b-2 border-l-2":""}
                ${i===3?"border-b-2 border-r-2":""}
              `}
            />
          ))}

          {/* Icon */}

          <div className={`
            w-14 h-14 flex items-center justify-center border transition-all duration-300
            ${isDragging
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted group-hover:border-primary/50 group-hover:text-primary"
            }
          `}>
            <UploadCloud
              size={24}
              className={`
                transition-transform duration-300
                ${isDragging ? "scale-110" : "group-hover:-translate-y-0.5"}
              `}
            />
          </div>

          {/* Text */}

          <div className="space-y-2 text-center">

            <p className="font-mono text-xs text-muted tracking-wide">
              Drag & drop file or click to upload
            </p>

            <p className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
              PNG, JPG, PDF, ZIP up to 50MB
            </p>

          </div>

          {/* Button */}

         <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="btn-primary mt-2"
        >
          Select File
        </button>

          {/* Security note */}

          <p className="font-mono text-[10px] text-foreground/20 tracking-wide flex items-center gap-2">

            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1L1.5 2.5V5c0 2 1.5 3.5 3.5 4 2-.5 3.5-2 3.5-4V2.5L5 1Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>

            End-to-end encrypted · Zero knowledge storage

          </p>

        </div>

      </motion.div>


      {/* Upload Progress */}

      {uploading && (

        <div className="mt-6 w-full bg-muted rounded-full h-3">

          <div
            className="bg-primary h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />

        </div>

      )}


      {/* Settings Modal */}

      <UploadSettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onConfirm={handleUpload}
      />

    </>
  )
}