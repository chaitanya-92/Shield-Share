"use client"

import { useState } from "react"
import { UploadCloud } from "lucide-react"
import { motion } from "framer-motion"
import { uploadDemoData } from "@/src/content/sections/uploaddemoData"

export function UploadDemo() {
  const { title, description, dropText, buttonText } = uploadDemoData
  const [isDragging, setIsDragging] = useState(false)

  return (
    <section className="section bg-surface">
      <div className="max-w-3xl mx-auto text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="section-title mb-4">{title}</h2>
          <p className="font-mono text-xs leading-relaxed text-muted max-w-md mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
            className={`
              relative border border-dashed p-20 flex flex-col items-center gap-5
              transition-all duration-300 cursor-pointer group overflow-hidden
              ${isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-surface"
              }
            `}
          >
            {/* Animated corner accents */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
              <span
                key={i}
                className={`absolute ${pos} w-3 h-3 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${i === 0 ? "border-t-2 border-l-2" : ""}
                  ${i === 1 ? "border-t-2 border-r-2" : ""}
                  ${i === 2 ? "border-b-2 border-l-2" : ""}
                  ${i === 3 ? "border-b-2 border-r-2" : ""}
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
              <UploadCloud size={24} className={`transition-transform duration-300 ${isDragging ? "scale-110" : "group-hover:-translate-y-0.5"}`} />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted tracking-wide">
                {dropText}
              </p>
              <p className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
                PNG, JPG, PDF, ZIP up to 50MB
              </p>
            </div>

            {/* CTA */}
            <button className="btn-primary mt-2">
              {buttonText}
            </button>

            {/* Security note */}
            <p className="font-mono text-[10px] text-foreground/20 tracking-wide flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L1.5 2.5V5c0 2 1.5 3.5 3.5 4 2-.5 3.5-2 3.5-4V2.5L5 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              End-to-end encrypted · Zero knowledge storage
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}