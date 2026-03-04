"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/src/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

interface ConfirmationModalProps {
  trigger: React.ReactNode
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  variant?: "danger" | "default"
}

export function ConfirmationModal({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "default",
}: ConfirmationModalProps) {
  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent className="
        bg-surface border border-border rounded-none shadow-2xl
        p-0 gap-0 max-w-md
      ">

        {/* Top accent line */}
        <div className={`h-[2px] w-full ${variant === "danger" ? "bg-red-500" : "bg-primary"}`} />

        <div className="p-8">

          <AlertDialogHeader className="space-y-4">

            {/* Icon + Title */}
            <div className="flex items-start gap-4">
              {variant === "danger" && (
                <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-red-500/30 bg-red-500/10 text-red-400">
                  <AlertTriangle size={16} />
                </div>
              )}

              <div className="space-y-2">
                <AlertDialogTitle className="font-display text-base font-semibold tracking-tight text-foreground leading-snug">
                  {title}
                </AlertDialogTitle>

                {description && (
                  <AlertDialogDescription className="font-mono text-xs leading-relaxed text-muted">
                    {description}
                  </AlertDialogDescription>
                )}
              </div>
            </div>

          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8 flex items-center gap-3 flex-row justify-end">

            <AlertDialogCancel className="
              btn-ghost m-0 h-auto
              font-mono text-xs tracking-wider normal-case
            ">
              {cancelText}
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onConfirm}
              className={`
                m-0 h-auto font-mono text-xs font-semibold tracking-widest uppercase
                px-6 py-3 border-none rounded-none transition-colors duration-150
                ${variant === "danger"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-primary hover:bg-primary/90 text-white"
                }
              `}
            >
              {confirmText}
            </AlertDialogAction>

          </AlertDialogFooter>

        </div>

      </AlertDialogContent>

    </AlertDialog>
  )
}