"use client"

import { useRef, useState } from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index?: number
}

export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }

  const onMouseLeave = () => setSpotlight((s) => ({ ...s, visible: false }))

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="card-hover group relative p-10 overflow-hidden cursor-default h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, hsl(var(--primary) / 0.07), transparent 70%)`,
        }}
      />

      <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />

      <div className="icon-box">
        {icon}
      </div>
      <h3 className="font-display text-base font-semibold tracking-tight text-foreground mb-3">
        {title}
      </h3>

      <p className="font-mono text-xs leading-[1.85] text-muted">
        {description}
      </p>

      <span className="absolute bottom-5 right-6 font-mono text-[10px] tracking-widest text-foreground/10 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  )
}