"use client"

import { FileRow } from "./file-row"
import { FolderOpen } from "lucide-react"

interface FileDocument {
  id: string
  name: string
  size: number
  expiresAt: string
  link: string
}

interface Props {
  documents: FileDocument[]
  onDelete: (id: string) => void
}

export default function FilesTable({ documents, onDelete }: Props) {
  return (
    <div className="border border-border overflow-hidden">

      {/* Table header */}
      <div className="border-b border-border bg-surface px-5 py-3 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
          Your Files
        </p>
        <p className="font-mono text-[10px] text-muted">
          {documents.length} {documents.length === 1 ? "file" : "files"}
        </p>
      </div>

      {documents.length === 0 ? (

        /* Empty state */
        <div className="py-16 flex flex-col items-center gap-3 bg-background">
          <div className="w-10 h-10 border border-border flex items-center justify-center text-muted">
            <FolderOpen size={18} />
          </div>
          <p className="font-mono text-xs text-muted">No files uploaded yet</p>
          <p className="font-mono text-[10px] text-muted/50">Upload a file above to get started</p>
        </div>

      ) : (

        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface">
              {["File", "Size", "Expires", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-mono text-[10px] tracking-[0.15em] uppercase text-muted font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <FileRow
                key={doc.id}
                id={doc.id}
                name={doc.name}
                size={(doc.size / 1024).toFixed(1) + " KB"}
                expires={new Date(doc.expiresAt).toLocaleDateString()}
                link={doc.link}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>

      )}
    </div>
  )
}