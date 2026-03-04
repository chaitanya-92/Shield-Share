"use client"

import { ReactNode } from "react"

type StepProps = {
  icon: ReactNode
  title: string
  text: string
  index: number
}

export function Step({ icon, title, text, index }: StepProps) {
  return (
    <div className="relative group p-10 bg-background overflow-hidden">

      <span className="absolute top-4 right-5 text-[64px] font-bold text-foreground/[0.04] select-none pointer-events-none">
        0{index + 1}
      </span>
      <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-md border border-border text-primary">
        {icon}
      </div>

      <h3 className="font-semibold text-base mb-3">
        {title}
      </h3>

      <p className="text-sm text-muted leading-relaxed">
        {text}
      </p>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />

    </div>
  )
}