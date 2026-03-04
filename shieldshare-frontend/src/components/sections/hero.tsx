"use client"

import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Upload } from "lucide-react"
import { heroData } from "@/src/content/sections/heroData"

export function Hero() {
  const { title, highlight, description, primaryButton, secondaryButton } = heroData;

  return (
    <section className="w-full py-28 px-6">
      <div className="max-w-5xl mx-auto text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold leading-tight"
        >
          {title}
          <span className="block text-primary">
            {highlight}
          </span>
        </motion.h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="destructive" size="lg" className="gap-2">
            <Upload size={18} />
            {primaryButton}
          </Button>

          <Button variant="outline" size="lg">
            {secondaryButton}
          </Button>
        </div>

      </div>
    </section>
  )
}