"use client"

import { Copy, Trash2, FileIcon } from "lucide-react"
import { notify } from "@/src/lib/toast"
import { ConfirmationModal } from "@/src/components/shared/confirmation-modal"

type FileRowProps = {
  id: string
  name: string
  size: string
  expires: string
  link: string
  onDelete: (id: string) => void
}

export function FileRow({ id, name, size, expires, link, onDelete }: FileRowProps) {
  const isExpired = new Date(expires) <= new Date()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link)
    notify.success("Link copied")
  }

  return (
    <tr className="border-b border-border hover:bg-surface-2 transition-colors duration-150 group">

      {/* File name */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center border border-border text-muted group-hover:border-primary/30 group-hover:text-primary transition-colors duration-150">
            <FileIcon size={12} />
          </div>
          <span className="font-mono text-xs text-foreground truncate max-w-[180px]">
            {name}
          </span>
        </div>
      </td>

      {/* Size */}
      <td className="px-5 py-4">
        <span className="font-mono text-[11px] text-muted">
          {size}
        </span>
      </td>

      {/* Expires */}
      <td className="px-5 py-4">
        <span className={`
          inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 border
          ${isExpired
            ? "border-red-500/20 bg-red-500/5 text-red-400"
            : "border-green-500/20 bg-green-500/5 text-green-400"
          }
        `}>
          <span className={`w-1 h-1 rounded-full ${isExpired ? "bg-red-400" : "bg-green-400"}`} />
          {expires}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-3">

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 font-mono text-[11px] text-muted hover:text-primary transition-colors duration-150"
          >
            <Copy size={12} />
            Copy link
          </button>

          <ConfirmationModal
            trigger={
              <button className="flex items-center gap-1.5 font-mono text-[11px] text-muted hover:text-red-400 transition-colors duration-150">
                <Trash2 size={12} />
                Delete
              </button>
            }
            title="Delete File"
            description="This action cannot be undone. The file and its share link will be permanently removed."
            confirmText="Delete"
            cancelText="Cancel"
            variant="danger"
            onConfirm={() => onDelete(id)}
          />

        </div>
      </td>

    </tr>
  )
}