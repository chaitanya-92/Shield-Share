"use client"

import { motion } from "framer-motion"
import { featuresData } from "@/src/content/sections/featuresData"
import { FeatureCard } from "@/src/components/shared/featurecard"

export function Features() {
  const { title, features } = featuresData

  return (
    <section className="section bg-surface">
      <div className="section-inner">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <FeatureCard
                  icon={<Icon size={18} />}
                  title={feature.title}
                  description={feature.description}
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