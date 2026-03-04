"use client"

import { File, Link2, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface DocumentItem {
  id: string
  expiresAt: string
}

const stats = (documents: DocumentItem[]) => [
  {
    icon: File,
    label: "Files Uploaded",
    value: documents.length,
    suffix: null,
  },
  {
    icon: Link2,
    label: "Active Links",
    value: documents.filter((d) => new Date(d.expiresAt) > new Date()).length,
    suffix: null,
  },
  {
    icon: Clock,
    label: "Expired Files",
    value: documents.filter((d) => new Date(d.expiresAt) <= new Date()).length,
    suffix: null,
  },
]

export function DashboardStats({ documents }: { documents: DocumentItem[] }) {
  const items = stats(documents)

  return (
    <div className="grid grid-cols-3 gap-px bg-border border border-border mb-10">
      {items.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            className="bg-surface hover:bg-surface-2 transition-colors duration-200 p-6 relative group"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            {/* Top accent on hover */}
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />

            <div className="icon-box mb-4">
              <Icon size={16} />
            </div>

            <p className="font-display text-3xl font-bold text-foreground tracking-tight mb-1">
              {stat.value}
            </p>

            <p className="font-mono text-[11px] tracking-wider text-muted uppercase">
              {stat.label}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}