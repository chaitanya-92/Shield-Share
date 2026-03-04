"use client"

import UploadFile from "@/src/components/upload/upload-file"
import FilesTable from "@/src/components/dashboard/files-table"
import { DashboardLayout } from "@/src/components/layout/DashboardLayout"
import { DashboardStats } from "@/src/components/dashboard/dashboard-stats"
import { useDocuments } from "@/src/hooks/useDocuments"
import { Shield } from "lucide-react"

export default function Dashboard() {
  const { documents, loading, loadDocuments, handleDelete } = useDocuments()

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">

        {/* Page header */}
        <div className="pb-8 border-b border-border flex items-start justify-between flex-wrap gap-4">
          <div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2">
              Secure File Upload
            </h1>
            <p className="font-mono text-xs text-muted">
              Files are encrypted client-side before leaving your browser.
            </p>
          </div>

          {/* Live status badge */}
          <div className="flex items-center gap-2 border border-border px-3 py-2 bg-surface self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
              Encryption Active
            </span>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats documents={documents} />

        {/* Upload */}
        <div>
         
          <UploadFile onUploadSuccess={loadDocuments} />
        </div>

        {/* Files table */}
        <div>

          {loading ? (
            <div className="border border-border bg-surface px-6 py-12 flex items-center justify-center gap-3">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-mono text-xs text-muted">Loading files...</p>
            </div>
          ) : (
            <FilesTable documents={documents} onDelete={handleDelete} />
          )}
        </div>



      </div>
    </DashboardLayout>
  )
}