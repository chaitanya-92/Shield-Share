"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/src/components/ui/alert-dialog"

interface UploadSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (maxViews: number, expiryHours: number) => void
}

export default function UploadSettingsModal({
  open,
  onOpenChange,
  onConfirm,
}: UploadSettingsModalProps) {

  const [maxViews, setMaxViews] = useState(5)
  const [expiryHours, setExpiryHours] = useState(24)

  const handleConfirm = () => {
    onConfirm(maxViews, expiryHours)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>

      <AlertDialogContent size="default">

        <AlertDialogHeader>

          <AlertDialogTitle>
            Share Settings
          </AlertDialogTitle>

          <AlertDialogDescription>
            Configure how your file will be shared.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <div className="space-y-6 py-2">

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Max Views
            </label>

            <input
              type="number"
              value={maxViews}
              onChange={(e) => setMaxViews(Number(e.target.value))}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Expiry Time (hours)
            </label>

            <input
              type="number"
              value={expiryHours}
              onChange={(e) => setExpiryHours(Number(e.target.value))}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

          </div>

        </div>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
          >
            Generate Link
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  )
}