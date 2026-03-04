"use client"

import { useEffect, useRef } from "react"

export function VectorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const angles = useRef<number[][]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!

    const COLS = 30
    const ROWS = 9
    const PILL_W = 20
    const PILL_H = 2.5
    const GAP_X = 42
    const GAP_Y = 36

    angles.current = Array.from({ length: ROWS }, () =>
      new Array(COLS).fill(0)
    )

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()

      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const offX = (canvas.width - (COLS - 1) * GAP_X) / 2
      const offY = (canvas.height - (ROWS - 1) * GAP_Y) / 2

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {

          const x = offX + c * GAP_X
          const y = offY + r * GAP_Y

          const dx = mouse.current.x - x
          const dy = mouse.current.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const target =
            dist < 280 ? Math.atan2(dy, dx) + Math.PI / 2 : 0

          let curr = angles.current[r][c]
          let diff = target - curr

          while (diff > Math.PI) diff -= Math.PI * 2
          while (diff < -Math.PI) diff += Math.PI * 2

          angles.current[r][c] = curr + diff * 0.07

          const alpha =
            dist < 280
              ? 0.15 + (1 - dist / 280) * 0.6
              : 0.16

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(angles.current[r][c])

          ctx.beginPath()
          ctx.roundRect(
            -PILL_W / 2,
            -PILL_H / 2,
            PILL_W,
            PILL_H,
            PILL_H / 2
          )

          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.fill()

          ctx.restore()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      ro.disconnect()
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
<canvas
  ref={canvasRef}
  className="
  absolute inset-0 w-full h-full pointer-events-none
  opacity-25 dark:opacity-40
  mix-blend-multiply dark:mix-blend-normal
  [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]
  dark:[mask-image:radial-gradient(circle_at_center,white_40%,transparent_100%)]
  "
/>
  )
}