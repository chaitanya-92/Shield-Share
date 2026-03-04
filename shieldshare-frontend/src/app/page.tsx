import { Hero } from "@/src/components/sections/hero"
import { Features } from "@/src/components/sections/features"
import { HowItWorks } from "@/src/components/sections/how-it-works"
import { UploadDemo } from "@/src/components/sections/upload-demo"
import { Footer } from "@/src/components/sections/footer"

export default function Home() {
  return (
    <main>

      <Hero />

      <Features />

      <HowItWorks />

      <UploadDemo />

      <Footer />

    </main>
  )
}