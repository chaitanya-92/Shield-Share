"use client"

import { motion } from "framer-motion"
import { howItWorksData } from "@/src/content/sections/howitworksData"
import { VectorField } from "@/src/components/shared/VectorField"
import { Step } from "@/src/components/shared/step"

export function HowItWorks() {

  const { title, steps } = howItWorksData

  return (
    <section className="relative bg-background overflow-hidden py-32">

      {/* Background animation */}
      <VectorField />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">
            {title}
          </h2>
        </motion.div>

        {/* Steps grid */}

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
              >
                <Step
                  icon={<Icon size={18} />}
                  title={step.title}
                  text={step.text}
                  index={index}
                />
              </motion.div>
            )
          })}

        </div>

      </div>

    </section>
  )
}